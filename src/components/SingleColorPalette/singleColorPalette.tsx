import { useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { generateColorScale, generatePalette } from "../../assets/colorHelpersTs";
import { findPalleteById } from "../../assets/seedColors";
import ColorBox from "../ColorBox/colorBox";
import { ColorFormatType } from "../../models/SeedColor";
import "../Palette/palette.scss";
import Navbar from "../Navbar/navbar";
import PaletteFooter from "../PaletteFooter/paletteFooter";

const SingleColorPalette = () => {
  const [format, setFormat] = useState<ColorFormatType>("hex");
  const { paletteId, colorName } = useParams();
  const seedColor = findPalleteById(paletteId);

  const smallColor = () => {
    if (!seedColor) {
      throw new Error("Seed Color not Found");
    }
    const color = seedColor.colors.find(color => colorName === color.name);
    if (!color) {
      throw new Error("Color not Found");
    }

    return (
      <>
        {generateColorScale(color).map(color => {
          return <ColorBox color={color} format={format} key={color.name} />;
        })}
      </>
    );
  };

  const footer = () => {
    if (!seedColor) {
      throw new Error("Seed Color not Found");
    }
    return <PaletteFooter generatedPalette={generatePalette(seedColor)} />;
  };

  return (
    <div className="Single-Color-Palette Palette">
      <Navbar format={format} setFormat={setFormat} navbarDisplay={false} />
      <h1>Single Color Palette</h1>
      <div className="Palette-colors">
        {smallColor()}
        <div className="go-back ColorBox">
          <Link to={`/palette/${paletteId}`} className="back-button">
            GO BACK
          </Link>
        </div>
      </div>
      {footer()}
    </div>
  );
};

export default SingleColorPalette;
