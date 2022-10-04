import { color as chromaColor, scale as chromaScale } from "chroma.ts";
import { GeneratedColor, GeneratedPalette, SeedColor } from "../models/SeedColor";
const levels = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

function generatePalette(starterPalette: SeedColor): GeneratedPalette {
  let newPalette: GeneratedPalette = {
    paletteName: starterPalette.paletteName,
    id: starterPalette.id,
    emoji: starterPalette.emoji,
    colors: new Map<number, GeneratedColor[]>()
  };

  for (let level of levels) {
    newPalette.colors.set(level, []);
  }

  for (let color of starterPalette.colors) {
    let scale = getScale(color.color, 10).reverse();
    for (let i in scale) {
      if (newPalette.colors.has(levels[i])) {
        newPalette.colors.get(levels[i])!.push({
          name: `${color.name} ${levels[i]}`,
          id: color.name.toLowerCase().replace(/ /g, "-"),
          hex: scale[i],
          rgb: chromaColor(scale[i]).css(),
          rgba: chromaColor(scale[i]).css().replace("rgb", "rgba").replace(")", ",1.0)")
        });
      }
    }
  }

  return newPalette;
}

function getRange(hexColor: string) {
  const end = "#fff";
  return [chromaColor(hexColor).darker(1.4).hex(), hexColor, end];
}

function getScale(hexColor: string, numberOfColors: number) {
  return chromaScale(getRange(hexColor)).mode("lab").colors(numberOfColors);
}

export { generatePalette, getScale };
