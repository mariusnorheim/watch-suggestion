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
        input: pipelines.CodePipelineSource.codeCommit(props.repository, "main"),
        commands: [
          "cd cdk",
          "npm ci",
          "npm run build",
          "npx cdk synth"
        ],
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
    const deploy = new PipelineStage(this, "DeployFrontend");
    const deployStage = pipeline.addStage(deploy, {
      post: [
        new pipelines.ShellStep("DeployFrontEnd", {
          envFromCfnOutputs: {
            BUCKET_NAME: deploy.bucket,
            DISTRIBUTION_ID: deploy.distribution,
          },
          commands: [
            "cd app",
            "npm ci",
            "npm run build",
            `aws cloudfront create-invalidation --distribution-id $DISTRIBUTION_ID --paths "/*"`,
          ],
        }),
      ],
    });
  }
}
