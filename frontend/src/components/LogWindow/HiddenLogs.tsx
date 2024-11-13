import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setIsLogsCollapsed } from "../../store/reducers";

export const HiddenLogs = () => {
  const isCollapsed = useSelector((state: any) => state.isLogsCollapsed);
  const dispatch = useDispatch();
  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        width: "90px",
        height: "50px",
        backgroundColor: "#ffffff",
        borderRadius: "5px",
      }}
    >
      <Button
        onClick={() => dispatch(setIsLogsCollapsed(!isCollapsed))}
        style={{
          position: "absolute",
          top: "8px",
          right: "12px",
          fontSize: "16px",
        }}
      >
        Логи
      </Button>
    </div>
  );
};
