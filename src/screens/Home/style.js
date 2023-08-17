import styled from "styled-components";

export const AllContent = styled.div`
  display: flex;
`;

export const Container = styled.div`
  width: 100%;
  padding: 0px 30px 0 30px;
  margin: 0 auto;
`;
export const MainContent = styled.div`
  width: 100%;
`;

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
  display: flex;
  align-items: center;
`;

export const Hero = styled.div`
  position: relative;
  margin-top: 3rem;
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
`;
