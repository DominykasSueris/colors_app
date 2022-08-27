export interface GeneratedPalette {
  paletteName: string;
  id: string;
  emoji: string;
  colors: Map<number, GeneratedColor[]>;
}

export interface GeneratedColor {
  id: string;
  name: string;
  hex: string;
  rgb: string;
  rgba: string;
}

const ColorFormats = ["hex", "rgb", "rgba"] as const;
export type ColorFormatType = typeof ColorFormats[number];

export interface SeedColor {
  paletteName: string;
  id: string;
  emoji: string;
  colors: Color[];
}

export interface Color {
  name: string;
  color: string;
}
