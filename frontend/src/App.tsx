import React, { useState, useEffect } from "react";
import { Layout } from "antd";
import { Matrix, RadialMatrix, LogWindow, NavBar } from "./components";
import { ICOPoint, Point } from "./types";
import { useSocket } from "./hooks/useSocket";
import { setPoints } from "./store/reducers";
import { useDispatch, useSelector } from "react-redux";
import { Content } from "antd/es/layout/layout";

const App: React.FC = () => {
  const [useRadialMatrix, setUseRadialMatrix] = useState(false);
  const { message } = useSocket();

  const points: Point[] = useSelector((state: any) => state.points);
  const icoPoints: ICOPoint[] = useSelector((state: any) => state.icoPoints);
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      const parsedPoint = JSON.parse(message) as Point;
      dispatch(setPoints([...points, parsedPoint]));
    } catch (error) {}
  }, [message]);

  return (
    <Layout style={{ height: "100vh" }}>
      <NavBar setUseRadialMatrix={setUseRadialMatrix} />
      <Content
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            overflow: "hidden",
            position: "relative",
            border: "1px solid red",
          }}
        >
          {useRadialMatrix ? (
            <RadialMatrix points={points} ICOPoints={icoPoints} />
          ) : (
            <Matrix points={points} icoPoints={icoPoints} />
          )}
        </div>
      </Content>

      <LogWindow points={points} />
    </Layout>
  );
};

export default App;
