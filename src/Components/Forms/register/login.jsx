import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Content, Form, Input, ButtonCadastrar, ButtonEntrar, ButtonGoogle, ButtonReset, Botton, TopContent, Buttons, Label } from "./style";
import iconDigital from "../../../assets/icon-digital.svg";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from "../../../services/firebaseconfig";

import { useSignup } from "../../../hooks/useSignup";

export function RegisterForm() {
  const [fullName, setFullName] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // Novo estado para a confirmação de senha
  const { signup, error, isPending } = useSignup();
  const navigate = useNavigate();
  const auth = getAuth(app);

  function CreateNewAccount() {
    // Validações dos campos
    if (!email || !password || password !== confirmPassword) {
      alert("Campos inválidos ou senhas não coincidem.");
      return;
    }

    signup(email, password, fullName);
  }

  return (
    <>
      <Content>
        <TopContent>
          <img className="iconDigital" src={iconDigital} alt="" />
          <h3>Preencha os campos abaixo para se cadastrar.</h3>
        </TopContent>
        <Form>
          <Label htmlFor="email">Nome Completo</Label>
          <Input type="text" id="name" autoComplete="name" a value={fullName} onChange={(e) => setFullName(e.target.value)} />
          <Label htmlFor="email">E-mail</Label>
          <Input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Label htmlFor="password">Senha</Label>
          <Input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <Label htmlFor="confirmPassword">Confirmar Senha</Label>
          <Input type="password" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        </Form>
        <Buttons>
          <ButtonEntrar onClick={CreateNewAccount}>Cadastrar</ButtonEntrar>
          <ButtonGoogle onClick={() => navigate("/ ")}>Voltar para o login</ButtonGoogle>
        </Buttons>
      </Content>
    </>
  );
}
