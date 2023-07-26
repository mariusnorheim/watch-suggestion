import { Construct } from "constructs";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as s3deploy from "aws-cdk-lib/aws-s3-deployment";


export class Storage extends Construct {
  public readonly bucket: s3.Bucket;
  constructor(scope: Construct, id: string) {
    super(scope, id);
    // S3 storage
    const bucket = new s3.Bucket(this, "StaticFilesBucket", {
      enforceSSL: true,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
    });
    this.bucket = bucket;
    
    new s3deploy.BucketDeployment(this, "NoCacheFilesDeployment", {
      sources: [s3deploy.Source.asset("../app/out")],
      destinationBucket: bucket,
      cacheControl: [
        s3deploy.CacheControl.fromString("public, max-age=0, must-revalidate"),
      ],
      prune: false,
    });
    
    new s3deploy.BucketDeployment(this, "StaticFilesDeployment", {
      sources: [s3deploy.Source.asset("../app/_next")],
      destinationBucket: bucket,
      cacheControl: [
        s3deploy.CacheControl.fromString("public, max-age=31536000, immutable"),
      ],
      prune: false,
    });
  }
}
