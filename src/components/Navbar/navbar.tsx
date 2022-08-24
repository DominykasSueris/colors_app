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

interface SliderProps {
  sliderLevel: number | number[];
  format: string;
  setFormat: (format: string) => void;
  changeLevel: (sliderLevel: number | number[]) => void;
  changeFormat: (event: SelectChangeEvent) => void;
}

const Navbar = ({ sliderLevel, changeLevel, format, changeFormat, setFormat }: SliderProps) => {
  const [open, setOpen] = useState<boolean>(false);

  const handleChange = (event: SelectChangeEvent) => {
    setFormat(event.target.value);
    setOpen(true);
    changeFormat(event);
  };

  const handleSnackbar = () => {
    setOpen(false);
  };

  return (
    <header className="Navbar">
      <div className="logo">
        <Link to="/">reactcolorpicker</Link>
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
