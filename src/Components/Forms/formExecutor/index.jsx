import { Overlay, Form, LeftContent, RightContent, Container, Button, CloseButton } from "./style";
import CampoInput from "../../Controllers/campoCadastro";
import CloseIcon from "../../../assets/close-icon.svg";

export function FormExecutor({ setShowElement }) {
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
          <h2>Cadastrar Executor</h2>

          <Container>
            <LeftContent>
              <CampoInput label="Nome" placeholder="Ex: Ricardo Petrônio" />
              <CampoInput label="E-mail" placeholder="Ex: ricardo@gmail.com" />
              <CampoInput label="CPF" placeholder="Ex: 122.587.568-55" />
              <CampoInput label="OAB" placeholder="Ex: ricardo@gmail.com" />
            </LeftContent>
            <RightContent>
              <CampoInput label="Contato" placeholder="Ex: (83) 98851-5487" />
              <CampoInput label="Foto" placeholder="Ex: ---" />
              <CampoInput label="Info. de depósito" placeholder="Ex: ---" />
              <CampoInput label="Valor" placeholder="Ex: R$150,00" />
            </RightContent>
          </Container>
          <Button>Cadastrar Executor</Button>
        </Form>
      </Overlay>
    </>
  );
}

export default FormExecutor;
