import { Card, RightContent, LeftContent } from "./style";
import IconContratantes from "../../../assets/icon-contratantes.svg";

export function CardContrantes({ numero, title, periodo }) {
  return (
    <Card>
      <LeftContent>
        <span className="title">{title}</span>
        <span className="numero">{numero}</span>
        <span className="periodo">{periodo}</span>
      </LeftContent>
      <RightContent>
        <img src={IconContratantes} alt="" />
      </RightContent>
    </Card>
  );
}
