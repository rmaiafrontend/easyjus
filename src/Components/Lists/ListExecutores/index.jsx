import { useEffect, useState, useContext } from "react";
import { ContainerExecutores } from "./Style";
import { AuthContext } from "../../../contexts/AuthContext";
import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../services/firebaseconfig";
import { CardExecutor } from "../../Cards/cardExecutor";
import { InfosExecutorNew } from "../../Cards/infosExecutor copy";

export function ListExecutores({ setatualizaExecutores, atualizaExecutores }) {
  const { user, dispatch } = useContext(AuthContext);
  const userRef = doc(db, "users", user.uid);
  const executoresRef = collection(userRef, "executores");

  const [listaExecutores, setListaExecutores] = useState([]);
  const [showInfosExecutor, setShowInfosExecutor] = useState(false);
  const [selectedExecutor, setSelectedExecutor] = useState();

  useEffect(() => {
    getExecutores();
  }, [atualizaExecutores]);

  function getExecutores() {
    const sessionStorageData = sessionStorage.getItem("listaExecutores");
    if (sessionStorageData) {
      const executoresData = JSON.parse(sessionStorageData);
      setListaExecutores(executoresData);
    } else {
      const unsubscribe = onSnapshot(executoresRef, (snapshot) => {
        const executoresData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setListaExecutores(executoresData);
        sessionStorage.setItem("listaExecutores", JSON.stringify(executoresData));
      });
    }
  }

  async function handleDeleteExecutor(id) {
    const result = confirm("Deseja realmente deletar o executor?");
    if (result) {
      const removedFromFirestore = await removeExecutorFromFirestore(id);
      if (removedFromFirestore) {
        const removedFromStorage = await removeExecutorFromSessionStorage(id);
      }
    }
  }

  async function removeExecutorFromSessionStorage(id) {
    const sessionStorageData = sessionStorage.getItem("listaExecutores");
    const listaExecutoresSession = sessionStorageData ? JSON.parse(sessionStorageData) : [];
    const novosExecutoresSession = listaExecutoresSession.filter((d) => d.id !== id);
    sessionStorage.setItem("listaExecutores", JSON.stringify(novosExecutoresSession));
    setListaExecutores(novosExecutoresSession);
    setatualizaExecutores(atualizaExecutores + 1);
  }

  async function removeExecutorFromFirestore(id) {
    try {
      await deleteDoc(doc(executoresRef, id));
      return true;
    } catch (error) {
      console.error("Erro ao deletar executor do Firestore:", error);
      return false;
    }
  }

  return (
    <>
      <ContainerExecutores>
        {listaExecutores.map((item) => (
          <CardExecutor key={item.id} {...item} handleDeleteExecutor={handleDeleteExecutor} setShowInfosExecutor={setShowInfosExecutor} setSelectedExecutor={setSelectedExecutor} />
        ))}
        {showInfosExecutor && <InfosExecutorNew setShowInfosExecutor={setShowInfosExecutor} selectedExecutor={selectedExecutor} />}
      </ContainerExecutores>
    </>
  );
}
