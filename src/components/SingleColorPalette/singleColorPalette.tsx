import { useState } from "react";
import { useParams } from "react-router";
import { getScale } from "../../assets/colorHelpersTs";
import { findPalleteById } from "../../assets/seedColors";
import ColorBox from "../ColorBox/colorBox";
import { ColorFormatType } from "../../models/SeedColor";
import "../Palette/palette.scss";

const SingleColorPalette = () => {
  const [format, setFormat] = useState<ColorFormatType>("hex");
  const { paletteId, colorName } = useParams();

  const smallColor = () => {
    const seedColor = findPalleteById(paletteId);
    if (!seedColor) {
      throw new Error("Error");
    }
    const color = seedColor.colors.find(color => colorName === color.name);
    console.log(color);

    return (
      <p>
        {getScale(color!.color, 10).map(color => (
          <ColorBox color={color} format={format} key={color.name} id={color.id} />
        ))}
      </p>
    );
  };

  return (
    <div className="Palette">
      <h1>Single Color Palette</h1>
      <div className="Palette-colors">{smallColor()}</div>
    </div>
  );
};

export default SingleColorPalette;
