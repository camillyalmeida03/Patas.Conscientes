// adotarPage.js
import { InformacoesPets } from "./informacoesPets.js";
import { CardsPets } from "./cardsPet.js";

async function carregarTodosOsPets() {
  try {
    const res = await fetch("http://localhost:6789/pets"); 
    
    if (!res.ok) throw new Error("Erro na resposta da API");
    
    const petsData = await res.json(); 

    const container = document.querySelector(".adotarSec");
    if (container) {
        container.innerHTML = "";

        petsData.forEach((dadoBanco) => {
            const petInfo = InformacoesPets.fromAPI(dadoBanco);

            if (dadoBanco.sexopet === 'Feminino') {
                petInfo.sexo = 1; 
            } else if (dadoBanco.sexopet === 'Masculino') {
                petInfo.sexo = 2;
            } else {
                petInfo.sexo = 3;
            }

            const cardObj = new CardsPets(petInfo);
            if (cardObj.card) {
                container.appendChild(cardObj.card);
            } else {
                console.warn("Card não gerado para:", petInfo.nome);
            }
        });
    }
  } catch (err) {
    console.error("Erro ao carregar pets:", err);
  }
}

carregarTodosOsPets();