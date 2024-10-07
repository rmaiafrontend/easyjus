import { Overlay, Form, TopContent, MidContent, Container, Button, CloseButton, BottonContent, ButtonDelete, Document, Upload, Load, DeleteFile } from "./style";
import CampoInput from "../../Controllers/campoCadastro";
import CloseIcon from "../../../assets/close-icon.svg";
import { useEffect, useState, useContext } from "react";
import Loader from "../../../assets/loader.gif";

export function Compromisso({ diligenciaId, setInfosTrue }) {
  const [objetoDiligencia, setObjetoDiligencia] = useState();
  const [fetchOk, setFetchOk] = useState(false);

  useEffect(() => {
    const localStorageData = sessionStorage.getItem("listaDiligencias");
    const diligenciasData = JSON.parse(localStorageData);
    const diligenciaLocal = diligenciasData.find((diligencia) => diligencia.firestoreId === diligenciaId);
    setObjetoDiligencia(diligenciaLocal);
    setFetchOk(true);
  }, []);

  function handleClick() {
    setInfosTrue(false);
  }
  return (
    <>
      {fetchOk ? (
        <Overlay>
          <Form>
            <CloseButton onClick={handleClick}>
              <img src={CloseIcon} alt="" />
            </CloseButton>
            <h3>
              Número do processo: <span>{objetoDiligencia.numeroProcesso}</span>
            </h3>
            <Container>
              <TopContent>
                <div className="left">
                  <CampoInput label="Tipo" value={objetoDiligencia.tipo} readOnly="true" />
                  <CampoInput label="Data" value={objetoDiligencia.data} readOnly="true" />
                  <CampoInput label="Local" value={objetoDiligencia.cidade} readOnly="true" />
                </div>
                <div className="right">
                  <CampoInput label="Orgão" value={objetoDiligencia.local} readOnly="true" />
                  <CampoInput label="Hora" value={objetoDiligencia.hora} readOnly="true" />
                  <CampoInput label="Valor" value={objetoDiligencia.valor} readOnly="true" />
                </div>
              </TopContent>
              <MidContent>
                <CampoInput label="Parte Interessada" value={objetoDiligencia.parteInteressada} readOnly="true" />
                <CampoInput label="Parte Contrária" value={objetoDiligencia.parteContraria} readOnly="true" />
                <CampoInput label="Responsável" value={objetoDiligencia.responsavel} readOnly="true" />
                <CampoInput label="Cliente" value={objetoDiligencia.cliente} readOnly="true" />
              </MidContent>
            </Container>
          </Form>
        </Overlay>
      ) : null}
    </>
  );
}
