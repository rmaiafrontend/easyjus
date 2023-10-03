import { MainContent, AllContent, Container, Buttons, Cards } from "./style";
import SideBar from "../../Components/Layout/Sidebar/index";
import CadastraExecutor from "../../Components/Controllers/cadastraExecutor";
import { FormExecutor } from "../../Components/Forms/formExecutor";
import { CardExecutor } from "../../Components/Cards/cardExecutor";
import { useState } from "react";

export function SectionExcutores() {
  const [showElement, setShowElement] = useState(false);
  return (
    <>
      <AllContent>
        <MainContent>
          <Container>
            <Buttons>
              <CadastraExecutor setShowElement={setShowElement} />
            </Buttons>
            <Cards>
              <h2>Todos os executores</h2>
              <CardExecutor />
            </Cards>
          </Container>
        </MainContent>
        {showElement && <FormExecutor setShowElement={setShowElement} />}
      </AllContent>
    </>
  );
}
