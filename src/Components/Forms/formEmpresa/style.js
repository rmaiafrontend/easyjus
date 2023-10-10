import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }`;

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
  max-width: 74.3rem;
  height: 34rem;
  background-color: #fff;
  border-radius: 1.5rem;
  box-shadow: 4px 4px 48px 0px rgba(0, 0, 0, 0.25);

  h2 {
    color: #000;
    font-size: 24px;
    font-weight: 500;
  }
`;

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2.2rem;
`;

export const LeftContent = styled.div`
  width: 49%;
`;

export const RightContent = styled.div`
  width: 49%;
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

export const Upload = styled.div`
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
    background: rgba(0, 231, 175, 0.29);
    &:hover {
      background: rgba(0, 231, 175, 0.74);
    }
  }

  p {
    font-size: 12px;
  }
`;
