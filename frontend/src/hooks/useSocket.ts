import React from "react";
import useWebSocket from "react-use-websocket";
import { WS_URL } from "../constants";

export const useSocket = () => {
  const { lastMessage } = useWebSocket(WS_URL, {
    shouldReconnect: () => true,
  });
  const [message, setMessage] = React.useState("");

  React.useEffect(() => {
    if (lastMessage !== null) {
      setMessage(lastMessage.data);
    }
  }, [lastMessage]);

  return { message };
};
