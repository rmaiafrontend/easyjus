import React from "react";
import { Campo } from "./style";

const CampoInfo = ({ label, value }) => {
  return (
    <Campo>
      <div className="title">
        <span className="label">{label}</span>
      </div>
      <span className="value">{value}</span>
    </Campo>
  );
};

export default CampoInfo;
