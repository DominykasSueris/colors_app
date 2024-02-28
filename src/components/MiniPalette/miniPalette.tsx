import { Dispatch, MouseEventHandler, SetStateAction } from "react";
import { Color, SeedColor } from "../../models/SeedColor";
import DeleteIcon from "@mui/icons-material/Delete";
import "./miniPalette.scss";
interface MiniPaletteProps {
  paletteName: string;
  emoji: string;
  colors: Color[];
  handleClick: MouseEventHandler<HTMLDivElement>;
  palettes: SeedColor[];
  setPalettes: Dispatch<SetStateAction<SeedColor[]>>;
}

const MiniPalette = ({
  paletteName,
  palettes,
  emoji,
  colors,
  setPalettes,
  handleClick
}: MiniPaletteProps) => {
  const deletePalette = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
    e.stopPropagation();
    const deletePalette = palettes.filter(palette => palette.paletteName !== paletteName);
    setPalettes(deletePalette);
    saveToLocalStorage(deletePalette);
  };

  const saveToLocalStorage = (palettes: SeedColor[]) => {
    window.localStorage.setItem("palettes", JSON.stringify(palettes));
  };

  return (
    <div className="main" onClick={handleClick}>
      <DeleteIcon
        className="main-delete-icon"
        style={{ transition: "all 0.3s ease-in-out" }}
        onClick={deletePalette}
      />
      <div className="colors">
        {colors.map(color => (
          <div className="mini-color" style={{ background: color.color }} key={color.name}></div>
        ))}
      </div>
      <h5 className="title">
        {paletteName}
        <span className="emoji">{emoji}</span>
      </h5>
    </div>
  );
};

export default MiniPalette;
