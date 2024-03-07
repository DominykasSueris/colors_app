import { Dispatch, SetStateAction } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import MiniPalette from "../MiniPalette/miniPalette";
import { SeedColor } from "../../models/SeedColor";
import "./paletteList.scss";

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
        <TransitionGroup className="palettes">
          {palettes.map(palette => (
            <CSSTransition key={palette.id} classNames="fade" timeout={500}>
              <MiniPalette
                key={palette.id}
                {...palette}
                handleClick={() => goToPalette(palette.id)}
                palettes={palettes}
                setPalettes={setPalettes}
              />
            </CSSTransition>
          ))}
        </TransitionGroup>
      </div>
    </div>
  );
};

export default PaletteList;
