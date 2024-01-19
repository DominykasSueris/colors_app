import { Link } from "react-router-dom";
import { SeedColor } from "../../models/SeedColor";
import { useNavigate } from "react-router-dom";
import MiniPalette from "../MiniPalette/miniPalette";
import "./paletteList.scss";

export interface SeedColorProps {
  palettes: SeedColor[];
}

const PaletteList = ({ palettes }: SeedColorProps) => {
  const navigate = useNavigate();

  const goToPalette = (id: string) => {
    navigate(`/palette/${id}`);
  };

  return (
    <div className="palettelist">
      <div className="container">
        <nav className="nav">
          <h1>React Colors</h1>
          <Link to="/palette/newPalette">Create Palette</Link>
        </nav>
        <div className="palettes">
          {palettes.map(palette => (
            <MiniPalette
              key={palette.id}
              {...palette}
              handleClick={() => goToPalette(palette.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PaletteList;
