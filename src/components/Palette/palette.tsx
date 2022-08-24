import { useState } from "react";
import { useParams } from "react-router-dom";
import { SelectChangeEvent } from "@mui/material/Select";
import { findPalleteById } from "../../assets/seedColors";
import ColorBox from "../ColorBox/colorBox";
import Navbar from "../Navbar/navbar";
import "./palette.scss";

const Palette = () => {
  const [format, setFormat] = useState<string>("hex");
  const [sliderLevel, setSliderLevel] = useState<number | number[]>(100);

  const changeLevel = (sliderLevel: number | number[]) => {
    setSliderLevel(sliderLevel);
  };

  const changeFormat = (event: SelectChangeEvent) => {
    alert(format);
    setFormat(event.target.value);
  };

  const { id } = useParams();
  const seedColor = findPalleteById(id);
  if (seedColor) {
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
  } else {
    return <div>Seed Color not found</div>;
  }
};

export default Palette;
