import { ThemeProvider } from "styled-components";
import GlobalStyle from "../src/style/global";
import theme from "./style/theme";
import { BrowserRouter } from "react-router-dom";
import { SideBar } from "./Components/Layout/Sidebar";
import "./App.css";

import { Routes, Route } from "react-router-dom";
import { SectionDiligencias } from "./screens/Diligências/index";
import { SectionExcutores } from "./screens/Executores";
import { SectionDashboard } from "./screens/Home/index";
import { SectionRegister } from "./screens/Register";
import { SectionLogin } from "./screens/Login";
import { SectionEmpresas } from "./screens/Empresas";
import { SectionFinanceiro } from "./screens/Financeiro";
import { SectionAgenda } from "./screens/Agenda";

import { useAuthContext } from "./hooks/useAuthContext";

function App() {
  const { user, authIsReady } = useAuthContext();

  return (
    <>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          {user ? (
            <>
              <div className="container">
                <div className="left-content">
                  <div className="containerBar">
                    <SideBar />
                  </div>
                </div>
                <div className="right-content">
                  <Routes>
                    <Route path="*" element={<SectionDashboard />} />
                    <Route path="/" element={<SectionDashboard />} />
                    <Route path="/dashboard" element={<SectionDashboard />} />
                    <Route path="/diligencias" element={<SectionDiligencias />} />
                    <Route path="/executores" element={<SectionExcutores />} />
                    <Route path="/empresas" element={<SectionEmpresas />} />
                    <Route path="/financeiro" element={<SectionFinanceiro />} />
                    <Route path="/agenda" element={<SectionAgenda />} />
                  </Routes>
                </div>
              </div>
            </>
          ) : (
            <Routes>
              <Route path="/register" element={<SectionRegister />} />
              <Route path="*" element={<SectionLogin />} />
              <Route path="/" element={<SectionLogin />} />
            </Routes>
          )}

          <GlobalStyle />
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
