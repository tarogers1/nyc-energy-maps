import { Injectable } from "@nestjs/common";
import Logger from "src/utils/Logger";
import { supabaseClient } from "../supabase/client";

@Injectable()
export class BuildingsService {
	getHome(): string {
		return "Buildings API Route";
	}

	async getData() {
		const { data, error } = await supabaseClient.from("full_table").select("*");

		if (error) {
			Logger.error(error);
			return error;
		}

		return data;
	}
}
