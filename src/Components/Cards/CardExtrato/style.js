import styled from "styled-components";

function getExtratoColor(tipo) {
  let cor = "";
  if (tipo == "entrada") {
    cor = "#00E7AF";
  } else if (tipo == "saida") {
    cor = "#FE4752";
  } else {
    cor = "#2b3674";
  }
  return cor;
}

export const Card = styled.div`
  width: 48.2rem;
  height: 5.6rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  border-radius: 6.403px;
  background: #fbfbfb;
  margin-top: 1.1rem;
  h4 {
    color: var(--Secondary-Grey-900, #2b3674);
    font-size: 15px;
    font-weight: 400;
  }
`;

export const Valor = styled.span`
  color: ${(props) => getExtratoColor(props.tipo)};
  font-size: 12.807px;
  font-weight: 700;
`;
