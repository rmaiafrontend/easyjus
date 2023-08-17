import styled from "styled-components";
import PhotoExecutor from "../../../assets/photo-executor.png";

export const Card = styled.div`
  padding: 16px;
  width: 100%;
  max-width: 31.5rem;
  height: 32rem;
  background-color: #fff;
  box-shadow: -12px 32px 28px 0px rgba(0, 0, 0, 0.05);

  border-radius: 1.5rem;
`;

export const Top = styled.div`
  display: flex;
  align-items: center;
`;

export const Image = styled.div`
  width: 9.1rem;
  height: 9.1rem;
  border-radius: 1rem;
  background-image: url(${PhotoExecutor});
`;
export const Right = styled.div`
  display: flex;
`;

export const Infos = styled.div`
  margin-left: 18px;
  display: flex;
  flex-direction: column;
  width: 6.5rem;
  .title {
    font-size: 1.2rem;
    font-style: normal;
    font-weight: 500;
    line-height: 10.834px; /* 100% */
    color: #818181;
  }
  .nums {
    font-size: 3.2503rem;
    font-style: normal;
    font-weight: 500;
    color: ${(props) => props.theme.colors.purpleSecondary};
  }
`;
export const Main = styled.div`
  margin-top: 1.4rem;
  h4 {
    font-size: 23.33px;
    font-style: normal;
    font-weight: 400;
  }

  ul {
    li {
      color: #4e4e4e;
      margin-top: 0.5rem;
      font-size: 15.553px;
      font-weight: 400;
    }
  }
`;

export const Button = styled.button`
  margin-top: 16px;
  width: 100%;
  height: 30px;
  color: #fff;
  font-size: 1.2rem;
  font-weight: 300;
  border-radius: 0.8rem;
  background: linear-gradient(146deg, #7e7fff 0%, #4b26ff 100%);
`;

export const ButtonDelete = styled.button`
  margin-top: 5px;
  width: 100%;
  height: 30px;
  color: #000;
  font-size: 1.2rem;
  font-weight: 300;
  border-radius: 0.8rem;
  background: #fff;
  border: 1px solid rgb(0 0 0 / 19%);
`;
