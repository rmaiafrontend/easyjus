import { useEffect, useState, useContext } from "react";
import { ContainerEmpresas } from "./Style";
import { AuthContext } from "../../../contexts/AuthContext";
import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../services/firebaseconfig";
import { CardEmpresa } from "../../Cards/cardEmpresa";

export function ListEmpresas({ setAtualizaEmpresas, atualizaEmpresas }) {
  const { user, dispatch } = useContext(AuthContext);
  const userRef = doc(db, "users", user.uid); // Crie uma referência ao documento do usuário
  const empresasRef = collection(userRef, "empresas"); // Crie uma referência à subcoleção "diligencias"

  const [listaEmpresas, setListaEmpresas] = useState([]);

  useEffect(() => {
    getEmpresas();
  }, [atualizaEmpresas]);

  function getEmpresas() {
    const localStorageData = localStorage.getItem("listaEmpresas");
    if (localStorageData) {
      const empresasData = JSON.parse(localStorageData);
      setListaEmpresas(empresasData);
    } else {
      const unsubscribe = onSnapshot(empresasRef, (snapshot) => {
        // Usando a nova referência diligenciasRef
        const empresasData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setListaEmpresas(empresasData);
        localStorage.setItem("listaEmpresas", JSON.stringify(empresasData));
      });
    }
  }

  async function handleDeleteExecutor(id) {
    console.log("chamou a função!");
    const removedFromFirestore = await removeExecutorFromFirestore(id);
    if (removedFromFirestore) {
      const removedFromStorage = await removeExecutorFromLocalStorage(id);
    }
  }

  async function removeExecutorFromLocalStorage(id) {
    const localStorageData = localStorage.getItem("listaEmpresas");
    const listaEmpresasLocal = localStorageData ? JSON.parse(localStorageData) : [];
    const novasEmpresasLocal = listaEmpresasLocal.filter((d) => d.firestoreId !== id);
    localStorage.setItem("listaEmpresas", JSON.stringify(novasEmpresasLocal));
    setListaEmpresas(novasEmpresasLocal);
    // setAtualizaEmpresas(atualizaEmpresas + 1);
  }

  async function removeExecutorFromFirestore(id) {
    try {
      await deleteDoc(doc(empresasRef, id)); // Usando a nova referência diligenciasRef
      return true;
    } catch (error) {
      console.error("Error deleting empresas from Firestore:", error);
      return false;
    }
  }

  return (
    <>
      <ContainerEmpresas>
        {listaEmpresas.map((item) => (
          <CardEmpresa key={item.firestoreId} {...item} handleDeleteExecutor={handleDeleteExecutor} />
        ))}
      </ContainerEmpresas>
    </>
  );
}
