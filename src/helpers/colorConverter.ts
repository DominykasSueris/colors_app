import { HSLColor, RGBColor } from "react-color";
import { Color } from "../components/NewPalette/newPalette";
import { Color as OldColor } from "../models/SeedColor";

export const hexToRgb = (hex: string): RGBColor => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  return { r, g, b };
};

export const RGBToHSL = ({ r, g, b }: RGBColor): HSLColor => {
  r /= 255;
  g /= 255;
  b /= 255;
  const l = Math.max(r, g, b);
  const s = l - Math.min(r, g, b);
  const h = s ? (l === r ? (g - b) / s : l === g ? 2 + (b - r) / s : 4 + (r - g) / s) : 0;
  return {
    h: 60 * h < 0 ? 60 * h + 360 : 60 * h,
    s: 100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0),
    l: (100 * (2 * l - s)) / 2
  };
};

export const colorToColorResult = (color: OldColor): Color => {
  const rgb = hexToRgb(color.color);
  return {
    id: color.name,
    name: color.name,
    color: { hex: color.color, rgb: rgb, hsl: RGBToHSL(rgb) }
  };
};
