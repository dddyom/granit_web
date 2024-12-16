import React, { useState } from "react";
import { Stage, Layer, Circle, Line, Text } from "react-konva";
import { Button } from "antd";
import { ICOPoint, Point } from "../../types";
import { useDispatch } from "react-redux";
import {
  offIcoPointHover,
  offPointHover,
  onIcoPointHover,
  onPointHover,
} from "../../store/reducers";

interface Props {
  points: Point[];
  ICOPoints: ICOPoint[];
}

export const RadialMatrix: React.FC<Props> = ({ points, ICOPoints }) => {
  const canvasWidth = 2048;
  const canvasHeight = 1200;
  const centerX = canvasWidth / 2;
  const centerY = canvasHeight / 2;
  const maxRadius = Math.min(canvasWidth, canvasHeight) / 2;
  const [scale, setScale] = useState(0.8);

  const handleZoomIn = () => {
    setScale((prevScale) => Math.min(prevScale + 0.1, 3));
  };

  const handleZoomOut = () => {
    setScale((prevScale) => Math.max(prevScale - 0.1, 0.5));
  };

  const drawRadialGrid = () => {
    const gridLines = [];
    const numCircles = 10;
    const numLines = 12;
    const angleOffset = 90; // Добавляем смещение на 90 градусов

    for (let i = 1; i <= numCircles; i++) {
      gridLines.push(
        <Circle
          key={`circle-${i}`}
          x={centerX}
          y={centerY}
          radius={(i * maxRadius) / numCircles}
          stroke="grey"
        />,
      );
      gridLines.push(
        <Text
          key={`circle-text-${i}`}
          x={centerX + (i * maxRadius) / numCircles + 5}
          y={centerY + 5}
          text={`${(i * 360) / numCircles}`}
          fontSize={12}
          fill="white"
        />,
      );
    }

    for (let j = 0; j < numLines; j++) {
      const angle = (j * 360) / numLines - angleOffset; // Вычитаем смещение
      const radians = (angle * Math.PI) / 180;
      const x = centerX + Math.cos(radians) * maxRadius;
      const y = centerY + Math.sin(radians) * maxRadius;

      gridLines.push(
        <Line
          key={`line-${j}`}
          points={[centerX, centerY, x, y]}
          stroke="grey"
        />,
      );
      gridLines.push(
        <Text
          key={`line-text-${j}`}
          x={x + 5}
          y={y + 5}
          text={`${(angle + angleOffset) % 360}°`} // Обратное смещение для отображения текста
          fontSize={12}
          fill="white"
        />,
      );
    }

    return gridLines;
  };
  const drawICOPoints = () => {
    return ICOPoints.map((icoPoint, index) => {
      const scaledDistance = (icoPoint.distance / 360) * maxRadius;
      const radians = ((icoPoint.azimuth - 90) * Math.PI) / 180;
      const x = centerX + Math.cos(radians) * scaledDistance;
      const y = centerY + Math.sin(radians) * scaledDistance;
      const dispatch = useDispatch();

      if (icoPoint.hidden) {
        return null;
      }
      return (
        <React.Fragment key={`ico-${index}`}>
          {icoPoint.hovered && (
            <Circle
              x={x}
              y={y}
              radius={10}
              fill={"yellow"}
              onClick={() => {
                offIcoPointHover(icoPoint);
              }}
            />
          )}
          <Circle
            x={x}
            y={y}
            radius={5}
            fill={icoPoint.type === "P" ? "lightgreen" : "green"}
            onClick={() => {
              if (icoPoint.hovered) {
                dispatch(offIcoPointHover(icoPoint));
              } else {
                dispatch(onIcoPointHover(icoPoint));
              }
            }}
          />
          {/* <Text */}
          {/*   x={x + 10} */}
          {/*   y={y - 5} */}
          {/*   text={`${icoPoint.label} ${icoPoint.label}`} */}
          {/*   fontSize={12} */}
          {/*   fill={ */}
          {/*     icoPoint.hovered */}
          {/*       ? "yellow" */}
          {/*       : icoPoint.type === "P" */}
          {/*         ? "lightgreen" */}
          {/*         : "green" */}
          {/*   } */}
          {/*   onClick={() => { */}
          {/*     if (icoPoint.hovered) { */}
          {/*       dispatch(offIcoPointHover(icoPoint)); */}
          {/*     } else { */}
          {/*       dispatch(onIcoPointHover(icoPoint)); */}
          {/*     } */}
          {/*   }} */}
          {/* /> */}
        </React.Fragment>
      );
    });
  };

  const drawPoints = () => {
    return points.map((point, index) => {
      const scaledDistance = (point.distance / 360) * maxRadius;
      const radians = ((point.azimuth - 90) * Math.PI) / 180;
      const x = centerX + Math.cos(radians) * scaledDistance;
      const y = centerY + Math.sin(radians) * scaledDistance;
      const dispatch = useDispatch();

      if (point.hidden) {
        return null;
      }

      return (
        <React.Fragment key={index}>
          {point.hovered && (
            <Circle
              x={x}
              y={y}
              radius={10}
              fill={"yellow"}
              onClick={() => {
                offPointHover(point);
              }}
            />
          )}
          <Circle
            x={x}
            y={y}
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
          {/* <Text */}
          {/*   x={x + 10} */}
          {/*   y={y - 5} */}
          {/*   text={`${point.label} (${point.buf_name})`} */}
          {/*   fontSize={12} */}
          {/*   fill={point.hovered ? "yellow" : "red"} */}
          {/*   onClick={() => { */}
          {/*     if (point.hovered) { */}
          {/*       dispatch(offPointHover(point)); */}
          {/*     } else { */}
          {/*       dispatch(onPointHover(point)); */}
          {/*     } */}
          {/*   }} */}
          {/* /> */}
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
          <Circle
            x={centerX}
            y={centerY}
            radius={maxRadius}
            fill="black"
            stroke="grey"
          />
          {drawRadialGrid()}
          {drawPoints()}
          {drawICOPoints()}
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
