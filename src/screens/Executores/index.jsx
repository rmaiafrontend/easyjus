import { Buttons, Cards } from "./style";
import CadastraExecutor from "../../Components/Controllers/cadastraExecutor";
import { FormExecutor } from "../../Components/Forms/formExecutor";
import { ListExecutores } from "../../Components/Lists/ListExecutores";
import { InfosExecutor } from "../../Components/Cards/infosExecutor";
import { useState } from "react";
import { Scheduler } from "@aldabil/react-scheduler";
import { styled } from "@mui/system";

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
      {/* <Scheduler
        view="week"
        height={1080}
        events={[
          {
            event_id: 1,
            title: "Diligencia asoidjsdoiajdoaisjdaso asodiasjdsi",
            start: new Date("2023/12/2 09:30"),
            end: new Date("2023/12/2 10:30"),
          },
          {
            event_id: 2,
            title: "Event 2",
            start: new Date("2023/12/16 10:00"),
            end: new Date("2023/12/16 11:00"),
          },
        ]}
      /> */}
      ;{showElement && <FormExecutor atualizaExecutores={atualizaExecutores} setatualizaExecutores={setatualizaExecutores} setShowElement={setShowElement} />}
    </>
  );
}
