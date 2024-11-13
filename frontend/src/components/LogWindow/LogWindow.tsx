import React, { useCallback, useRef } from "react";
import { useSelector } from "react-redux";
import { ICOPoint, Point } from "../../types";
import { ClearButton } from "./ClearButton";
import { HiddenLogs } from "./HiddenLogs";
import { ToggleButton } from "./ToggleButton";
import { PointLogs } from "./PointLogs";
import { ICOPointLogs } from "./ICOPointLogs";

interface LogWindowProps {
  points: Point[];
}

export const LogWindow: React.FC<LogWindowProps> = ({ points }) => {
  const isCollapsed = useSelector((state: any) => state.isLogsCollapsed);
  const icoPoints = useSelector(
    (state: { icoPoints: ICOPoint[] }) => state.icoPoints,
  );

  const icoPointsRef = useRef<HTMLDivElement>(null);
  const pointsRef = useRef<HTMLDivElement>(null);

  const syncScroll = useCallback((event: Event) => {
    const scrollTop = (event.target as HTMLDivElement).scrollTop;
    if (icoPointsRef.current && pointsRef.current) {
      icoPointsRef.current.scrollTop = scrollTop;
      pointsRef.current.scrollTop = scrollTop;
    }
  }, []);

  if (isCollapsed) return <HiddenLogs />;

  const groupedIcoPoints = icoPoints.reduce<{ [key: string]: ICOPoint[] }>(
    (acc, point) => {
      if (!acc[point.buf_name]) {
        acc[point.buf_name] = [];
      }
      acc[point.buf_name].push(point);
      return acc;
    },
    {},
  );

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

  const allBufNames = Object.keys(groupedIcoPoints).filter((key) =>
    Object.keys(groupedPoints).includes(key),
  );

  const maxPointsCounts = allBufNames.reduce<{ [key: string]: number }>(
    (acc, bufName) => {
      acc[bufName] = Math.max(
        groupedIcoPoints[bufName]?.length || 0,
        groupedPoints[bufName]?.length || 0,
      );
      return acc;
    },
    {},
  );
  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        width: icoPoints.length > 0 ? "1000px" : "500px",
        height: "400px",
        overflowY: "auto",
        backgroundColor: "#ffffff",
        padding: "10px",
        borderRadius: "5px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
        display: "flex",
        flexDirection: "row",
      }}
    >
      <ToggleButton />
      <ClearButton />

      <div style={{ display: "flex", width: "100%", marginTop: "48px" }}>
        {icoPoints.length > 0 && (
          <div ref={icoPointsRef} style={{ flex: 1 }}>
            <ICOPointLogs
              points={icoPoints}
              syncScroll={syncScroll}
              maxPointsCounts={maxPointsCounts}
            />
          </div>
        )}
        <div ref={pointsRef} style={{ flex: 1 }}>
          <PointLogs
            points={points}
            syncScroll={syncScroll}
            maxPointsCounts={maxPointsCounts}
          />
        </div>
      </div>
      {icoPoints.length > 0 && (
        <div
          style={{
            position: "absolute",
            display: "flex",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "15px",
              height: "15px",
              backgroundColor: "red",
              borderRadius: "50%",
              marginRight: "10px",
            }}
          ></div>
          <span style={{ marginRight: "20px" }}>Цели нейросети</span>
          <div
            style={{
              width: "15px",
              height: "15px",
              backgroundColor: "green",
              borderRadius: "50%",
              marginRight: "10px",
            }}
          ></div>
          <span style={{ marginRight: "20px" }}>Цели ИКО A</span>
          <div
            style={{
              width: "15px",
              height: "15px",
              backgroundColor: "lightgreen",
              borderRadius: "50%",
              marginRight: "10px",
            }}
          ></div>
          <span>Цели ИКО P</span>
        </div>
      )}
    </div>
  );
};
