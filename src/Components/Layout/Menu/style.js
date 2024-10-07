import styled from "styled-components";

export const MenuDiv = styled.div`
  background-color: #ffff;
  padding: 0px 30px 0 30px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media (min-width: 1170px) {
    display: none;
  }
`;

export const Left = styled.div`
  img {
    width: 80px;
  }
`;

export const Right = styled.div`
  button {
    background-color: transparent;
    img {
      width: 34px;
    }
  }
`;
