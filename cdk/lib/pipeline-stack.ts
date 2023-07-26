import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { Repository } from "./constructs/repository";
import { Pipeline } from "./constructs/pipeline";


export class PipelineStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    const repository = new Repository(this, "Repository");

    new Pipeline(this, "Pipeline", {
      repository: repository.repo
    });
  }
}
