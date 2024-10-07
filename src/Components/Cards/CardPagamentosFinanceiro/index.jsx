import { Card, RightContent, LeftContent } from "./style";

export function CardPagamentosFinanceiro(props) {
  return (
    <Card>
      <LeftContent color={props.color}>
        <span className="title">{props.title}</span>
        <span className="numero">
          <b>R$</b>
          {props.numero}
        </span>
        <span className="periodo">{props.mes}</span>
      </LeftContent>
    </Card>
  );
}
