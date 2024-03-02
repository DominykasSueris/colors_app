import { Link } from "react-router-dom";
import { SeedColor } from "../../models/SeedColor";
import { useNavigate } from "react-router-dom";
import MiniPalette from "../MiniPalette/miniPalette";
import "./paletteList.scss";
import { Dispatch, SetStateAction } from "react";
export interface SeedColorProps {
  palettes: SeedColor[];
  setPalettes: Dispatch<SetStateAction<SeedColor[]>>;
}

const PaletteList = ({ palettes, setPalettes }: SeedColorProps) => {
  const navigate = useNavigate();

  const goToPalette = (id: string) => {
    navigate(`/palette/${id}`);
  };

  return (
    <div className="palettelist">
      <div className="container">
        <nav className="nav">
          <h1 className="heading">React Colors</h1>
          <Link className="heading-create" to="/palette/newPalette">
            Create Palette
          </Link>
        </nav>
        <div className="palettes">
          {palettes.map(palette => (
            <MiniPalette
              key={palette.id}
              {...palette}
              handleClick={() => goToPalette(palette.id)}
              palettes={palettes}
              setPalettes={setPalettes}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PaletteList;
