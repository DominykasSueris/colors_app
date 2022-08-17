import { SeedColor } from "../../models/SeedColor";
import ColorBox from "../ColorBox/colorBox";
import "./pallete.scss";

interface PaletteProps {
  seedColor: SeedColor;
}

const Palette = ({ seedColor }: PaletteProps) => {
  return (
    <div className="Palette">
      {seedColor.colors.map(color => (
        <ColorBox color={color} />
      ))}
      <div className="palette-colors"></div>
    </div>
  );
};

export default Palette;
