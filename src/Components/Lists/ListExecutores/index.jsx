import { useEffect, useState, useContext } from "react";
import { ContainerExecutores } from "./Style";
import { AuthContext } from "../../../contexts/AuthContext";
import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../services/firebaseconfig";
import { CardExecutor } from "../../Cards/cardExecutor";

export function ListExecutores({ setatualizaExecutores, atualizaExecutores }) {
  const { user, dispatch } = useContext(AuthContext);
  const userRef = doc(db, "users", user.uid); // Crie uma referência ao documento do usuário
  const executoresRef = collection(userRef, "executores"); // Crie uma referência à subcoleção "diligencias"

  const [listaExecutores, setListaExecutores] = useState([]);

  useEffect(() => {
    getExecutores();
  }, [atualizaExecutores]);

  function getExecutores() {
    const localStorageData = localStorage.getItem("listaExecutores");
    if (localStorageData) {
      const executoresData = JSON.parse(localStorageData);
      setListaExecutores(executoresData);
    } else {
      const unsubscribe = onSnapshot(executoresRef, (snapshot) => {
        // Usando a nova referência diligenciasRef
        const executoresData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setListaExecutores(executoresData);
        localStorage.setItem("listaExecutores", JSON.stringify(executoresData));
      });
    }
  }

  async function handleDeleteExecutor(id) {
    console.log("chamou a função!", id);
    const removedFromFirestore = await removeExecutorFromFirestore(id);
    if (removedFromFirestore) {
      const removedFromStorage = await removeExecutorFromLocalStorage(id);
    }
  }

  async function removeExecutorFromLocalStorage(id) {
    const localStorageData = localStorage.getItem("listaExecutores");
    const listaExecutoresLocal = localStorageData ? JSON.parse(localStorageData) : [];
    const novosExecutoresLocal = listaExecutoresLocal.filter((d) => d.id !== id);
    localStorage.setItem("listaExecutores", JSON.stringify(novosExecutoresLocal));
    setListaExecutores(novosExecutoresLocal);
    setatualizaExecutores(atualizaExecutores + 1);
  }

  async function removeExecutorFromFirestore(id) {
    try {
      await deleteDoc(doc(executoresRef, id)); // Usando a nova referência diligenciasRef
      return true;
    } catch (error) {
      console.error("Error deleting diligencia from Firestore:", error);
      return false;
    }
  }

  return (
    <>
      <ContainerExecutores>
        {listaExecutores.map((item) => (
          <CardExecutor key={item.id} {...item} handleDeleteExecutor={handleDeleteExecutor} />
        ))}
      </ContainerExecutores>
    </>
  );
}
