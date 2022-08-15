import ColorBox from "./colorBox";
import { SeedColors } from "../models/SeedColor";

interface PaletteProps {
  colors: SeedColors[];
}

const Palette = ({ colors }: PaletteProps) => {
  console.log(colors);
  return (
    <div className="Palette">
      {colors.map(color => (
        <ColorBox color={color} />
      ))}
      <div className="Palette-colors"></div>
    </div>
  );
};

export default Palette;
