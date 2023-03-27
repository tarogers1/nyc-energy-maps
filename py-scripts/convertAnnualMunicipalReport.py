import PyPDF2 as pypdf
import pandas as pd

pdf_path = "../data/annual_municipal_2021/annual-municipal-report-2021.pdf"
txt_path = "../data/annual_municipal_2021/annual-municipal-report-2021.txt"
csv_path = "../data/annual_municipal_2021/annual-municipal-report-2021.csv"

def rcomma(str):
  if str[len(str)-1] == ',':
    return str[:-1]
  elif str[0] == ',':
    return str[1:]
  elif ',' in str:
    return str.replace(',', ' ')
  else:
    return str

def process_page(page, number):
  lines = page.split("\n")

  parsed = ""
  for i in range(7, len(lines) - 5):  # ignore first 7 lines and last 5 lines
    if number == 4 and (i == 10 or i == 11):
      continue

    line = lines[i]

    words = line.split()

    if len(words[3]) > 7: # handle exceptions
      i += 1
      break

    print(len(words))
    print(words)

    idx = 0
    borough = words[idx]
    idx += 1
    block = words[idx]
    idx += 1
    lot = words[idx]
    idx += 1

    bin = words[idx]
    if "Not" in bin:
      idx += 1
      bin += " " + words[idx]

    idx += 1

    building = words[idx]
    building = rcomma(building)
    if "Not" in building:
      idx += 1
      building += " " + words[idx]
      building = rcomma(building)
      idx += 1
    else:
      idx += 1
      while True:
        word = words[idx]

        if (word.isupper() and word != "GGP") or "Not" in words[idx]:
          break

        building += " " + word
        building = rcomma(building)
        idx += 1

    agency = words[idx]
    agency = rcomma(agency)
    if "Not" in agency or words[idx + 1] == ">" or words[idx + 2] == ">":
      idx += 1
      while True:
        word = words[idx]
        if word.isnumeric() or "Not" in word:
          break

        agency += " " + word
        agency = rcomma(agency)
        idx += 1

    idx += 1

    score2010 = words[idx]
    score2010 = rcomma(score2010)
    if "Not" in score2010:
      idx += 1
      score2010 += " " + words[idx]
      score2010 = rcomma(score2010)

    idx += 1
    seui2010 = words[idx]
    seui2010 = rcomma(seui2010)
    if "Not" in seui2010:
      idx += 1
      seui2010 += " " + words[idx]
      seui2010 = rcomma(seui2010)

    idx += 1
    ghg2010 = words[idx]
    ghg2010 = rcomma(ghg2010)
    if "Not" in ghg2010:
      idx += 1
      ghg2010 += " " + words[idx]
      ghg2010 = rcomma(ghg2010)

    idx += 1

    score2021 = words[idx]
    score2021 = rcomma(score2021)
    if "Not" in score2021:
      idx += 1
      score2021 += " " + words[idx]
      score2021 = rcomma(score2021)

    idx += 1
    seui2021 = words[idx]
    seui2021 = rcomma(seui2021)
    if "Not" in seui2021:
      idx += 1
      seui2021 += " " + words[idx]
      seui2021 = rcomma(seui2021)

    idx += 1
    if idx >= len(words):
     continue

    ghg2021 = words[idx]
    ghg2021 = rcomma(ghg2021)
    if "Not" in ghg2021:
      idx += 1
      ghg2021 += " " + words[idx]
      ghg2021 = rcomma(ghg2021)

    this_line = ""
    this_line += borough + ","
    this_line += block + ","
    this_line += lot + ","
    this_line += bin + ","
    this_line += building + ","
    this_line += agency + ","
    this_line += score2010 + ","
    this_line += seui2010 + ","
    this_line += ghg2010 + ","
    this_line += score2021 + ","
    this_line += seui2021 + ","
    this_line += ghg2021 + "\n"

    parsed += this_line  # add to parsed string

  return parsed


def read_file():
  pdfFileObj = open(pdf_path, "rb")
  pdfReader = pypdf.PdfReader(pdfFileObj)

  n = len(pdfReader.pages)
  print(f"Processing {n} pages of {pdf_path}")

  # print(process_page(pdfReader.pages[3].extract_text(0)))

  pages = ""
  for i in range(3, n):  # note first three pages are not table data
    print(pdfReader.pages[i].extract_text(0))
    pages += process_page(pdfReader.pages[i].extract_text(0), i)

  # write to txt file
  with open(txt_path, "w") as file:
    file.write(pages)

  print("file reading and parsing process complete")


def convert_file_type():
  print(f"Converting txt file {txt_path} to csv file at {csv_path}")
  df = pd.read_csv(txt_path)
  df.columns = [
    "Borough",
    "Block",
    "Lot",
    "BIN",
    "Building",
    "Agency",
    "2010 Score",
    "2010 Source EUI (kBtu/ft²)",
    "2010 GHG Emissions Intensity (kgCO2e/ft²)",
    "2021 Score",
    "2021 Source EUI (kBtu/ft²)",
    "2021 GHG Emissions Intensity (kgCO2e/ft²)"
  ]
  df.to_csv(csv_path, index=False)
  print("txt file converted")



# read_file()
convert_file_type()