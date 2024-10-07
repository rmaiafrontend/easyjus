import { useState, useEffect, useContext } from "react";
import { Card, LeftInfo, Status } from "./style";
import { db } from "../../../services/firebaseconfig";
import { doc, updateDoc, addDoc, collection, deleteDoc, query, where, getDocs } from "firebase/firestore";
import { AuthContext } from "../../../contexts/AuthContext";

export function CardDiligencia({
  comissaoExecutor,
  idResponsavel,
  idCliente,
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
  const [fetch, setFetch] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(status);
  const { user, dispatch } = useContext(AuthContext);

  useEffect(() => {
    // Chama a função de atualização do status no Firebase sempre que o currentStatus mudar
    if (fetch) {
      atualizaStatusFirebase(currentStatus);
    }
  }, [currentStatus]);

  function handleClick() {
    atualizaInfos(currentStatus);
    setShowInfos(true);
  }

  function atualizaInfos(status) {
    setSelectedDiligencia({
      comissaoExecutor,
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
    setFetch(true);
  }

  async function atualizaStatusFirebase(novoStatus) {
    const diligenciaRef = doc(db, "users", user.uid, "diligencias", firestoreId);

    if (status === "Finalizado" && novoStatus != "Finalizado") {
      excluiDiligenciaFinalizada();
    }

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

    if (novoStatus === "Finalizado") {
      registraDiligenciaFinalizada();
    }
  }

  async function registraDiligenciaFinalizada() {
    const userRef = doc(db, "users", user.uid);
    const clienteRef = collection(userRef, "empresas", idCliente, "diligenciasFinalizadas");
    const executorRef = collection(userRef, "executores", idResponsavel, "diligenciasFinalizadas");

    const docDataCliente = {
      idDiligencia: firestoreId,
      tipo: tipo,
      data: data,
      hora: hora,
      valor: valor,
      executor: responsavel,
    };

    const docDataExecutor = {
      idDiligencia: firestoreId,
      tipo: tipo,
      data: data,
      hora: hora,
      valor: comissaoExecutor,
      cliente: cliente,
    };

    // Adicione o documento ao Firestore e obtenha o ID gerado
    const docCliente = await addDoc(clienteRef, docDataCliente);
    const docResponsavel = await addDoc(executorRef, docDataExecutor);
  }

  async function excluiDiligenciaFinalizada() {
    console.log("chamou excluiDiligenciaFinalizada");

    const userRef = doc(db, "users", user.uid);
    const clienteRef = collection(userRef, "empresas", idCliente, "diligenciasFinalizadas");
    const executorRef = collection(userRef, "executores", idResponsavel, "diligenciasFinalizadas");

    const queryClientes = query(clienteRef, where("idDiligencia", "==", firestoreId));

    const querySnapshotClientes = await getDocs(queryClientes);

    // Usar forEach com uma função assíncrona dentro
    querySnapshotClientes.forEach(async (documento) => {
      console.log(documento.id, " => ", documento.data());
      // Usar await para garantir que a exclusão seja concluída antes de continuar
      await deleteDoc(doc(clienteRef, documento.id));
    });

    const queryExecutor = query(executorRef, where("idDiligencia", "==", firestoreId));

    const querySnapshotExecutor = await getDocs(queryExecutor);

    // Usar forEach com uma função assíncrona dentro
    querySnapshotExecutor.forEach(async (documento) => {
      console.log(documento.id, " => ", documento.data());
      // Usar await para garantir que a exclusão seja concluída antes de continuar
      await deleteDoc(doc(executorRef, documento.id));
    });
  }

  return (
    <>
      <Card status={currentStatus}>
        <LeftInfo onClick={handleClick}>
          <ul>
            <li className="tipo">{tipo}</li>
            <li className="cliente">{cliente}</li>
            <li className="responsavel">{responsavel}</li>
            <li className="data">{data}</li>
            <li className="local">{local}</li>
            <li className="cidade">{cidade}</li>
            <li className="valor">{valor}</li>
          </ul>
        </LeftInfo>
        <Status status={currentStatus} onClick={handleStatusClick}>
          <span>{currentStatus}</span>
        </Status>
      </Card>
    </>
  );
}
