import { useState, useEffect, useContext } from "react";
import { Overlay, Form, LeftContent, RightContent, Container, Button, CloseButton, Campo, Title, Input, Select, Dropdown, Options } from "./style";
import CloseIcon from "../../../assets/close-icon.svg";
import { db, timestamp } from "../../../services/firebaseconfig";
import { AuthContext } from "../../../contexts/AuthContext";

import { doc, addDoc, collection, getDocs, setDoc } from "firebase/firestore";

export function FormDiligencia({ setShowElement, setFirebaseDataLoaded, firebaseDataLoaded }) {
  const { user, dispatch } = useContext(AuthContext);

  const [numProcesso, setNumProcesso] = useState("");
  const [tipo, setTipo] = useState("");
  const [data, setData] = useState("");
  const [cidade, setCidade] = useState("");
  const [local, setLocal] = useState("");
  const [hora, setHora] = useState("");
  const [interessada, setInteressada] = useState("");
  const [contraria, setContraria] = useState("");
  const [responsavel, setResponsavel] = useState("");
  const [cliente, setCliente] = useState("");
  const [valor, setValor] = useState("");

  const [isActiveTipo, setIsActiveTipo] = useState(false);
  const [isActiveResponsavel, setIsActiveResponsavel] = useState(false);
  const [isActiveCliente, setIsActiveCliente] = useState(false);

  const [listaTipos, setListaTipos] = useState();
  const [listaClientes, setListaClientes] = useState();
  const [listaResponsavel, setListaResponsavel] = useState();

  const userId = user.uid;

  const userRef = doc(db, "users", userId); // Crie uma referência ao documento do usuário
  const diligenciasRef = collection(userRef, "diligencias"); // Crie uma referência à subcoleção "diligencias"

  useEffect(() => {
    const fetchData = async (queryPath, stateSetter) => {
      try {
        const querySnapshot = await getDocs(collection(db, ...queryPath));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        stateSetter(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(["users", userId, "tipoDiligencia"], setListaTipos);
    fetchData(["users", userId, "empresas"], setListaClientes);
    fetchData(["users", userId, "executores"], setListaResponsavel);
  }, []);

  const toggleButtonTipo = (event) => {
    event.preventDefault();
    setIsActiveTipo((prevState) => !prevState);
  };

  const toggleButtonResponsavel = (event) => {
    event.preventDefault();
    setIsActiveResponsavel((prevState) => !prevState);
  };
  const toggleButtonCliente = (event) => {
    event.preventDefault();
    setIsActiveCliente((prevState) => !prevState);
  };

  function changeOption(option, campo) {
    if (campo === "Cliente") {
      setCliente(option);
      setIsActiveCliente(false);
    } else if (campo === "Tipo") {
      setTipo(option);
      setIsActiveTipo(false);
    } else if (campo === "Responsavel") {
      setResponsavel(option);
      setIsActiveResponsavel(false);
    }
  }

  function handleClick() {
    setShowElement(false);
  }

  function converterFormatoData(dataStr) {
    const partes = dataStr.split("-");
    let ano = "ano";
    let mes = "mes";
    let dia = "dia";

    for (let i = 0; i < partes.length; i++) {
      if (i == 0) {
        ano = partes[0];
      }
      if (i == 1) {
        mes = partes[1];
      }
      if (i == 2) {
        dia = partes[2];
      }
    }
    const dataFormarada = `${dia}/${mes}/${ano}`;
    return dataFormarada;
  }

  function handleDateChange(event) {
    setData(event.target.value);
  }

  function handleTimeChange(event) {
    setHora(event.target.value); // Captura o valor da hora
  }

  // Combine data e hora

  async function submitForm(event) {
    try {
      event.preventDefault();

      // Obtenha o valor dos campos antes de limpá-los
      const numProcessoValue = numProcesso;
      const tipoValue = tipo;
      const dataValue = data;
      const horaValue = hora;
      const cidadeValue = cidade;
      const localValue = local;
      const interessadaValue = interessada;
      const contrariaValue = contraria;
      const responsavelValue = responsavel;
      const clienteValue = cliente;
      const valorValue = parseInt(valor);

      // Converter o formato da data
      const dataForm = await converterFormatoData(dataValue);

      const createdAt = timestamp;

      // Crie o objeto docData
      const docData = {
        createdAt: createdAt,
        numeroProcesso: numProcessoValue,
        tipo: tipoValue,
        data: dataForm,
        hora: horaValue,
        cidade: cidadeValue,
        local: localValue,
        parteInteressada: interessadaValue,
        parteContraria: contrariaValue,
        responsavel: responsavelValue,
        cliente: clienteValue,
        valor: valorValue,
        status: "Pendente",
        pagamentoExecutor: false,
        pagamentoEmpresa: false,
        docs: [],
      };

      // Verifique se já existe uma diligência com o mesmo localId no localStorage
      const localStorageData = localStorage.getItem("listaDiligencias");
      const listaDiligenciasLocal = localStorageData ? JSON.parse(localStorageData) : [];

      // Adicione o documento ao Firestore e obtenha o ID gerado
      const docRef = await addDoc(diligenciasRef, docData);

      // Adicione o Firestore document ID (firestoreId) ao objeto docData
      docData.firestoreId = docRef.id;

      // Salve o objeto docData no Firestore novamente para incluir o firestoreId
      await setDoc(doc(diligenciasRef, docRef.id), docData);

      // Salve o novo registro no localStorage
      listaDiligenciasLocal.unshift(docData);
      localStorage.setItem("listaDiligencias", JSON.stringify(listaDiligenciasLocal));

      alert("Diligência cadastrada com sucesso!");
      setShowElement(false);

      // Atualize o estado após concluir as operações assíncronas
      setFirebaseDataLoaded(firebaseDataLoaded + 1);
    } catch (error) {
      console.error("Ocorreu um erro ao cadastrar a diligência:", error);
    }
  }

  return (
    <>
      <Overlay>
        <Form>
          <CloseButton onClick={handleClick}>
            <img src={CloseIcon} alt="" />
          </CloseButton>
          <h2>Cadastro de diligência</h2>

          <Container>
            <LeftContent>
              <Campo>
                <Title>
                  <span>N. do Processo</span>
                </Title>
                <Input placeholder={"Ex: 25.009.001.22-0000276"} value={numProcesso} onChange={(e) => setNumProcesso(e.target.value)} />
              </Campo>
              <Campo>
                <Title>
                  <span>Tipo</span>
                </Title>
                <Dropdown>
                  <Select readOnly type="text" placeholder="Escolha uma opção" value={tipo} onClick={(event) => toggleButtonTipo(event)} />
                  {isActiveTipo && (
                    <Options>
                      {listaTipos.map((item) => (
                        <li key={item.id} onClick={() => changeOption(item.tipo, "Tipo")}>
                          {item.tipo}
                        </li>
                      ))}
                    </Options>
                  )}
                </Dropdown>
              </Campo>
              <Campo>
                <Title>
                  <span>Data</span>
                </Title>
                <Input label="Data" type="date" id="dateField" value={data} onChange={handleDateChange} />
              </Campo>
              <Campo>
                <Title>
                  <span>Hora</span>
                </Title>
                <Input type="time" id="hora" name="hora" value={hora} onChange={handleTimeChange} />
              </Campo>
              <Campo>
                <Title>
                  <span>Local</span>
                </Title>
                <Input placeholder={"Ex: Procon"} value={local} onChange={(e) => setLocal(e.target.value)} />
              </Campo>
              <Campo>
                <Title>
                  <span>Cidade</span>
                </Title>
                <Input placeholder={"Ex: Campina Grande - PB"} value={cidade} onChange={(e) => setCidade(e.target.value)} />
              </Campo>
            </LeftContent>
            <RightContent>
              <Campo>
                <Title>
                  <span>Parte interessada</span>
                </Title>
                <Input placeholder={"Ex: Banco Mercantil do Brasil S/A"} value={interessada} onChange={(e) => setInteressada(e.target.value)} />
              </Campo>
              <Campo>
                <Title>
                  <span>Parte contrária</span>
                </Title>
                <Input placeholder={"Ex: Thiago Costa Ferreira"} value={contraria} onChange={(e) => setContraria(e.target.value)} />
              </Campo>
              <Campo>
                <Title>
                  <span>Responsável</span>
                </Title>
                <Dropdown>
                  <Select type="text" readOnly placeholder="Escolha uma opção" value={responsavel} onClick={(event) => toggleButtonResponsavel(event, "Responsavel")} />
                  {isActiveResponsavel && (
                    <Options>
                      {listaResponsavel.map((item) => (
                        <li key={item.id} onClick={() => changeOption(item.nome, "Responsavel")}>
                          {item.nome}
                        </li>
                      ))}
                    </Options>
                  )}
                </Dropdown>
              </Campo>
              <Campo>
                <Title>
                  <span>Empresa</span>
                </Title>
                <Dropdown>
                  <Select type="text" readOnly placeholder="Escolha uma opção" value={cliente} onClick={(event) => toggleButtonCliente(event, "Cliente")} />
                  {isActiveCliente && (
                    <Options>
                      {listaClientes.map((item) => (
                        <li key={item.id} onClick={() => changeOption(item.nome, "Cliente")}>
                          {item.nome}
                        </li>
                      ))}
                    </Options>
                  )}
                </Dropdown>
              </Campo>
              <Campo>
                <Title>
                  <span>Valor</span>
                </Title>
                <Input type="number" placeholder={"Ex: 150,00"} value={valor} onChange={(e) => setValor(e.target.value)} />
              </Campo>
            </RightContent>
          </Container>
          <Button type="submit" onClick={(e) => submitForm(e)}>
            Cadastrar diligência
          </Button>
        </Form>
      </Overlay>
    </>
  );
}

export default FormDiligencia;
