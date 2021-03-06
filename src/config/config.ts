
import AWS from "aws-sdk";

import dotenv from "dotenv"
dotenv.config({path:'./.env'})

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});

export const client = new AWS.DynamoDB.DocumentClient();

export const db = process.env.DB;