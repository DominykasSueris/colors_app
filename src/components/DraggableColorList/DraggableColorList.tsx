import { ColorResult } from "react-color";
import { SortableContainer } from "react-sortable-hoc";
import DraggableColorBox from "../DraggableColorBox/DraggableColorBox";
import { Color } from "../NewPalette/newPalette";

interface DraggableColorListProps {
  colors: Color[];
  removeCurrentColor: (currentColor: ColorResult) => void;
}

const DraggableColorList = SortableContainer<DraggableColorListProps>(
  ({ colors, removeCurrentColor }: DraggableColorListProps) => {
    return (
      <div style={{ height: "100%" }}>
        {colors.map((color, i) => (
          <DraggableColorBox
            index={i}
            key={color.name}
            color={color}
            removeCurrentColor={() => removeCurrentColor(color.color)}
          />
        ))}
      </div>
    );
  }
);

export default DraggableColorList;
