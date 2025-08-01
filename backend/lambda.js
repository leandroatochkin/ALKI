// lambda.ts
import awsServerlessExpress from 'aws-serverless-express';
import app from './server.js';
const server = awsServerlessExpress.createServer(app);
const BASE_PATH = process.env.BASE_PATH;

export const handler = (event, context) => {
  const basePathRegex = new RegExp(`^${BASE_PATH}`, 'i');

  if (event.path && basePathRegex.test(event.path)) {
    event.path = event.path.replace(basePathRegex, '') || '/';
  }

  if (event.rawPath && basePathRegex.test(event.rawPath)) {
    event.rawPath = event.rawPath.replace(basePathRegex, '') || '/';
  }

  return awsServerlessExpress.proxy(server, event, context);
};