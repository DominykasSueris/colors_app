import { Color } from "../../models/SeedColor";
import "./miniPalette.scss";

interface MiniPaletteProps {
  paletteName: string;
  id: string;
  emoji: string;
  colors: Color[];
}

const MiniPalette = ({ paletteName, id, emoji, colors }: MiniPaletteProps) => {
  return (
    <div className="main">
      <div className="colors">
        {colors.map(color => (
          <div className="mini-color" style={{ background: color.color }} key={color.name}></div>
        ))}
      </div>
      <h5 className="title">
        {paletteName}
        <span className="emoji">{emoji}</span>
      </h5>
    </div>
  );
};

export default MiniPalette;
