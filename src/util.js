export async function atualizaStatusFirebase(novoStatus, firestoreId, status) {
  const diligenciaRef = doc(db, "users", user.uid, "diligencias", firestoreId);

  if (status === "Finalizado" && novoStatus != "Finalizado") {
    excluiDiligenciaFinalizada();
  }

  await updateDoc(diligenciaRef, {
    status: novoStatus,
  });

  // Atualize o status no elemento correspondente no localStorage
  const sessionStorageData = sessionStorage.getItem("listaDiligencias");
  const listaDiligenciasLocal = sessionStorage ? JSON.parse(sessionStorageData) : [];

  // Encontre a diligência correspondente no array do localStorage com base no firestoreId
  const diligenciaToUpdate = listaDiligenciasLocal.find((diligencia) => diligencia.firestoreId === firestoreId);

  // Se encontrarmos a diligência, atualize o status no objeto do localStorage
  if (diligenciaToUpdate) {
    diligenciaToUpdate.status = novoStatus;

    // Atualize o localStorage com a lista de diligências atualizada
    sessionStorage.setItem("listaDiligencias", JSON.stringify(listaDiligenciasLocal));
  }
  setAtualizaDiligencias(atualizaDiligencias + 1);

  if (novoStatus === "Finalizado") {
    registraDiligenciaFinalizada();
  }
}
