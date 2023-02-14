import SupabaseController from "./supabase";
import { sb_config } from "./config";

export const sb = new SupabaseController(sb_config.url, sb_config.key);

const run_sb = async () => {
};

export default run_sb;