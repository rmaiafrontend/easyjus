import styled from "styled-components";

export const Titles = styled.div`
  margin-top: 5.2rem;
  span {
    font-size: 18px;
    font-weight: 500;
    color: ${(props) => props.theme.colors.greyTextSecondary};
  }

  h1 {
    font-size: 34px;
    font-style: normal;
    font-weight: 700;
    color: ${(props) => props.theme.colors.purpleText};
  }
`;

export const Cards = styled.div`
  margin-top: 3.2rem;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(25.7rem, 3fr));
  gap: 10px;
`;

export const Hero = styled.div`
  margin-top: 3rem;
  display: flex;
  align-items: center;
  @media (max-width: 1300px) {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(32.5rem, 3fr));
    gap: 10px;
  }
`;
