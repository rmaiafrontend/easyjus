import { Card, Valor } from "./style";

export function CardExtrato({ nome, valor, tipo }) {
  return (
    <>
      <Card>
        <h4>{nome}</h4>
        <Valor tipo={tipo}>R${valor}</Valor>
      </Card>
    </>
  );
}
