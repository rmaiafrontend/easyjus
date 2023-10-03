import { Overlay, Form, TopContent, MidContent, Container, Button, CloseButton, BottonContent, ButtonDelete, Document, Upload, Load, DeleteFile } from "./style";
import CampoInput from "../../Controllers/campoCadastro";
import CloseIcon from "../../../assets/close-icon.svg";
import { useEffect, useState, useContext } from "react";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import Loader from "../../../assets/loader.gif";
import { doc, updateDoc, getFirestore, arrayUnion, getDoc } from "firebase/firestore";
import { db } from "../../../services/firebaseconfig";
import { AuthContext } from "../../../contexts/AuthContext";

export function InfosDiligencia({ closeInfos, diligencia, handleDeleteDiligencia, showEdition, setAtualizaDiligencias, atualizaDiligencias }) {
  const [fileList, setFileList] = useState([]); // Lista de arquivos anexadoss
  const [uploading, setUploading] = useState(false);

  const { user, dispatch } = useContext(AuthContext);

  const userRef = doc(db, "users", user.uid); // Crie uma referência ao documento do usuário

  useEffect(() => {
    // Função para buscar as informações do localStorage e preencher o estado fileList
    const loadFileListFromLocalStorage = () => {
      const listaNoLocalStorage = JSON.parse(localStorage.getItem("listaDiligencias")) || [];

      // Encontre o documento correspondente pelo firestoreId
      const documentoEncontrado = listaNoLocalStorage.find((documento) => documento.firestoreId === diligencia.firestoreId);

      if (documentoEncontrado) {
        setFileList(documentoEncontrado.docs);
      } else {
        // Se não houver informações no localStorage, busque do Firebase
        const firestore = getFirestore();
        const documentoRef = doc(firestore, userRef, "diligencias", diligencia.firestoreId);

        getDoc(documentoRef)
          .then((docSnap) => {
            if (docSnap.exists()) {
              const data = docSnap.data();
              const firebaseFileList = data.docs || [];

              setFileList(firebaseFileList);
            }
          })
          .catch((error) => {
            console.error("Error fetching data from Firebase:", error);
          });
      }
    };

    // Carregue as informações do localStorage quando o componente for montado
    loadFileListFromLocalStorage();
  }, [diligencia.firestoreId]);

  const handleClick = () => {
    closeInfos(false);
  };

  const handleFileUpload = async (e) => {
    const storage = getStorage();
    const file = e.target.files[0];
    const storageRef = ref(storage, `docs/${diligencia.firestoreId}/${file.name}`);

    try {
      setUploading(true);

      const snapshot = await uploadBytes(storageRef, file);
      console.log("Uploaded a blob or file!");

      const downloadURL = await getDownloadURL(storageRef);

      // Atualize a lista de documentos no Firestore com as informações do documento
      const documentoRef = doc(userRef, "diligencias", diligencia.firestoreId);
      const newDocument = { name: file.name, downloadURL };

      await updateDoc(documentoRef, {
        docs: arrayUnion(newDocument),
      });

      // Atualize o estado fileList corretamente
      setFileList((prevFileList) => [...prevFileList, newDocument]);

      // Atualize o localStorage após obter o downloadURL
      let listaNoLocalStorage = JSON.parse(localStorage.getItem("listaDiligencias")) || [];
      const documentoEncontrado = listaNoLocalStorage.find((documento) => documento.firestoreId === diligencia.firestoreId);

      if (documentoEncontrado) {
        // O documento já existe na lista
        if (!documentoEncontrado.docs.some((doc) => doc.downloadURL === downloadURL)) {
          // O link não está presente, então adicionamos
          documentoEncontrado.docs.push(newDocument);
          localStorage.setItem("listaDiligencias", JSON.stringify(listaNoLocalStorage));
        }
      } else {
        // O documento não existe na lista, então o adicionamos com o primeiro link
        listaNoLocalStorage.push({
          firestoreId: diligencia.firestoreId,
          docs: [newDocument], // Incluímos o primeiro link aqui
        });
        localStorage.setItem("listaDiligencias", JSON.stringify(listaNoLocalStorage));
      }

      setUploading(false);
      setAtualizaDiligencias(atualizaDiligencias + 1);
    } catch (error) {
      // Handle errors
      console.error("Error uploading file:", error);
      setUploading(false);
    }
  };

  const handleDeleteFile = async (file) => {
    // Crie uma referência para o arquivo no Storage
    const storage = getStorage();
    const storageRef = ref(storage, `docs/${diligencia.firestoreId}/${file.name}`);

    try {
      // Delete o arquivo do Storage
      await deleteObject(storageRef);

      // Atualize o estado fileList para refletir a exclusão do arquivo
      setFileList((prevFileList) => prevFileList.filter((item) => item !== file));

      // Atualize o Firestore removendo o arquivo da lista
      const documentoRef = doc(userRef, "diligencias", diligencia.firestoreId);
      await updateDoc(documentoRef, {
        docs: diligencia.docs.filter((docItem) => docItem.name !== file.name),
      });

      // Atualize o localStorage removendo o arquivo da lista
      const listaNoLocalStorage = JSON.parse(localStorage.getItem("listaDiligencias")) || [];
      const documentoEncontrado = listaNoLocalStorage.find((documento) => documento.firestoreId === diligencia.firestoreId);

      if (documentoEncontrado) {
        documentoEncontrado.docs = documentoEncontrado.docs.filter((docItem) => docItem.name !== file.name);
        localStorage.setItem("listaDiligencias", JSON.stringify(listaNoLocalStorage));
      }
      setAtualizaDiligencias(atualizaDiligencias + 1);
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };

  function handleDownload(link) {
    // Crie um elemento 'a' temporário
    const tempLink = document.createElement("a");
    tempLink.href = link; // Defina o atributo 'href' com o link
    tempLink.target = "_blank"; // Abra em uma nova guia
    tempLink.rel = "noopener noreferrer"; // Defina os atributos 'rel'
    tempLink.download = true; // Adicione o atributo de download

    // Remova o elemento 'a' temporário
    tempLink.remove();
  }
  return (
    <>
      <Overlay>
        <Form>
          <CloseButton onClick={handleClick}>
            <img src={CloseIcon} alt="" />
          </CloseButton>
          <h3>
            Número do processo: <span>{diligencia.numeroProcesso}</span>
          </h3>
          <Container>
            <TopContent>
              <div className="left">
                <CampoInput label="Tipo" value={diligencia.tipo} readOnly="true" />
                <CampoInput label="Data" value={diligencia.data} readOnly="true" />
                <CampoInput label="Local" value={diligencia.cidade} readOnly="true" />
              </div>
              <div className="right">
                <CampoInput label="Orgão" value={diligencia.local} readOnly="true" />
                <CampoInput label="Hora" value={diligencia.hora} readOnly="true" />
                <CampoInput label="Valor" value={diligencia.valor} readOnly="true" />
              </div>
            </TopContent>
            <MidContent>
              <CampoInput label="Parte Interessada" value={diligencia.parteInteressada} readOnly="true" />
              <CampoInput label="Parte Contrária" value={diligencia.parteContraria} readOnly="true" />
              <CampoInput label="Responsável" value={diligencia.responsavel} readOnly="true" />
              <CampoInput label="Cliente" value={diligencia.cliente} readOnly="true" />
            </MidContent>
            <BottonContent>
              <h4>Documentos</h4>
              <label htmlFor="fileInput">Clique aqui para anexar um arquivo</label>

              <input
                className="inputFile"
                type="file"
                id="fileInput"
                name="uploaded"
                onChange={(e) => {
                  handleFileUpload(e);
                }}
              />
              {uploading && <Load src={Loader} />}
              {fileList.length > 0 && (
                <Upload>
                  {/* Lista os arquivos anexados */}
                  <span>Documentos anexados</span>
                  {fileList.map((file, index) => (
                    <Document key={index} onClick={handleDownload(file.downloadURL)}>
                      <a href={file.downloadURL} target="_blank" rel="noopener noreferrer" download>
                        {file.name}
                      </a>
                      <DeleteFile onClick={() => handleDeleteFile(file)}>Excluir</DeleteFile>
                    </Document>
                  ))}
                </Upload>
              )}
            </BottonContent>
          </Container>
          <Button onClick={showEdition}>Editar diligência</Button>
          <ButtonDelete onClick={handleDeleteDiligencia}>Excluir diligência</ButtonDelete>
        </Form>
      </Overlay>
    </>
  );
}
