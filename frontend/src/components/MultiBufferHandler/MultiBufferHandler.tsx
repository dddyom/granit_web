import React, { useRef } from "react";
import { Button } from "antd";
import Swal from "sweetalert2";

interface Props {
  onFilesLoad: (files: FileList) => void;
}

export const MultiBufferHandler: React.FC<Props> = ({ onFilesLoad }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      onFilesLoad(files);
    }
  };

  const findInMultipleBuffers = () => {
    Swal.fire({
      title: "Выберите SO буферы (dat и txt)",
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
      <Button onClick={findInMultipleBuffers}>Найти цели на буферах</Button>
      <input
        type="file"
        accept=".dat, .txt"
        ref={fileInputRef}
        style={{ display: "none" }}
        multiple
        onChange={handleFileChange}
      />
    </>
  );
};
