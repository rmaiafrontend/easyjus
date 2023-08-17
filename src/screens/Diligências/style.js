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

export const Buttons = styled.div`
  margin-top: 3.2rem;
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 4rem;
`;

export const Diligencias = styled.div`
  width: 100%;
  max-width: 1200px;
  h2 {
    font-size: 28px;
    font-style: normal;
    font-weight: 700;
  }
`;

export const TitlesList = styled.div`
  margin-top: 2.1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Titles = styled.div`
  margin-left: 8px;
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
      font-weight: 500;
    }
  }
`;

export const Status = styled.div`
  margin-right: 6.5rem;
  span {
    font-size: 12px;
    font-weight: 400;
  }
`;
