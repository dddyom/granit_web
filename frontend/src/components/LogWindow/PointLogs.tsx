import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { Point } from "../../types";
import {
  hidePoint,
  offPointHover,
  onPointHover,
  showPoint,
} from "../../store/reducers";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { Button } from "antd";

interface PointLogsProps {
  points: Point[];
  syncScroll: (event: Event) => void;
  maxPointsCounts: { [key: string]: number };
}

export const PointLogs: React.FC<PointLogsProps> = ({
  points,
  syncScroll,
  maxPointsCounts,
}) => {
  const dispatch = useDispatch();
  const containerRef = useRef<HTMLDivElement>(null);

  const groupedPoints = points.reduce<{ [key: string]: Point[] }>(
    (acc, point) => {
      if (!acc[point.buf_name]) {
        acc[point.buf_name] = [];
      }
      acc[point.buf_name].push(point);
      return acc;
    },
    {},
  );

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", syncScroll);
    }
    return () => {
      if (container) {
        container.removeEventListener("scroll", syncScroll);
      }
    };
  }, [syncScroll]);

  const sortedBufNames = Object.keys(groupedPoints).sort((a, b) => {
    const aHasMaxCount = maxPointsCounts.hasOwnProperty(a);
    const bHasMaxCount = maxPointsCounts.hasOwnProperty(b);
    if (aHasMaxCount && !bHasMaxCount) return -1;
    if (!aHasMaxCount && bHasMaxCount) return 1;
    return 0;
  });

  const toggleAllVisibility = () => {
    if (points.every((point) => point.hidden)) {
      points.forEach((point) => dispatch(showPoint(point)));
    } else {
      points.forEach((point) => dispatch(hidePoint(point)));
    }
  };

  return (
    <div
      ref={containerRef}
      style={{
        flex: 1,
        padding: "10px",
        overflowY: "auto",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h3 style={{ lineHeight: "48px" }}>Цели нейросети</h3>
        <Button
          style={{ margin: "8px" }}
          icon={
            points.every((point) => point.hidden) ? (
              <EyeInvisibleOutlined />
            ) : (
              <EyeOutlined />
            )
          }
          onClick={toggleAllVisibility}
        />
      </div>
      {sortedBufNames.map((bufName, index) => {
        const isHidden = groupedPoints[bufName].every((point) => point.hidden);
        return (
          <div
            key={bufName}
            style={{
              marginBottom: "20px",
              borderTop: "1px solid #000",
              padding: "8px",
              height: `${30 * maxPointsCounts[bufName] || 1}px`,
              backgroundColor: isHidden ? "rgba(0, 0, 0, 0.2)" : "transparent",
              color: isHidden ? "white" : "black",
            }}
          >
            <h4>
              {index + 1}. {bufName}
              <Button
                style={{ float: "right" }}
                icon={isHidden ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                onClick={() => {
                  if (isHidden) {
                    groupedPoints[bufName].forEach((point) =>
                      dispatch(showPoint(point)),
                    );
                  } else {
                    groupedPoints[bufName].forEach((point) =>
                      dispatch(hidePoint(point)),
                    );
                  }
                }}
              />
            </h4>
            <ul
              style={{
                listStyleType: "none",
                padding: 0,
                pointerEvents: isHidden ? "none" : "auto",
              }}
            >
              {groupedPoints[bufName].map((point) => (
                <li
                  key={point.id}
                  style={{
                    marginBottom: "10px",
                    backgroundColor: point.hovered
                      ? "lightgray"
                      : "transparent",
                    fontWeight: point.hovered ? "bold" : "normal",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    if (point.hovered) {
                      dispatch(offPointHover(point));
                    } else {
                      dispatch(onPointHover(point));
                    }
                  }}
                >
                  {point.label}
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
};
