import { useState, useEffect } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../services/firebaseconfig";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setError(null);
    setIsPending(true);

    try {
      const res = await signInWithEmailAndPassword(auth, email, password);

      // const userRef = doc(db, "users", res.user.uid);

      // await updateDoc(userRef, { online: true });

      dispatch({ type: "LOGIN", payload: res.user });

      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
    } catch (err) {
      console.log("Firebase Auth Error:", err.code, err.message);

      let errorMessage = "Erro ao fazer login. Tente novamente.";

      // Mapeie códigos de erro específicos do Firebase para mensagens amigáveis
      if (err.code === "auth/user-not-found") {
        errorMessage = "Usuário não encontrado. Verifique seu e-mail.";
      } else if (err.code === "auth/wrong-password") {
        errorMessage = "Senha incorreta. Tente novamente.";
      } else if (err.code === "auth/invalid-credential") {
        errorMessage = "Email ou senha incorretos. Tente Novamente";
      } else if (err.code === "auth/too-many-requests") {
        errorMessage = "Muitas tentativas. Tente novamente mais tarde.";
      }

      setError(errorMessage);
      setIsPending(false);
    }
  };

  useEffect(
    () => () => {
      setIsPending(false);
      setIsCancelled(true);
    },
    []
  );

  return { login, error, isPending };
};
