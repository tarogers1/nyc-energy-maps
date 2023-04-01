import isNumeric from "./isNumeric";

export default function formatAddress(toFormat: string) {
  // format the name of the building
  let v = toFormat.toLowerCase().split(" ");
  let str: string = "";
  for (let i = 0; i < v.length; i++) {
    let curr = v[i];
    if (!isNumeric(curr)) {
      curr = curr.charAt(0).toUpperCase() + curr.substring(1);
    } else if (curr.charAt(0) == "-") {
      curr = curr.charAt(0) + " " + curr.substring(1);
    } else if (i > 0) {
      if (curr.charAt(curr.length - 1) == "2") curr += "nd";
      else curr += "th"
    }
    str += curr;
    if (i < v.length - 1) str += " ";
  }
  return str;
}