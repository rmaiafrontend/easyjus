import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  max-width: 1100px;
  padding: 0px 30px 0 30px;
  margin: 0 auto;
`;
export const MainContent = styled.div``;

export const Buttons = styled.div`
  margin-top: 3.2rem;
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 4rem;
`;

export const Diligencias = styled.div`
  width: 100%;
  max-width: 1200px;
  h2 {
    font-size: 28px;
    font-style: normal;
    font-weight: 700;
  }
`;

export const TitlesList = styled.div`
  margin-top: 2.1rem;
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
      text-align: center;
      font-size: 12px;
      font-weight: 500;
    }
  }
`;

export const Status = styled.div`
  margin-right: 6.5rem;
  span {
    font-size: 12px;
    font-weight: 400;
  }
`;

export const Filters = styled.div`
  margin-top: 20px;
`;

export const Filter = styled.button`
  margin-right: 13px;
  width: 105px;
  height: 26px;
  border-radius: 5px;
  border-left: 3px solid #b8b8b8;
  background-color: #fff;
  color: #75767a;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  ${(props) =>
    props.active &&
    `
    box-shadow: 0px 4px 6px 0px rgba(0, 0, 0, 0.25);
  
  `}
`;

export const TodasFilter = styled(Filter)`
  border-left: 3px solid #b8b8b8; /* Cor da borda para Todas */
`;

export const PendentesFilter = styled(Filter)`
  border-left: 3px solid #fe4752; /* Cor da borda para Pendentes (por exemplo, vermelho) */
`;

export const EnviadasFilter = styled(Filter)`
  border-left: 3px solid #ffb547; /* Cor da borda para Enviadas (por exemplo, verde) */
`;

export const FinalizadasFilter = styled(Filter)`
  border-left: 3px solid #00e7af; /* Cor da borda para Finalizadas (por exemplo, azul) */
`;
