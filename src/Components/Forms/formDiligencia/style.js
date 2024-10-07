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
  padding-top: 50px;
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

export const Form = styled.form`
  position: fixed;
  padding: 22px 22px;
  margin: 20px;
  width: 90%;
  max-width: 74.3rem;
  height: 44rem;
  background-color: #fff;
  border-radius: 1.5rem;
  box-shadow: 4px 4px 48px 0px rgba(0, 0, 0, 0.25);
  animation: ${fadeIn} 0.1s ease-in-out;

  h2 {
    color: #000;
    font-size: 24px;
    font-weight: 500;
  }

  @media (max-width: 830px) {
    height: auto;
  }
`;

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2.2rem;
  @media (max-width: 830px) {
    flex-direction: column;
  }
`;

export const LeftContent = styled.div`
  width: 49%;
  @media (max-width: 830px) {
    width: 100%;
  }
`;

export const RightContent = styled.div`
  width: 49%;
  @media (max-width: 830px) {
    width: 100%;
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

export const Campo = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 4.1rem;
  background-color: #f2f2f2;
  border-radius: 5px;
  display: flex;
  margin-bottom: 1rem;
`;

export const Title = styled.div`
  padding: 0 10px;
  display: flex;
  align-items: center;
  border-right: 1px solid transparent;
  border-image: linear-gradient(270deg, rgba(82, 50, 255, 0.06) 0%, #5232ff 50.95%, rgba(82, 50, 255, 0) 100%); /* Gradiente para a borda */
  border-image-slice: 1; /* Use o gradiente em toda a borda */
  span {
    width: 100%;
    text-align: center;
    color: #000;
    font-size: 12px;
    font-weight: 400;
    white-space: nowrap;
  }
`;

export const Input = styled.input`
  padding: 0 10px;
  width: 100%;
  &::placeholder {
    /* Use & para se referir ao próprio componente "input" */
    font-weight: 300;
    color: #9d9d9d;
  }

  input[type="date"]:hover::-webkit-calendar-picker-indicator {
    cursor: pointer;
  }
  input[type="time"]:hover::-webkit-datetime-edit-hour-field,
  input[type="time"]:hover::-webkit-datetime-edit-minute-field {
    cursor: pointer;
  }
`;

export const Dropdown = styled.div`
  width: 100%;
  height: 100%;
  ul {
    position: relative;
    z-index: 1;
    width: 100%;
    height: auto;
    max-height: 80px;
    background-color: #ffff;
    overflow-y: auto;
    border-radius: 0 0 10px 10px;
    box-shadow: 0px 21px 40px 5px rgba(0, 0, 0, 0.24);
    &::-webkit-scrollbar-track {
      background-color: transparent;
    }
    &::-webkit-scrollbar {
      width: 0.5rem;
      background-color: transparent;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #3d75c2;
      border-radius: 0.5rem;
    }
    li {
      padding: 5px;
      font-size: 14px;
      font-family: "DM Sans", sans-serif;
      font-weight: 300px;
    }
  }
`;

export const Options = styled.ul`
  position: relative;
  z-index: 1;
  width: 100%;
  height: auto;
  max-height: 80px;
  background-color: #ffff;
  overflow-y: auto;
  border-radius: 0 0 10px 10px;
  box-shadow: 0px 21px 40px 5px rgba(0, 0, 0, 0.24);
  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
  &::-webkit-scrollbar {
    width: 0.5rem;
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #3d75c2;
    border-radius: 0.5rem;
  }
  li {
    cursor: pointer;
    pointer-events: all;
    padding: 5px;
    font-size: 14px;
    font-family: "DM Sans", sans-serif;
    font-weight: 300px;

    button {
      background-color: transparent;
    }
  }
  li:hover {
    background-color: #dfdfdf7a;
  }
`;

export const Select = styled.input`
  cursor: pointer;
  width: 100%;
  height: 100%;
  background-color: transparent;
  border: none;
  margin: 0 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .arrow {
    width: 5px;
  }
`;
