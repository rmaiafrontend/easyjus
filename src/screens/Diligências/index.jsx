import React, { useState } from "react";
import { Container, Buttons, Diligencias, TitlesList, Titles, Status, Filters, Filter, TodasFilter, PendentesFilter, EnviadasFilter, FinalizadasFilter } from "./style";
import CadastraDiligencia from "../../Components/Controllers/cadastraDiligencia";
import CadastraTipoDiligencia from "../../Components/Controllers/cadastraTipoDiligencia";
import { ListDiligencias } from "../../Components/Lists/ListDiligencias";
import { FormDiligencia } from "../../Components/Forms/formDiligencia";
import { FormTipoDiligencia } from "../../Components/Forms/formTipoDiligencia";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

export function SectionDiligencias() {
  const [showElement, setShowElement] = useState(false);
  const [showCadastraTipos, setShowCadastraTipos] = useState(false);
  const [firebaseDataLoaded, setFirebaseDataLoaded] = useState(0);
  const [filter, setFilter] = useState("Todas");

  return (
    <>
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
              <li className="tipo">Tipo</li>
              <li className="cliente">Cliente</li>
              <li className="responsavel"> Responsável</li>
              <li className="data">Data</li>
              <li className="orgao">Orgão</li>
              <li className="local">Local</li>
              <li className="valor">Valor</li>
            </ul>
          </Titles>
          <Status>
            <span>Status</span>
          </Status>
        </TitlesList>
        <ListDiligencias firebaseDataLoaded={firebaseDataLoaded} setFirebaseDataLoaded={setFirebaseDataLoaded} filter={filter} />
      </Diligencias>

      {showElement && <FormDiligencia setShowElement={setShowElement} setFirebaseDataLoaded={setFirebaseDataLoaded} firebaseDataLoaded={firebaseDataLoaded} />}
      {showCadastraTipos && <FormTipoDiligencia setShowCadastraTipos={setShowCadastraTipos} />}
    </>
  );
}
