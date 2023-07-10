import { NestFactory } from '@nestjs/core';
import { APIGatewayProxyEvent, Context, Handler, Callback } from 'aws-lambda';
import * as serverlessExpress from '@vendia/serverless-express';
import helmet from 'helmet';

import { AppModule } from './app.module';

const port = process.env.PORT || 4000;
let server: Handler;

async function createApp() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: (req, callback) => callback(null, true),
  });
  app.use(helmet());

  await app;
}

async function bootstrap() {
  const app = await createApp();
  await app.init();

  const expressApp = app.getHttpAdapter().getInstance();
  return serverlessExpress.configure({ app: expressApp });
}

export const cartApiHandler: Handler = async (
  event: any,
  context: Context,
  callback: Callback,
) => {
  server = server ?? (await bootstrap());
  return server(event, context, callback);
};

// Start the local server if not running in AWS Lambda
if (!process.env.AWS_EXECUTION_ENV) {
  (async () => {
    const app = await createApp();
    await app.listen(port);
    console.log('App is running on %s port', port);
  })();
}
