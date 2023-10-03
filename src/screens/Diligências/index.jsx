import React, { useState } from "react";
import { MainContent, Container, Buttons, Diligencias, TitlesList, Titles, Status, Filters, Filter, TodasFilter, PendentesFilter, EnviadasFilter, FinalizadasFilter } from "./style";
import CadastraDiligencia from "../../Components/Controllers/cadastraDiligencia";
import CadastraTipoDiligencia from "../../Components/Controllers/cadastraTipoDiligencia";
import { ListDiligencias } from "../../Components/Lists/ListDiligencias";
import { FormDiligencia } from "../../Components/Forms/formDiligencia";
import { FormTipoDiligencia } from "../../Components/Forms/formTipoDiligencia";

export function SectionDiligencias() {
  const [showElement, setShowElement] = useState(false);
  const [showCadastraTipos, setShowCadastraTipos] = useState(false);
  const [firebaseDataLoaded, setFirebaseDataLoaded] = useState(0);
  const [filter, setFilter] = useState("Todas");

  return (
    <>
      <MainContent>
        <Container>
          <Buttons>
            <CadastraDiligencia setShowElement={setShowElement} />
            <CadastraTipoDiligencia setShowCadastraTipos={setShowCadastraTipos} />
          </Buttons>

          <Diligencias>
            <h2>Diligências</h2>
            <Filters>
              <TodasFilter active={filter === "Todas"} onClick={() => setFilter("Todas")}>
                Todas
              </TodasFilter>
              <PendentesFilter active={filter === "Pendente"} onClick={() => setFilter("Pendente")}>
                Pendentes
              </PendentesFilter>
              <EnviadasFilter active={filter === "Enviado"} onClick={() => setFilter("Enviado")}>
                Enviadas
              </EnviadasFilter>
              <FinalizadasFilter active={filter === "Finalizado"} onClick={() => setFilter("Finalizado")}>
                Finalizadas
              </FinalizadasFilter>
            </Filters>
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
            <ListDiligencias firebaseDataLoaded={firebaseDataLoaded} setFirebaseDataLoaded={setFirebaseDataLoaded} filter={filter} />
          </Diligencias>
        </Container>
      </MainContent>
      {showElement && <FormDiligencia setShowElement={setShowElement} setFirebaseDataLoaded={setFirebaseDataLoaded} firebaseDataLoaded={firebaseDataLoaded} />}
      {showCadastraTipos && <FormTipoDiligencia setShowCadastraTipos={setShowCadastraTipos} />}
    </>
  );
}
