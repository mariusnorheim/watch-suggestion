import { Stage, StageProps, CfnOutput } from "aws-cdk-lib";
import { Construct } from "constructs";
import { AppStack } from "./app-stack";


export class PipelineStage extends Stage {
  public readonly bucket: CfnOutput;
  public readonly distribution: CfnOutput;
  constructor(scope: Construct, id: string, props?: StageProps) {
    super(scope, id, props);
    const stack = new AppStack(this, "Infrastructure");
    this.bucket = stack.bucket;
    this.distribution = stack.distribution;
  }
}