import { Card, RightContent, LeftContent } from "./style";
import IconContratantes from "../../../assets/icon-contratantes.svg";

export function CardContrantes() {
  return (
    <Card>
      <LeftContent>
        <span className="title">Contratantes</span>
        <span className="numero">12</span>
        <span className="periodo">Últimos 30 dias</span>
      </LeftContent>
      <RightContent>
        <img src={IconContratantes} alt="" />
      </RightContent>
    </Card>
  );
}
