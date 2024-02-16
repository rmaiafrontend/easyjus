import React, { useState } from "react";
import { Dropdown, Select, Options, Top } from "./style";
import Arrow from "../../../assets/arrow-baixo.svg";

export function DropdownMesExecutor({ mesSelecionado, setMesSelecionado, setIndexMes }) {
  const [listaMeses, setListaMeses] = useState([
    { mes: "Janeiro" },
    { mes: "Fevereiro" },
    { mes: "Março" },
    { mes: "Abril" },
    { mes: "Maio" },
    { mes: "Junho" },
    { mes: "Julho" },
    { mes: "Agosto" },
    { mes: "Setembro" },
    { mes: "Outubro" },
    { mes: "Novembro" },
    { mes: "Dezembro" },
  ]);

  const [isActive, setIsActive] = useState(false);
  const [numMes, setNumMes] = useState();

  const toggleDropdown = (event) => {
    event.preventDefault();
    setIsActive((prevState) => !prevState);
  };

  const handleOptionClick = (item, index) => {
    setMesSelecionado(item);
    setIndexMes(index + 1);
    setIsActive(false);
  };

  return (
    <Dropdown>
      <Top>
        <Select readOnly type="text" placeholder="Escolha uma opção" value={mesSelecionado} onClick={toggleDropdown} />
      </Top>

      {isActive && (
        <Options>
          {listaMeses.map((item, index) => (
            <li key={index} onClick={() => handleOptionClick(item.mes, index)}>
              {item.mes}
            </li>
          ))}
        </Options>
      )}
    </Dropdown>
  );
}
