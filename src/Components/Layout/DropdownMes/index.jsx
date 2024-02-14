import React, { useState } from "react";
import { Dropdown, Select, Options, Top } from "./style";
import Arrow from "../../../assets/arrow-baixo.svg";

export function CustomDropdownMes({ options, mesSelecionado, setMesSelecionado, setIndexMes }) {
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
        <button onClick={toggleDropdown}>
          <img src={Arrow} alt="" />
        </button>
      </Top>

      {isActive && (
        <Options>
          {options.map((item, index) => (
            <li key={index} onClick={() => handleOptionClick(item.mes, index)}>
              {item.mes}
            </li>
          ))}
        </Options>
      )}
    </Dropdown>
  );
}
