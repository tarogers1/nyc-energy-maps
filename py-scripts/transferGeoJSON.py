# transfer data from GeoJSON lookup table
# old lookup table contains a full feature collection
# FeatureCollection --> Feature

from supabase import create_client, Client
import requests

SODA_BUILDINGP_URL = "https://data.cityofnewyork.us/resource/7w4b-tj9d.geojson"

url: str = ""
with open("../keys/supabase_url.txt", "r") as f:
  url = f.readlines()[0]

key: str = ""
with open("../keys/supabase_key.txt", "r") as f:
  key = f.readlines()[0]


def main():
  supabase: Client = create_client(url, key)

  bres = supabase.table("geojson_lookup_full").select("*").execute() # table currently nonexistent
  data = bres.data

  for x in data:
    bbl: int = x["10_Digit_BBL"]
    gjson = x["GeoJSON"] 

    if not "features" in gjson or not gjson["features"] or len(gjson["features"]) == 0:
      gjson = None 
    else:
      gjson = gjson["features"][0]

    p = requests.get(SODA_BUILDINGP_URL + "?base_bbl=" + str(bbl)).json()
    coords = []
    if not p["features"] or len(p["features"]) == 0:
      coords = [None, None] 
    else:
      coords = p["features"][0]["geometry"]["coordinates"] 

    supabase.table("geojson_lookup").insert({
      "10_Digit_BBL": bbl,
      "GeoBuilding": gjson,
      "Latitude": coords[0],
      "Longitude": coords[1]
    }).execute()

    print(f"Inserted building {bbl}")


  print("Function complete")

if __name__ == "__main__":
  main()