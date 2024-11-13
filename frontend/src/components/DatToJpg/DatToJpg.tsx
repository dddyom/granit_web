import React, { useRef } from "react";
import { Button } from "antd";
import Swal from "sweetalert2";

interface Props {
  onFileLoad: (file: File) => void;
}
export const DatToJpg: React.FC<Props> = ({ onFileLoad }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileLoad(file);
    }
  };
  const findInOneBuffer = () => {
    Swal.fire({
      title: "Выберите один SO буфер (dat)",
      icon: "info",
      confirmButtonText: "ОК",
    }).then((result) => {
      if (result.isConfirmed && fileInputRef.current) {
        fileInputRef.current.click();
      }
    });
  };

  return (
    <>
      <Button onClick={findInOneBuffer}>Dat в jpg</Button>
      <input
        type="file"
        accept=".dat"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
    </>
  );
};
