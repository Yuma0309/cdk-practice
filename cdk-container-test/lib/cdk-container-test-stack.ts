import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as s3deploy from 'aws-cdk-lib/aws-s3-deployment';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins';

export class CdkContainerTestStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // S3バケットの作成
    const myBucket = new s3.Bucket(this, "myBucket", {
      bucketName: "yuma-cdk-container-test",
    });

    // CloudFrontディストリビューションの作成
    const distribution = new cloudfront.Distribution(this, "myDist", {
      defaultRootObject: "index.html",
      defaultBehavior: {
        origin: origins.S3BucketOrigin.withOriginAccessControl(myBucket),
        cachePolicy: cloudfront.CachePolicy.CACHING_DISABLED,
      },
    });

    // S3バケットに画像をデプロイ
    new s3deploy.BucketDeployment(this, 'DeployImage', {
      sources: [s3deploy.Source.asset('../assets')],
      destinationBucket: myBucket,
      distribution,
      distributionPaths: ["/*"],
    });

    // CloudFrontのURLを出力
    new cdk.CfnOutput(this, 'DistributionDomainName', {
      value: `https://${distribution.domainName}/虹色孔雀.jpg`,
    });
  }
}
