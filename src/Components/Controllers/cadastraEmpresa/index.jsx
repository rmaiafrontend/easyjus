import { Card, RightContent, LeftContent } from "./style";
import IconContrantes from "../../../assets/icon-contratantes.svg";

export function CadastraEmpresa({ setShowElement }) {
  function handleClick() {
    setShowElement(true);
  }
  return (
    <Card onClick={handleClick}>
      <LeftContent>
        <span className="title">Cadastrar nova Empresa</span>
      </LeftContent>
      <RightContent>
        <img src={IconContrantes} alt="" />
      </RightContent>
    </Card>
  );
}
