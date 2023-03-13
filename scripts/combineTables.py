from supabase import create_client, Client

url: str = ""
with open("../keys/supabase_url.txt", "r") as f:
  url = f.readlines()[0]

key: str = ""
with open("../keys/supabase_key.txt", "r") as f:
  key = f.readlines()[0]

def main():
  supabase = create_client(url, key)

  gres = supabase.table("geojson_lookup").select("*").execute()
  gjson_table = gres.data

  eres = supabase.table("energy_disclosure_2020").select("*").execute()
  eedata = eres.data

  for e in eedata:
    bbl = e["10_Digit_BBL"]
    cgjson = None
    for x in gjson_table:
      if x["10_Digit_BBL"] != bbl: 
        continue
      cgjson = x
      break
    
    if cgjson == None:
      print(f"cgjson has value None for building {bbl}")
      continue

    supabase.table("full_table").insert({
      "10_Digit_BBL": bbl,
      "Street_Number": e["Street_Number"],
      "Street_Name": e["Street_Name"],
      "Energy_Efficiency_Grade": e["Energy_Efficiency_Grade"],
      "Energy_Star_1-100_Score": e["Energy_Star_1-100_Score"],
      "Street_Number": e["Street_Number"],
      "Latitude": cgjson["Latitude"],
      "Longitude": cgjson["Longitude"],
      "GeoBuilding": cgjson["GeoBuilding"]
    }).execute()

    print(f"Inserted building {bbl}")
  
  print("Function complete")

if __name__ == "__main__":
  main()