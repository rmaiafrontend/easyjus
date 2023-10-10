import { MainContent, AllContent, Container, Buttons, Cards } from "./style";
import { CadastraEmpresa } from "../../Components/Controllers/cadastraEmpresa";
import { FormEmpresa } from "../../Components/Forms/formEmpresa";
import { ListEmpresas } from "../../Components/Lists/ListEmpresas";
import { useState } from "react";

export function SectionEmpresas() {
  const [showElement, setShowElement] = useState(false);
  const [atualizaEmpresas, setatualizaEmpresas] = useState(0);
  return (
    <>
      <AllContent>
        <MainContent>
          <Container>
            <Buttons>
              <CadastraEmpresa setShowElement={setShowElement} />
            </Buttons>
            <Cards>
              <h2>Todos as empresas</h2>
              <ListEmpresas atualizaEmpresas={atualizaEmpresas} setatualizaEmpresas={setatualizaEmpresas} />
            </Cards>
          </Container>
        </MainContent>
        {showElement && <FormEmpresa atualizaEmpresas={atualizaEmpresas} setatualizaEmpresas={setatualizaEmpresas} setShowElement={setShowElement} />}
      </AllContent>
    </>
  );
}
