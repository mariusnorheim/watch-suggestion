import { Duration } from "aws-cdk-lib";
import { Construct } from "constructs";
import { Bucket } from "aws-cdk-lib/aws-s3";
import * as cf from "aws-cdk-lib/aws-cloudfront";
import * as origins from "aws-cdk-lib/aws-cloudfront-origins";


export interface CdnProps {
  bucket: Bucket;
}

export class Cdn extends Construct {
  public readonly distribution: cf.CloudFrontWebDistribution;
  constructor(scope: Construct, id: string, props: CdnProps) {
    super(scope, id);
    // Cloudfront distribution
    // const distribution = new cf.Distribution(this, "Distribution", {
    //   defaultBehavior: {
    //     origin: new origins.S3Origin(props.bucket),
    //     allowedMethods: cf.AllowedMethods.ALLOW_GET_HEAD_OPTIONS,
    //     viewerProtocolPolicy: cf.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
    //     cachePolicy: new cf.CachePolicy(this, "DefaultCachePolicy", {
    //       enableAcceptEncodingGzip: true,
    //       enableAcceptEncodingBrotli: true,
    //       minTtl: Duration.seconds(2),
    //       maxTtl: Duration.seconds(600),
    //       defaultTtl: Duration.seconds(2),
    //       comment: "Managed-Amplify policy without cache keys",
    //     }),
    //     responseHeadersPolicy: cf.ResponseHeadersPolicy.SECURITY_HEADERS,
    //     originRequestPolicy: cf.OriginRequestPolicy.CORS_S3_ORIGIN,
    //     functionAssociations: [
    //       {
    //         eventType: cf.FunctionEventType.VIEWER_REQUEST,
    //         function: new cf.Function(this, "HeaderRewriteFunction", {
    //           comment: "Formats path for S3",
    //           code: cf.FunctionCode.fromFile({
    //             filePath: "lambdas/header-rewrite/index.js",
    //           }),
    //         }),
    //       },
    //     ],
    //   },
    //   additionalBehaviors: {
    //     "/_next/*": {
    //       origin: new origins.S3Origin(props.bucket),
    //       allowedMethods: cf.AllowedMethods.ALLOW_GET_HEAD_OPTIONS,
    //       viewerProtocolPolicy: cf.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
    //       cachePolicy: cf.CachePolicy.CACHING_OPTIMIZED,
    //       responseHeadersPolicy: cf.ResponseHeadersPolicy.SECURITY_HEADERS,
    //       originRequestPolicy: cf.OriginRequestPolicy.CORS_S3_ORIGIN,
    //     },
    //   },
    //   priceClass: cf.PriceClass.PRICE_CLASS_100,
    //   //domainNames: ["example.com"],
    //   //certificate: certificateArn,
    // })
    const distribution = new cf.CloudFrontWebDistribution(this, 'WebDistribution', {
      comment: "CDN for watch-suggestion",
      priceClass: cf.PriceClass.PRICE_CLASS_100,
      httpVersion: cf.HttpVersion.HTTP2_AND_3,
      //viewerProtocolPolicy: cf.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
      originConfigs: [{
        s3OriginSource: {
          s3BucketSource: props.bucket,
        },
        behaviors: [{
          isDefaultBehavior: true
        }],
      }],
    });
    this.distribution = distribution;
  }
}
