import { Card, RightContent, LeftContent } from "./style";
import IconContrantes from "../../../assets/icon-contratantes.svg";
import React, { useState } from "react";

function CadastraDiligencia({ setShowElement }) {
  const handleClick = () => {
    setShowElement(true);
  };

  return (
    <Card onClick={handleClick}>
      <LeftContent>
        <span className="title">Cadastrar nova diligencia</span>
      </LeftContent>
      <RightContent>
        <img src={IconContrantes} alt="" />
      </RightContent>
    </Card>
  );
}

export default CadastraDiligencia;
