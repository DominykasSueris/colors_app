import { SeedColor } from "../../models/SeedColor";

interface MiniColorBoxesProps {
  colors: SeedColor[];
}

const MinColorBoxes = ({ colors }: MiniColorBoxesProps) => {
  return (
    <div>
      {colors.map(color => (
        <div className="mini-color"></div>
      ))}
      ;
    </div>
  );
};

export default MinColorBoxes;
