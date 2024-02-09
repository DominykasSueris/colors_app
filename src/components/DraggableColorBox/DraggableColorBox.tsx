import DeleteIcon from "@mui/icons-material/Delete";
import { Color } from "../NewPalette/newPalette";
import "./DraggableColorBox.scss";

interface DraggableColorBox {
  color: Color;
  removeCurrentColor: () => void;
}

const DraggableColorBox = ({ color, removeCurrentColor }: DraggableColorBox) => {
  return (
    <div className="draggable-palette" style={{ backgroundColor: color.color.hex }}>
      <div className="box-content">
        <span>{color.name}</span>
        <DeleteIcon className="delete-icon" onClick={removeCurrentColor} />
      </div>
    </div>
  );
};

export default DraggableColorBox;
