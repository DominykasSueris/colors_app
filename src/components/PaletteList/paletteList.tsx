import { SeedColor } from "../../models/SeedColor";
import { Link } from "react-router-dom";
import MiniPalette from "../MiniPalette/miniPalette";
import "./paletteList.scss";

interface SeedColorProps {
  palettes: SeedColor[];
}

const PaletteList = ({ palettes }: SeedColorProps) => {
  return (
    <div className="palettelist">
      <div className="container">
        <nav className="nav">
          <h1>React Colors</h1>
        </nav>
        <div className="palettes">
          {palettes.map(palette => (
            <Link to={`/palette/${palette.id}`}>
              <MiniPalette {...palette} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PaletteList;
