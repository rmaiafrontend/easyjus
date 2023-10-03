import { useState, useContext, useEffect } from "react";
import { Overlay, Form, LeftContent, RightContent, Container, Button, CloseButton } from "./style";
import CampoInput from "../../Controllers/campoCadastro";
import CloseIcon from "../../../assets/close-icon.svg";
import { db, timestamp } from "../../../services/firebaseconfig";
import { doc, addDoc, collection, setDoc } from "firebase/firestore";
import { AuthContext } from "../../../contexts/AuthContext";

export function FormExecutor({ setShowElement }) {
  const { user, dispatch } = useContext(AuthContext);

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [oab, setOab] = useState("");
  const [contato, setContato] = useState("");
  const [foto, setFoto] = useState("");
  const [infoDeposito, setInfoDeposito] = useState("");
  const [valor, setValor] = useState("");

  // Estado para armazenar a lista de executores
  const [listaExecutores, setListaExecutores] = useState([]);

  function handleClick() {
    setShowElement(false);
  }

  useEffect(() => {
    // Carregue a lista de executores do localStorage ao montar o componente
    const localStorageData = localStorage.getItem("listaExecutores");
    const listaExecutoresLocal = localStorageData ? JSON.parse(localStorageData) : [];
    setListaExecutores(listaExecutoresLocal);
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
      const valorValue = parseFloat(valor);

      // Crie o objeto docData
      const docData = {
        nome: nomeValue,
        email: emailValue,
        cpf: cpfValue,
        oab: oabValue,
        contato: contatoValue,
        foto: fotoValue,
        infoDeposito: infoDepositoValue,
        valor: valorValue,
      };

      // Adicione o executor ao Firestore e obtenha o ID gerado
      const executoresRef = collection(db, "executores");
      const docRef = await addDoc(executoresRef, docData);

      // Adicione o Firestore document ID (firestoreId) ao objeto docData
      docData.firestoreId = docRef.id;

      // Salve o objeto docData no Firestore novamente para incluir o firestoreId
      await setDoc(doc(executoresRef, docRef.id), docData);

      alert("Executor cadastrado com sucesso!");
      setShowElement(false);

      // Adicione o executor à lista de executores no localStorage ao ser cadastrado
      const localStorageData = localStorage.getItem("listaExecutores");
      const listaExecutoresLocal = localStorageData ? JSON.parse(localStorageData) : [];

      listaExecutoresLocal.unshift(docData);
      localStorage.setItem("listaExecutores", JSON.stringify(listaExecutoresLocal));

      // Atualize o estado com a nova lista de executores
      setListaExecutores(listaExecutoresLocal);

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
              <CampoInput label="OAB" placeholder="Ex: ricardo@gmail.com" value={oab} onChange={(e) => setOab(e.target.value)} />
            </LeftContent>
            <RightContent>
              <CampoInput label="Contato" placeholder="Ex: (83) 98851-5487" value={contato} onChange={(e) => setContato(e.target.value)} />
              <CampoInput type="file" label="Foto" placeholder="Ex: ---" value={foto} onChange={(e) => setFoto(e.target.value)} />
              <CampoInput label="Info. de depósito" placeholder="Ex: ---" value={infoDeposito} onChange={(e) => setInfoDeposito(e.target.value)} />
              <CampoInput label="Valor" placeholder="Ex: R$150,00" value={valor} onChange={(e) => setValor(e.target.value)} />
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
