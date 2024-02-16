import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { TopContent, Title, BoxCard, MainContent, FilterContainer, BoxExtrato, Titles, TableEntradas, TableSaidas, Identificadores, BoxSaldo } from "./style";
import { CardExtrato } from "../../Components/Cards/CardExtrato";
import { CardPagamentosFinanceiro } from "../../Components/Cards/CardPagamentosFinanceiro";
import { CardDiligenciasFinanceiro } from "../../Components/Cards/CardDiligenciasFinanceiro";
import { CustomDropdownMes } from "../../Components/Layout/DropdownMes";
import { db } from "../../services/firebaseconfig";
import { doc, collection, getDocs } from "firebase/firestore";
import { format, getMonth } from "date-fns"; // Certifique-se de que está importando 'format' corretamente
import { ptBR } from "date-fns/locale";

export function SectionFinanceiro() {
  const { user, dispatch } = useContext(AuthContext);

  const userRef = doc(db, "users", user.uid);
  const clientesRef = collection(userRef, "empresas");
  const executorRef = collection(userRef, "executores");

  const [mesSelecionado, setMesSelecionado] = useState();
  const [indexMes, setIndexMes] = useState(2);

  const [listaClientes, setListaClientes] = useState([]);
  const [listaExecutores, setListaExecutores] = useState([]);

  const [listaFiltradaClientes, setListaFiltradaCliente] = useState([]);
  const [listaFiltradaExecutores, setListaFiltradaExecutores] = useState([]);

  const [fetchEmpresas, setFetchEmpresas] = useState(false);
  const [fetchExecutores, setFetchExecutores] = useState(false);
  const [filtroEmpresa, setFiltroEmpresa] = useState(false);
  const [filtroExcutor, setFiltroExecutor] = useState(false);

  const [saldo, setSaldo] = useState(0);

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
    setFetchEmpresas(false);
    setFetchExecutores(false);
    setFiltroEmpresa(false);
    setFiltroExecutor(false);

    fetchDataExecutores();
    fetchDataEmpresas();
  }, [indexMes]);

  useEffect(() => {
    if (fetchEmpresas) {
      filtraCliente();
    }
    if (fetchExecutores) {
      console.log("entrou");
      filtraExecutor();
    }
  }, [fetchEmpresas, fetchExecutores]);

  useEffect(() => {
    getSaldo();
  }, [filtroEmpresa, filtroExcutor]);

  function diligenciasRecentes() {
    let diligenciasRecentes = [];

    // Filtrar por diligências dos últimos 30 dias
    diligenciasRecentes = listaClientes.filter((diligencia) => {
      const parts = diligencia.data.split("/");
      const formattedDate = `${parts[1]}/${parts[0]}/${parts[2]}`;

      const diligenciaDate = new Date(formattedDate);
      const diffTime = Math.abs(currentDate - diligenciaDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays <= 30;
    });
  }

  async function fetchDataEmpresas() {
    let clientesData = [];
    const dadosEmpresas = [];

    const localStorageData = localStorage.getItem("listaEmpresas");

    if (localStorageData) {
      clientesData = JSON.parse(localStorageData);
      clientesData.forEach((empresa) => {
        const dados = {
          id: empresa.id,
          nome: empresa.nome,
        };
        dadosEmpresas.push(dados);
      });
    } else {
      clientesData = await getDocs(clientesRef);
      clientesData.forEach((empresa) => {
        const dados = {
          id: empresa.id,
          ...empresa.data(),
        };
        dadosEmpresas.push(dados);
      });
    }

    // Use Promise.all para esperar todas as chamadas assíncronas concluírem
    await Promise.all(dadosEmpresas.map((dados) => fetchDataDiligencias(dados)));

    // Depois que todas as chamadas assíncronas foram concluídas, defina setFetchOk como true
    setFetchEmpresas(true);
  }

  async function fetchDataExecutores() {
    const dadosExecutores = [];
    let executoresData = [];

    const localStorageData = localStorage.getItem("listaExecutores");

    if (localStorageData) {
      executoresData = JSON.parse(localStorageData);
      executoresData.forEach((executor) => {
        const dados = {
          id: executor.id,
          nome: executor.nome,
        };
        dadosExecutores.push(dados);
      });
    } else {
      executoresData = await getDocs(executorRef);
      executoresData.forEach((executor) => {
        const dados = {
          id: executor.id,
          ...executor.data(),
        };
        dadosExecutores.push(dados);
      });
    }

    // Use Promise.all para esperar todas as chamadas assíncronas concluírem
    await Promise.all(dadosExecutores.map((dados) => fetchDataDiligenciasExecutores(dados)));

    // Depois que todas as chamadas assíncronas foram concluídas, defina setFetchOk como true
    setFetchExecutores(true);
  }

  async function fetchDataDiligencias(empresa) {
    const listaDiligencias = [];
    const querySnapshot = await getDocs(collection(db, "users", user.uid, "empresas", empresa.id, "diligenciasFinalizadas"));

    querySnapshot.forEach((doc) => {
      listaDiligencias.push(doc.data());
    });

    const doc = {
      idEmpresa: empresa.id,
      nomeEmpresa: empresa.nome,
      diligenciasFinalizadas: listaDiligencias,
    };

    setListaClientes((prevState) => {
      // Verifica se o objeto já está presente no array
      const exists = prevState.some((item) => item.idEmpresa === doc.idEmpresa);

      // Se não existir, adiciona o novo objeto ao array
      if (!exists) {
        return [...prevState, doc];
      }

      // Se existir, retorna o array sem fazer alterações
      return prevState;
    });
  }

  async function fetchDataDiligenciasExecutores(executor) {
    const listaDiligencias = [];
    const querySnapshot = await getDocs(collection(db, "users", user.uid, "executores", executor.id, "diligenciasFinalizadas"));

    querySnapshot.forEach((doc) => {
      listaDiligencias.push(doc.data());
    });

    const doc = {
      idExecutor: executor.id,
      nomeExecutor: executor.nome,
      diligenciasFinalizadas: listaDiligencias,
    };

    setListaExecutores((prevState) => {
      // Verifica se o objeto já está presente no array
      const exists = prevState.some((item) => item.idExecutor === doc.idExecutor);

      // Se não existir, adiciona o novo objeto ao array
      if (!exists) {
        return [...prevState, doc];
      }

      // Se existir, retorna o array sem fazer alterações
      return prevState;
    });
  }

  function dataEstaNoMes(dataString) {
    // Divide a string da data para obter dia, mês e ano
    const [dia, mes, ano] = dataString.split("/").map(Number);

    // Cria um objeto Date usando ano, mês e dia
    const data = new Date(ano, mes - 1, dia); // Meses em JavaScript são indexados de 0 a 11

    // Verifica se o mês da data é igual ao mês desejado
    return data.getMonth() + 1 === indexMes; // Adiciona 1 porque os meses em JavaScript são indexados de 0 a 11
  }

  function somaDiligenciasMes(lista, ordem) {
    let soma = 0;

    lista.forEach((diligencia) => {
      if (dataEstaNoMes(diligencia.data)) {
        soma += diligencia.valor;
      }
    });
    return soma;
  }

  function filtraCliente() {
    const listaFiltrada = [];

    listaClientes.forEach((empresa) => {
      let valor = somaDiligenciasMes(empresa.diligenciasFinalizadas, "entrada");
      if (valor > 0) {
        const objeto = {
          nome: empresa.nomeEmpresa,
          valor: valor,
        };
        listaFiltrada.push(objeto);
      }
    });
    setListaFiltradaCliente(listaFiltrada);
    setFetchEmpresas(false);
    setFiltroEmpresa(true);
  }

  function filtraExecutor() {
    const listaFiltrada = [];

    listaExecutores.forEach((executor) => {
      let valor = somaDiligenciasMes(executor.diligenciasFinalizadas, "saida");
      if (valor > 0) {
        const objeto = {
          nome: executor.nomeExecutor,
          valor: valor,
        };
        listaFiltrada.push(objeto);
      }
    });
    setListaFiltradaExecutores(listaFiltrada);
    setFiltroExecutor(true);
  }

  async function getSaldo() {
    let somaEntradas = 0;
    let somaSaidas = 0;

    listaFiltradaClientes.forEach((cliente) => {
      somaEntradas += cliente.valor;
    });

    listaFiltradaExecutores.forEach((executor) => {
      somaSaidas += executor.valor;
    });

    let saldo = somaEntradas - somaSaidas;
    setSaldo(saldo);
  }

  return (
    <>
      <MainContent>
        <h2>Controle Mensal</h2>
        <FilterContainer>
          <CustomDropdownMes setIndexMes={setIndexMes} mesSelecionado={mesSelecionado} setMesSelecionado={setMesSelecionado}></CustomDropdownMes>
        </FilterContainer>
        <Titles>
          <div className="entradas">
            <span>Entradas</span>
          </div>
          <div className="saidas">
            <span>Saidas</span>
          </div>
        </Titles>
        <BoxExtrato>
          <TableEntradas>
            <Identificadores>
              <span>empresa</span>
              <span>Valor</span>
            </Identificadores>
            {filtroEmpresa ? listaFiltradaClientes.map((item) => <CardExtrato key={item.nome} valor={item.valor} nome={item.nome} tipo="entrada" />) : null}
          </TableEntradas>
          <TableSaidas>
            <Identificadores>
              <span>Executor</span>
              <span>Valor</span>
            </Identificadores>
            {filtroExcutor ? listaFiltradaExecutores.map((item) => <CardExtrato valor={item.valor} nome={item.nome} tipo="saida" />) : null}
          </TableSaidas>
        </BoxExtrato>
        <BoxSaldo>
          {/* {filtroEmpresa && filtroExcutor && ( */}
          <>
            <div className="mes">
              <h4>Resumo de pagamentos - {mesSelecionado}</h4>
            </div>
            <div className="saldo">
              <span>
                Saldo: <b>R$ {saldo}</b>
              </span>
            </div>
          </>
          {/* )} */}
        </BoxSaldo>
        {/* <TopContent>
          <Title>
            <h1>Financeiro</h1>
          </Title>
          <BoxCard>
            <CardDiligenciasFinanceiro numDiligencias="24" />
            <CardPagamentosFinanceiro title="Entradas" numero={20} color="#00E7AF" />
            <CardPagamentosFinanceiro title="Saidas" numero={30} color="#FFB547" />
          </BoxCard>
        </TopContent> */}
      </MainContent>
    </>
  );
}
