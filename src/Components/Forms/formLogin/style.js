import styled from "styled-components";

export const Content = styled.div`
  width: 100%;
  max-width: 40.1rem;
  padding: 25px 42px 25px 42px;
  span {
    color: red;
    font-size: 12px;
  }
  @media (max-width: 690px) {
    background-color: #ffff;
    border-radius: 15px;
    padding: 25px;
  }
`;

export const Form = styled.div`
  width: 100%;
  max-width: 40.1rem;
`;

export const TopContent = styled.div`
  .iconDigital {
    max-width: 4.7rem;
    margin-bottom: 1rem;
  }
  h3 {
    font-size: 22px;
    font-style: normal;
    font-weight: 500;
    margin-bottom: 3rem;
    width: 100%;
    max-width: 16.4rem;
    line-height: 27.695px; /* 100% */
  }

  @media (max-width: 480px) {
    h3 {
      font-size: 20px;
      line-height: 24px;
    }
  }
`;

export const Input = styled.input`
  width: 100%;
  height: 4.5rem;
  border: 0.06rem solid #cdcdcd;
  border-radius: 0.7rem;
  margin-top: 5px;
  margin-bottom: 1.1rem;
  padding: 8px;
  &:focus {
    /* Estilos quando o input está em foco */
    border-color: ${(props) => props.theme.colors.purplePrimary}; /* Cor da borda quando em foco */
    outline: none; /* Remover a borda padrão de foco */
  }
`;

export const Label = styled.label`
  font-size: 14px;
  font-weight: 400;
`;
export const Buttons = styled.div`
  width: 100%;
  max-width: 40.1rem;
`;
export const ButtonEntrar = styled.button`
  margin-top: 2rem;
  width: 100%;
  height: 42px;
  border-radius: 6.924px;
  background: #7874ff;
  font-size: 1.7rem;
  font-weight: 300;
  color: #fff;
`;

export const ButtonGoogle = styled.button`
  margin-top: 11px;
  width: 100%;
  height: 42px;
  border-radius: 6px;
  font-size: 1.4rem;
  font-weight: 400;
  background-color: transparent;
  border: 0.692px solid #d3d3d3;
`;
export const Botton = styled.div`
  margin-top: 1.1rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
export const ButtonCadastrar = styled.button`
  width: 49%;
  height: 42px;
  border-radius: 3.462px;
  background: #7874ff;
  color: #fff;
  font-size: 13px;
  font-weight: 300;
  @media (max-width: 380px) {
    font-size: 11px;
  }
`;

export const ButtonReset = styled.button`
  width: 49%;
  height: 42px;
  border-radius: 3.462px;
  background: #7874ff;
  color: #fff;
  font-size: 13px;
  font-weight: 300;
  @media (max-width: 380px) {
    font-size: 11px;
  }
`;
