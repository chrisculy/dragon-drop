import { useRef } from "react";
import { dragonDropNodeIdType } from "./constants";

export interface DropZoneProps<T> extends React.HTMLProps<HTMLDivElement> {
  onDragEntered: () => void;
  onDragLeft: () => void;
  onDropped: (data: T) => void;
  dropDataType: string;
  dropTarget: HTMLElement | null;
}

export const DropZone = <T,>({
  onDragEntered,
  onDragLeft,
  onDropped,
  dropDataType,
  onDragOver,
  dropTarget,
  ...props
}: DropZoneProps<T>) => {
  const dropDiv = useRef<HTMLDivElement>(null);
  const onDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
    if (event.dataTransfer.types.includes(dropDataType.toLowerCase())) {
      event.preventDefault();
      event.dataTransfer.dropEffect = "move";
      if (onDragEntered) {
        onDragEntered();
      }
    }
  };

  const onDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    if (event.dataTransfer.types.includes(dropDataType.toLowerCase())) {
      if (onDragLeft) {
        onDragLeft();
      }
    }
  };

  const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
    if (event.dataTransfer.types.includes(dropDataType.toLowerCase())) {
      onDropped(JSON.parse(event.dataTransfer.getData(dropDataType)) as T);

      if (event.dataTransfer.types.includes(dragonDropNodeIdType)) {
        var dropNodeId = event.dataTransfer.getData(dragonDropNodeIdType);
        var dropNode = document.getElementById(dropNodeId);
        if (dropNode) {
          if (dropTarget) {
            dropTarget.append(dropNode);
          } else if (dropDiv.current) {
            dropDiv.current.append(dropNode);
          }
        }
      }
    }
  };

  return (
    <div
      ref={dropDiv}
      onDragEnter={onDragEnter}
      onDragOver={onDragEnter}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      {...props}
    >
      {props.children}
    </div>
  );
};
