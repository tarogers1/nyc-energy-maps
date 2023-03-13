import { IBuildingFeature } from "./IBuildingsGJSON";

export interface IBuildingData {
  "10_Digit_BBL": number;
  "Street_Number": string;
  "Street_Name": string;
  "Energy_Efficieny_Grade": string;
  "Energy_Star_1-100_Score": number;
  "Latitude": number;
  "Longitude": number;
  "GeoBuilding": IBuildingFeature;
}