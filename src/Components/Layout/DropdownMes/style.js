import styled from "styled-components";

export const Dropdown = styled.div`
  width: 100%;
  height: 100%;
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
  align-items: center;
  height: 100%;
  margin-left: 28px;
  button {
    background-color: transparent;
    padding-right: 10px;
    img {
      width: 2.8rem;
      height: 2.8rem;
    }
  }
`;

export const Options = styled.ul`
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
    font-size: 16.045px;
    font-weight: 700;

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
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: "DM Sans";
  font-size: 16.045px;
  font-weight: 700;
  .arrow {
    width: 5px;
  }
`;
