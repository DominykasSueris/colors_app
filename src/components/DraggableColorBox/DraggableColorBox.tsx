import React from "react";
import { ColorResult } from "react-color";
import "./DraggableColorBox.scss";

interface DraggableColorBox {
  color: ColorResult;
}

const DraggableColorBox = ({ color }: DraggableColorBox) => {
  return (
    <div className="draggable-palette" style={{ backgroundColor: color.hex }}>
      {color.hex}
    </div>
  );
};

export default DraggableColorBox;
