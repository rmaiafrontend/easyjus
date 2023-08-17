import { Overlay, Form, LeftContent, RightContent, Container, Button, CloseButton } from "./style";
import CampoInput from "../../Controllers/campoCadastro";
import CloseIcon from "../../../assets/close-icon.svg";

export function FormDiligencia({ setShowElement }) {
  const handleClick = () => {
    setShowElement(false);
  };
  return (
    <>
      <Overlay>
        <Form>
          <CloseButton onClick={handleClick}>
            <img src={CloseIcon} alt="" />
          </CloseButton>
          <h2>Cadastro de diligência</h2>

          <Container>
            <LeftContent>
              <CampoInput label="N. do Processo" placeholder="Ex: 25.009.001.22-0000276" />
              <CampoInput label="Tipo" placeholder="Ex: Audiência" />
              <CampoInput label="Data" placeholder="Ex: DD/MM/AA" />
              <CampoInput label="Hora" placeholder="Ex: HH:MM" />
              <CampoInput label="Local" placeholder="Ex: Campina Grande - PB" />
            </LeftContent>
            <RightContent>
              <CampoInput label="Parte Interessada" placeholder="Ex: Banco Mercantil do Brasil S/A" />
              <CampoInput label="Parte Contrária" placeholder="Ex: Banco Mercantil do Brasil S/A" />
              <CampoInput label="Responsável" placeholder="Ex: Carla Batista" />
              <CampoInput label="Cliente" placeholder="Ex: Gome Advogados" />
              <CampoInput label="Valor" placeholder="Ex: R$150,00" />
            </RightContent>
          </Container>
          <Button>Cadastrar diligência</Button>
        </Form>
      </Overlay>
    </>
  );
}

export default FormDiligencia;
