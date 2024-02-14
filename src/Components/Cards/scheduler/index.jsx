import React from "react";
import { startOfWeek, addDays, format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";

export function WeekSchedule() {
  // Obtém a data atual
  const currentDate = new Date();

  // Obtém o início da semana atual, garantindo que seja sempre segunda-feira
  const startOfCurrentWeek = startOfWeek(currentDate, { weekStartsOn: 1 }); // O parâmetro 1 indica segunda-feira

  // Filtra apenas os dias úteis (segunda a sexta-feira)
  const workDays = Array.from({ length: 5 }, (_, index) => addDays(startOfCurrentWeek, index));

  return (
    <div>
      <h1>Semana Atual</h1>
      <div style={{ display: "flex" }}>
        {workDays.map((day, index) => (
          <div key={index}>
            <h2>{format(day, "EEEE", { locale: ptBR })}</h2>
            <p>{format(day, "dd/MM")}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WeekSchedule;
