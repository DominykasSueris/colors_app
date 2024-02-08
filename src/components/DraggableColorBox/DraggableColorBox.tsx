import DeleteIcon from "@mui/icons-material/Delete";
import { Color } from "../NewPalette/newPalette";
import "./DraggableColorBox.scss";

interface DraggableColorBox {
  color: Color;
}

const DraggableColorBox = ({ color }: DraggableColorBox) => {
  return (
    <div className="draggable-palette" style={{ backgroundColor: color.color.hex }}>
      <div className="box-content">
        <span>{color.name}</span>
        <DeleteIcon className="delete-icon" />
      </div>
    </div>
  );
};

export default DraggableColorBox;
