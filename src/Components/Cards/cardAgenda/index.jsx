import { Card, Top, Infos, InfoDiligencia } from "./style";

export function CardAgenda({ tipo, hora, local, orgao, setInfosTrue, setDiligencia, id }) {
  function handleClick() {
    setInfosTrue(true);
    setDiligencia(id);
  }
  return (
    <>
      <Card onClick={handleClick}>
        <Top>
          <h4>{tipo}</h4>
        </Top>
        <Infos>
          <InfoDiligencia>
            <div className="titulo">
              <h5>Hora</h5>
            </div>
            <div className="campo">
              <p>{hora}</p>
            </div>
          </InfoDiligencia>
          <InfoDiligencia>
            <div className="titulo">
              <h5>Local</h5>
            </div>
            <div className="campo">
              <p>{local}</p>
            </div>
          </InfoDiligencia>
          <InfoDiligencia>
            <div className="titulo">
              <h5>Orgão</h5>
            </div>
            <div className="campo">
              <p>{orgao}</p>
            </div>
          </InfoDiligencia>
        </Infos>
      </Card>
    </>
  );
}
