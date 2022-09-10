import { SeedColor } from "../../models/SeedColor";
import MiniPalette from "../MiniPalette/miniPalette";

interface SeedColorProps {
  palettes: SeedColor[];
}

const PaletteList = ({ palettes }: SeedColorProps) => {
  return (
    <div>
      {palettes.map(palette => (
        <MiniPalette {...palette} />
      ))}
    </div>
  );
};

export default PaletteList;
