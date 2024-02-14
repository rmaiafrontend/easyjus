import styled from "styled-components";

export const TopContent = styled.div`
  margin-top: 5.3rem;
`;

export const Title = styled.div`
  h1 {
    color: #2b3674;
    font-size: 28px;
    font-weight: 700;
  }
`;

export const BoxCard = styled.div`
  margin-top: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

export const MainContent = styled.div`
  margin-top: 3.6rem;
  width: 100%;
  max-width: 1056px;
  h2 {
    color: #2b3674;
    font-size: 22px;
    font-weight: 700;
  }
`;

export const FilterContainer = styled.div`
  margin-top: 2.1rem;
  border-radius: 10px 10px 0 0;
  width: 100%;
  background-color: #ffff;
  height: 50px;
`;

export const BoxExtrato = styled.div`
  height: 45.8rem;
  margin-top: 0.8rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Titles = styled.div`
  margin-top: 0.8rem;
  width: 100%;
  height: 3.2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .entradas,
  .saidas {
    background-color: #ffff;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    span {
      font-size: 12px;
      font-style: normal;
      font-weight: 700;
    }
  }

  .entradas {
    margin-right: 4px;
    span {
      color: #00e7af;
    }
  }

  .saidas {
    margin-left: 4px;
    span {
      color: #fe4752;
    }
  }
`;
export const TableEntradas = styled.div`
  width: 100%;
  height: 100%;
  max-width: 52.4rem;
  padding: 20px;
  background-color: #ffff;
`;

export const TableSaidas = styled(TableEntradas)``;

export const Identificadores = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 34px;
  span {
    color: var(--Secondary-Grey-900, #2b3674);
    text-align: center;
    font-size: 12px;
    font-weight: 500;
  }
`;

export const BoxSaldo = styled.div`
  margin-top: 8px;
  width: 100%;
  height: 6.3rem;
  padding: 0 40px;
  background-color: #ffff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 0px 0px 15px 15px;
  .mes {
    h4 {
      color: #38427c;
      font-size: 16.576px;
      font-weight: 700;
    }
  }
  .saldo {
    span {
      font-size: 16px;
      font-weight: 500;
      b {
        color: #00e7af;
      }
    }
  }
`;
