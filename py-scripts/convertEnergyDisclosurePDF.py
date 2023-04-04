import PyPDF2
import pandas as pd

pdf_path = "../data/disclosure_2020/ll33_Data_Disclosure_2020-CBL.pdf"
txt_path = "../data/disclosure_2020/ll33_Data_Disclosure_2020-CBL.txt"
csv_path = "../data/disclosure_2020/ll33_Data_Disclosure_2020-CBL.csv"

def test():
  print("Test Successful") #retard, fuck you


def is_grade(str):
  return str == "A" or str == "B" or str == "C" or str == "D" or str == "E" or str == "F"


def space_strip(str):
  str.lstrip()
  str.rstrip()
  return str

def is_blank(str):
  for i in range(len(str)):
    if str[i].isalnum() or str[i].isdigit():
      return False

  return True


def parse_page(page):
  initial = page.split("\n")

  lines = []
  for line in initial:
    if is_blank(line) or "LOCAL" in line or "CBL" in line or "nyc.gov" in line or "DOF" in line or "Energy" in line or "Efficiency" in line or "Grade" in line:
      continue
    lines.append(line)

  res = ""
  for line in lines:
    curr = line.split()
    for j in range(len(curr)):
      curr[j] = space_strip(curr[j]) # ensure there are no extra spaces

    if len(curr) < 2:
      continue

    bbl = curr[0]
    snumber = curr[1]
    sname = ""
    k = 2
    while k < len(curr) and not "," in curr[k]:
      sname += curr[k] + " "
      k += 1
    sname = sname.rstrip()

    if k >= len(curr):
      continue
      # raise Exception("k >= len(curr) but process is not complete")

    sqf = curr[k].replace(",", "").strip()
    k += 1

    escore = curr[k]
    k += 1
    while k < len(curr) and not is_grade(curr[k]):
      escore += " " + curr[k]
      k += 1

    if k != len(curr) - 1:
      continue
      # raise Exception("Error: k != len(curr) - 1")

    egrade = curr[k]

    res += bbl + ","
    res += snumber + ","
    res += sname + ","
    res += sqf + ","
    res += escore + ","
    res += egrade + "\n"


  return res


def read_file(pdf_path):
  pdfFileObj = open(pdf_path, "rb")
  pdfReader = PyPDF2.PdfReader(pdfFileObj)

  n = len(pdfReader.pages) - 1  # last page of pdf is blank
  print(f"Processing {n} pages of {pdf_path}")

  pages = ""
  for i in range(n):
    # .extract_text(0) --> extracts text oriented up
    pages += parse_page(pdfReader.pages[i].extract_text(0))

  # write to txt file
  with open("../data/disclosure_2020/ll33_Data_Disclosure_2020-CBL.txt", "w") as file:
    file.write(pages)

  print("file reading and parsing process complete")


def to_csv(txt_path, headers, csv_path):
  print(f"Converting txt file {txt_path} to csv file at {csv_path}")
  df = pd.read_csv(txt_path)
  df.columns = headers
  df.to_csv(csv_path)
  print("txt file converted")



# test()
# read_file(pdf_path)
to_csv(txt_path=txt_path, headers=["10DigitBBl", "StreetNumber", "StreetName", "DOFGrossSquareFootage", "EnergyStar1-100Score", "EnergyEfficiencyGrade"], csv_path=csv_path)
