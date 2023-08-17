import { Card } from "./style";
import IconDigital from "../../../assets/icon-digital.svg";

export function CardNews() {
  return (
    <Card>
      <img src={IconDigital} alt="" />
      <h3>Mais segurança no seu App!</h3>
      <p>Discover our cards benefits, with one tap.</p>
      <button>Descubra as novidades</button>
    </Card>
  );
}
