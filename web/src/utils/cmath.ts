// Custom math functions
const cmath = {
  // interpolates x from range [s1, e1] to range [s2, e2]
  interpolate: function(x: number, s1: number, e1: number, s2: number, e2: number) {
    if (x < s1 || x > e1) {
      console.log(`Invalid interpolation. ${x} is not in the range [${s1},${e1}].`)
      return;
    }
  
    if (e1 < s1 || e2 < s2) {
      console.log("Invalid interpolation. End is less than start on one of the ranges");
      return;
    }
  
    return s2 + ((e2 - s2) / (e1 - s1)) * (x - s1);
  }
};

export default cmath;