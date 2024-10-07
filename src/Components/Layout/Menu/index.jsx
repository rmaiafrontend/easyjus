import { MenuDiv, Left, Right } from "./style";
import SideBar from "../Sidebar";
import imgLogo from "../../../assets/logo.svg";
import menuHamburger from "../../../assets/menu_hamburger.svg";
import { useState } from "react";

export function Menu() {
  const [optionsOn, setOptionsOn] = useState(false);

  function handleClick() {
    setOptionsOn(!optionsOn);
  }
  return (
    <>
      <MenuDiv>
        <Left>
          <img src={imgLogo} alt="" />
        </Left>
        <Right>
          <button onClick={handleClick}>
            <img src={menuHamburger} alt="" />
          </button>
        </Right>
      </MenuDiv>
      {optionsOn ? <SideBar setOptionsOn={setOptionsOn} /> : null}
    </>
  );
}
