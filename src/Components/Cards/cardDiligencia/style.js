import styled from "styled-components";

export const Card = styled.div`
  cursor: pointer;
  margin-bottom: 1.3rem;
  height: 7.2rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  border-radius: 1rem;
  border-left: 8px #ffb547 solid;
`;

export const LeftInfo = styled.div`
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
      font-weight: 300;
    }
  }
`;

export const Status = styled.div`
  margin-right: 5.7rem;
  span {
    color: #ffb547;
    font-size: 12px;
    font-weight: 500;
  }
`;
