import React from "react";
import { Button, Tooltip } from "antd";
import { AimOutlined } from "@ant-design/icons";

interface Props {
  turnOnListener: () => void;
  turnOffListener: () => void;
  isListenerOn: Boolean;
}

export const ListenerToggler: React.FC<Props> = ({
  turnOnListener,
  turnOffListener,
  isListenerOn,
}) => {
  const toggleListener = () => {
    if (isListenerOn) {
      turnOffListener();
    } else {
      turnOnListener();
    }
  };

  return (
    <>
      <Tooltip
        title={
          isListenerOn
            ? "Слушатель запущен! (Нажмите чтобы остановить)"
            : "Запустить слушатель папки NEURAL_BUFFERS"
        }
      >
        <Button
          type={isListenerOn ? "primary" : "link"}
          onClick={toggleListener}
        >
          <AimOutlined />
        </Button>
      </Tooltip>
    </>
  );
};
