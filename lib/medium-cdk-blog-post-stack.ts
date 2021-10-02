import * as cdk from "@aws-cdk/core";
import * as s3 from "@aws-cdk/aws-s3";
import * as iam from "@aws-cdk/aws-iam";

export class MediumCdkBlogPostStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    const mydemobucket = new s3.Bucket(this, "my-demo-blog-bucket", {
      bucketName: "my-demo-blog-bucket-1",
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    // adding bucket policy for this bucket
    mydemobucket.addToResourcePolicy(
      new iam.PolicyStatement({
        effect: iam.Effect.ALLOW,
        principals: [new iam.ServicePrincipal("lambda.amazonaws.com")],
        actions: ["s3:GetObject"],
        resources: [`${mydemobucket.bucketArn}/*`],
      })
    );
  }
}
