import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        list-style: none;
        font-family: 'DM Sans', sans-serif;
    }

    body {
        background-color: #F4F7FE;
    }

    html {
        font-size: 62.5%;
    }
    
    button {
        border: none;
        cursor: pointer;
        transition: all 0.6s;
        &:hover {
            transform: scale(1.01);
        }
    
    }

    a {
        text-decoration: none;
    }
    img {
        max-width: 100%;
        display: block;
    }
    input {
        border: none;
        background: none;
        outline: none;
    }
`;

export default GlobalStyle;
