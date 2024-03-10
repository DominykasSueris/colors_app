import { useState } from "react";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Snackbar from "@mui/material/Snackbar";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { Link } from "react-router-dom";
import "./navbar.scss";
import { ColorFormatType } from "../../models/SeedColor";

interface SliderProps {
  colorLevel?: number;
  sliderValue?: number;
  format: ColorFormatType;
  setFormat: (format: ColorFormatType) => void;
  changeLevel?: (sliderValue: number | number[]) => void;
  changeFormat?: (event: SelectChangeEvent) => void;
  navbarDisplay: boolean;
}

const Navbar = ({
  colorLevel,
  sliderValue,
  changeLevel,
  format,
  changeFormat,
  setFormat,
  navbarDisplay
}: SliderProps) => {
  const [open, setOpen] = useState<boolean>(false);

  const handleChange = (event: SelectChangeEvent) => {
    setFormat(event.target.value as ColorFormatType);
    setOpen(true);
    if (changeFormat) changeFormat(event);
  };

  const handleSnackbar = () => {
    setOpen(false);
  };

  return (
    <header className="Navbar">
      <div className="logo">
        <Link to="/">reactcolorpicker</Link>
      </div>
      {navbarDisplay && (
        <div className="slider-container">
          <span>Level:{colorLevel}</span>
          <div className="slider">
            <Slider
              range
              defaultValue={sliderValue}
              min={0}
              max={8}
              step={1}
              onChange={changeLevel}
            />
          </div>
        </div>
      )}
      <div className="select-container">
        <Select className="select-color" value={format} onChange={handleChange}>
          <MenuItem value="hex">HEX - #ffffff</MenuItem>
          <MenuItem value="rgb">RGB - rgb 255, 255, 255</MenuItem>
          <MenuItem value="rgba">RGBA- rgb 255, 255, 255, 1.0</MenuItem>
        </Select>
      </div>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        open={open}
        autoHideDuration={3000}
        message={<span id="message-id">Format changed to {format.toUpperCase()}!</span>}
        ContentProps={{ "aria-describedby": "message-id" }}
        onClose={handleSnackbar}
        action={[
          <IconButton onClick={handleSnackbar} color="inherit" key="close" aria-label="close">
            <CloseIcon />
          </IconButton>
        ]}
      />
    </header>
  );
};

export default Navbar;
