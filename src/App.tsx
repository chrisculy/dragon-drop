import React, { useRef, useState } from "react";
import { Box, Container, Typography } from "@mui/material";
import { Album } from "@mui/icons-material/";
import { Draggable } from "./Draggable";
import { DropZone } from "./DropZone";

interface Data {
  aNumber: number;
  aString: string;
  anObject: {
    x: number;
    y: number;
  };
}

interface DataDropZoneProps {
  defaultBackgroundColor: string;
  hoveredBackgroundColor: string;
  onDropped?: (dropData: Data) => void;
}

const DataDropZone: React.FC<React.PropsWithChildren<DataDropZoneProps>> = (
  props
) => {
  const theThing = useRef<HTMLDivElement>(null);
  const [backgroundColor, setBackgroundColor] = useState(
    props.defaultBackgroundColor
  );

  const onDragEntered = () => {
    setBackgroundColor(props.hoveredBackgroundColor);
  };

  const onDragLeft = () => {
    setBackgroundColor(props.defaultBackgroundColor);
  };

  const onDropped = (dropData: Data) => {
    if (props.onDropped) {
      props.onDropped(dropData);
    }

    setBackgroundColor(props.defaultBackgroundColor);
  };

  return (
    <DropZone<Data>
      dropDataType="Data"
      onDragEntered={onDragEntered}
      onDragLeft={onDragLeft}
      onDropped={onDropped}
      dropTarget={theThing?.current}
    >
      <Box
        ref={theThing}
        margin={4}
        width={200}
        height={200}
        justifyContent="center"
        alignItems="center"
        display="flex"
        bgcolor={backgroundColor}
      >
        {props.children}
      </Box>
    </DropZone>
  );
};

export const App: React.FC = (props) => {
  const data: Data = {
    aNumber: 42,
    aString: "Hello World!",
    anObject: {
      x: 4,
      y: 2,
    },
  };
  const [draggableOpacity, setDraggableOpacity] = useState(1.0);

  const onDragStarted = () => {
    setDraggableOpacity(0.7);
  };

  const onDropped = (dropData: Data) => {
    setDraggableOpacity(1.0);
  };

  return (
    <Container>
      <Typography
        variant="h3"
        display="flex"
        justifyContent="center"
        marginY={4}
      >
        dragon-drop
      </Typography>
      <DataDropZone
        onDropped={onDropped}
        defaultBackgroundColor="#FFCCCC"
        hoveredBackgroundColor="#999999"
      />
      <DataDropZone
        onDropped={onDropped}
        defaultBackgroundColor="#CCFFCC"
        hoveredBackgroundColor="#999999"
      />
      <DataDropZone
        onDropped={onDropped}
        defaultBackgroundColor="#CCCCFF"
        hoveredBackgroundColor="#999999"
      />
      <DataDropZone
        onDropped={onDropped}
        defaultBackgroundColor="#CCCCCC"
        hoveredBackgroundColor="#999999"
      >
        <Draggable<Data>
          dragDataType="Data"
          dragData={data}
          onDragStarted={onDragStarted}
          style={{ opacity: draggableOpacity, width: "50%", height: "50%" }}
        >
          <Album style={{ width: "100%", height: "100%" }} />
        </Draggable>
      </DataDropZone>
    </Container>
  );
};
