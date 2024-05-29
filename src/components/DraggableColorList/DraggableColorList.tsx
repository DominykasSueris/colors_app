import { ColorResult } from "react-color";
// import { SortableContainer } from "react-sortable-hoc";
import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  UniqueIdentifier,
  useSensor,
  useSensors
} from "@dnd-kit/core";
import { arrayMove, horizontalListSortingStrategy, SortableContext } from "@dnd-kit/sortable";
import DraggableColorBox from "../DraggableColorBox/DraggableColorBox";
import { Color } from "../NewPalette/newPalette";
import { Dispatch, SetStateAction } from "react";
interface DraggableColorListProps {
  colors: Color[];
  setColors: Dispatch<SetStateAction<Color[]>>;
  removeCurrentColor: (currentColor: ColorResult) => void;
}

const DraggableColorList = ({ colors, setColors, removeCurrentColor }: DraggableColorListProps) => {
  const sensors = useSensors(useSensor(PointerSensor));

  const getColorPos = (id: UniqueIdentifier) => colors.findIndex(task => task.id === id);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over === null) return;

    if (active.id === over.id) return;

    setColors(colors => {
      const originalPos = getColorPos(active.id);
      const newPos = getColorPos(over.id);

      return arrayMove(colors, originalPos, newPos);
    });
  };

  return (
    <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
      <SortableContext items={colors}>
        <div style={{ height: "100%" }}>
          {colors.map((color, i) => (
            <DraggableColorBox
              key={color.name}
              color={color}
              removeCurrentColor={() => removeCurrentColor(color.color)}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};

export default DraggableColorList;
