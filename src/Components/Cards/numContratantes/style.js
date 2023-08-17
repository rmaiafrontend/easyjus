import styled from "styled-components";

export const Card = styled.div`
  z-index: 2;
  width: 100%;
  max-width: 25.7rem;
  height: 9.7rem;
  margin-left: 2rem;
  border-radius: 20px;
  background: #fff;
  box-shadow: -3px 3px 8px 0px rgba(0, 0, 0, 0.12);
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 1s;
  &:hover {
    transform: scale(1.03);
  }
`;

export const RightContent = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LeftContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 12px 0 14px 21px;
  .title {
    font-size: 18px;
    font-weight: 300;
    color: ${(props) => props.theme.colors.greyTextSecondary};
  }
  .numero {
    font-size: 30px;
    font-weight: 600;
    color: ${(props) => props.theme.colors.purpleText};
  }
  .periodo {
    font-size: 8px;
    font-weight: 200;
    letter-spacing: 1.5px;
    color: ${(props) => props.theme.colors.purpleText};
  }
`;
