import { MainContent, AllContent, Container, Titles, Cards, Hero } from "./style";
import SideBar from "../../Components/Layout/Sidebar/index";
import { CardDiligencias } from "../../Components/Cards/numDiligencias";
import { CardContrantes } from "../../Components/Cards/numContratantes";
import { CardHero } from "../../Components/Cards/cardHero";
import { CardNews } from "../../Components/Cards/cardNews";

export function SectionDashboard() {
  return (
    <>
      <AllContent>
        <SideBar />
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
      </AllContent>
    </>
  );
}
