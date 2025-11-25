import { InformacoesPets } from "../../../src/config/pets/informacoesPets.js";
import { CardsPets } from "../../../src/config/pets/cardsPet.js";

async function carregarPets() {
  try {
    const params = new URLSearchParams(window.location.search);
    const idOngUrl = params.get("id");

    const res = await fetch("http://localhost:6789/pets");
    
    if (!res.ok) throw new Error("Erro na resposta da API");
    
    const todosOsPets = await res.json(); 

    const petsFiltrados = idOngUrl 
      ? todosOsPets.filter(pet => pet.fk_idong == idOngUrl)
      : todosOsPets;

    // 4. Seleciona o container (Verifique se sua ongPage tem essa div!)
    const container = document.querySelector(".adotarSec");
    
    if (container) {
        container.innerHTML = ""; // Limpa antes de adicionar

        if (petsFiltrados.length === 0) {
            container.innerHTML = "<p>Nenhum pet encontrado para esta ONG.</p>";
            return;
        }

        petsFiltrados.forEach((dadoBanco) => {
            // Cria o objeto de informações
            const petInfo = InformacoesPets.fromAPI(dadoBanco);

            // Ajuste robusto para o sexo (aceita tanto string quanto número do banco)
            // Se vier 1 ou 2 do banco, mantém. Se vier String, converte.
            if (dadoBanco.sexopet === 'Feminino') petInfo.sexo = 1;
            else if (dadoBanco.sexopet === 'Masculino') petInfo.sexo = 2;
            else if (typeof dadoBanco.sexopet === 'number') petInfo.sexo = dadoBanco.sexopet;
            else petInfo.sexo = 3;

            // Instancia o Card
            const cardObj = new CardsPets(petInfo);
            
            // Adiciona ao HTML
            if (cardObj.card) {
                container.appendChild(cardObj.card);
            }
        });
    } else {
        console.warn("Container '.adotarSec' não encontrado nesta página.");
    }

  } catch (err) {
    console.error("Erro ao carregar pets:", err);
  }
}

// Executa ao carregar a página
document.addEventListener("DOMContentLoaded", carregarPets);