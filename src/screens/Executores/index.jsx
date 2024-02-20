import { Buttons, Cards } from "./style";
import CadastraExecutor from "../../Components/Controllers/cadastraExecutor";
import { FormExecutor } from "../../Components/Forms/formExecutor";
import { ListExecutores } from "../../Components/Lists/ListExecutores";
import { useState } from "react";

export function SectionExcutores() {
  const [showElement, setShowElement] = useState(false);

  const [atualizaExecutores, setatualizaExecutores] = useState(0);

  return (
    <>
      <Buttons>
        <CadastraExecutor setShowElement={setShowElement} />
      </Buttons>
      <Cards>
        <h2>Todos os executores</h2>
        <ListExecutores atualizaExecutores={atualizaExecutores} setatualizaExecutores={setatualizaExecutores} />
      </Cards>
      ;{showElement && <FormExecutor atualizaExecutores={atualizaExecutores} setatualizaExecutores={setatualizaExecutores} setShowElement={setShowElement} />}
    </>
  );
}
