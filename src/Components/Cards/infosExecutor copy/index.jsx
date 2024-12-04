import {
  Box,
  Overlay,
  ImageExecutor,
  DadosExecutor,
  InfosExecutores,
  ListaDeDados,
  CardsContainer,
  Line,
  ContentDiligencias,
  Filters,
  FilterPeriodo,
  ButtonsPeriodo,
  ButtonsStatus,
  FilterStatus,
  TitlesList,
  Titles,
  Status,
  ListDiligenciasExecutor,
  Bar,
  LeftContent,
  RightContent,
  CloseButton,
  Campo,
  TitleFilter,
  FilterPagamento,
  ButtonStatusPagamento,
} from "./style";

import React, { useState, useEffect, useContext } from "react";
import { collection, onSnapshot, doc, addDoc, deleteDoc, where, query, getDocs } from "firebase/firestore";
import { db } from "../../../services/firebaseconfig";
import { format, getMonth, getYear } from "date-fns";
import userIcon from "../../../assets/userIcon.svg";
import CloseIcon from "../../../assets/close-icon.svg";
import { NumDiligenciasExecutor } from "../numDiligenciasExecutor";
import { CardPagamentosExecutor } from "../numPagamentosExecutor";
import { CardDiligenciaExecutor } from "../cardDiligenciaExecutor";
import { AuthContext } from "../../../contexts/AuthContext";
import { ptBR } from "date-fns/locale";
import { DropdownMesExecutor } from "../../Layout/DropdownMesExecutor";

export function InfosExecutorNew(props) {
  const { user, dispatch } = useContext(AuthContext);
  const backgroundUrl = props.selectedExecutor.profileFoto ? props.selectedExecutor.profileFoto.downloadURL : null;
  const userRef = doc(db, "users", user.uid); // Crie uma referência ao documento do usuário
  const diligenciasRef = collection(userRef, "diligencias"); // Crie uma referência à subcoleção "diligencias"

  //Listas de diligência
  const [listaDiligencias, setListaDiligencias] = useState([]);
  const [listaResultado, setListaResultado] = useState([]);

  const [diligenciasFetched, setDiligenciasFetched] = useState(false);
  const [extratoRealizados, setExtratoRealizados] = useState(0.0);

  const [pagamentosPendentes, setPagamentosPendentes] = useState(0);
  const [pagamentosRealizados, setPagamentoRealizados] = useState(0);

  const [mesSelecionado, setMesSelecionado] = useState();
  const [indexMes, setIndexMes] = useState();

  const [statusPagamento, setStatusPagamento] = useState("Pendente");
  const [fetchStatus, setFetchStatus] = useState(false);

  useEffect(() => {
    const currentMonth = new Date();
    const monthIndex = getMonth(currentMonth);
    const titleMonth = format(currentMonth, "MMMM", { locale: ptBR });
    const formattedMonthCapitalized = titleMonth.charAt(0).toUpperCase() + titleMonth.slice(1);
    setMesSelecionado(formattedMonthCapitalized);
    setIndexMes(monthIndex + 1);
  }, []);

  useEffect(() => {
    if (diligenciasFetched) {
      filtraDiligencias();
    } else {
      getDiligenciasFirebase();
    }
  }, [indexMes]);

  useEffect(() => {
    if (listaResultado) {
      setPagamentosPendentes(0);
      setPagamentoRealizados(0);
      atualizaExtrato();
    }
  }, [indexMes][listaResultado]);

  useEffect(() => {
    if (diligenciasFetched) {
      atualizaStatus();
    }
  }, [indexMes]);

  async function atualizaStatus() {
    const currentYear = new Date();
    const year = getYear(currentYear);
    const yearString = year.toString();
    const indexMesString = indexMes.toString();

    const financeiroRef = collection(userRef, "financeiro", yearString, indexMesString);
    const querySnapshot = await getDocs(financeiroRef);

    let contador = 0;

    // Iterar sobre os documentos no snapshot
    querySnapshot.forEach((doc) => {
      let nome = doc.data().nomeExecutor;
      console.log(nome);
      console.log(props.selectedExecutor.nome);
      if (nome === props.selectedExecutor.nome) {
        contador++;
      }
    });

    if (contador > 0) {
      setStatusPagamento("Realizado");
    } else {
      setStatusPagamento("Pendente");
    }

    setFetchStatus(true);
  }

  function atualizaExtrato() {
    let soma = 0;

    listaResultado.forEach((diligencia) => {
      soma += diligencia.comissaoExecutor;
    });

    if (statusPagamento === "Pendente") {
      setPagamentosPendentes(soma);
    } else if (statusPagamento === "Realizado") {
      setPagamentoRealizados(soma);
    }

    return soma;
  }

  async function handleClickStatus() {
    let valor = 0;
    if (statusPagamento === "Realizado") {
      setStatusPagamento("Pendente");
      deletePagamentoMes();
    } else if (statusPagamento === "Pendente") {
      setStatusPagamento("Realizado");
      let valor = atualizaExtrato();
      fetchPagamentoMes(valor);
    }
  }

  function handleClick() {
    props.setShowInfosExecutor(false);
  }

  async function getDiligenciasFirebase() {
    const sessionStorageData = sessionStorage.getItem("listaDiligencias");
    if (sessionStorageData) {
      const diligenciasData = JSON.parse(sessionStorageData);
      const filteredDiligencias = await diligenciasData.filter((diligencia) => {
        return diligencia.responsavel === props.selectedExecutor.nome && diligencia.status === "Finalizado";
      });
      setListaDiligencias(filteredDiligencias);
      setDiligenciasFetched(true);
    } else {
      const unsubscribe = onSnapshot(diligenciasRef, (snapshot) => {
        const diligenciasData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        const filteredDiligencias = diligenciasData.filter((diligencia) => {
          return diligencia.responsavel === props.selectedExecutor.nome && diligencia.status === "Finalizado";
        });
        sessionStorage.setItem("listaDiligencias", JSON.stringify(diligenciasData));
        setListaDiligencias(filteredDiligencias);
        setDiligenciasFetched(true);
      });
    }
  }

  function dataEstaNoMes(dataString) {
    // Divide a string da data para obter dia, mês e ano
    const [dia, mes, ano] = dataString.split("/").map(Number);

    // Cria um objeto Date usando ano, mês e dia
    const data = new Date(ano, mes - 1, dia); // Meses em JavaScript são indexados de 0 a 11

    // Verifica se o mês da data é igual ao mês desejado
    return data.getMonth() + 1 === indexMes; // Adiciona 1 porque os meses em JavaScript são indexados de 0 a 11
  }

  function filtraDiligencias() {
    // Crie um array temporário para armazenar os resultados desejados
    const novoResultado = [];

    // Itera sobre as diligências
    listaDiligencias.forEach((diligencia) => {
      if (dataEstaNoMes(diligencia.data)) {
        // Adiciona a diligência ao array temporário
        novoResultado.push(diligencia);
      }
    });

    // Atualiza o estado uma vez fora do loop
    setListaResultado(novoResultado);
  }

  async function fetchPagamentoMes(valor) {
    const currentYear = new Date();
    const year = getYear(currentYear);
    const yearString = year.toString();
    const indexMesString = indexMes.toString();

    const userRef = doc(db, "users", user.uid);

    // Corrigindo a construção da referência da coleção
    const financeiroRef = await collection(userRef, "financeiro", yearString, indexMesString);

    const docDataExecutor = {
      tipo: "saida",
      indexMes: indexMes,
      valor: valor,
      nomeExecutor: props.selectedExecutor.nome,
      idExecutor: props.selectedExecutor.id,
    };

    const docExecutor = await addDoc(financeiroRef, docDataExecutor);
  }

  async function deletePagamentoMes() {
    const currentYear = new Date();
    const year = getYear(currentYear);
    const yearString = year.toString();
    const indexMesString = indexMes.toString();

    const userRef = doc(db, "users", user.uid);

    // Corrigindo a construção da referência da coleção
    const financeiroRef = collection(userRef, "financeiro", yearString, indexMesString);

    // Create a query against the collection.
    const q = query(financeiroRef, where("nomeExecutor", "==", props.selectedExecutor.nome));

    // Execute the query and get the documents
    const querySnapshot = await getDocs(q);

    // Iterate over the documents and delete each one
    querySnapshot.forEach(async (doc) => {
      await deleteDoc(doc.ref);
      console.log("Documento excluído:", doc.id);
    });
  }

  function exportToCSV() {
    let csvContent = "data:text/csv;charset=utf-8," + "\ufeffNúmero Processo;Tipo;Empresa;Data;Orgão;Local;Parte Contrária;Parte interessada;Comissão\n"; // Cabeçalho CSV com BOM UTF-8

    listaResultado.forEach((diligencia) => {
      const row = `"${diligencia.numeroProcesso}";"${diligencia.tipo}";"${diligencia.cliente}";"${diligencia.data}";"${diligencia.local}";"${diligencia.cidade}";"${diligencia.parteContraria}";"${diligencia.parteInteressada}";"${diligencia.comissaoExecutor}"\n`;
      csvContent += row;
    });

    const encodedURI = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedURI);
    link.setAttribute("download", "diligencias.csv");
    document.body.appendChild(link);

    link.click();
  }

  return (
    <>
      <Overlay>
        <Box>
          <CloseButton onClick={handleClick}>
            <img src={CloseIcon} alt="" />
          </CloseButton>
          <InfosExecutores>
            <ImageExecutor backgroundimage={backgroundUrl || userIcon}></ImageExecutor>
            <DadosExecutor>
              <ListaDeDados>
                <ul>
                  <li className="name">
                    <Campo>Nome: </Campo>
                    {props.selectedExecutor.nome}
                  </li>
                  <li className="email">
                    <Campo>E-mail: </Campo>
                    {props.selectedExecutor.email}
                  </li>
                </ul>
                <ul>
                  <li className="telefone">
                    <Campo>Contato: </Campo>
                    {props.selectedExecutor.contato}
                  </li>
                  <li className="oab">
                    <Campo>OAB: </Campo>
                    {props.selectedExecutor.oab}
                  </li>
                </ul>
                <ul>
                  <li className="cpf">
                    <Campo>CPF: </Campo>
                    {props.selectedExecutor.cpf}
                  </li>
                  <li className="infoDeposito">
                    <Campo>Info. de depósito: </Campo>
                    {props.selectedExecutor.infoDeposito}
                  </li>
                </ul>
              </ListaDeDados>
            </DadosExecutor>
          </InfosExecutores>
          <Line />
          <h3>Controle Mensal</h3>
          <CardsContainer>
            <NumDiligenciasExecutor numDiligencias={listaResultado.length} mes={mesSelecionado} />
            <CardPagamentosExecutor title="Pagamentos Realizados" numero={pagamentosRealizados} mes={mesSelecionado} color="#00E7AF" />
            <CardPagamentosExecutor title="Pagamentos Pendentes" numero={pagamentosPendentes} mes={mesSelecionado} color="#FFB547" />
          </CardsContainer>
          <ContentDiligencias>
            <h4>Diligências finalizadas</h4>
            <Filters>
              <FilterPeriodo>
                <TitleFilter>Filtrar por mês:</TitleFilter>
                <ButtonsPeriodo>
                  <DropdownMesExecutor setIndexMes={setIndexMes} mesSelecionado={mesSelecionado} setMesSelecionado={setMesSelecionado}></DropdownMesExecutor>
                </ButtonsPeriodo>
              </FilterPeriodo>

              <FilterPagamento>
                <TitleFilter>Status pagamento:</TitleFilter>
                {fetchStatus ? (
                  <ButtonStatusPagamento status={statusPagamento} onClick={handleClickStatus}>
                    {statusPagamento}
                  </ButtonStatusPagamento>
                ) : null}
              </FilterPagamento>
            </Filters>

            <TitlesList>
              <Titles>
                <ul>
                  <li>Tipo</li>
                  <li>Empresa</li>
                  <li>Data</li>
                  <li>Orgão</li>
                  <li>Local</li>
                  <li>Comissão</li>
                </ul>
              </Titles>
              {/* <Status>
                <span>Pagamento</span>
              </Status> */}
            </TitlesList>
            <ListDiligenciasExecutor>
              {/* Mostrar diligências filtradas */}
              <ListDiligenciasExecutor>
                {listaResultado.length > 0 ? (
                  listaResultado.map((item) => <CardDiligenciaExecutor diligenciasFetched={diligenciasFetched} setDiligenciasFetched={setDiligenciasFetched} key={item.firestoreId} {...item} />)
                ) : (
                  <p>Nenhuma diligência encontrada para o período selecionado.</p>
                )}
              </ListDiligenciasExecutor>
            </ListDiligenciasExecutor>
            <button onClick={exportToCSV}>Exportar diligências</button>
          </ContentDiligencias>
          {/* <Bar>
            <LeftContent>
              <b>Resumo de pagamentos - {mesSelecionado}</b>
            </LeftContent>
            <RightContent>
              <span className="realizados">
                Pagamentos {statusPagamento}s: <b>R${extratoRealizados}</b>
              </span>
            </RightContent>
          </Bar> */}
        </Box>
      </Overlay>
    </>
  );
}
