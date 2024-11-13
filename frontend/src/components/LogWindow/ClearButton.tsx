import { Button } from "antd";
import { useDispatch } from "react-redux";
import {
  setIcoPoints,
  setIsLogsCollapsed,
  setPoints,
} from "../../store/reducers";

export const ClearButton = () => {
  const dispatch = useDispatch();
  const handleClear = () => {
    dispatch(setPoints([]));
    dispatch(setIcoPoints([]));
    dispatch(setIsLogsCollapsed(false));
  };
  return (
    <Button
      onClick={handleClear}
      style={{
        position: "absolute",
        top: "8px",
        right: "120px",
        fontSize: "16px",
      }}
    >
      Очистить
    </Button>
  );
};
