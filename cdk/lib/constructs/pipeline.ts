import { Construct } from "constructs";
import { Repository } from "aws-cdk-lib/aws-codecommit";
import { PipelineStage } from "../pipeline-stage";
import * as pipelines from "aws-cdk-lib/pipelines";
import * as iam from "aws-cdk-lib/aws-iam";


export interface PipelineProps {
  repository: Repository;
}

export class Pipeline extends Construct {
  constructor(scope: Construct, id: string, props: PipelineProps) {
    super(scope, id);
    // Build stage
    let pipeline = new pipelines.CodePipeline(this, "Pipeline", {
      pipelineName: "pipeline-watch-suggestion",
      selfMutation: true,
      synth: new pipelines.ShellStep("Synth", {
        input: pipelines.CodePipelineSource.codeCommit(props.repository, "master"),
        commands: [
          // "cd ${CODEBUILD_SRC_DIR}/cdk/lambdas/header-rewrite",
          // "npm ci",
          // "npm run build",
          "mkdir -p ${CODEBUILD_SRC_DIR}/app/.next",
          "cd ${CODEBUILD_SRC_DIR}/cdk",
          "npm ci",
          "npm run build",
          "npx cdk synth"
        ],
        primaryOutputDirectory: "cdk/cdk.out",
      }),
      codeBuildDefaults: {
        rolePolicy: [
          new iam.PolicyStatement({
            effect: iam.Effect.ALLOW,
            actions: ["s3:*"],
            resources: ["*"],
          }),
          new iam.PolicyStatement({
            effect: iam.Effect.ALLOW,
            actions: ["cloudfront:*"],
            resources: ["*"],
          }),
        ],
      },
    });

    // Deployment stage
    const deploy = new PipelineStage(this, "Deploy");
    const deployStage = pipeline.addStage(deploy, {
      post: [
        new pipelines.ShellStep("Frontend.Deploy", {
          envFromCfnOutputs: {
            BUCKET_NAME: deploy.bucket,
            DISTRIBUTION_ID: deploy.distribution,
          },
          commands: [
            "cd ${CODEBUILD_SRC_DIR}/app",
            "touch .env",
            "TOKEN=$(aws secretsmanager get-secret-value --secret-id /watch-suggestion/token --query SecretString --output json)",
            `echo BASE_URL="$DISTRIBUTION_ID" >> .env`,
            `echo APP_TOKEN="$TOKEN" >> .env`,
            "npm ci",
            "npm run build",
            "aws s3 cp .next/ s3://$BUCKET_NAME --recursive",
            `aws cloudfront create-invalidation --distribution-id $DISTRIBUTION_ID --paths "/*"`,
          ],
        }),
      ],
    });
  }
}
