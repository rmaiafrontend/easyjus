import { Card, RightContent, LeftContent } from "./style";
import GraficoDiliencias from "../../../assets/graficoRoxo.svg";

export function NumDiligenciasExecutor(props) {
  return (
    <Card>
      <LeftContent>
        <span className="title">Diligências</span>
        <span className="numero">{props.numDiligencias}</span>
        <span className="periodo">Últimos 30 dias</span>
      </LeftContent>
      <RightContent>
        <img src={GraficoDiliencias} alt="" />
      </RightContent>
    </Card>
  );
}
