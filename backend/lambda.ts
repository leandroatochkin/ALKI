// lambda.ts
import awsServerlessExpress from 'aws-serverless-express';
import { APIGatewayProxyEvent, Context } from 'aws-lambda';
import app from 'server';

const server = awsServerlessExpress.createServer(app);

export const handler = (event: APIGatewayProxyEvent, context: Context) => {
  return awsServerlessExpress.proxy(server, event, context);
};