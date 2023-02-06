import { createClient } from "@supabase/supabase-js";

class SupabaseController {
	client: any;
	fallback = {
		tables: {
			energy: {
				name: "energy_disclosure_2020", // note: RLS is not enabled
				columns: ["StreetNumber", "StreetName", "EnergyEfficiencyGrade", "EnergyStar1-100Score"]
			}
		}
	};

	constructor(url: string, key: string) {
		this.client = createClient(url, key);
	}

	async fetch_energy_ratings(table_name?: string) {
		const { data, error } = await this.client
			.from(table_name ? table_name : this.fallback.tables.energy.name)
			.select(this.fallback.tables.energy.columns.join(","));

		if (error) {
			return error;
		}

		return data;
	}
}

export default SupabaseController;