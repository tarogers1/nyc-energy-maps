import requests
from supabase import create_client, Client

SODA_URL = "https://data.cityofnewyork.us/resource/qb5r-6dgf.geojson"

url: str = ""
with open("../keys/supabase_url.txt", "r") as f:
  url = f.readlines()[0]

key: str = ""
with open("../keys/supabase_key.txt", "r") as f:
  key = f.readlines()[0]


def main():
  supabase: Client = create_client(url, key)

  response = supabase.table("energy_disclosure_2020").select("10_Digit_BBL").execute()
  v = response.data

  for e in v:
    bbl = e["10_Digit_BBL"]
    r = requests.get(SODA_URL + "?base_bbl=" + str(bbl))
    gjson = r.json()
    supabase.table("geojson_lookup_full").insert({"10_Digit_BBL" : bbl, "GeoJSON" : gjson }).execute()
    print("Inserted building {}".format(bbl))

  print("Function complete")

if __name__ == "__main__":
  main()