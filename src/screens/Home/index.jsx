import { useState, useEffect, useContext } from "react";
import { Titles, Cards, Hero } from "./style";
import { CardDiligencias } from "../../Components/Cards/numDiligencias";
import { CardContrantes } from "../../Components/Cards/numContratantes";
import { CardHero } from "../../Components/Cards/cardHero";
import { CardNews } from "../../Components/Cards/cardNews";
import { onSnapshot, doc, collection } from "firebase/firestore";
import { db } from "../../services/firebaseconfig";
import { AuthContext } from "../../contexts/AuthContext";

export function SectionDashboard() {
  const { user, dispatch } = useContext(AuthContext);
  const [listaDiligencias, setListaDiligencias] = useState();
  const [listaEmpresas, setListaEmpresas] = useState();
  const [listaExecutores, setListaExecutores] = useState();
  const [fetchDiligencias, setFetchDiligencias] = useState(false);
  const [fetchEmpresas, setFetchEmpresas] = useState(false);
  const [fetchExecutores, setFetchExecutores] = useState();

  const userRef = doc(db, "users", user.uid); // Crie uma referência ao documento do usuário
  const diligenciasRef = collection(userRef, "diligencias"); // Crie uma referência à subcoleção "diligencias"
  const empresasRef = collection(userRef, "empresas"); // Crie uma referência à subcoleção "diligencias"
  const executoresRef = collection(userRef, "executores"); // Crie uma referência à subcoleção "diligencias"

  useEffect(() => {
    if (fetchDiligencias) {
      console.log(listaDiligencias.length);
    } else {
      getDiligenciasFirebase();
    }
  }, [fetchDiligencias]);

  useEffect(() => {
    if (fetchEmpresas) {
      console.log(listaEmpresas.length);
    } else {
      getEmpresas();
    }
  }, [fetchEmpresas]);

  useEffect(() => {
    if (fetchExecutores) {
      console.log(listaExecutores.length);
    } else {
      getExecutores();
    }
  }, [fetchExecutores]);

  function getDiligenciasFirebase() {
    const localStorageData = sessionStorage.getItem("listaDiligencias");
    if (localStorageData) {
      const diligenciasData = JSON.parse(localStorageData);
      setListaDiligencias(diligenciasData);
      setFetchDiligencias(true);
    } else {
      const unsubscribe = onSnapshot(diligenciasRef, (snapshot) => {
        // Usando a nova referência diligenciasRef
        const diligenciasData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setListaDiligencias(diligenciasData);
        sessionStorage.setItem("listaDiligencias", JSON.stringify(diligenciasData));
        setFetchDiligencias(true);
      });
    }
  }

  function getEmpresas() {
    const localStorageData = sessionStorage.getItem("listaEmpresas");
    if (localStorageData) {
      const empresasData = JSON.parse(localStorageData);
      setListaEmpresas(empresasData);
      setFetchEmpresas(true);
    } else {
      const unsubscribe = onSnapshot(empresasRef, (snapshot) => {
        // Usando a nova referência diligenciasRef
        const empresasData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setListaEmpresas(empresasData);
        sessionStorage.setItem("listaEmpresas", JSON.stringify(empresasData));
        setFetchEmpresas(true);
      });
    }
  }

  function getExecutores() {
    const localStorageData = sessionStorage.getItem("listaExecutores");
    if (localStorageData) {
      const executoresData = JSON.parse(localStorageData);
      setListaExecutores(executoresData);
    } else {
      const unsubscribe = onSnapshot(executoresRef, (snapshot) => {
        // Usando a nova referência diligenciasRef
        const executoresData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setListaExecutores(executoresData);
        sessionStorage.setItem("listaExecutores", JSON.stringify(executoresData));
      });
    }
  }

  return (
    <>
      <Titles>
        <span>Olá, Ricardo</span>
        <h1>Bem vindo ao EasyJus!</h1>
      </Titles>
      <Cards>
        {fetchDiligencias ? (
          <>
            <CardDiligencias numero={listaDiligencias.length} />
            <CardContrantes numero={listaEmpresas.length} title={"Contratantes"} periodo={"Empresas cadastradas"} />
            <CardContrantes numero={listaExecutores.length} title={"Executores"} periodo={"Executores cadastrados"} />
          </>
        ) : null}
      </Cards>
      <Hero>
        <CardHero />
        <CardNews />
      </Hero>
    </>
  );
}
