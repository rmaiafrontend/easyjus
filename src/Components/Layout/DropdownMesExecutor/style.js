import styled from "styled-components";

export const Dropdown = styled.div`
  height: 100%;
  width: 100%;
  ul {
    position: relative;
    z-index: 1;
    width: 100%;
    height: auto;
    max-height: 200px;
    background-color: #ffff;
    overflow-y: auto;
    border-radius: 0 0 10px 10px;
    &::-webkit-scrollbar-track {
      background-color: transparent;
    }
    &::-webkit-scrollbar {
      width: 0.5rem;
      background-color: transparent;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #3d75c2;
      border-radius: 0.5rem;
    }
    li {
      padding: 5px;
      font-size: 14px;
      font-family: "DM Sans", sans-serif;
      font-weight: 300px;
    }
  }
`;

export const Top = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  button {
    width: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    padding: 0;
    img {
      width: 1.8rem;
      height: 1.8rem;
    }
  }
`;

export const Options = styled.ul`
  margin-top: 5px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1;
  width: 100%;
  height: auto;
  max-height: 80px;
  background-color: #ffff;
  overflow-y: auto;
  border-radius: 0 0 10px 10px;
  box-shadow: 0px 26px 26px 0px rgba(0, 0, 0, 0.12);
  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
  &::-webkit-scrollbar {
    width: 0.5rem;
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #3d75c2;
    border-radius: 0.5rem;
  }
  li {
    width: 100%;
    cursor: pointer;
    pointer-events: all;
    padding: 5px;
    color: var(--Secondary-Grey-900, #2b3674);
    text-align: center;
    font-family: "DM Sans";
    font-size: 12px;
    font-weight: 500;

    button {
      background-color: transparent;
    }
  }
  li:hover {
    background-color: #dfdfdf7a;
  }
`;

export const Select = styled.input`
  cursor: pointer;
  text-align: center;
  width: 100%;
  height: 100%;
  background-color: transparent;
  border: none;
  font-family: "DM Sans";
  font-size: 12px;
  font-weight: 500;
  .arrow {
    width: 5px;
  }
`;
