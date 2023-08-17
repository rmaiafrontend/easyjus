import styled from "styled-components";

export const Card = styled.div`
  padding: 23px 30px;
  margin-left: 30px;
  border-radius: 2rem;
  width: 100%;
  max-width: 35rem;
  height: 34.5rem;
  background-color: #fff;
  transition: all 1s;
  h3 {
    font-size: 26px;
    font-weight: 700;
    color: ${(props) => props.theme.colors.purpleText};
    max-width: 20rem;
  }
  p {
    margin-top: 1.5rem;
    font-size: 14px;
    font-weight: 500;
    max-width: 22.5rem;
    color: ${(props) => props.theme.colors.greyTextSecondary};
  }
  button {
    margin-top: 3rem;
    width: 100%;
    height: 4.6rem;
    border-radius: 5rem;
    background: linear-gradient(146deg, #7e7fff 0%, #4b26ff 100%);
    color: #fff;
    font-size: 14px;
    font-weight: 500;
    color: #fff;
  }
  &:hover {
    transform: scale(1.03);
  }
`;
