import { useState } from "react";
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
  const navigate = useNavigate();
  const auth = getAuth(app);

  function handleLogin() {
    login(email, password);
  }

  function singInEmail() {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        // ...
      })
      .then(() => navigate("/dashboard"))
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }

  function singInGoogle() {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }

  function forgotPassword() {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("Um e-mail de redefinição foi enviado");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  }

  return (
    <>
      <Content>
        <TopContent>
          <img className="iconDigital" src={iconDigital} alt="" />
          <h3>Faça o login ou cadastre-se.</h3>
        </TopContent>
        <Form>
          <Label htmlFor="email">E-mail</Label>
          <Input type="email" id="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Label htmlFor="password">Senha</Label>
          <Input type="password" id="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </Form>
        <Buttons>
          <ButtonEntrar title="Entrar" onClick={handleLogin}>
            Entrar
          </ButtonEntrar>
          {/* <ButtonGoogle onClick={singInGoogle}>Fazer login com Google</ButtonGoogle> */}
          <Botton>
            <ButtonCadastrar title="Cadastrar" onClick={() => navigate("/register")}>
              Cadastre-se
            </ButtonCadastrar>
            <ButtonReset title="Resetar" onClick={forgotPassword}>
              Esqueci a senha
            </ButtonReset>
          </Botton>
        </Buttons>
      </Content>
    </>
  );
}
