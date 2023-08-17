import { Overlay, Form, TopContent, MidContent, Container, Button, CloseButton, BottonContent } from "./style";
import CampoInput from "../../Controllers/campoCadastro";
import CloseIcon from "../../../assets/close-icon.svg";

export function InfosDiligencia({ closeInfos }) {
  const handleClick = () => {
    closeInfos(false);
  };
  return (
    <>
      <Overlay>
        <Form>
          <CloseButton onClick={handleClick}>
            <img src={CloseIcon} alt="" />
          </CloseButton>
          <h3>
            Número do processo: <span>25.009.001.22-0000276</span>
          </h3>

          <Container>
            <TopContent>
              <div className="left">
                <CampoInput label="Tipo" placeholder={"Ex: Audiência"} readOnly="false" />
                <CampoInput label="Data" readOnly="false" />
                <CampoInput label="Local" readOnly="true" />
              </div>
              <div className="right">
                <CampoInput label="Orgão" placeholder="Procon Municipal" readOnly="true" />
                <CampoInput label="Hora" placeholder="Ex: HH:MM" readOnly="true" />
                <CampoInput label="Valor" placeholder="Ex: R$150,00" readOnly="true" />
              </div>
            </TopContent>
            <MidContent>
              <CampoInput label="Parte Interessada" placeholder="Ex: Banco Mercantil do Brasil S/A" readOnly="true" />
              <CampoInput label="Parte Contrária" placeholder="Ex: Banco Mercantil do Brasil S/A" readOnly="true" />
              <CampoInput label="Responsável" placeholder="Ex: Carla Batista" readOnly="true" />
              <CampoInput label="Cliente" placeholder="Ex: Gome Advogados" readOnly="true" />
            </MidContent>
            <BottonContent>
              <h4>Documentos</h4>
              <label for="fileInput">Clique aqui para escolher um arquivo</label>
              <input className="inputFile" type="file" id="fileInput" name="uploaded" />
            </BottonContent>
          </Container>
          <Button>Editar diligência</Button>
        </Form>
      </Overlay>
    </>
  );
}
