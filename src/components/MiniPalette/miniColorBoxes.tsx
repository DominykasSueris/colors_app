import { SeedColor } from "../../models/SeedColor";
import "./miniColorBoxes.scss";

interface MiniColorBoxesProps {
  colors: SeedColor[];
}

const MinColorBoxes = ({ colors }: MiniColorBoxesProps) => {
  return (
    <div>
      {colors.map(color => (
        <div className="mini-color" key={color.id}></div>
      ))}
    </div>
  );
};

export default MinColorBoxes;
