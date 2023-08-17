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
  max-width: 57.9rem;
  background-color: #fff;
  border-radius: 1.5rem;
  box-shadow: 4px 4px 48px 0px rgba(0, 0, 0, 0.25);

  h3 {
    font-size: 2rem;
    font-weight: 500;
    color: #000;
    span {
      margin-left: 5px;
      font-size: 16px;
      font-style: normal;
      font-weight: 300;
    }
  }
`;

export const Container = styled.div`
  margin-top: 2.2rem;
  width: 100%;
`;

export const TopContent = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .left {
    width: 49%;
  }
  .right {
    width: 49%;
  }
`;

export const MidContent = styled.div`
  width: 100%;
`;

export const BottonContent = styled.div`
  margin-top: 2.5rem;
  h4 {
    color: #4e4e4e;
    font-size: 18px;
    font-weight: 400;
    margin-bottom: 1.3rem;
  }

  .inputFile {
    display: none;
  }

  label {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 41px;
    border-radius: 5px;
    border: 0.5px solid #bbb;
    color: #4e4e4e;
    text-align: center;
    font-family: DM Sans;
    font-size: 12px;
    font-weight: 300;
  }
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
