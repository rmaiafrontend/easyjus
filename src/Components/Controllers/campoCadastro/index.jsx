import React from "react";
import { Campo, Title, Input } from "./style";

const CampoInput = ({ value, label, placeholder, readOnly, onChange, id, type }) => {
  return (
    <Campo>
      <Title>
        <span>{label}</span>
      </Title>
      <Input id={id} type={type} value={value} placeholder={placeholder} readOnly={readOnly} onChange={onChange} />
    </Campo>
  );
};

export default CampoInput;
