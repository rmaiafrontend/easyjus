import React, { useState } from "react";
import { MainContent, AllContent, Container, Buttons, Diligencias, TitlesList, Titles, Status } from "./style";
import SideBar from "../../Components/Layout/Sidebar/index";
import CadastraDiligencia from "../../Components/Controllers/cadastraDiligencia";
import { ListDiligencias } from "../../Components/Lists/ListDiligencias";
import { FormDiligencia } from "../../Components/Forms/formDiligencia";
import { InfosDiligencia } from "../../Components/Cards/infosDiligencia";

export function SectionDiligencias() {
  const [showElement, setShowElement] = useState(false);
  const [showInfos, setShowInfos] = useState(false);
  return (
    <>
      <AllContent>
        <SideBar />
        <MainContent>
          <Container>
            <Buttons>
              <CadastraDiligencia setShowElement={setShowElement} />
            </Buttons>
            <Diligencias>
              <h2>Diligências</h2>
              <TitlesList>
                <Titles>
                  <ul>
                    <li>Tipo</li>
                    <li>Cliente</li>
                    <li>Responsável</li>
                    <li>Data</li>
                    <li>Orgão</li>
                    <li>Local</li>
                    <li>Preço</li>
                  </ul>
                </Titles>
                <Status>
                  <span>Status</span>
                </Status>
              </TitlesList>
              <ListDiligencias setShowInfos={setShowInfos} />
            </Diligencias>
          </Container>
        </MainContent>
        {showInfos && <InfosDiligencia closeInfos={setShowInfos} />}
        {showElement && <FormDiligencia setShowElement={setShowElement} />}
      </AllContent>
    </>
  );
}
