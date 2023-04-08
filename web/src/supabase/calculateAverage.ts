import { IBuildingData } from "../types/IBuildingData";
import { supabase_client as supabase } from "./client"; 

export default async function calculateAverage(minLat: number, maxLat: number, minLng: number, maxLng: number) {
  const res = await supabase
    .from("full_table")
    .select("*")
    .gte("Latitude", minLat)
    .lte("Latitude", maxLat)
    .gte("Longitude", minLng)
    .lte("Longitude", maxLng);

  if (res.error) throw(res.error);

  // @ts-ignore
  const data: IBuildingData[] = res.data;

  let sum = 0;
  for (let i = 0; i < data.length; i++) {
    sum += data[i]["Energy_Star_1-100_Score"];
  }

  const avg = sum / data.length;
  return avg;
}
