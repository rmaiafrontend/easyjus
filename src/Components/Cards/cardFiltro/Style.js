import styled, { keyframes } from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center; /* Centraliza horizontalmente */
  align-items: center; /* Centraliza verticalmente */
  z-index: 999; /* Coloca o overlay acima de outros elementos */
  background: rgb(0 0 0 / 14%);
  backdrop-filter: blur(1.5px);
`;

export const Card = styled.div`
  position: relative;
  padding: 28px 24px;
  width: 100%;
  height: 30rem;
  max-width: 47.9rem;
  border-radius: 15px;
  background: #fff;
  border-radius: 1.5rem;
  box-shadow: 4px 4px 48px 0px rgba(0, 0, 0, 0.25);

  h2 {
    max-width: 29.1rem;
    color: var(--secondary-grey-900, #2b3674);
    font-family: DM Sans;
    font-size: 25px;
    font-weight: 500;
    line-height: 25px; /* 80% */
    letter-spacing: -0.5px;
    text-align: left;
    margin-bottom: 2rem;
  }
`;

export const Periodos = styled.div`
  margin-bottom: 20px;
  h4 {
    color: #2b3674;
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 8px;
  }
  .dias {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

export const PeriodoEspecifico = styled.div``;

export const ButtonPeriodo = styled.button`
  border-radius: 5px;
  font-weight: 500;
  color: #2b3674;
  width: 138.208px;
  height: 31px;
  font-size: 12px;
`;

export const DataInicial = styled.input`
  cursor: pointer;
  padding: 0px 10px;
  border-radius: 5px;
  font-weight: 500;
  color: #2b3674;
  width: 138.208px;
  height: 31px;
  font-size: 12px;
  background-color: #f0f0f0;
`;

export const DataFinal = styled.input`
  cursor: pointer;
  padding: 0px 10px;
  border-radius: 5px;
  font-weight: 500;
  color: #2b3674;
  width: 138.208px;
  height: 31px;
  font-size: 12px;
  background-color: #f0f0f0;
  margin-left: 8px;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: -45px;
  right: 0px;
  width: 35px;
  height: 35px;
  background-color: #fff;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const FilterButton = styled.button`
  border-radius: 5px;
  width: 100%;
  height: 32px;
  background-color: #5232ff;
  color: #fff;
  font-size: 13px;
  font-weight: 400;
`;
