import DeleteIcon from "@mui/icons-material/Delete";
import { Color } from "../NewPalette/newPalette";
import { SortableElement } from "react-sortable-hoc";
import "./DraggableColorBox.scss";
import { ColorResult } from "react-color";

interface DraggableColorBoxProps {
  color: Color;
  removeCurrentColor: (currentColor: ColorResult) => void;
}

const DraggableColorBox = SortableElement<DraggableColorBoxProps>(
  ({ color, removeCurrentColor }: DraggableColorBoxProps) => {
    return (
      <li className="draggable-palette" style={{ backgroundColor: color.color.hex }}>
        <div className="box-content">
          <span>{color.name}</span>
          <DeleteIcon className="delete-icon" onClick={() => removeCurrentColor(color.color)} />
        </div>
      </li>
    );
  }
);

export default DraggableColorBox;
