import styled from "styled-components";

export const Overlay = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(1.5px);
`;

export const Form = styled.div`
  position: relative;
  padding: 22px 22px;
  width: 100%;
  max-width: 74.3rem;
  height: 34rem;
  background-color: #fff;
  border-radius: 1.5rem;
  box-shadow: 4px 4px 48px 0px rgba(0, 0, 0, 0.25);

  h2 {
    color: #000;
    font-size: 24px;
    font-weight: 500;
  }
`;

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2.2rem;
`;

export const LeftContent = styled.div`
  width: 49%;
`;

export const RightContent = styled.div`
  width: 49%;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: -45px;
  right: 0px;
  width: 35px;
  height: 35px;
  background-color: #fff;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const Button = styled.button`
  margin-top: 1rem;
  width: 100%;
  height: 3.5rem;
  background: linear-gradient(146deg, #7e7fff 0%, #4b26ff 100%);
  color: #fff;
  font-size: 14px;
  font-weight: 300;
  border-radius: 0.5rem;
`;
