import React from "react";
import { Color } from "../NewPalette/newPalette";
import "./DraggableColorBox.scss";

interface DraggableColorBox {
  color: Color;
}

const DraggableColorBox = ({ color }: DraggableColorBox) => {
  return (
    <div className="draggable-palette" style={{ backgroundColor: color.color.hex }}>
      {color.name}
    </div>
  );
};

export default DraggableColorBox;
