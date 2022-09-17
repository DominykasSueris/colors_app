import { Color } from "../../models/SeedColor";
import "./miniColorBoxes.scss";

interface MiniColorBoxesProps {
  colors: Color[];
}

const MinColorBoxes = ({ colors }: MiniColorBoxesProps) => {
  return (
    <>
      {colors.map(color => (
        <div className="mini-color" style={{ background: color.color }} key={color.name}></div>
      ))}
    </>
  );
};

export default MinColorBoxes;
