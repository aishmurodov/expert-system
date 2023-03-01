import dotenv from 'dotenv';
import {ConnectOptions} from "mongoose";

dotenv.config();

const MONGO_OPTIONS: ConnectOptions = {
    socketTimeoutMS: 30000,
    keepAlive: true,
    autoIndex: false,
    retryWrites: false
};

const MONGO_USERNAME = process.env.MONGO_INITDB_ROOT_USERNAME || '';
const MONGO_PASSWORD = process.env.MONGO_INITDB_ROOT_PASSWORD || '';
const MONGO_HOST = process.env.MONGO_URL || ``;
const MONGO_DB_NAME = process.env.MONGO_DB_NAME || "";


export const mongo = {
    host: MONGO_HOST,
    password: MONGO_PASSWORD,
    username: MONGO_USERNAME,
    options: MONGO_OPTIONS,
    name: MONGO_DB_NAME,
    url: `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}/${MONGO_DB_NAME}?authSource=admin`,
};