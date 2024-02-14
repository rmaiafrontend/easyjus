import React, { useState, useEffect, useContext } from "react";
import { CardDiligencia } from "../../Cards/cardDiligencia";
import { InfosDiligencia } from "../../Cards/infosDiligencia";
import { ContainerDiligencias } from "./style";
import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../services/firebaseconfig";
import { EditDiligencia } from "../../Cards/editDiligencia";
import { getStorage, ref, deleteObject } from "firebase/storage";
import { AuthContext } from "../../../contexts/AuthContext";

export function ListDiligencias({ firebaseDataLoaded, filter }) {
  const { user, dispatch } = useContext(AuthContext);
  const [listaDiligencias, setListaDiligencias] = useState([]);
  const [showInfos, setShowInfos] = useState(false);
  const [selectedDiligencia, setSelectedDiligencia] = useState();
  const [isEditing, setIsEditing] = useState(false);
  const [atualizaDiligencias, setAtualizaDiligencias] = useState(0);
  const [filteredDiligencias, setFilteredDiligencias] = useState([]);

  const userRef = doc(db, "users", user.uid); // Crie uma referência ao documento do usuário
  const diligenciasRef = collection(userRef, "diligencias"); // Crie uma referência à subcoleção "diligencias"

  useEffect(() => {
    getDiligenciasFirebase();
  }, [firebaseDataLoaded, atualizaDiligencias, filter]);

  useEffect(() => {
    const filtered = listaDiligencias.filter((diligencia) => {
      if (filter === "Todas") {
        return true;
      } else if (filter === "Pendente") {
        return diligencia.status === "Pendente";
      } else if (filter === "Enviado") {
        return diligencia.status === "Enviado";
      } else if (filter === "Finalizado") {
        return diligencia.status === "Finalizado";
      }
      return true; // Filtro desconhecido, mostrar todas as diligências
    });

    setFilteredDiligencias(filtered);
  }, [listaDiligencias, filter]);

  async function removeDiligenciaFromLocalStorage(diligencia) {
    const localStorageData = localStorage.getItem("listaDiligencias");
    const listaDiligenciasLocal = localStorageData ? JSON.parse(localStorageData) : [];
    const novasDiligenciasLocal = listaDiligenciasLocal.filter((d) => d.firestoreId !== diligencia.firestoreId);
    localStorage.setItem("listaDiligencias", JSON.stringify(novasDiligenciasLocal));
  }

  async function removeDiligenciaFromFirestore(diligencia) {
    try {
      await deleteDoc(doc(diligenciasRef, diligencia.firestoreId)); // Usando a nova referência diligenciasRef
      return true;
    } catch (error) {
      console.error("Error deleting diligencia from Firestore:", error);
      return false;
    }
  }

  async function removeDiligenciaFromStorage(diligenciaId) {
    try {
      // Realize a busca da diligência no estado listaDiligencias usando o ID
      const diligencia = listaDiligencias.find((d) => d.firestoreId === diligenciaId);

      if (!diligencia) {
        console.error("Diligência não encontrada na lista.");
        return false;
      }

      const storage = getStorage();
      for (const docItem of diligencia.docs) {
        const storageRef = ref(storage, `users/${user.uid}/docs/${diligencia.firestoreId}/${docItem.name}`);
        await deleteObject(storageRef);
      }
      return true;
    } catch (error) {
      console.error("Error deleting diligencia from Storage:", error);
      return false;
    }
  }

  async function handleDeleteDiligencia() {
    const removedFromFirestore = await removeDiligenciaFromFirestore(selectedDiligencia);
    if (removedFromFirestore) {
      console.log(selectedDiligencia);
      const removedFromStorage = await removeDiligenciaFromStorage(selectedDiligencia.firestoreId);
      if (removedFromStorage) {
        removeDiligenciaFromLocalStorage(selectedDiligencia);
        alert("Diligência excluída com sucesso!");
        setListaDiligencias((prevDiligencias) => prevDiligencias.filter((d) => d.firestoreId !== selectedDiligencia.firestoreId));
        setShowInfos(false);
      } else {
        alert("Não foi possível excluir a diligência do Storage.");
      }
    } else {
      alert("Não foi possível excluir a diligência do Firestore.");
    }
  }

  function getDiligenciasFirebase() {
    const localStorageData = localStorage.getItem("listaDiligencias");
    if (localStorageData) {
      const diligenciasData = JSON.parse(localStorageData);
      setListaDiligencias(diligenciasData);
    } else {
      const unsubscribe = onSnapshot(diligenciasRef, (snapshot) => {
        // Usando a nova referência diligenciasRef
        const diligenciasData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setListaDiligencias(diligenciasData);
        localStorage.setItem("listaDiligencias", JSON.stringify(diligenciasData));
      });
    }
  }

  function showEdition() {
    setShowInfos(false);
    setIsEditing(true);
  }

  return (
    <>
      <ContainerDiligencias>
        {filteredDiligencias.map((item) => (
          <CardDiligencia
            key={item.firestoreId}
            {...item}
            listaDiligencias={listaDiligencias}
            setShowInfos={setShowInfos}
            setSelectedDiligencia={setSelectedDiligencia}
            setAtualizaDiligencias={setAtualizaDiligencias}
            atualizaDiligencias={atualizaDiligencias}
          />
        ))}
        {showInfos ? (
          <InfosDiligencia
            showEdition={showEdition}
            closeInfos={() => setShowInfos(false)}
            diligencia={selectedDiligencia}
            listaDiligencias={listaDiligencias}
            handleDeleteDiligencia={handleDeleteDiligencia}
            setAtualizaDiligencias={setAtualizaDiligencias}
            atualizaDiligencias={atualizaDiligencias}
          />
        ) : null}
        {isEditing ? (
          <EditDiligencia
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            closeInfos={() => setIsEditing(false)}
            diligencia={selectedDiligencia}
            setAtualizaDiligencias={setAtualizaDiligencias}
            setListaDiligencias={setListaDiligencias}
            listaDiligencias={listaDiligencias}
          />
        ) : null}
      </ContainerDiligencias>
    </>
  );
}
