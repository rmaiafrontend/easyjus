import styled from "styled-components";
import imgHero from "./../../../assets/img-hero.png";

export const Card = styled.div`
  z-index: 1;
  max-width: 72rem;
  height: 34.5rem;
  background-color: #fff;
  border-radius: 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all 1s;
  box-shadow: 0px 4px 97px 0px rgba(0, 0, 0, 0.25);
  &:hover {
    transform: scale(1.03);
  }
  @media (max-width: 1300px) {
    max-width: 100%;
    box-shadow: none;
  }
`;

export const LeftContent = styled.div`
  padding: 45px 28px 44px 44px;
  h2 {
    font-size: 3.4rem;
    font-weight: 700;
    line-height: 33px; /* 97.059% */
    letter-spacing: -1.87px;
    color: ${(props) => props.theme.colors.purpleText};
    width: 25.5rem;
    margin-bottom: 1.7rem;
  }
  p {
    font-size: 16px;
    font-weight: 500;
    line-height: 28px; /* 175% */
    letter-spacing: -0.32px;
    width: 25.5rem;
    color: ${(props) => props.theme.colors.greyTextSecondary};
    margin-bottom: 4.8rem;
  }

  button {
    width: 14rem;
    height: 4.6rem;
    background: linear-gradient(146deg, #7e7fff 0%, #4b26ff 100%);
    border-radius: 20px;
    font-size: 14px;
    font-weight: 500;
    color: #fff;
  }
  @media (max-width: 1300px) {
    padding: 35px;
  }
`;

export const RightContent = styled.div`
  margin: 30px 20px 30px;
  border-radius: 1.5rem;
  width: 29.1rem;
  height: 28.6rem;
  background-image: url(${imgHero});
  @media (max-width: 1300px) {
    display: none;
  }
`;
