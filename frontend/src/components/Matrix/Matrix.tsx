import React, { useState } from "react";
import { Stage, Layer, Rect, Line, Text, Circle } from "react-konva";
import { Button } from "antd";
import { ICOPoint, Point } from "../../types";
import {
  offIcoPointHover,
  offPointHover,
  onIcoPointHover,
  onPointHover,
} from "../../store/reducers";
import { useDispatch } from "react-redux";

interface Props {
  points: Point[];
  icoPoints: ICOPoint[];
}

export const Matrix: React.FC<Props> = ({ points, icoPoints }) => {
  const canvasWidth = 2048;
  const canvasHeight = 1200;
  const [scale, setScale] = useState(0.8);

  const handleZoomIn = () => {
    setScale((prevScale) => Math.min(prevScale + 0.1, 3));
  };

  const handleZoomOut = () => {
    setScale((prevScale) => Math.max(prevScale - 0.1, 0.5));
  };

  const drawGridLines = () => {
    const lines = [];
    const gridSize = 50;

    for (let i = 0; i <= canvasWidth; i += gridSize) {
      lines.push(
        <Line
          key={`v-${i}`}
          points={[i, 0, i, canvasHeight]}
          stroke="grey"
          strokeWidth={1}
        />,
      );
      lines.push(
        <Text
          key={`v-text-${i}`}
          x={i + 5}
          y={5}
          text={i.toString()}
          fontSize={12}
          fill="white"
        />,
      );
    }
    for (let j = 0; j <= canvasHeight; j += gridSize) {
      lines.push(
        <Line
          key={`h-${j}`}
          points={[0, j, canvasWidth, j]}
          stroke="grey"
          strokeWidth={1}
        />,
      );
      lines.push(
        <Text
          key={`h-text-${j}`}
          x={5}
          y={j + 5}
          text={j.toString()}
          fontSize={12}
          fill="white"
        />,
      );
    }
    return lines;
  };
  const drawIcoPoints = () => {
    const dispatch = useDispatch();
    return icoPoints.map((point, index) => {
      if (point.hidden) {
        return null;
      }
      return (
        <React.Fragment key={index}>
          {point.hovered && (
            <Circle
              x={point.center_x}
              y={point.center_y}
              radius={10}
              fill={"yellow"}
              onClick={() => {
                dispatch(offIcoPointHover(point));
              }}
            />
          )}
          <Circle
            x={point.center_x}
            y={point.center_y}
            radius={5}
            fill={point.type === "P" ? "lightgreen" : "green"}
            onClick={() => {
              if (point.hovered) {
                dispatch(offIcoPointHover(point));
              } else {
                dispatch(onIcoPointHover(point));
              }
            }}
          />
          <Text
            x={point.center_x + 10}
            y={point.center_y - 5}
            text={`${point.label} ${point.label}`}
            fontSize={14}
            fill={
              point.hovered
                ? "yellow"
                : point.type === "P"
                  ? "lightgreen"
                  : "green"
            }
            onClick={() => {
              if (point.hovered) {
                dispatch(offIcoPointHover(point));
              } else {
                dispatch(onIcoPointHover(point));
              }
            }}
          />
        </React.Fragment>
      );
    });
  };

  const drawPoints = () => {
    const dispatch = useDispatch();
    return points.map((point, index) => {
      if (point.hidden) {
        return null;
      }
      return (
        <React.Fragment key={index}>
          {point.hovered && (
            <Circle
              x={point.center_x}
              y={point.center_y}
              radius={10}
              fill={"yellow"}
              onClick={() => {
                dispatch(offPointHover(point));
              }}
            />
          )}
          <Circle
            x={point.center_x}
            y={point.center_y}
            radius={5}
            fill={"red"}
            onClick={() => {
              if (point.hovered) {
                dispatch(offPointHover(point));
              } else {
                dispatch(onPointHover(point));
              }
            }}
          />
          <Text
            x={point.center_x + 10}
            y={point.center_y - 5}
            text={`${point.label} (${point.buf_name})`}
            fontSize={14}
            fill={point.hovered ? "yellow" : "red"}
            onClick={() => {
              if (point.hovered) {
                dispatch(offPointHover(point));
              } else {
                dispatch(onPointHover(point));
              }
            }}
          />
        </React.Fragment>
      );
    });
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        backgroundColor: "black",
      }}
    >
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        scaleX={scale}
        scaleY={scale}
        draggable
      >
        <Layer>
          <Rect width={canvasWidth} height={canvasHeight} fill="black" />
          {drawGridLines()}
          {drawPoints()}
          {drawIcoPoints()}
        </Layer>
      </Stage>
      <div style={{ position: "absolute", bottom: 10, left: 10 }}>
        <Button onClick={handleZoomOut} style={{ margin: 5 }}>
          -
        </Button>
        <Button onClick={handleZoomIn} style={{ margin: 5 }}>
          +
        </Button>
      </div>
    </div>
  );
};
