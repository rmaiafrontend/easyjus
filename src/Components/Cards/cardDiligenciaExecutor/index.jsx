import { useState, useEffect, useContext } from "react";
import { Card, LeftInfo, Status } from "./style";
import { db } from "../../../services/firebaseconfig";
import { doc, updateDoc } from "firebase/firestore";
import { AuthContext } from "../../../contexts/AuthContext";

export function CardDiligenciaExecutor({ atualizaInfos, setAtualizaInfos, firestoreId, pagamentoExecutor, setShowInfos, tipo, cliente, data, local, cidade, valor }) {
  const [currentStatus, setCurrentStatus] = useState(pagamentoExecutor);
  const { user, dispatch } = useContext(AuthContext);

  useEffect(() => {
    // Chama a função de atualização do status no Firebase sempre que o currentStatus mudar
    atualizaStatusFirebase(currentStatus);
  }, [currentStatus]);

  function handleClick() {
    setShowInfos(true);
  }

  function handleStatusClick() {
    if (currentStatus === true) {
      setCurrentStatus(false);
    } else if (currentStatus === false) {
      setCurrentStatus(true);
    }
  }

  async function atualizaStatusFirebase(novoStatus) {
    const diligenciaRef = doc(db, "users", user.uid, "diligencias", firestoreId);
    if (novoStatus == false) {
      await updateDoc(diligenciaRef, {
        pagamentoExecutor: false,
      });
    } else if (novoStatus == true) {
      await updateDoc(diligenciaRef, {
        pagamentoExecutor: true,
      });
    }

    // Atualize o status no elemento correspondente no localStorage
    const localStorageData = localStorage.getItem("listaDiligencias");
    const listaDiligenciasLocal = localStorageData ? JSON.parse(localStorageData) : [];

    // Encontre a diligência correspondente no array do localStorage com base no firestoreId
    const diligenciaToUpdate = listaDiligenciasLocal.find((diligencia) => diligencia.firestoreId === firestoreId);

    // Se encontrarmos a diligência, atualize o status no objeto do localStorage
    if (diligenciaToUpdate) {
      if (novoStatus == true) {
        diligenciaToUpdate.pagamentoExecutor = true;
      } else if (novoStatus == false) {
        diligenciaToUpdate.pagamentoExecutor = false;
      }

      // Atualize o localStorage com a lista de diligências atualizada
      localStorage.setItem("listaDiligencias", JSON.stringify(listaDiligenciasLocal));
    }
    setAtualizaInfos(!atualizaInfos);
  }

  return (
    <>
      <Card status={currentStatus}>
        <LeftInfo onClick={handleClick}>
          <ul>
            <li>{tipo}</li>
            <li>{cliente}</li>
            <li>{data}</li>
            <li>{local}</li>
            <li>{cidade}</li>
            <li>{valor}</li>
          </ul>
        </LeftInfo>
        <Status status={currentStatus} onClick={handleStatusClick}>
          <span>{currentStatus ? "Realizado" : "Pendente"}</span>
        </Status>
      </Card>
    </>
  );
}
