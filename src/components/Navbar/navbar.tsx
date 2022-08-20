import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "./navbar.scss";

interface SliderProps {
  sliderLevel: number | number[];
  format: string;
  setFormat: (format: string) => void;
  changeLevel: (sliderLevel: number | number[]) => void;
  changeFormat: (event: SelectChangeEvent) => void;
}

const Navbar = ({ sliderLevel, changeLevel, format, changeFormat, setFormat }: SliderProps) => {
  const handleChange = (event: SelectChangeEvent) => {
    setFormat(event.target.value);
    changeFormat(event);
  };

  return (
    <header className="Navbar">
      <div className="logo">
        <a href="#">reactcolorpicker</a>
      </div>
      <div className="slider-container">
        <span>Level:{sliderLevel}</span>
        <div className="slider">
          <Slider
            range
            defaultValue={sliderLevel}
            min={0}
            max={900}
            step={100}
            onChange={changeLevel}
          />
        </div>
      </div>
      <div className="select-container">
        <Select value={format} onChange={handleChange}>
          <MenuItem value="hex">HEX - #ffffff</MenuItem>
          <MenuItem value="rgb">RGB - rgb 255, 255, 255</MenuItem>
          <MenuItem value="rgba">RGBA- rgb 255, 255, 255, 1.0</MenuItem>
        </Select>
      </div>
    </header>
  );
};

export default Navbar;
