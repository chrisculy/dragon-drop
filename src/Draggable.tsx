import React, { useRef, useState } from "react";
import _ from "lodash";
import { dragonDropNodeIdPrefix, dragonDropNodeIdType } from "./constants";

export interface DraggableProps<T> extends React.HTMLProps<HTMLDivElement> {
  dragData: T;
  dragDataType: string;
  onDragStarted?: () => void;
}

export const Draggable = <T,>({
  dragData,
  dragDataType,
  onDragStarted,
  ...props
}: DraggableProps<T>) => {
  const [defaultDraggableDivDisplay] = useState(props.style?.display ?? "block");
  const [id] = useState(_.uniqueId(dragonDropNodeIdPrefix));

  const draggableDiv = useRef<HTMLDivElement>(null);
  const [draggableDivDisplay, setDraggableDivDisplay] = useState(
    defaultDraggableDivDisplay
  );

  const onDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData(dragDataType, JSON.stringify(dragData));
    event.dataTransfer.setData(dragonDropNodeIdType, id);
    event.dataTransfer.effectAllowed = "move";

    setTimeout(() => {
      if (draggableDiv.current) {
        setDraggableDivDisplay("none");
      }
    }, 0);

    if (onDragStarted) {
      onDragStarted();
    }
  };

  const onDragEnd = (_: React.DragEvent<HTMLDivElement>) => {
    setDraggableDivDisplay(defaultDraggableDivDisplay);
  };

  return (
    <div
      id={id}
      ref={draggableDiv}
      draggable={true}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      {...props}
      style={{ ...props.style, display: draggableDivDisplay }}
    >
      {props.children}
    </div>
  );
};
