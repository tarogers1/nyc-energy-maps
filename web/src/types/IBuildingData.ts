import { IBuildingFeature } from "./IBuildingsGJSON";
import ISA from "./ISA";

export interface IBuildingData extends ISA {
  "10_Digit_BBL": number;
  "Street_Number": string;
  "Street_Name": string;
  "Energy_Efficiency_Grade": string;
  "Energy_Star_1-100_Score": number;
  "Latitude": number;
  "Longitude": number;
  "GeoBuilding": IBuildingFeature;
}