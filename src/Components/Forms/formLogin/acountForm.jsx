import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Content, Form, Input, ButtonCadastrar, ButtonEntrar, ButtonGoogle, ButtonReset, Botton, TopContent, Buttons, Label } from "./style";
import iconDigital from "../../../assets/icon-digital.svg";
import { GoogleAuthProvider, getAuth, signInWithPopup, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { app } from "../../../services/firebaseconfig";
import { useLogin } from "../../../hooks/useLogin";

const provider = new GoogleAuthProvider();

export function AccountForm() {
  const { login, isPending, error } = useLogin();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(""); // Added state for login error
  const navigate = useNavigate();
  const auth = getAuth(app);

  async function handleLogin() {
    await login(email, password);
    console.log(isPending);
  }

  return (
    <>
      <Content>
        <TopContent>
          <img className="iconDigital" src={iconDigital} alt="" />
          <h3>Faça o login ou cadastre-se.</h3>
        </TopContent>
        <Form>
          <p style={{ color: "red" }}>{loginError}</p>
          <Label htmlFor="email">E-mail</Label>
          <Input type="email" id="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Label htmlFor="password">Senha</Label>
          <Input type="password" id="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </Form>
        {error ? <span>{error}</span> : null}
        <Buttons>
          <ButtonEntrar title="Entrar" onClick={handleLogin}>
            Entrar
          </ButtonEntrar>
          {/* <ButtonGoogle onClick={singInGoogle}>Fazer login com Google</ButtonGoogle> */}
          <Botton>
            <ButtonCadastrar title="Cadastrar" onClick={() => navigate("/register")}>
              Cadastre-se
            </ButtonCadastrar>
            <ButtonReset title="Resetar" onClick={() => navigate("/resetpassword")}>
              Esqueci a senha
            </ButtonReset>
          </Botton>
        </Buttons>
      </Content>
    </>
  );
}
