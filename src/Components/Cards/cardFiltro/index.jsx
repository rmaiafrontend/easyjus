import { Card, Overlay, CloseButton, Periodos, ButtonPeriodo, DataInicial, DataFinal, FilterButton } from "./Style";
import { useState } from "react";
import CloseIcon from "../../../assets/close-icon.svg";

export function CardFiltro({ closeFilter, filterDiligenciasByPeriod, filterDiligenciasByDate }) {
  const [dataInicial, setDataInicial] = useState();
  const [dataFinal, setDataFinal] = useState();

  // const formatDate = (date) => {
  //   const [year, month, day] = date.split("-");
  //   return `${day}/${month}/${year}`;
  // };

  function handleClick() {
    closeFilter();
  }

  function handleClickFilter(period) {
    filterDiligenciasByPeriod(period);
    closeFilter();
  }

  function handleClickFilterData() {
    filterDiligenciasByDate(dataInicial, dataFinal);
    closeFilter();
  }

  const handleDateChangeInicial = (event) => {
    setDataInicial(event.target.value);
  };

  const handleDateChangeFinal = (event) => {
    setDataFinal(event.target.value);
  };

  return (
    <Overlay>
      <Card>
        <CloseButton onClick={handleClick}>
          <img src={CloseIcon} alt="" />
        </CloseButton>
        <h2>Selecione um período para pesquisar:</h2>
        <Periodos>
          <h4>Sugestões</h4>
          <div className="dias">
            <ButtonPeriodo onClick={() => handleClickFilter("recentes")}>Últimos 30 dias</ButtonPeriodo>
            <ButtonPeriodo onClick={() => handleClickFilter("15 dias")}>Últimos 15 dias</ButtonPeriodo>
            <ButtonPeriodo onClick={() => handleClickFilter("7 dias")}>Últimos 7 dias</ButtonPeriodo>
          </div>
        </Periodos>
        <Periodos>
          <h4>Periodo específico</h4>
          <div className="campoData">
            <DataInicial label="Data" type="date" id="dateField" value={dataInicial} onChange={handleDateChangeInicial} />
            <DataFinal label="Data" type="date" id="dateField" value={dataFinal} onChange={handleDateChangeFinal} />
          </div>
        </Periodos>
        <FilterButton onClick={handleClickFilterData}>Filtrar</FilterButton>
      </Card>
    </Overlay>
  );
}
