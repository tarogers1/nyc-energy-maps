library(data.table)

file_path <- "../data/disclosure_2020/ll33_Data_Disclosure_2020-CBL.csv"
df <- fread(file_path)

str(df)