import { Color } from "../../models/SeedColor";
import "./colorBox.scss";

interface ColorProps {
  color: Color;
}

const ColorBox = ({ color }: ColorProps) => {
  return (
    <div className="ColorBox">
      <div className="ColorBox-div" style={{ background: color.color }}>
        {color.name}
      </div>
    </div>
  );
};

export default ColorBox;
