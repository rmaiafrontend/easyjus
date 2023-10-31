import styled from "styled-components";

export const Bar = styled.div`
  height: 100%; /* Altura da barra lateral */
  position: fixed;

  /* margin: 20px; */
  border-radius: 15px 0 0 15px;
  width: 290px;

  padding-top: 5.2rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  background-color: #fff;
`;

export const ContainerLogo = styled.div`
  width: 21.4rem;
  height: 4.4rem;
  margin-bottom: 6.5rem;
`;

export const Menu = styled.div`
  width: 100%;
  height: 40.5rem;
  max-width: 21.4rem;
`;

export const ListMenu = styled.ul`
  width: 100%;
`;

export const ItemMenu = styled.li`
  button {
    width: 100%;
    height: 4.5rem;
    padding-left: 1rem;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    background-color: #fff;
    cursor: pointer;
    border-radius: 5px;
    margin-top: 15px;
    span {
      margin-left: 14px;
      color: ${(props) => props.theme.colors.greyTextSecondary};
      font-size: 16px;
      font-weight: 400;
    }
    transition: all 0.5s;
  }
  .active {
    background-color: ${(props) => props.theme.colors.purplePrimary};
    .icon {
      img {
        color: #fff;
      }
    }
    span {
      color: #fff;
    }
  }
`;

export const Logout = styled.button`
  padding: 5px 15px;
  margin-top: 30vh;
  width: 100%;
  max-width: 21rem;
  display: flex;
  align-items: center;
  justify-content: left;
  background-color: transparent;
  img {
    width: 15px;
    margin-right: 10px;
  }
`;
