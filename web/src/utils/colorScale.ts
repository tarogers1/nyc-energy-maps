// Color scale for buildings --> gives color based on Energy Star 1-100 Score

import { scaleThreshold } from "d3-scale";
import cmath from "./cmath";

export const domain = [...Array(100).keys()].map(i => i+1);

const computeRange: (d: number[]) => number[][] = (d: number[]) => {
  let arr: number[][] = [[]];
  arr.pop();

  for (let i = 0; i < domain.length; i++) {
    const x = domain[i];
    arr.push([
      2 * (255-(x * (255 / 100))),
      Math.min(2 * (x * 255/ 100), 220),
      0
      // 50 - cmath.interpolate(x, 1, 100, 0, 50), 
      // cmath.interpolate(x, 1, 100, 55, 255), 
      // 150 - cmath.interpolate(x, 1, 100, 0, 150)
    ]);
  }
  console.log(cmath.interpolate(50, 1, 100, 255, 55))

  return arr;
};

export const range = computeRange(domain);

const colorScale = scaleThreshold()
  .domain(domain)
  // @ts-ignore
  .range(range);

export default colorScale;