import styled from "styled-components";

export const Card = styled.div`
  margin-right: 15px;
  width: 100%;
  max-width: 25.7rem;
  height: 9.7rem;
  background: transparent;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 1s;
  border-radius: 20px;
  border: 1px solid #b2b2b2;
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
    font-style: normal;
    font-weight: 400;
    line-height: 24px; /* 133.333% */
    letter-spacing: -0.36px;
  }
  .numero {
    color: ${(props) => props.color || "black"};
    font-size: 30px;
    font-weight: 700;
  }
  .periodo {
    font-size: 8px;
    font-weight: 400;
    letter-spacing: 1.5px;
    color: #4e4e4e;
  }
`;
