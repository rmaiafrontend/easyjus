import { useEffect, useState, useContext } from "react";
import { Container } from "./Style";
import { AuthContext } from "../../../contexts/AuthContext";
import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../services/firebaseconfig";
import { CardEmpresa } from "../../Cards/cardEmpresa";
import { InfosEmpresas } from "../../Cards/infosEmpresas";

export function ListEmpresas({ setAtualizaEmpresas, atualizaEmpresas }) {
  const { user, dispatch } = useContext(AuthContext);
  const userRef = doc(db, "users", user.uid);
  const empresasRef = collection(userRef, "empresas");

  const [listaEmpresas, setListaEmpresas] = useState([]);
  const [showInfosEmpresa, setShowInfosEmpresa] = useState(false);
  const [selectedEmpresa, setSelectedEmpresa] = useState();

  useEffect(() => {
    getEmpresas();
  }, [atualizaEmpresas]);

  function getEmpresas() {
    const sessionStorageData = sessionStorage.getItem("listaEmpresas");
    if (sessionStorageData) {
      const empresasData = JSON.parse(sessionStorageData);
      setListaEmpresas(empresasData);
    } else {
      const unsubscribe = onSnapshot(empresasRef, (snapshot) => {
        const empresasData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setListaEmpresas(empresasData);
        sessionStorage.setItem("listaEmpresas", JSON.stringify(empresasData));
      });
    }
  }

  async function handleDeleteEmpresa(id) {
    const result = confirm("Deseja realmente deletar a empresa?");
    if (result) {
      const removedFromFirestore = await removeEmpresaFromFirestore(id);
      if (removedFromFirestore) {
        const removedFromStorage = await removeEmpresaFromSessionStorage(id);
      }
    }
  }

  async function removeEmpresaFromSessionStorage(id) {
    const sessionStorageData = sessionStorage.getItem("listaEmpresas");
    const listaEmpresasSession = sessionStorageData ? JSON.parse(sessionStorageData) : [];
    const novasEmpresasSession = listaEmpresasSession.filter((d) => d.id !== id);
    sessionStorage.setItem("listaEmpresas", JSON.stringify(novasEmpresasSession));
    setListaEmpresas(novasEmpresasSession);
    setAtualizaEmpresas(atualizaEmpresas + 1);
  }

  async function removeEmpresaFromFirestore(id) {
    try {
      await deleteDoc(doc(empresasRef, id));
      return true;
    } catch (error) {
      console.error("Error deleting empresas from Firestore:", error);
      return false;
    }
  }

  return (
    <>
      <Container>
        {listaEmpresas.map((item) => (
          <CardEmpresa key={item.id} {...item} handleDeleteEmpresa={handleDeleteEmpresa} setShowInfosEmpresa={setShowInfosEmpresa} setSelectedEmpresa={setSelectedEmpresa} />
        ))}
        {showInfosEmpresa && <InfosEmpresas setShowInfosEmpresa={setShowInfosEmpresa} selectedEmpresa={selectedEmpresa} />}
      </Container>
    </>
  );
}
