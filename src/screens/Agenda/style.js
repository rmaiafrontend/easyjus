import styled from "styled-components";

export const Top = styled.div`
  margin-top: 5.3rem;
  h1 {
    color: #2b3674;
    font-size: 28px;
    font-weight: 700;
    margin-bottom: 8px;
  }
  span {
    color: var(--Secondary-Grey-900, #2b3674);
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
  }
`;

export const Agenda = styled.div`
  margin-top: 5px;
  width: fit-content;
  height: 79.8rem;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  overflow-x: auto;
`;

export const DiaSemana = styled.div`
  margin-right: 14px;
  width: 40rem;
  /* max-width: 40rem; */
  height: 65rem;
  .top {
    text-align: center;
    padding: 12px 0;
    span {
      color: #2b3674;
      font-size: 15.106px;
      font-weight: 400;
    }
  }
  .compromissos {
    padding: 15px 9px;
    border-radius: 15px;
    background-color: #ffff;
    width: 100%;
    height: 100%;
  }
`;

export const Navigation = styled.div`
  margin-top: 25px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

export const ButtonControlWeek = styled.button`
  padding: 8px 40px;
  margin-right: 15px;
  border-radius: 8px;
  background-color: #5232ff;
  font-size: 12px;
  color: #ffff;
`;
