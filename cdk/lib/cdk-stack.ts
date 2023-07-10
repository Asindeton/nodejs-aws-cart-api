import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apiGw from 'aws-cdk-lib/aws-apigateway';
import path = require('path');
import 'dotenv/config';

export class CdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const environment = {
      DB_URL: process.env.DB_URL!,
      DB_PORT: process.env.DB_PORT!,
      DB_DATABASE: process.env.DB_DATABASE!,
      DB_USER: process.env.DB_USER!,
      DB_PASSWORD: process.env.DB_PASSWORD!,
    };

    const cartApiHandler = new NodejsFunction(this, 'cartApiHandler', {
      environment,
      runtime: lambda.Runtime.NODEJS_18_X,
      entry: path.resolve(__dirname, '..', '..', 'dist', 'main.js'),
      functionName: 'cartApiHandler',
      timeout: cdk.Duration.seconds(30),
    });

    const api = new apiGw.LambdaRestApi(this, 'card-api', {
      restApiName: 'Card Api service',
      handler: cartApiHandler,
    });
  }
}
