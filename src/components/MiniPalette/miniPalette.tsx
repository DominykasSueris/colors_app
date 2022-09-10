import "./miniPalette.scss";

interface MiniPaletteProps {
  paletteName: string;
  id: string;
  emoji: string;
}

const miniPalette = ({ paletteName, id, emoji }: MiniPaletteProps) => {
  return (
    <div className="main">
      <div className="colors"></div>
      <h5 className="title">
        {paletteName}
        <span className="emoji">{emoji}</span>
      </h5>
    </div>
  );
};

export default miniPalette;
