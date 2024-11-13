import React from "react";
import { Checkbox } from "antd";
import type { CheckboxProps } from "antd";

interface Props {
  onCheck: (isChecked: boolean) => void;
}

export const IsRadialMatrix: React.FC<Props> = ({ onCheck }) => {
  const onChange: CheckboxProps["onChange"] = (e) => {
    onCheck(e.target.checked);
  };
  return (
    <Checkbox style={{ color: "white" }} onChange={onChange}>
      Использовать радиальную сетку
    </Checkbox>
  );
};
