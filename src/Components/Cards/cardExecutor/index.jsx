import { Card, Top, Main, Button, Image, Right, Infos, ButtonDelete } from "./style";
import PhotoExecutor from "../../../assets/photo-executor.png";

export function CardExecutor() {
  return (
    <Card>
      <Top>
        <Image></Image>

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
        <h4>Duda Vilar Cabral</h4>
        <ul>
          <li>dudavilar@gmail.com</li>
          <li>(83) 99587-3587</li>
          <li>15844-87</li>
        </ul>
      </Main>
      <Button>Mais informações</Button>
      <ButtonDelete>Excluir Executor</ButtonDelete>
    </Card>
  );
}
