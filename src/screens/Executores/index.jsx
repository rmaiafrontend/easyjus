import { MainContent, AllContent, Container, Buttons, Cards } from "./style";
import CadastraExecutor from "../../Components/Controllers/cadastraExecutor";
import { FormExecutor } from "../../Components/Forms/formExecutor";
import { ListExecutores } from "../../Components/Lists/ListExecutores";
import { useState } from "react";

export function SectionExcutores() {
  const [showElement, setShowElement] = useState(false);
  const [atualizaExecutores, setatualizaExecutores] = useState(0);
  return (
    <>
      <AllContent>
        <MainContent>
          <Container>
            <Buttons>
              <CadastraExecutor setShowElement={setShowElement} atualizaExecutores={atualizaExecutores} setatualizaExecutores={setatualizaExecutores} />
            </Buttons>
            <Cards>
              <h2>Todos os executores</h2>
              <ListExecutores atualizaExecutores={atualizaExecutores} setatualizaExecutores={setatualizaExecutores} />
            </Cards>
          </Container>
        </MainContent>
        {showElement && <FormExecutor setatualizaExecutores={setatualizaExecutores} setShowElement={setShowElement} />}
      </AllContent>
    </>
  );
}
