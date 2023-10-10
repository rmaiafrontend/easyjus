import { Routes, Route } from "react-router-dom";
import { SectionDiligencias } from "../screens/Diligências/";
import { SectionExcutores } from "../screens/Executores";
import { SectionDashboard } from "../screens/Home/index";
import { SectionRegister } from "../screens/Register";
import { SectionEmpresas } from "../screens/Empresas";
import AuthRoute from "./AuthRoute"; // Importe o HOC AuthRoute

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<AuthRoute element={<SectionDashboard />} />} />
      <Route path="/dashboard" element={<AuthRoute element={<SectionDashboard />} />} />
      <Route path="/diligencias" element={<AuthRoute element={<SectionDiligencias />} />} />
      <Route path="/executores" element={<AuthRoute element={<SectionExcutores />} />} />
      <Route path="/empresas" element={<AuthRoute element={<SectionEmpresas />} />} />
      <Route path="/register" element={<SectionRegister />} />
    </Routes>
  );
}
