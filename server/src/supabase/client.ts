import { createClient } from "@supabase/supabase-js";
import { config } from "../config/index";
import Logger from "src/utils/Logger";

if (config.supabase.url === "") Logger.error("Supabase URL was not provided");
if (config.supabase.key === "")
	Logger.error("Supabase Anon key was not provided");

export const supabaseClient = createClient(
	config.supabase.url,
	config.supabase.key
);
