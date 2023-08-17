import { CardDiligencia } from "../../Cards/cardDiligencia";
import { ContainerDiligencias } from "./style";

export function ListDiligencias({ setShowInfos }) {
  return (
    <>
      <ContainerDiligencias>
        <CardDiligencia setShowInfos={setShowInfos} />
        <CardDiligencia setShowInfos={setShowInfos} />
        <CardDiligencia />
        <CardDiligencia />
        <CardDiligencia />
        <CardDiligencia />
      </ContainerDiligencias>
    </>
  );
}
