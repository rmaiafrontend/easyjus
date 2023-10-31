import { useState, useContext, useEffect } from "react";
import { Overlay, Form, LeftContent, RightContent, Container, Button, CloseButton, Upload } from "./style";
import CampoInput from "../../Controllers/campoCadastro";
import CloseIcon from "../../../assets/close-icon.svg";
import { db, timestamp } from "../../../services/firebaseconfig";
import { doc, addDoc, collection, setDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { AuthContext } from "../../../contexts/AuthContext";

export function FormExecutor({ setShowElement, setatualizaExecutores, atualizaExecutores }) {
  const { user, dispatch } = useContext(AuthContext);
  const storage = getStorage();

  // Adicione o executor à lista de executores no localStorage ao ser cadastrado
  const localStorageData = localStorage.getItem("listaExecutores");
  const listaExecutoresLocal = localStorageData ? JSON.parse(localStorageData) : [];

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [oab, setOab] = useState("");
  const [contato, setContato] = useState("");
  const [foto, setFoto] = useState();
  const [infoDeposito, setInfoDeposito] = useState("");

  const userRef = doc(db, "users", user.uid); // Crie uma referência ao documento do usuário
  const executoresRef = collection(userRef, "executores"); // Crie uma referência à subcoleção "diligencias"

  // Estado para armazenar a lista de executores
  const [listaExecutores, setListaExecutores] = useState([]);

  function handleClick() {
    setShowElement(false);
  }

  useEffect(() => {
    // // Carregue a lista de executores do localStorage ao montar o componente
    // const localStorageData = localStorage.getItem("listaExecutores");
    // const listaExecutoresLocal = localStorageData ? JSON.parse(localStorageData) : [];
    // setListaExecutores(listaExecutoresLocal);
  }, []);

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
        const storageRef = ref(storage, `users/${user.uid}/profile/${file.name}`);
        const snapshot = await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);
        const newDocument = { name: file.name, downloadURL };
        docData.profileFoto = newDocument;
      }

      // Adicione o executor ao Firestore e obtenha o ID gerado
      const docRef = await addDoc(executoresRef, docData);

      // Adicione o Firestore document ID (firestoreId) ao objeto docData
      docData.id = docRef.id;

      listaExecutoresLocal.unshift(docData);

      await localStorage.setItem("listaExecutores", JSON.stringify(listaExecutoresLocal));

      setatualizaExecutores(atualizaExecutores + 1);
      alert("Executor cadastrado com sucesso!");
      setShowElement(false);
    } catch (error) {
      console.error("Ocorreu um erro ao cadastrar o executor:", error);
    }
  }

  return (
    <>
      <Overlay>
        <Form>
          <CloseButton onClick={handleClick}>
            <img src={CloseIcon} alt="" />
          </CloseButton>
          <h2>Cadastrar Executor</h2>

          <Container>
            <LeftContent>
              <CampoInput label="Nome" placeholder="Ex: Ricardo Petrônio" value={nome} onChange={(e) => setNome(e.target.value)} />
              <CampoInput label="E-mail" placeholder="Ex: ricardo@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} />
              <CampoInput label="CPF" placeholder="Ex: 122.587.568-55" value={cpf} onChange={(e) => setCpf(e.target.value)} />
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
            Cadastrar Executor
          </Button>
        </Form>
      </Overlay>
    </>
  );
}

export default FormExecutor;
