// import { calculateTypeScale } from "utopia-core";
import { interpolate } from "../../utils/css/interpolate";

/**
 * Define your font-size scale here
 * You can use the `calculateTypeScale` function from `utopia-core` to generate a scale, visually customizable on https://utopia.fyi/type/calculator/ and copyable to your project in the "PostCSS" tab on the site
 */
export const fontSize = {
  "step-6": "clamp(3.8401rem, -0.7043rem + 8.3874vw, 7.9451rem)",
  "step-5": "clamp(2.2763rem, -0.1503rem + 5.8527vw, 5.8853rem)",
  "step-4": "clamp(1.2155rem, 0.2424rem + 3.9923vw, 4.3595rem)",
  "step-3": "clamp(1.1576rem, 0.5164rem + 2.6306vw, 3.2292rem)",
  "step-2": "clamp(1.1025rem, 0.7034rem + 1.6375vw, 2.392rem)",
  "step-1": "clamp(1.05rem, 0.8266rem + 0.9167vw, 1.7719rem)",
  "step-0": "clamp(1rem, 0.9613rem + 0.1587vw, 1.125rem)",
  "step--1": "clamp(0.9524rem, 0.9462rem + 0.0252vw, 0.9722rem)",
};

/**
 * Example of using `calculateTypeScale` to generate a scale
 */

// calculateTypeScale({
//   minWidth: 320,
//   maxWidth: 1140,
//   minFontSize: 16,
//   maxFontSize: 20,
//   minTypeScale: 1.2,
//   maxTypeScale: 1.25,
//   positiveSteps: 5,
//   negativeSteps: 2,
//   prefix: "step",
// }).reduce(
//   (obj, item) => ({
//     ...obj,
//     ...{ [`step-${item.step}`]: item.clamp },
//   }),
//   {}
// );
