import React from "react";
import { Campo } from "./style";

const CampoInput = ({ label, placeholder }) => {
  return (
    <Campo>
      <div className="title">
        <span>{label}</span>
      </div>
      <input type="text" value={placeholder} />
    </Campo>
  );
};

export default CampoInput;
