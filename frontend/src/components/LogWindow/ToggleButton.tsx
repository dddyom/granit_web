import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setIsLogsCollapsed } from "../../store/reducers";

export const ToggleButton = () => {
  const dispatch = useDispatch();
  const isCollapsed = useSelector((state: any) => state.isLogsCollapsed);
  return (
    <Button
      onClick={() => dispatch(setIsLogsCollapsed(!isCollapsed))}
      style={{
        position: "absolute",
        top: "8px",
        right: "12px",
        fontSize: "16px",
      }}
    >
      Свернуть
    </Button>
  );
};
