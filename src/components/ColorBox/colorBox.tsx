import { useState } from "react";
import { Color } from "../../models/SeedColor";
import { CopyToClipboard } from "react-copy-to-clipboard";
import "./colorBox.scss";

interface ColorProps {
  color: Color;
  format: string;
}

const ColorBox = ({ color, format }: ColorProps) => {
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopyState = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1500);
    console.log(copied);
  };

  return (
    <div className="ColorBox" style={{ background: color.color }}>
      <div
        className={`${copied ? "show-overlay" : "copy-overlay"}`}
        style={{ background: color.color }}
      ></div>
      <div className={`${copied ? "show-message" : "copy-message"}`}>
        <h1>copied!</h1>
        <p>{color.color}</p>
      </div>
      <div className="copy-container">
        <div className="box-content">
          <span className="color-name">{color.name}</span>
        </div>
        <CopyToClipboard text={color.color} onCopy={handleCopyState}>
          <button className="copy-button">Copy</button>
        </CopyToClipboard>
        <span className="see-more">More</span>
      </div>
    </div>
  );
};
export default ColorBox;
