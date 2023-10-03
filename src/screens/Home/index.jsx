import { MainContent, Container, Titles, Cards, Hero } from "./style";
import { CardDiligencias } from "../../Components/Cards/numDiligencias";
import { CardContrantes } from "../../Components/Cards/numContratantes";
import { CardHero } from "../../Components/Cards/cardHero";
import { CardNews } from "../../Components/Cards/cardNews";

export function SectionDashboard() {
  return (
    <>
      <MainContent>
        <Container>
          <Titles>
            <span>Olá, Ricardo</span>
            <h1>Bem vindo ao EasyJus!</h1>
          </Titles>
          <Cards>
            <CardDiligencias />
            <CardContrantes />
          </Cards>
          <Hero>
            <CardHero />
            <CardNews />
          </Hero>
        </Container>
      </MainContent>
    </>
  );
}
