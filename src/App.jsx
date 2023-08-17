import { ThemeProvider } from "styled-components";
import GlobalStyle from "../src/style/global";
import theme from "./style/theme";
import { Router } from "./routes/Router";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <Router />
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
