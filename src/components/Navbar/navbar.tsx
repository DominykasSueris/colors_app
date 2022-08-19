import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "./navbar.scss";

interface SliderProps {
  sliderLevel: number | number[];
  changeLevel: (sliderLevel: number | number[]) => void;
}

const Navbar = ({ sliderLevel, changeLevel }: SliderProps) => {
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
    </header>
  );
};

export default Navbar;
