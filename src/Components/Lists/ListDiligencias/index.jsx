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

  const userRef = doc(db, "users", user.uid);
  const diligenciasRef = collection(userRef, "diligencias");

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
      return true;
    });

    setFilteredDiligencias(filtered);
  }, [listaDiligencias, filter]);

  async function removeDiligenciaFromSessionStorage(diligencia) {
    const sessionStorageData = sessionStorage.getItem("listaDiligencias");
    const listaDiligenciasSession = sessionStorageData ? JSON.parse(sessionStorageData) : [];
    const novasDiligenciasSession = listaDiligenciasSession.filter((d) => d.firestoreId !== diligencia.firestoreId);
    sessionStorage.setItem("listaDiligencias", JSON.stringify(novasDiligenciasSession));
  }

  async function removeDiligenciaFromFirestore(diligencia) {
    try {
      await deleteDoc(doc(diligenciasRef, diligencia.firestoreId));
      return true;
    } catch (error) {
      console.error("Erro ao deletar diligência do Firestore:", error);
      return false;
    }
  }

  async function removeDiligenciaFromStorage(diligenciaId) {
    try {
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
      console.error("Erro ao deletar diligência do Storage:", error);
      return false;
    }
  }

  async function handleDeleteDiligencia() {
    const removedFromFirestore = await removeDiligenciaFromFirestore(selectedDiligencia);
    if (removedFromFirestore) {
      const removedFromStorage = await removeDiligenciaFromStorage(selectedDiligencia.firestoreId);
      if (removedFromStorage) {
        removeDiligenciaFromSessionStorage(selectedDiligencia);
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
    const sessionStorageData = sessionStorage.getItem("listaDiligencias");
    if (sessionStorageData) {
      const diligenciasData = JSON.parse(sessionStorageData);
      setListaDiligencias(diligenciasData);
    } else {
      const unsubscribe = onSnapshot(diligenciasRef, (snapshot) => {
        const diligenciasData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setListaDiligencias(diligenciasData);
        sessionStorage.setItem("listaDiligencias", JSON.stringify(diligenciasData));
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
