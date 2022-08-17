import { Color } from "../../models/SeedColor";
import { CopyToClipboard } from "react-copy-to-clipboard";
import "./colorBox.scss";

interface ColorProps {
  color: Color;
}

const ColorBox = ({ color }: ColorProps) => {
  return (
    <div className="ColorBox" style={{ background: color.color }}>
      <div className="copy-container">
        <div className="box-content">
          <span className="color-name">{color.name}</span>
        </div>
        <CopyToClipboard text={color.color}>
          <button className="copy-button">Copy</button>
        </CopyToClipboard>
        <span className="see-more">More</span>
      </div>
    </div>
  );
};
export default ColorBox;
