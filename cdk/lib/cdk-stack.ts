import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apiGw from 'aws-cdk-lib/aws-apigateway';
import path = require('path');

export class CdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const cartApiHandler = new NodejsFunction(this, 'cartApiHandler', {
      runtime: lambda.Runtime.NODEJS_18_X,
      entry: path.resolve(__dirname, '..', '..', 'dist', 'main.js'),
      functionName: 'cartApiHandler',
    });

    const api = new apiGw.LambdaRestApi(this, 'card-api', {
      restApiName: 'Card Api service',
      handler: cartApiHandler,
    });
  }
}
