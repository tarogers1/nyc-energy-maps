/* Note: these values are exposed in Vite build file */
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || "";
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY || "";

export const sb_config = {
	url: SUPABASE_URL,
	key: SUPABASE_KEY
};