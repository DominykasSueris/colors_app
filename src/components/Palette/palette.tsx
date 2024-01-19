import { useState } from "react";
import { useParams } from "react-router-dom";
import { SelectChangeEvent } from "@mui/material/Select";
import ColorBox from "../ColorBox/colorBox";
import Navbar from "../Navbar/navbar";
import "./palette.scss";
import { generatePalette } from "../../assets/colorHelpersTs";
import { ColorFormatType, SeedColor } from "../../models/SeedColor";
import PaletteFooter from "../PaletteFooter/paletteFooter";

type Props = {
  palettes: SeedColor[];
};

const Palette = ({ palettes }: Props) => {
  const { id } = useParams();
  const seedColor = palettes.find(p => p.id === id);
  if (!seedColor) throw new Error("Palette not found");

  const colorLevels = [100, 200, 300, 400, 500, 600, 700, 800, 900];

  const [format, setFormat] = useState<ColorFormatType>("hex");
  const [sliderValue, setSliderValue] = useState<number>(4);
  const [colorLevel, setColorLevel] = useState<number>(colorLevels[sliderValue]);

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
    const generatedPalette = generatePalette(seedColor);

    return (
      <>
        <div className="Palette-colors">
          {generatedPalette.colors.get(colorLevel)!.map(color => (
            <ColorBox
              color={color}
              format={format}
              key={color.name}
              paletteId={generatedPalette.id}
            />
          ))}
        </div>
        <PaletteFooter generatedPalette={generatedPalette} />
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
        navbarDisplay
      />
      {palette()}
    </div>
  );
};

export default Palette;
