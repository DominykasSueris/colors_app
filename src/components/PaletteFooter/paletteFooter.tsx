import { GeneratedPalette } from "../../models/SeedColor";

interface PaletteFooterProps {
  generatedPalette: GeneratedPalette;
}

const PaletteFooter = ({ generatedPalette }: PaletteFooterProps) => {
  return (
    <footer className="Palette-footer">
      {generatedPalette.paletteName}
      <span className="emoji">{generatedPalette.emoji}</span>
    </footer>
  );
};

export default PaletteFooter;
