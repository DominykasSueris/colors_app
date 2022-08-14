import { SeedColors } from "../models/SeedColor";

interface PaletteProps {
  colors: SeedColors[];
}

const Palette = ({ colors }: PaletteProps) => {
  console.log(colors);
  return (
    <div className="Palette">
      <div className="Palette-colors"></div>
    </div>
  );
};

export default Palette;
