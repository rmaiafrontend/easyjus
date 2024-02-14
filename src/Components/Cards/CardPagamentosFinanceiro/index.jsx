import { Card, RightContent, LeftContent } from "./style";

export function CardPagamentosFinanceiro(props) {
  return (
    <Card>
      <LeftContent color={props.color}>
        <span className="title">{props.title}</span>
        <span className="numero">{props.numero}</span>
        <span className="periodo">Últimos 30 dias</span>
      </LeftContent>
    </Card>
  );
}
