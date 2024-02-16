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

export const Box = styled.div`
  padding: 32px;
  position: relative;
  padding: 22px 22px;
  width: 100%;
  max-width: 109rem;
  background-color: #fff;
  border-radius: 1.5rem;
  box-shadow: 4px 4px 48px 0px rgba(0, 0, 0, 0.25);
  animation: ${fadeIn} 0.1s ease-in-out;
  h1 {
    font-size: 3.5rem;
    font-weight: 700;
    margin-bottom: 2.5rem;
    color: #2b3674;
  }
`;

export const InfosExecutores = styled.div`
  display: flex;
  align-items: center;
`;

export const ImageExecutor = styled.div`
  width: 9.1rem;
  height: 9.1rem;
  border-radius: 1rem;
  background-image: ${(props) => `url(${props.backgroundimage})`};
  background-size: cover;
  margin-right: 2.5rem;
`;

export const DadosExecutor = styled.div``;

export const ListaDeDados = styled.ul`
  display: flex;
  align-items: center;
  ul {
    margin-right: 30px;
    height: 55px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  li {
    color: #4e4e4e;
    font-size: 17px;
    font-style: normal;
    color: #000;
  }
  .name {
    font-size: 25px;
    font-weight: 500;
  }
`;

export const CardsContainer = styled.div`
  margin-top: 3rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

export const Line = styled.div`
  margin: 35px 0;
  width: 663.004px;
  height: 1px;
  background: linear-gradient(90deg, #7a7a7a 10.57%, rgba(122, 122, 122, 0) 100.76%);
`;

export const ContentDiligencias = styled.div`
  h3 {
    color: var(--secondary-grey-900, #2b3674);
    font-size: 25px;
    font-weight: 700;
    line-height: 42px; /* 168% */
    letter-spacing: -0.5px;
  }
`;

export const Filters = styled.div`
  display: flex;
  align-items: center;
`;

export const FilterPeriodo = styled.div`
  margin-right: 5.5rem;
  display: flex;
  align-items: center;
  span {
    margin-right: 2.1rem;
    color: var(--secondary-grey-900, #2b3674);
    font-size: 14px;
    font-weight: 600;
    line-height: 42px; /* 233.333% */
    letter-spacing: -0.36px;
  }
`;

export const FilterStatus = styled.div`
  margin-right: 5.5rem;
  display: flex;
  align-items: center;
  span {
    margin-right: 2.1rem;
    color: var(--secondary-grey-900, #2b3674);
    font-size: 18px;
    font-weight: 500;
    line-height: 42px; /* 233.333% */
    letter-spacing: -0.36px;
  }
`;

export const ButtonsPeriodo = styled.div`
  width: 150px;
  height: 25px;
  display: flex;
  align-items: center;
  border-radius: 5px;
  border: 0.5px solid #dcdcdc;
  background: #fff;

  button {
    width: 100%;
    height: 100%;
    background-color: transparent;
  }
  .active {
    background-color: #7671ff;
    color: #ffff;
  }
  .recentes {
    border-right: 1px solid #ccc;
  }
`;

export const ButtonsStatus = styled.div`
  width: 20.6rem;
  height: 25px;
  display: flex;
  align-items: center;
  border-radius: 5px;
  border: 0.5px solid #dcdcdc;
  background: #fff;

  button {
    width: 100%;
    height: 100%;
    background-color: transparent;
  }
  .active {
    background-color: #7671ff;
    color: #ffff;
  }
  .pendentes {
    border-right: 1px solid #ccc;
  }
`;

export const TitlesList = styled.div`
  margin-top: 2.1rem;
  margin-bottom: 2.1rem;
  margin-left: 34px;
  margin-right: 49px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Titles = styled.div`
  margin-left: 8px;
  width: 100%;
  max-width: 81.6rem;

  ul {
    display: flex;
    align-items: center;
    justify-content: space-around;
    li {
      width: 10rem;
      font-size: 14px;
      font-style: normal;
      font-weight: 200;
    }
  }
`;

export const Campo = styled.span`
  font-size: 12px;
  font-weight: 300;
`;

export const Status = styled.div`
  span {
    font-size: 14px;
    font-style: normal;
    font-weight: 200;
  }
`;

export const ListDiligenciasExecutor = styled.div`
  width: 100%;
  height: 100%;
  max-height: 26.7rem;
  overflow-y: auto;
  /* Estilizando a barra de rolagem */
  /* Estilizando a barra de rolagem */
  p {
    font-size: 12px;
    text-align: center;
    color: red;
  }
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 6px;
  }
`;

export const Bar = styled.div`
  margin-top: 2.5rem;
  padding: 0 3.3rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 49px;
  border-radius: 10px;
  border: 1px solid #00e7af;
  background: linear-gradient(90deg, #7671ff 12.34%, #4d29ff 98.53%);
`;

export const RightContent = styled.div`
  b {
    color: #fff;
    font-family: DM Sans;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
  }
  .realizados {
    margin-right: 2.7rem;
    color: #00e7af;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
  }

  .pendentes {
    color: #ffc700;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
  }
`;

export const LeftContent = styled.div`
  b {
    font-size: 15px;
    font-style: normal;
    font-weight: 500;
    color: #fff;
    span {
      font-size: 10px;
      font-weight: 400;
    }
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: -40px;
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
