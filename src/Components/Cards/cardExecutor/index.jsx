import { Card, Top, Main, Button, Image, Right, Infos, ButtonDelete, InfosList } from "./style";
import userIcon from "../../../assets/userIcon.svg";
import { useEffect, useState } from "react";
import { format, getMonth, getYear } from "date-fns";

export function CardExecutor(props) {
  const backgroundUrl = props.profileFoto ? props.profileFoto.downloadURL : null;
  const [listaDiligencias, setListaDiligencias] = useState([]);
  const [somadorDiligencias, setSomadorDiligencias] = useState();
  const [fetchContador, setFetchContador] = useState(false);
  const [state, setState] = useState();

  const hoje = new Date();

  useEffect(() => {
    const localStorageData = localStorage.getItem("listaDiligencias");
    if (localStorageData) {
      const diligenciasData = JSON.parse(localStorageData);
      setListaDiligencias(diligenciasData);
      setState(true);
    }
  }, []);

  useEffect(() => {
    if (state) {
      numeroDiligencias();
    }
  }, [state]);

  function numeroDiligencias() {
    let contadorDiligencias = 0;
    listaDiligencias.forEach((diligencia) => {
      if (diligencia.responsavel === props.nome) {
        if (dataEstaNoMes(diligencia.data)) {
          contadorDiligencias++;
        }
      }
    });
    setSomadorDiligencias(contadorDiligencias);
    setFetchContador(true);
  }

  function dataEstaNoMes(dataString) {
    // Divide a string da data para obter dia, mês e ano
    const [dia, mes, ano] = dataString.split("/").map(Number);

    // Cria um objeto Date usando ano, mês e dia
    const data = new Date(ano, mes - 1, dia); // Meses em JavaScript são indexados de 0 a 11

    // Obtém o mês atual e o ano atual
    const hoje = new Date();
    const indexMesAtual = hoje.getMonth() + 1;
    const anoAtual = hoje.getFullYear();

    // Verifica se o mês e o ano da data correspondem ao mês e ano atuais
    return data.getMonth() + 1 === indexMesAtual && data.getFullYear() === anoAtual;
  }

  function handleClick() {
    props.setShowInfosExecutor(true);
    props.setSelectedExecutor(props);
  }
  return (
    <Card>
      <Top>
        <Image backgroundimage={backgroundUrl || userIcon}></Image>

        <Right>
          <Infos>
            {fetchContador ? <span className="nums">{somadorDiligencias}</span> : null}
            <span className="title">Diligências atribuidas no mês</span>
          </Infos>
        </Right>
      </Top>

      <Main>
        <h4>{props.nome}</h4>
        <InfosList>
          <li>
            <b>Email:</b>
            <span>{props.email}</span>
          </li>
          <li>
            <b>Contato:</b>
            <span>{props.contato}</span>
          </li>
          <li>
            <b>CPF:</b>
            <span>{props.cpf}</span>
          </li>
        </InfosList>
      </Main>
      <Button onClick={handleClick}>Mais informações</Button>
      <ButtonDelete onClick={() => props.handleDeleteExecutor(props.id)}>Excluir Executor</ButtonDelete>
    </Card>
  );
}
