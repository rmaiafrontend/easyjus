import { Card, LeftInfo, Status } from "./style";

export function CardDiligencia({ setShowInfos }) {
  function handleClick() {
    setShowInfos(true);
  }
  return (
    <>
      <Card onClick={handleClick}>
        <LeftInfo>
          <ul>
            <li>Audiência</li>
            <li>Gomes Advogados</li>
            <li>Petrônio Filho</li>
            <li>12/08/2023</li>
            <li>Procon Municipal</li>
            <li>João Pessoa</li>
            <li>R$40,00</li>
          </ul>
        </LeftInfo>
        <Status>
          <span>Enviado</span>
        </Status>
      </Card>
    </>
  );
}
