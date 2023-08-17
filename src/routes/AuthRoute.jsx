import { Navigate } from "react-router-dom";
import { SectionLogin } from "../screens/Login";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";

function AuthRoute({ element, ...rest }) {
  const auth = getAuth();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Usuário está autenticado
        setUser(user); // Alterado para definir o objeto do usuário
        console.log("Tem usuário");
      } else {
        // Usuário não está autenticado
        setUser(null);
        console.log("Não tem usuário");
      }
    });

    return () => {
      unsubscribe(); // Limpa o observador quando o componente é desmontado
    };
  }, [auth]);

  // Verifica se o usuário está autenticado
  const isAuthenticated = user !== null;

  return isAuthenticated ? element : <SectionLogin />;
}

export default AuthRoute;
