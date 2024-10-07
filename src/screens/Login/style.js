import styled from "styled-components";
import imgLogin from "../../assets/image-login.svg";

export const Content = styled.div`
  display: flex;
  height: 100vh;
  @media (max-width: 690px) {
    background-image: url(${imgLogin});
    background-size: cover;
    align-items: center;
    justify-content: center;
    width: 100%;
    display: flex;
    flex-direction: column-reverse;
  }
`;

export const LeftContent = styled.div`
  width: 50%;
  height: 100vh;
  background-image: url(${imgLogin});
  background-size: cover;
  background-position: left;
  @media (max-width: 690px) {
    display: none;
  }
`;
export const RightContent = styled.div`
  width: 100%;
  max-width: 47.8rem;
  height: 100vh;
  padding: 0 35px 0 35px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (max-width: 690px) {
    width: 100%;
  }
`;
