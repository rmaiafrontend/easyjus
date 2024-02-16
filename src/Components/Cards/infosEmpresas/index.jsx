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
} from "./style";

import React, { useState, useEffect, useContext } from "react";
import { collection, onSnapshot, doc } from "firebase/firestore";
import { db } from "../../../services/firebaseconfig";
import userIcon from "../../../assets/userIcon.svg";
import CloseIcon from "../../../assets/close-icon.svg";
import { NumDiligenciasExecutor } from "../numDiligenciasExecutor";
import { CardPagamentosExecutor } from "../numPagamentosExecutor";
import { CardDiligenciaExecutor } from "../cardDiligenciaExecutor";
import { AuthContext } from "../../../contexts/AuthContext";
import { format, getMonth } from "date-fns"; // Certifique-se de que está importando 'format' corretamente
import { ptBR } from "date-fns/locale";
import { DropdownMesExecutor } from "../../Layout/DropdownMesExecutor";

export function InfosEmpresas(props) {
  const { user, dispatch } = useContext(AuthContext);
  const backgroundUrl = props.selectedEmpresa.profileFoto ? props.selectedEmpresa.profileFoto.downloadURL : null;
  const userRef = doc(db, "users", user.uid); // Crie uma referência ao documento do usuário
  const diligenciasRef = collection(userRef, "diligencias"); // Crie uma referência à subcoleção "diligencias"

  //Listas de diligência
  const [listaDiligencias, setListaDiligencias] = useState([]);
  const [filteredDiligencias, setFilteredDiligencias] = useState([]);
  const [listaResultado, setListaResultado] = useState([]);

  //Estados Filtros
  const [activeButtonPeriodo, setActiveButtonPeriodo] = useState(null); // Defina "recentes" como ativo por padrão
  const [activeButtonStatus, setActiveButtonStatus] = useState();

  const [diligenciasFetched, setDiligenciasFetched] = useState(false);
  const [filterOk, setFilterOk] = useState(false);

  const [extratoRealizados, setExtratoRealizados] = useState(0.0);
  const [extratoPendentes, setExtratoPendentes] = useState(0.0);

  const [atualizaInfos, setAtualizaInfos] = useState(false);

  const [pagamentosPendentes, setPagamentosPendentes] = useState();
  const [pagamentosRealizados, setPagamentoRealizados] = useState();

  const [showFilters, setShowFilters] = useState(false);

  const [mesSelecionado, setMesSelecionado] = useState();
  const [indexMes, setIndexMes] = useState();

  useEffect(() => {
    const currentMonth = new Date();
    const monthIndex = getMonth(currentMonth);
    const titleMonth = format(currentMonth, "MMMM", { locale: ptBR });
    const formattedMonthCapitalized = titleMonth.charAt(0).toUpperCase() + titleMonth.slice(1);
    console.log(titleMonth, monthIndex);
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
    atualizaPagamentos();
  }, [listaResultado]);

  function atualizaPagamentos() {
    let pagamentosRealizados = 0;
    let pagamentosPendentes = 0;

    if (activeButtonPeriodo === null) {
      listaDiligencias.forEach((item) => {
        // Certifique-se de que item.valor é tratado como número inteiro
        let valor = parseFloat(item.valor); // Converte para número inteiro

        if (item.pagamentoExecutor === true) {
          pagamentosRealizados += valor;
        } else if (item.pagamentoExecutor === false) {
          pagamentosPendentes += valor;
        }
      });
      setPagamentosPendentes(pagamentosPendentes);
      setPagamentoRealizados(pagamentosRealizados);
    } else {
      filteredDiligencias.forEach((item) => {
        // Certifique-se de que item.valor é tratado como número inteiro
        const valor = parseInt(item.valor, 10); // Converte para número inteiro

        if (item.pagamentoExecutor === true) {
          pagamentosRealizados += valor;
        } else if (item.pagamentoExecutor === false) {
          pagamentosPendentes += valor;
        }
      });
    }

    setExtratoPendentes(pagamentosPendentes);
    setExtratoRealizados(pagamentosRealizados);
  }

  function handleClick() {
    props.setShowInfosEmpresa(false);
  }

  async function getDiligenciasFirebase() {
    const localStorageData = localStorage.getItem("listaDiligencias");
    if (localStorageData) {
      const diligenciasData = JSON.parse(localStorageData);
      const filteredDiligencias = await diligenciasData.filter((diligencia) => {
        return diligencia.cliente === props.selectedEmpresa.nome && diligencia.status === "Finalizado";
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
          return diligencia.cliente === props.selectedEmpresa.nome && diligencia.status === "Finalizado";
        });
        localStorage.setItem("listaDiligencias", JSON.stringify(diligenciasData));
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

  return (
    <>
      <Overlay>
        <Box>
          <CloseButton onClick={handleClick}>
            <img src={CloseIcon} alt="" />
          </CloseButton>
          <h1>Área do Cliente</h1>
          <InfosExecutores>
            <ImageExecutor backgroundimage={backgroundUrl || userIcon}></ImageExecutor>
            <DadosExecutor>
              <ListaDeDados>
                <ul>
                  <li className="name">
                    <Campo>Nome: </Campo>
                    {props.selectedEmpresa.nome}
                  </li>
                  <li className="email">
                    <Campo>E-mail: </Campo>
                    {props.selectedEmpresa.email}
                  </li>
                </ul>
                <ul>
                  <li className="telefone">
                    <Campo>Contato: </Campo>
                    {props.selectedEmpresa.contato}
                  </li>
                  <li className="oab">
                    <Campo>OAB: </Campo>
                    {props.selectedEmpresa.oab}
                  </li>
                </ul>
                <ul>
                  <li className="cpf">
                    <Campo>CPF: </Campo>
                    {props.selectedEmpresa.cpf}
                  </li>
                  <li className="infoDeposito">
                    <Campo>Info. de depósito: </Campo>
                    {props.selectedEmpresa.infoDeposito}
                  </li>
                </ul>
              </ListaDeDados>
            </DadosExecutor>
          </InfosExecutores>
          <CardsContainer>
            <NumDiligenciasExecutor numDiligencias={listaDiligencias.length} />
            <CardPagamentosExecutor title="Pagamentos Pendentes" numero={pagamentosPendentes} color="#FFB547" />
            <CardPagamentosExecutor title="Pagamentos Realizados" numero={pagamentosRealizados} color="#00E7AF" />
          </CardsContainer>
          <Line />
          <ContentDiligencias>
            <h3>Diligências Finalizadas</h3>
            <Filters>
              <FilterPeriodo>
                <span>Filtrar por mês:</span>
                <ButtonsPeriodo>
                  <DropdownMesExecutor setIndexMes={setIndexMes} mesSelecionado={mesSelecionado} setMesSelecionado={setMesSelecionado}></DropdownMesExecutor>
                </ButtonsPeriodo>
              </FilterPeriodo>
            </Filters>
            <TitlesList>
              <Titles>
                <ul>
                  <li>Tipo</li>
                  <li>Empresa</li>
                  <li>Data</li>
                  <li>Orgão</li>
                  <li>Local</li>
                  <li>Valor</li>
                </ul>
              </Titles>
              <Status>
                <span>Pagamento</span>
              </Status>
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
          </ContentDiligencias>
          {/* <Bar>
            <LeftContent>
              <b>
                Resumo de pagamentos<span> (Últimos 30 dias)</span>
              </b>
            </LeftContent>
            <RightContent>
              <span className="realizados">
                Pagamentos Realizados: <b>R${extratoRealizados}</b>
              </span>
              <span className="pendentes">
                Pagamentos Pendentes: <b>R${extratoPendentes}</b>
              </span>
            </RightContent>
          </Bar> */}
        </Box>
      </Overlay>
    </>
  );
}
