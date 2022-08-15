import { SeedColors } from "../models/SeedColor";

interface ColorProps {
  color: SeedColors;
}

const ColorBox = ({ color }: ColorProps) => {
  return (
    <div className="ColorBox">
      {color.colors.map(color => (
        <span style={{ background: color.color }}>{color.name}</span>
      ))}
    </div>
  );
};

export default ColorBox;
