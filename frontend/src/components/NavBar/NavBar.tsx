import React from "react";
import { Header } from "antd/es/layout/layout";
import { IsRadialMatrix, ListenerToggler, MultiBufferHandler } from "..";
import Swal from "sweetalert2";
import api from "../../api";
import { useDispatch } from "react-redux";
import { setIcoPoints } from "../../store/reducers";

const searchTargets = async (files: FileList) => {
  if (files.length === 0) return;

  Swal.fire({
    title: "Идет поиск целей на буферах...",
    showConfirmButton: false,
    toast: true,
    position: "top-end",
    didOpen: () => Swal.showLoading(null),
  });

  const { status: isCompleted, ico_targets: icoPoints } =
    await api.searchTargets(files);

  Swal.fire({
    title: isCompleted ? "Буферы обработаны" : "Не удалось обработать буферы",
    icon: isCompleted ? "success" : "error",
    showConfirmButton: false,
    toast: true,
    position: "top-end",
    timer: 3000,
  });

  return icoPoints;
};

const getListenerProps = () => {
  const [isListenerOn, setIsListenerOn] = React.useState(false);
  return {
    turnOnListener: async () => {
      const isTurnedOn = await api.turnOnListener();
      setIsListenerOn(true);
      if (isTurnedOn) {
        Swal.fire({
          title: isTurnedOn
            ? "Слушатель запущен"
            : "Не удалось запустить слушатель",
          icon: isTurnedOn ? "success" : "error",
          showConfirmButton: false,
          toast: true,
          position: "top-end",
          timer: 3000,
        });
      }
    },
    turnOffListener: async () => {
      const isTurnedOff = await api.turnOffListener();
      setIsListenerOn(false);
      if (isTurnedOff) {
        Swal.fire({
          title: isTurnedOff
            ? "Слушатель остановлен"
            : "Не удалось остановить слушатель",
          icon: isTurnedOff ? "success" : "error",
          showConfirmButton: false,
          toast: true,
          position: "top-end",
          timer: 3000,
        });
      }
    },
    isListenerOn,
  };
};

export const NavBar = ({ setUseRadialMatrix }: any) => {
  const dispatch = useDispatch();
  return (
    <Header
      style={{
        backgroundColor: "#001529",
        padding: "0 20px",
        display: "flex",
        gap: "20px",
        alignItems: "center",
      }}
    >
      <MultiBufferHandler
        onFilesLoad={async (files: FileList) => {
          const icoPoints = await searchTargets(files);
          if (icoPoints && icoPoints.length > 0) {
            dispatch(setIcoPoints(icoPoints));
          }
        }}
      />
      <IsRadialMatrix onCheck={setUseRadialMatrix} />
      <div style={{ marginLeft: "auto", display: "flex", gap: "12px" }}>
        <ListenerToggler {...getListenerProps()} />
      </div>
    </Header>
  );
};
