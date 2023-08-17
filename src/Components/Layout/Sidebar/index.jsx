import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Bar, ContainerLogo, Menu, ListMenu, ItemMenu } from "./style";
import logo from "../../../assets/logo.svg";
import iconDiligencia from "../../../assets/diligencia-icon.svg";
import iconExecutores from "../../../assets/executores-icon.svg";
import iconEmpresas from "../../../assets/empresas-icon.svg";
import iconFinanceiro from "../../../assets/financeiro-icon.svg";
import iconConfig from "../../../assets/configuracoes-icon.svg";

export function SideBar() {
  // State to keep track of the active button

  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const [activeButton, setActiveButton] = useState(currentPath);

  // Function to handle button click and set the active button
  const handleButtonClick = (index, path) => {
    console.log("Botão clicado:", index);
    setActiveButton(index);
    navigate(path);
  };

  return (
    <Bar>
      <ContainerLogo>
        <img src={logo} alt="" />
      </ContainerLogo>
      <Menu>
        <ListMenu>
          {[
            { icon: iconDashboard, text: "Dashboard", path: "/" },
            { icon: iconDiligencia, text: "Diligências", path: "/diligencias" },
            { icon: iconExecutores, text: "Executores", path: "/executores" },
            { icon: iconEmpresas, text: "Empresas", path: "/empresas" },
            { icon: iconFinanceiro, text: "Financeiro", path: "/financeiro" },
            { icon: iconConfig, text: "Configurações", path: "/configuracoes" },
          ].map((item, index) => (
            <ItemMenu key={index}>
              <button onClick={() => handleButtonClick(index, item.path)} className={activeButton === item.path ? "active" : ""}>
                <div className="icon">
                  <img src={item.icon} alt="" />
                </div>
                <span>{item.text}</span>
              </button>
            </ItemMenu>
          ))}
        </ListMenu>
      </Menu>
    </Bar>
  );
}

export default SideBar;
