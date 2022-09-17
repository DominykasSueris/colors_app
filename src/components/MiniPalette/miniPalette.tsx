import { Color } from "../../models/SeedColor";
import MiniColorBoxes from "./miniColorBoxes";
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
        <MiniColorBoxes colors={colors} />
      </div>
      <h5 className="title">
        {paletteName}
        <span className="emoji">{emoji}</span>
      </h5>
    </div>
  );
};

export default MiniPalette;
