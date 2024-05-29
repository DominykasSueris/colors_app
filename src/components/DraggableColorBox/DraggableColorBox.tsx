import DeleteIcon from "@mui/icons-material/Delete";
import { Color } from "../NewPalette/newPalette";
// import { SortableElement } from "react-sortable-hoc";
import "./DraggableColorBox.scss";
import { ColorResult } from "react-color";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface DraggableColorBoxProps {
  color: Color;
  removeCurrentColor: (currentColor: ColorResult) => void;
}

const DraggableColorBox = ({ color, removeCurrentColor }: DraggableColorBoxProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: color.id
  });

  const style = {
    backgroundColor: color.color.hex,
    transition,
    transform: CSS.Transform.toString(transform)
  };

  return (
    <li className="draggable-palette" style={style} ref={setNodeRef} {...attributes} {...listeners}>
      <div className="box-content">
        <span>{color.name}</span>
        <DeleteIcon className="delete-icon" onClick={() => removeCurrentColor(color.color)} />
      </div>
    </li>
  );
};

export default DraggableColorBox;
