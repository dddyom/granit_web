import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { ICOPoint } from "../../types";
import {
  hideIcoPoint,
  offIcoPointHover,
  onIcoPointHover,
  showIcoPoint,
} from "../../store/reducers";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { Button } from "antd";

interface ICOPointLogsProps {
  points: ICOPoint[];
  syncScroll: (event: Event) => void;
  maxPointsCounts: { [key: string]: number };
}

export const ICOPointLogs: React.FC<ICOPointLogsProps> = ({
  points,
  syncScroll,
  maxPointsCounts,
}) => {
  const dispatch = useDispatch();
  const containerRef = useRef<HTMLDivElement>(null);

  const groupedPoints = points.reduce<{ [key: string]: ICOPoint[] }>(
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
    const aInMaxCounts = a in maxPointsCounts;
    const bInMaxCounts = b in maxPointsCounts;

    if (aInMaxCounts && !bInMaxCounts) {
      return -1;
    } else if (!aInMaxCounts && bInMaxCounts) {
      return 1;
    } else {
      return 0;
    }
  });
  const toggleAllVisibility = () => {
    if (points.every((point) => point.hidden)) {
      points.forEach((point) => dispatch(showIcoPoint(point)));
    } else {
      points.forEach((point) => dispatch(hideIcoPoint(point)));
    }
  };

  return (
    <div
      ref={containerRef}
      style={{
        flex: 1,
        padding: "10px",
        overflowY: "hidden",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h3 style={{ lineHeight: "48px" }}>Цели ИКО</h3>
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
              height: maxPointsCounts[bufName]
                ? `${30 * maxPointsCounts[bufName]}px`
                : "unset",
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
                      dispatch(showIcoPoint(point)),
                    );
                  } else {
                    groupedPoints[bufName].forEach((point) =>
                      dispatch(hideIcoPoint(point)),
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
                      dispatch(offIcoPointHover(point));
                    } else {
                      dispatch(onIcoPointHover(point));
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
