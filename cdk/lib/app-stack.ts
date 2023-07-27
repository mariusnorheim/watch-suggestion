import { Stack, StackProps, CfnOutput } from "aws-cdk-lib";
import { Construct } from "constructs";
import { Storage } from "./constructs/storage";
import { Cdn } from "./constructs/cdn";


export class AppStack extends Stack {
  public readonly bucket: CfnOutput;
  public readonly distribution: CfnOutput;
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    const s3bucket = new Storage(this, "app-bucket");
    this.bucket = new CfnOutput(this, "BucketName", {
      value: s3bucket.bucket.bucketName
    });

    const cf = new Cdn(this, "app-cdn", s3bucket);
    this.distribution = new CfnOutput(this, "DistributionId", {
      value: cf.distribution.distributionId
    });
    new CfnOutput(this, "CloudfrontUrl", {
      value: cf.distribution.distributionDomainName
    });
  }
}
