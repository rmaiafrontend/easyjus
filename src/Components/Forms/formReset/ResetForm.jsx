import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Content, Form, Input, ButtonCadastrar, ButtonEntrar, ButtonGoogle, ButtonReset, Botton, TopContent, Buttons, Label } from "./style";
import iconDigital from "../../../assets/icon-digital.svg";
import { GoogleAuthProvider, getAuth, signInWithPopup, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { app } from "../../../services/firebaseconfig";
import { useLogin } from "../../../hooks/useLogin";

const provider = new GoogleAuthProvider();

export function ResetForm() {
  const { login, isPending, error } = useLogin();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const auth = getAuth(app);

  function forgotPassword() {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("Um e-mail de redefinição foi enviado!");
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
          <h3>Digite seu e-mail para enviar um link de redefinição de senha.</h3>
        </TopContent>
        <Form>
          <Label htmlFor="email">E-mail</Label>
          <Input type="email" id="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </Form>
        <Buttons>
          <ButtonEntrar title="Entrar" onClick={forgotPassword}>
            Enviar e-mail
          </ButtonEntrar>
          {/* <ButtonGoogle onClick={singInGoogle}>Fazer login com Google</ButtonGoogle> */}
          <Botton>
            <ButtonCadastrar title="Cadastrar" onClick={() => navigate("/login")}>
              Login
            </ButtonCadastrar>
            <ButtonReset title="Resetar" onClick={() => navigate("/register")}>
              Cadastre-se
            </ButtonReset>
          </Botton>
        </Buttons>
      </Content>
    </>
  );
}
