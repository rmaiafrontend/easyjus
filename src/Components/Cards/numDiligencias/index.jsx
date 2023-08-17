import { Card, RightContent, LeftContent } from "./style";
import GraficoDiliencias from "../../../assets/grafico-diligencias.svg";

export function CardDiligencias() {
  return (
    <Card>
      <LeftContent>
        <span className="title">Diligências</span>
        <span className="numero">42</span>
        <span className="periodo">Últimos 30 dias</span>
      </LeftContent>
      <RightContent>
        <img src={GraficoDiliencias} alt="" />
      </RightContent>
    </Card>
  );
}
