import React, { useState, useEffect } from "react";

import { Top, Agenda, DiaSemana, Navigation, ButtonControlWeek } from "./style";
import { CardAgenda } from "./../../Components/Cards/cardAgenda";
import { Compromisso } from "../../Components/Cards/infosCompromisso";
import { GoogleCalendarComponent } from "../../Components/GoogleCalendar";

import { startOfWeek, addDays, format, isSameDay, subDays } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";

export function SectionAgenda() {
  const [infosTrue, setInfosTrue] = useState(false);
  const [diligencia, setDiligencia] = useState();
  const [listaDiligencias, setListaDiligencias] = useState();
  const [fetchOk, setFetchOk] = useState(false);

  const [currentWeek, setCurrentWeek] = useState(() => startOfWeek(new Date(), { weekStartsOn: 1 }));

  useEffect(() => {
    const localStorageData = sessionStorage.getItem("listaDiligencias");
    const diligenciasData = JSON.parse(localStorageData);
    setListaDiligencias(diligenciasData);
    setFetchOk(true);
  }, []);

  // Obtém a data atual
  const currentDate = new Date();

  const goToNextWeek = () => {
    const nextWeek = addDays(currentWeek, 7);
    setCurrentWeek(nextWeek);
  };

  const goToPreviousWeek = () => {
    const previousWeek = subDays(currentWeek, 7);
    setCurrentWeek(previousWeek);
  };

  const workDays = [];

  for (let index = 0; index < 5; index++) {
    const day = addDays(currentWeek, index);
    workDays.push(day);
  }

  function converterStringParaData(dataString) {
    // Divide a string em dia, mês e ano
    var partes = dataString.split("/");

    // Cria um objeto Date usando as partes extraídas
    // Lembre-se que o mês em JavaScript é baseado em zero, então subtrai 1 do mês
    var data = new Date(partes[2], partes[1] - 1, partes[0]);

    return data;
  }

  return (
    <>
      <Top>
        <h1>Agenda Semanal</h1>;<span>Clique nos cards para ver as informações detalhadas de cada compromisso.</span>
      </Top>
      <Navigation>
        <ButtonControlWeek onClick={goToPreviousWeek}>Semana Anterior</ButtonControlWeek>
        <ButtonControlWeek onClick={goToNextWeek}>Próxima Semana</ButtonControlWeek>
      </Navigation>
      <Agenda>
        {workDays.map((day, index) => (
          <DiaSemana key={index}>
            <div className="top">
              <span>
                <b>{format(day, "EEEE", { locale: ptBR })}, </b> {format(day, "dd/MM")}
              </span>
            </div>
            <div className="compromissos">
              {fetchOk
                ? listaDiligencias
                    .filter((compromisso) => isSameDay(converterStringParaData(compromisso.data), day))
                    .map((compromisso, index) => (
                      <CardAgenda
                        setInfosTrue={setInfosTrue}
                        setDiligencia={setDiligencia}
                        key={index}
                        id={compromisso.firestoreId}
                        tipo={compromisso.tipo}
                        hora={compromisso.hora}
                        local={compromisso.cidade}
                        orgao={compromisso.local}
                      />
                    ))
                : null}
            </div>
          </DiaSemana>
        ))}
      </Agenda>
      {infosTrue ? <Compromisso setInfosTrue={setInfosTrue} diligenciaId={diligencia} /> : null}
    </>
  );
}
