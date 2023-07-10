import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apiGw from 'aws-cdk-lib/aws-apigateway';
import { cartApiHandler } from '../../src/main';

const CORS_PREFLIGHT_SETTINGS = {
  allowOrigins: ['*'],
  allowHeaders: ['*'],
  allowMethods: apiGw.Cors.ALL_METHODS,
};

export class CdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const importProductFiles = new NodejsFunction(
      this,
      'GetProductsListHandler',
      {
        runtime: lambda.Runtime.NODEJS_18_X,
        functionName: 'cartApiHandler',
        handler: 'cartApiHandler',
        entry: '../../src/main.ts',
      },
    );

    const api = new apiGw.RestApi(this, 'card-api', {
      restApiName: 'Card Api service',
      description: 'Card Api service',
    });
  }
}
