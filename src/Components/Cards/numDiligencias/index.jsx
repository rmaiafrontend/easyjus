import { Card, RightContent, LeftContent } from "./style";
import GraficoDiliencias from "../../../assets/grafico-diligencias.svg";

export function CardDiligencias({ numero }) {
  return (
    <Card>
      <LeftContent>
        <span className="title">Diligências</span>
        <span className="numero">{numero}</span>
        <span className="periodo">Diligências cadastradas</span>
      </LeftContent>
      <RightContent>
        <img src={GraficoDiliencias} alt="" />
      </RightContent>
    </Card>
  );
}
