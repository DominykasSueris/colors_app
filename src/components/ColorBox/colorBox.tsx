import { useState } from "react";
import { Link } from "react-router-dom";
import { ColorFormatType, GeneratedColor } from "../../models/SeedColor";
import { CopyToClipboard } from "react-copy-to-clipboard";
import "./colorBox.scss";
import { color as chromaColor } from "chroma.ts";

interface ColorProps {
  color: GeneratedColor;
  format: ColorFormatType;
  paletteId?: string;
}

const ColorBox = ({ color, format, paletteId }: ColorProps) => {
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopyState = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };

  return (
    <div className="ColorBox" style={{ background: color[format] }}>
      <div
        className={`${copied ? "show-overlay" : "copy-overlay"}`}
        style={{ background: color[format] }}
      ></div>
      <div className={`${copied ? "show-message" : "copy-message"}`}>
        <h1>copied!</h1>
        <p>{color[format]}</p>
      </div>
      <div className="copy-container">
        <div className="box-content">
          <span
            className="color-name"
            style={{
              color:
                chromaColor(color.hex).luminance() <= 0.08
                  ? "rgba(255,255,255,0.8)"
                  : "rgba(0,0,0,0.6)"
            }}
          >
            {color.name}
          </span>
        </div>
        <CopyToClipboard text={color[format]} onCopy={handleCopyState}>
          <button className="copy-button">Copy</button>
        </CopyToClipboard>
        {paletteId ? (
          <Link to={`/palette/${paletteId}/color/${color.name.split(" ")[0]}`}>
            <span className="see-more">More</span>
          </Link>
        ) : null}
      </div>
    </div>
  );
};
export default ColorBox;
