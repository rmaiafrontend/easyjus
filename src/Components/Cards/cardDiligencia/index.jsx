import { useState, useEffect, useContext } from "react";
import { Card, LeftInfo, Status } from "./style";
import { db } from "../../../services/firebaseconfig";
import { doc, updateDoc } from "firebase/firestore";
import { AuthContext } from "../../../contexts/AuthContext";

export function CardDiligencia({
  docs,
  firestoreId,
  localId,
  setShowInfos,
  setSelectedDiligencia,
  tipo,
  cliente,
  responsavel,
  hora,
  data,
  local,
  cidade,
  valor,
  numeroProcesso,
  parteInteressada,
  parteContraria,
  id,
  status,
  setAtualizaDiligencias,
  atualizaDiligencias,
  listaDiligencias,
}) {
  const [currentStatus, setCurrentStatus] = useState(status);
  const { user, dispatch } = useContext(AuthContext);

  useEffect(() => {
    // Chama a função de atualização do status no Firebase sempre que o currentStatus mudar
    atualizaStatusFirebase(currentStatus);
  }, [currentStatus]);

  function handleClick() {
    atualizaInfos(currentStatus);
    setShowInfos(true);
  }

  function atualizaInfos(status) {
    setSelectedDiligencia({
      docs,
      firestoreId,
      localId,
      id,
      tipo,
      cliente,
      responsavel,
      hora,
      data,
      local,
      cidade,
      valor,
      numeroProcesso,
      parteInteressada,
      parteContraria,
      status,
    });
  }

  function handleStatusClick() {
    if (currentStatus === "Pendente") {
      setCurrentStatus("Enviado");
    } else if (currentStatus === "Enviado") {
      setCurrentStatus("Finalizado");
    } else {
      setCurrentStatus("Pendente");
    }
  }

  async function atualizaStatusFirebase(novoStatus) {
    const diligenciaRef = doc(db, "users", user.uid, "diligencias", firestoreId);

    await updateDoc(diligenciaRef, {
      status: novoStatus,
    });

    // Atualize o status no elemento correspondente no localStorage
    const localStorageData = localStorage.getItem("listaDiligencias");
    const listaDiligenciasLocal = localStorageData ? JSON.parse(localStorageData) : [];

    // Encontre a diligência correspondente no array do localStorage com base no firestoreId
    const diligenciaToUpdate = listaDiligenciasLocal.find((diligencia) => diligencia.firestoreId === firestoreId);

    // Se encontrarmos a diligência, atualize o status no objeto do localStorage
    if (diligenciaToUpdate) {
      diligenciaToUpdate.status = novoStatus;

      // Atualize o localStorage com a lista de diligências atualizada
      localStorage.setItem("listaDiligencias", JSON.stringify(listaDiligenciasLocal));
    }
    setAtualizaDiligencias(atualizaDiligencias + 1);
  }

  return (
    <>
      <Card status={currentStatus}>
        <LeftInfo onClick={handleClick}>
          <ul>
            <li>{tipo}</li>
            <li>{cliente}</li>
            <li>{responsavel}</li>
            <li>{data}</li>
            <li>{local}</li>
            <li>{cidade}</li>
            <li>{valor}</li>
          </ul>
        </LeftInfo>
        <Status status={currentStatus} onClick={handleStatusClick}>
          <span>{currentStatus}</span>
        </Status>
      </Card>
    </>
  );
}
