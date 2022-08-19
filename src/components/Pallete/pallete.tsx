import { useState } from "react";
import { SeedColor } from "../../models/SeedColor";
import ColorBox from "../ColorBox/colorBox";
import Navbar from "../Navbar/navbar";
import "./pallete.scss";

interface PaletteProps {
  seedColor: SeedColor;
}

const Palette = ({ seedColor }: PaletteProps) => {
  const [sliderLevel, setSliderLevel] = useState<number | number[]>(100);

  const changeLevel = (sliderLevel: number | number[]) => {
    console.log(sliderLevel);
    setSliderLevel(sliderLevel);
  };
  return (
    <div className="Palette">
      <Navbar sliderLevel={sliderLevel} changeLevel={changeLevel} />
      {seedColor.colors.map(color => (
        <ColorBox color={color} />
      ))}

      <div className="palette-colors"></div>
    </div>
  );
};

export default Palette;
