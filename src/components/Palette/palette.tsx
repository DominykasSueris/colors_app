import { useState } from "react";
import { useParams } from "react-router-dom";
import { SelectChangeEvent } from "@mui/material/Select";
import { findPalleteById } from "../../assets/seedColors";
import ColorBox from "../ColorBox/colorBox";
import Navbar from "../Navbar/navbar";
import "./palette.scss";
import { generatePalette } from "../../assets/colorHelpersTs";
import { ColorFormatType } from "../../models/SeedColor";

const Palette = () => {
  const colorLevels = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

  const [format, setFormat] = useState<ColorFormatType>("hex");
  const [sliderValue, setSliderValue] = useState<number>(4);
  const [colorLevel, setColorLevel] = useState<number>(colorLevels[sliderValue]);

  const { id } = useParams();

  const changeLevel = (sliderValue: number | number[]) => {
    if (Array.isArray(sliderValue)) {
      sliderValue = sliderValue[0];
    }
    setSliderValue(sliderValue);
    setColorLevel(colorLevels[sliderValue]);
  };

  const changeFormat = (event: SelectChangeEvent) => {
    setFormat(event.target.value as ColorFormatType);
  };

  const palette = () => {
    const seedColor = findPalleteById(id);
    if (!seedColor) {
      throw new Error("Error");
    }
    const generatedPalette = generatePalette(seedColor);

    return (
      <>
        <div className="Palette-colors">
          {generatedPalette.colors.get(colorLevel)!.map(color => (
            <ColorBox
              color={color}
              format={format}
              key={color.name}
              id={color.id}
              paletteId={generatedPalette.id}
            />
          ))}
        </div>
        <footer className="Palette-footer">
          {generatedPalette.paletteName}
          <span className="emoji">{generatedPalette.emoji}</span>
        </footer>
      </>
    );
  };

  return (
    <div className="Palette">
      <Navbar
        sliderValue={sliderValue}
        colorLevel={colorLevel}
        changeLevel={changeLevel}
        changeFormat={changeFormat}
        format={format}
        setFormat={setFormat}
      />
      {palette()}
    </div>
  );
};

export default Palette;
