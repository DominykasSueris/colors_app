import { useState } from "react";
import { useParams } from "react-router";
import { generateColorScale } from "../../assets/colorHelpersTs";
import { findPalleteById } from "../../assets/seedColors";
import ColorBox from "../ColorBox/colorBox";
import { ColorFormatType } from "../../models/SeedColor";
import "../Palette/palette.scss";
import Navbar from "../Navbar/navbar";
import PaletteFooter from "../PaletteFooter/paletteFooter";

const SingleColorPalette = () => {
  const [format, setFormat] = useState<ColorFormatType>("hex");
  const { paletteId, colorName } = useParams();

  const smallColor = () => {
    const seedColor = findPalleteById(paletteId);
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
          console.log(color);
          return <ColorBox color={color} format={format} key={color.name} />;
        })}
      </>
    );
  };

  return (
    <div className="Single-Color-Palette Palette">
      <Navbar format={format} setFormat={setFormat} navbarDisplay={false} />
      <h1>Single Color Palette</h1>
      <div className="Palette-colors">
        {smallColor()}
        <div className="go-back">Go back</div>
      </div>
      <PaletteFooter generatedPalette={color} />
    </div>
  );
};

export default SingleColorPalette;
