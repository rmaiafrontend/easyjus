import { Card, RightContent, LeftContent } from "./style";
import IconContrantes from "../../../assets/icon-contratantes.svg";

function CadastraExecutor({ setShowElement }) {
  function handleClick() {
    setShowElement(true);
  }
  return (
    <Card onClick={handleClick}>
      <LeftContent>
        <span className="title">Cadastrar novo executor</span>
      </LeftContent>
      <RightContent>
        <img src={IconContrantes} alt="" />
      </RightContent>
    </Card>
  );
}

export default CadastraExecutor;
