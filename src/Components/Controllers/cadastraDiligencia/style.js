import styled from "styled-components";

export const Card = styled.button`
  width: 100%;
  height: 9.7rem;
  border-radius: 20px;
  background: linear-gradient(146deg, #7e7fff 0%, #4b26ff 100%);
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
    width: 12.3rem;
    font-size: 18px;
    font-weight: 300;
    line-height: 17px;
    color: #fff;
    text-align: left;
  }
`;
