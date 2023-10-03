import { Card, RightContent, LeftContent } from "./style";
import TipoDiligenciaIcon from "../../../assets/tipoDiligenciaIcon.svg";
import React, { useState } from "react";

function CadastraTipoDiligencia({ setShowCadastraTipos }) {
  const handleClick = () => {
    setShowCadastraTipos(true);
  };

  return (
    <Card onClick={handleClick}>
      <LeftContent>
        <span className="title">Cadastrar tipo de diligência</span>
      </LeftContent>
      <RightContent>
        <img src={TipoDiligenciaIcon} alt="" />
      </RightContent>
    </Card>
  );
}

export default CadastraTipoDiligencia;
