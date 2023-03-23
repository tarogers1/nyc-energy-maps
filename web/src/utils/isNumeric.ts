export default function isNumeric(str: string) {
	if (typeof str != "string") return false;
	return !isNaN(parseInt(str)) && !isNaN(parseFloat(str));
}