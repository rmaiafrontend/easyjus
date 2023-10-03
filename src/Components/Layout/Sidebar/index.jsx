import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Bar, ContainerLogo, Menu, ListMenu, ItemMenu, Logout } from "./style";
import logo from "../../../assets/logo.svg";
import logoutIcon from "../../../assets/logoutIcon.svg";
import iconDiligencia from "../../../assets/diligencia-icon.svg";
import iconExecutores from "../../../assets/executores-icon.svg";
import iconEmpresas from "../../../assets/empresas-icon.svg";
import iconFinanceiro from "../../../assets/financeiro-icon.svg";
import iconConfig from "../../../assets/configuracoes-icon.svg";
import { useLogout } from "../../../hooks/useLogout";

export function SideBar() {
  const { logout, error, isPending } = useLogout();
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const [activeButton, setActiveButton] = useState(currentPath);

  // Função para lidar com o clique no botão e definir o botão ativo
  const handleButtonClick = (index, path) => {
    setActiveButton(index);
    navigate(path);
  };

  // Função para lidar com o logout
  const handleLogout = () => {
    // Limpar o localStorage ao efetuar o logout
    localStorage.clear();
    logout(); // Chame a função de logout
  };

  return (
    <Bar>
      <ContainerLogo>
        <img src={logo} alt="" />
      </ContainerLogo>
      <Menu>
        <ListMenu>
          {[
            { icon: iconExecutores, text: "Dashboard", path: "/" },
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
      <Logout onClick={handleLogout}>
        <img src={logoutIcon} alt="" />
        Fazer Logout
      </Logout>
    </Bar>
  );
}

export default SideBar;
