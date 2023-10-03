import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

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
  animation: ${fadeIn} 0.1s ease-in-out;
`;

export const Form = styled.div`
  position: relative;
  padding: 28px 24px;
  width: 372px;
  height: 332px;
  width: 372px;
  height: auto;
  border-radius: 15px;
  background-color: #ffff;
  animation: ${fadeIn} 0.1s ease-in-out;
`;

export const TopContent = styled.div`
  h2 {
    width: 16rem;
    color: var(--secondary-grey-900, #2b3674);
    font-family: DM Sans;
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: 20px; /* 111.111% */
    letter-spacing: -0.36px;
  }
`;

export const Label = styled.div`
  margin-top: 20px;
  padding-left: 10px;
  border-radius: 8px;
  width: 100%;
  background: #f4f4f4;
  display: flex;
  align-items: center;
`;

export const ButtonCadastrar = styled.button`
  width: 100%;
  max-width: 90px;
  height: 28px;
  border-radius: 8px;
  background: #5232ff;
  color: #fff;
  font-family: DM Sans;
  font-size: 10px;
  font-weight: 400;
`;

export const InputTipo = styled.input`
  width: 70%;
  height: 38px;
  margin-right: 5px;
`;

export const BottonContent = styled.div`
  margin-top: 20px;
  span {
    color: rgba(43, 54, 116, 0.5);
    font-family: DM Sans;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 42px; /* 350% */
    letter-spacing: -0.24px;
  }
`;

export const ListTipos = styled.ul``;

export const Tipo = styled.li`
  margin-bottom: 8px;
  padding: 6px 15px;
  width: 100%;
  height: 38px;
  border-radius: 8px;
  background: #f4f4f4;
  display: flex;
  align-items: center;
  justify-content: space-between;
  button {
    color: #2b3674;
    text-align: center;
    font-family: DM Sans;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 42px; /* 350% */
    letter-spacing: -0.24px;
    background-color: transparent;
    &:hover {
      color: red;
    }
  }

  span {
    color: #2b3674;
    font-family: DM Sans;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 42px; /* 350% */
    letter-spacing: -0.24px;
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: -41px;
  right: 0px;
  width: 35px;
  height: 35px;
  background-color: #fff;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${fadeIn} 0.3s ease-in-out;
`;
