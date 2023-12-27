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
import { CardFiltro } from "../cardFiltro";

export function InfosExecutor(props) {
  const { user, dispatch } = useContext(AuthContext);
  const backgroundUrl = props.selectedExecutor.profileFoto ? props.selectedExecutor.profileFoto.downloadURL : null;
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
  const [filterPeriodTrue, setFilterPeriodTrue] = useState(false);

  const [extratoRealizados, setExtratoRealizados] = useState(0.0);
  const [extratoPendentes, setExtratoPendentes] = useState(0.0);

  const [atualizaInfos, setAtualizaInfos] = useState(false);

  const [pagamentosPendentes, setPagamentosPendentes] = useState();
  const [pagamentosRealizados, setPagamentoRealizados] = useState();

  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    getDiligenciasFirebase();
  }, []);

  useEffect(() => {
    if (diligenciasFetched) {
      filterDiligenciasByPeriod(activeButtonPeriodo);
      filterDiligenciasByStatus();
    }
  }, [atualizaInfos]);

  useEffect(() => {
    // Atualiza os pagamentos quando a lista de diligências for alterada
    if (diligenciasFetched) {
      atualizaPagamentos();
    }
  }, [diligenciasFetched]);

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
    props.setShowInfosExecutor(false);
  }

  async function getDiligenciasFirebase() {
    const localStorageData = localStorage.getItem("listaDiligencias");
    if (localStorageData) {
      const diligenciasData = JSON.parse(localStorageData);
      const filteredDiligencias = await diligenciasData.filter((diligencia) => {
        return diligencia.responsavel === props.selectedExecutor.nome && diligencia.status === "Finalizado";
      });
      setListaDiligencias(filteredDiligencias);
      setListaResultado(filteredDiligencias);
      setDiligenciasFetched(true);
      atualizaPagamentos();
    } else {
      const unsubscribe = onSnapshot(diligenciasRef, (snapshot) => {
        const diligenciasData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        const filteredDiligencias = diligenciasData.filter((diligencia) => {
          return diligencia.responsavel === props.selectedExecutor.nome && diligencia.status === "Finalizado";
        });
        localStorage.setItem("listaDiligencias", JSON.stringify(diligenciasData));
        setListaDiligencias(filteredDiligencias);
        setListaResultado(filteredDiligencias);
        setDiligenciasFetched(!filterPeriodTrue);
        atualizaPagamentos();
      });
    }
  }

  function handleClickFilterPeriod() {
    setShowFilters(true);
  }

  function closeFilter() {
    setShowFilters(false);
  }

  function filterDiligenciasByDate(startDate, endDate) {
    const currentDate = new Date();
    const date1 = new Date(startDate); // 'Ano-Mês-Dia'
    const date2 = new Date(endDate); // 'Ano-Mês-Dia'

    let filter = [];

    filter = listaDiligencias.filter((diligencia) => {
      const parts = diligencia.data.split("/");
      const formattedDate = `${parts[1]}/${parts[0]}/${parts[2]}`;
      const diligenciaDate = new Date(formattedDate);

      // Comparando se a diligência está dentro do intervalo de datas
      return diligenciaDate >= date1 && diligenciaDate <= date2;
    });

    setFilteredDiligencias(filter);
    setListaResultado(filter);
    atualizaPagamentos();
  }

  function filterDiligenciasByPeriod(periodo) {
    let activeButton = "periodo";
    const currentDate = new Date();
    let filter = [];

    if (periodo === "recentes") {
      activeButton = "recentes";
      // Filtrar por diligências dos últimos 30 dias
      filter = listaDiligencias.filter((diligencia) => {
        const parts = diligencia.data.split("/");
        const formattedDate = `${parts[1]}/${parts[0]}/${parts[2]}`;

        const diligenciaDate = new Date(formattedDate);
        const diffTime = Math.abs(currentDate - diligenciaDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays <= 30;
      });
      setFilteredDiligencias(filter);
      setListaResultado(filter);
      atualizaPagamentos();
    } else if (periodo === "15 dias") {
      // Filtrar por diligências dos últimos 15 dias
      filter = listaDiligencias.filter((diligencia) => {
        const parts = diligencia.data.split("/");
        const formattedDate = `${parts[1]}/${parts[0]}/${parts[2]}`;

        const diligenciaDate = new Date(formattedDate);
        const diffTime = Math.abs(currentDate - diligenciaDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays <= 15;
      });
      setFilteredDiligencias(filter);
      setListaResultado(filter);
      atualizaPagamentos();
    } else if (periodo === "7 dias") {
      // Filtrar por diligências dos últimos 15 dias
      filter = listaDiligencias.filter((diligencia) => {
        const parts = diligencia.data.split("/");
        const formattedDate = `${parts[1]}/${parts[0]}/${parts[2]}`;

        const diligenciaDate = new Date(formattedDate);
        const diffTime = Math.abs(currentDate - diligenciaDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays <= 7;
      });
      setFilteredDiligencias(filter);
      setListaResultado(filter);
      atualizaPagamentos();
    } else {
      setListaResultado(listaDiligencias);
      atualizaPagamentos();
    }

    setActiveButtonStatus(null);
    setActiveButtonPeriodo(activeButton);
  }

  function filterDiligenciasByStatus(status) {
    setActiveButtonStatus(status);
    let diligencias = [];

    if (filteredDiligencias.length > 0) {
      diligencias = filteredDiligencias;
    } else {
      diligencias = listaDiligencias;
    }

    if (status === "pendentes") {
      const diligenciasStatusPendentes = diligencias.filter((diligencia) => {
        return diligencia.pagamentoExecutor === false;
      });
      setListaResultado(diligenciasStatusPendentes);
    }

    if (status === "realizados") {
      const diligenciasStatusRealizados = diligencias.filter((diligencia) => {
        return diligencia.pagamentoExecutor === true;
      });
      setListaResultado(diligenciasStatusRealizados);
    }
  }

  return (
    <>
      <Overlay>
        <Box>
          {showFilters && <CardFiltro closeFilter={closeFilter} filterDiligenciasByPeriod={filterDiligenciasByPeriod} filterDiligenciasByDate={filterDiligenciasByDate} />}
          <CloseButton onClick={handleClick}>
            <img src={CloseIcon} alt="" />
          </CloseButton>
          <h1>Área do executor</h1>
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
                <span>Filtrar por:</span>
                <ButtonsPeriodo>
                  <button className={activeButtonPeriodo === "recentes" ? "recentes active" : "recentes"} onClick={() => filterDiligenciasByPeriod("recentes")}>
                    Recentes
                  </button>
                  <button className={activeButtonPeriodo === "periodo" ? "periodo active" : "periodo"} onClick={handleClickFilterPeriod}>
                    Período
                  </button>
                </ButtonsPeriodo>
              </FilterPeriodo>
              <FilterStatus>
                <span>Com pagamentos:</span>
                <ButtonsStatus>
                  <button className={activeButtonStatus === "pendentes" ? "pendentes active" : "pendentes"} onClick={() => filterDiligenciasByStatus("pendentes")}>
                    Pendentes
                  </button>
                  <button className={activeButtonStatus === "realizados" ? "realizados active" : "realizados"} onClick={() => filterDiligenciasByStatus("realizados")}>
                    Realizados
                  </button>
                </ButtonsStatus>
              </FilterStatus>
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
                  listaResultado.map((item) => <CardDiligenciaExecutor atualizaInfos={atualizaInfos} setAtualizaInfos={setAtualizaInfos} key={item.firestoreId} {...item} />)
                ) : (
                  <p>Nenhuma diligência encontrada para o período selecionado.</p>
                )}
              </ListDiligenciasExecutor>
            </ListDiligenciasExecutor>
          </ContentDiligencias>
          <Bar>
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
          </Bar>
        </Box>
      </Overlay>
    </>
  );
}
