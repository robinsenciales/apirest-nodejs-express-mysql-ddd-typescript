import serverless from 'serverless-http'
import app from "./application/app";

module.exports.serverless = serverless(app);
