import * as dotenv from "dotenv";

dotenv.config();

const SERVER_PORT = Number(process.env.SERVER_PORT) || 3333;

const config = {
  port: SERVER_PORT
};

export default config;