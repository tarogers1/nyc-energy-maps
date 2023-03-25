import * as dotenv from "dotenv";

dotenv.config();

const SERVER_PORT = Number(process.env.SERVER_PORT) || 3000;

const SUPABASE_URL = process.env.SUPABASE_URL || "";
const SUPABASE_KEY = process.env.SUPABASE_KEY || "";

export const config = {
  port: SERVER_PORT,
  supabase: {
    url: SUPABASE_URL,
    key: SUPABASE_KEY,
  },
};
