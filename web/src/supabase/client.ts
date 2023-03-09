import { createClient } from "@supabase/supabase-js";
import { sb_config as config } from "./config";

if (config.url === "") throw Error("Supabase URL was not provided");
if (config.key === "") throw Error("Supabase Anon key was not provided");

export const supabase_client = createClient(config.url, config.key);