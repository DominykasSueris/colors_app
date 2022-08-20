import { useState } from "react";
import { SelectChangeEvent } from "@mui/material/Select";
import { SeedColor } from "../../models/SeedColor";
import ColorBox from "../ColorBox/colorBox";
import Navbar from "../Navbar/navbar";
import "./pallete.scss";
import { colors } from "@mui/material";

interface PaletteProps {
  seedColor: SeedColor;
}

const Palette = ({ seedColor }: PaletteProps) => {
  const [format, setFormat] = useState<string>("hex");
  const [sliderLevel, setSliderLevel] = useState<number | number[]>(100);

  const changeLevel = (sliderLevel: number | number[]) => {
    setSliderLevel(sliderLevel);
  };

  const changeFormat = (event: SelectChangeEvent) => {
    alert(format);
    setFormat(event.target.value);
  };

  return (
    <div className="Palette">
      <Navbar
        sliderLevel={sliderLevel}
        changeLevel={changeLevel}
        changeFormat={changeFormat}
        format={format}
        setFormat={setFormat}
      />
      <div className="Palette-colors">
        {seedColor.colors.map(color => (
          <ColorBox color={color} format={format} key={color.name} />
        ))}
      </div>
      <footer className="Palette-footer">
        {seedColor.paletteName}
        <span className="emoji">{seedColor.emoji}</span>
      </footer>
    </div>
  );
};

export default Palette;
