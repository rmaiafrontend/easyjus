import { useEffect, useState, useContext } from "react";
import { Overlay, Form, TopContent, BottonContent, ListTipos, InputTipo, Label, ButtonCadastrar, Tipo, CloseButton } from "./style";
import { collection, onSnapshot, addDoc, doc, deleteDoc } from "firebase/firestore";
import { db } from "../../../services/firebaseconfig";
import closeIcon from "../../../assets/close-icon.svg";
import { AuthContext } from "../../../contexts/AuthContext";

export function FormTipoDiligencia({ setShowCadastraTipos }) {
  const [inputTipo, setInputTipo] = useState();
  const { user, dispatch } = useContext(AuthContext);
  const [tiposCadastrados, setTiposCadastrados] = useState([]);

  const userRef = doc(db, "users", user.uid); // Crie uma referência ao documento do usuário
  const collectionRef = collection(userRef, "tipoDiligencia"); // Crie uma referência à subcoleção "diligencias"

  useEffect(() => {
    getDiligenciasFirebase();
  }, []);

  function handleClick() {
    setShowCadastraTipos(false);
  }

  async function cadastrarTipoDiligencia() {
    try {
      const docRef = await addDoc(collectionRef, {
        tipo: inputTipo,
      });

      // Atualize o estado local
      setTiposCadastrados([...tiposCadastrados, { id: docRef.id, tipo: inputTipo }]);

      // Atualize o Local Storage
      localStorage.setItem("tiposDiligencia", JSON.stringify([...tiposCadastrados, { id: docRef.id, tipo: inputTipo }]));

      // Limpe o input após o cadastro
      setInputTipo("");
    } catch (error) {
      console.error("Erro ao cadastrar tipoDiligencia:", error);
    }
  }

  async function excluirTipoDiligencia(id) {
    try {
      await deleteDoc(doc(collectionRef, id));

      // Atualize o estado local excluindo o tipo de diligência com o ID correspondente
      setTiposCadastrados(tiposCadastrados.filter((tipo) => tipo.id !== id));

      // Atualize o Local Storage excluindo o tipo de diligência com o ID correspondente
      localStorage.setItem("tiposDiligencia", JSON.stringify(tiposCadastrados.filter((tipo) => tipo.id !== id)));
    } catch (error) {
      console.error("Erro ao excluir tipoDiligencia:", error);
    }
  }

  function getDiligenciasFirebase() {
    const localStorageData = localStorage.getItem("tiposDiligencia");
    if (localStorageData) {
      const tipoDiligencias = JSON.parse(localStorageData);
      setTiposCadastrados(tipoDiligencias);
    } else {
      const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
        // Usando a nova referência diligenciasRef
        const tiposDiligenciaData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTiposCadastrados(tiposDiligenciaData);
        localStorage.setItem("tiposDiligencia", JSON.stringify(tiposDiligenciaData));
      });
    }
  }

  return (
    <>
      <Overlay>
        <Form>
          <CloseButton onClick={handleClick}>
            <img src={closeIcon} alt="" />
          </CloseButton>
          <TopContent>
            <h2>Cadastrar/Excluir Tipo de Diligência</h2>
            <Label>
              <InputTipo placeholder={"Digite o tipo da diligência"} type="text" value={inputTipo} onChange={(e) => setInputTipo(e.target.value)} />
              <ButtonCadastrar onClick={cadastrarTipoDiligencia}>Cadastrar</ButtonCadastrar>
            </Label>
          </TopContent>
          <BottonContent>
            <span>Tipos cadastrados</span>
            <ListTipos>
              {tiposCadastrados.map((tipo) => (
                <Tipo key={tipo.id}>
                  <span>{tipo.tipo}</span>
                  <button onClick={() => excluirTipoDiligencia(tipo.id)}>Excluir</button>
                </Tipo>
              ))}
            </ListTipos>
          </BottonContent>
        </Form>
      </Overlay>
    </>
  );
}
