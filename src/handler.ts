import serverless from 'serverless-http'
import app from "./app/application/app";

module.exports.serverless = serverless(app);
