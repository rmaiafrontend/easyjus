import styled from "styled-components";

function getStatusColor(status) {
  switch (status) {
    case "Pendente":
      return "#FE4752"; // Vermelho
    case "Enviado":
      return "#FFB547"; // Roxo
    case "Finalizado":
      return "#00E7AF"; // Verde
    default:
      return "#000"; // Cor padrão
  }
}

export const Card = styled.div`
  padding-right: 5.8rem;
  margin-bottom: 1.3rem;
  height: 7.2rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  border-radius: 1rem;
  border-left: 8px solid;
  border-left-color: ${(props) => getStatusColor(props.status)};
  &:hover {
    box-shadow: 0px 0px 31px -16px rgba(0, 0, 0, 0.39);
  }
`;

export const LeftInfo = styled.div`
  height: 100%;
  cursor: pointer;
  max-width: 81.6rem;
  width: 100%;
  max-width: 81.6rem;
  border-radius: 15px;
  ul {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    li {
      width: 10rem;
      text-align: center;
      font-size: 12px;
      font-weight: 300;
    }
  }
`;

export const Status = styled.button`
  cursor: pointer;
  display: inline-block;
  background-color: #ffff;
  display: flex;
  align-items: center;
  justify-content: center;

  span {
    color: ${(props) => getStatusColor(props.status)};
    font-size: 12px;
    font-weight: 600;
  }
`;
