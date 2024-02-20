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
  padding: 22px 22px;
  width: 100%;
  max-width: 57.9rem;
  background-color: #fff;
  border-radius: 1.5rem;
  box-shadow: 4px 4px 48px 0px rgba(0, 0, 0, 0.25);
  animation: ${fadeIn} 0.1s ease-in-out;
  h3 {
    font-size: 2rem;
    font-weight: 500;
    color: #000;
    span {
      margin-left: 5px;
      font-size: 16px;
      font-style: normal;
      font-weight: 300;
    }
  }
`;

export const Container = styled.div`
  margin-top: 2.2rem;
  width: 100%;
`;

export const TopContent = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .left {
    width: 49%;
  }
  .right {
    width: 49%;
  }
`;

export const MidContent = styled.div`
  width: 100%;
`;

export const BottonContent = styled.div`
  margin-top: 2.5rem;
  h4 {
    color: #4e4e4e;
    font-size: 18px;
    font-weight: 400;
    margin-bottom: 1.3rem;
  }

  .inputFile {
    display: none;
  }

  label {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 41px;
    border-radius: 5px;
    color: #000;
    text-align: center;
    font-family: DM Sans;
    font-size: 12px;
    font-weight: 400;
    background-color: transparent;
    border: 1px solid #0000001f;
    transition: all 0.6s;
    &:hover {
      background: rgba(0, 231, 175, 0.74);
    }
  }
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
  animation: ${fadeIn} 0.3s ease-in-out;
`;
export const Button = styled.button`
  margin-top: 1rem;
  width: 100%;
  height: 3.5rem;
  background: linear-gradient(146deg, #7e7fff 0%, #4b26ff 100%);
  color: #fff;
  font-size: 14px;
  font-weight: 300;
  border-radius: 0.5rem;
`;

export const ButtonDelete = styled(Button)`
  background: linear-gradient(146deg, #ff0404 0%, #ff2339 100%);
`;

export const Upload = styled.div`
  margin-top: 15px;
  span {
    margin-top: 10px;
    color: #4e4e4e;
    font-size: 12px;
    font-weight: 400;
  }
`;

export const Document = styled.div`
  position: relative;
  margin-top: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 41px;
  background: rgba(217, 217, 217, 0.18);
  border-radius: 5px;
  a {
    color: #4e4e4e;
    text-align: center;
    font-family: DM Sans;
    font-size: 12px;
    font-weight: 500;
  }

  /* Estilos para o estado de hover */
  &:hover {
    background-color: #e0e0e0; /* Altere a cor de fundo quando houver hover */
  }
`;

export const DeleteFile = styled.button`
  position: absolute;
  top: 50;
  right: 5px;
  width: 50px;
  background: transparent;
  border-radius: 5px;
  font-size: 10px;
  color: red;
  &:hover {
    background-color: red;
    color: #fff;
  }
`;

export const Load = styled.img`
  width: 20px;
`;
