import PyPDF2 as pypdf
import pandas as pd

pdf_path = "../data/annual_municipal_2021/annual-municipal-report-2021.pdf"
txt_path = "../data/annual_municipal_2021/annual-municipal-report-2021.txt"
csv_path = "../data/annual_municipal_2021/annual-municipal-report-2021.csv"


def process_page(page):
  lines = page.split("\n")

  parsed = ""
  # for i in range(7, len(lines) - 5):  # ignore first 7 lines and last 5 lines
  for i in range(7, 9):
    line = lines[i]

    words = line.split()

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
    if "Not" in building:
      idx += 1
      building += " " + words[idx]
      idx += 1
    else:
      idx += 1
      while True:
        word = words[idx]

        if (word.isupper() and  or "Not" in word[idx]:
          break

        building += " " + word
        idx += 1

    agency = words[idx]
    if "Not" in agency or words[idx + 1] == ">" or words[idx + 2] == ">":
      idx += 1
      while True:

        word = words[idx]
        if word.isnumeric() or "Not" in word:
          break

        agency += " " + word
        idx += 1

    score2010 = words[idx]
    if "Not" in score2010:
      idx += 1
      score2010 += " " + words[idx]

    idx += 1
    seui2010 = words[idx]
    if "Not" in seui2010:
      idx += 1
      seui2010 += " " + words[idx]

    idx += 1
    ghg2010 = words[idx]
    if "Not" in ghg2010:
      idx += 1
      ghg2010 += " " + words[idx]

    idx += 1

    score2021 = words[idx]
    if "Not" in score2021:
      idx += 1
      score2021 += " " + words[idx]

    idx += 1
    seui2021 = words[idx]
    if "Not" in seui2021:
      idx += 1
      seui2021 += " " + words[idx]

    idx += 1
    ghg2021 = words[idx]
    if "Not" in ghg2021:
      idx += 1
      ghg2021 += " " + words[idx]

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
    pages += process_page(pdfReader.pages[i].extract_text(0))

  # write to txt file
  with open(txt_path, "w") as file:
    file.write(pages)

  print("file reading and parsing process complete")


def convert_file_type():
  print(f"Converting txt file {txt_path} to csv file at {csv_path}")
  df = pd.read_csv(txt_path)
  df.columns = ["", "", ""]
  df.to_csv(csv_path)
  print("txt file converted")



read_file()
