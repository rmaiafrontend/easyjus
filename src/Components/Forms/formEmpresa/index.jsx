import { useState, useContext, useEffect } from "react";
import { Overlay, Form, LeftContent, RightContent, Container, Button, CloseButton, Upload } from "./style";
import CampoInput from "../../Controllers/campoCadastro";
import CloseIcon from "../../../assets/close-icon.svg";
import { db, timestamp } from "../../../services/firebaseconfig";
import { doc, addDoc, collection, setDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { AuthContext } from "../../../contexts/AuthContext";

export function FormEmpresa({ setShowElement, setAtualizaEmpresas, atualizaEmpresas }) {
  const { user, dispatch } = useContext(AuthContext);
  const storage = getStorage();

  // Adicione o executor à lista de executores no localStorage ao ser cadastrado
  const localStorageData = localStorage.getItem("listaEmpresas");
  const listaEmpresasLocal = localStorageData ? JSON.parse(localStorageData) : [];

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [oab, setOab] = useState("");
  const [contato, setContato] = useState("");
  const [foto, setFoto] = useState();
  const [infoDeposito, setInfoDeposito] = useState("");

  const userRef = doc(db, "users", user.uid); // Crie uma referência ao documento do usuário
  const empresasRef = collection(userRef, "empresas"); // Crie uma referência à subcoleção "diligencias"

  function handleClick() {
    setShowElement(false);
  }

  async function submitForm(event) {
    try {
      event.preventDefault();

      // Obtenha o valor dos campos antes de limpá-los
      const nomeValue = nome;
      const emailValue = email;
      const cpfValue = cpf;
      const oabValue = oab;
      const contatoValue = contato;
      const fotoValue = foto;
      const infoDepositoValue = infoDeposito;

      // Crie o objeto docData
      const docData = {
        nome: nomeValue,
        email: emailValue,
        cpf: cpfValue,
        oab: oabValue,
        contato: contatoValue,
        infoDeposito: infoDepositoValue,
      };

      if (foto) {
        const file = foto[0];
        const storageRef = ref(storage, `users/${user.uid}/empresas/profile/${file.name}`);
        const snapshot = await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);
        const newDocument = { name: file.name, downloadURL };
        docData.profileFoto = newDocument;
      }

      // Adicione o executor ao Firestore e obtenha o ID gerado
      const docRef = await addDoc(empresasRef, docData);

      // Adicione o Firestore document ID (firestoreId) ao objeto docData
      docData.id = docRef.id;

      // Verifique se já existe uma lista de empresas no sessionStorage
      const sessionStorageData = sessionStorage.getItem("listaEmpresas");
      const listaEmpresasSession = sessionStorageData ? JSON.parse(sessionStorageData) : [];

      // Adicione a nova empresa à lista no sessionStorage
      listaEmpresasSession.unshift(docData);
      sessionStorage.setItem("listaEmpresas", JSON.stringify(listaEmpresasSession));

      setAtualizaEmpresas(atualizaEmpresas + 1);
      alert("Empresa cadastrada com sucesso!");
      setShowElement(false);
    } catch (error) {
      console.error("Ocorreu um erro ao cadastrar a empresa:", error);
    }
  }

  return (
    <>
      <Overlay>
        <Form>
          <CloseButton onClick={handleClick}>
            <img src={CloseIcon} alt="" />
          </CloseButton>
          <h2>Cadastrar Empresa</h2>

          <Container>
            <LeftContent>
              <CampoInput label="Nome" placeholder="Ex: Ricardo Petrônio" value={nome} onChange={(e) => setNome(e.target.value)} />
              <CampoInput label="E-mail" placeholder="Ex: ricardo@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} />
              <CampoInput label="CNPJ" placeholder="Ex: 23.131.587/0001-18" value={cpf} onChange={(e) => setCpf(e.target.value)} />
              <CampoInput label="OAB" placeholder="Ex:  UF999999" value={oab} onChange={(e) => setOab(e.target.value)} />
            </LeftContent>
            <RightContent>
              <CampoInput label="Contato" placeholder="Ex: (83) 98851-5487" value={contato} onChange={(e) => setContato(e.target.value)} />

              <CampoInput label="Info. de depósito" placeholder="Ex: Pix: 8315487489621" value={infoDeposito} onChange={(e) => setInfoDeposito(e.target.value)} />
              <Upload>
                <label htmlFor="fileInput">Adicione uma foto de perfil</label>
                <input
                  className="inputFile"
                  type="file"
                  id="fileInput"
                  name="uploaded"
                  onChange={(e) => {
                    setFoto(e.target.files);
                  }}
                />
                {foto && <p>Arquivo selecionado: {foto[0].name}</p>}
              </Upload>
            </RightContent>
          </Container>
          <Button type="submit" onClick={(e) => submitForm(e)}>
            Cadastrar Empresa
          </Button>
        </Form>
      </Overlay>
    </>
  );
}

export default FormEmpresa;
