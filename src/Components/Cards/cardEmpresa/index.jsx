import { Card, Top, Main, Button, Image, Right, Infos, ButtonDelete, InfosList } from "./style";
import userIcon from "../../../assets/userIcon.svg";

export function CardEmpresa(props) {
  const backgroundUrl = props.profileFoto ? props.profileFoto.downloadURL : null;

  return (
    <Card>
      <Top>
        <Image backgroundimage={backgroundUrl || userIcon}></Image>

        <Right>
          <Infos>
            <span className="nums">18</span>
            <span className="title">Diligências solicitadas</span>
          </Infos>
          <Infos>
            <span className="nums">16</span>
            <span className="title">Pagamentos efetuados</span>
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
      <Button>Mais informações</Button>
      <ButtonDelete onClick={() => props.handleDeleteEmpresa(props.id)}>Excluir Empresa</ButtonDelete>
    </Card>
  );
}
