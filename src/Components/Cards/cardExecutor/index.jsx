import { Card, Top, Main, Button, Image, Right, Infos, ButtonDelete, InfosList } from "./style";
import userIcon from "../../../assets/userIcon.svg";

export function CardExecutor(props) {
  const backgroundUrl = props.profileFoto ? props.profileFoto.downloadURL : null;

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
            <span className="nums">18</span>
            <span className="title">Diligências executadas</span>
          </Infos>
          <Infos>
            <span className="nums">16</span>
            <span className="title">Pagamentos recebidos</span>
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
