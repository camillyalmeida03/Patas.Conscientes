import { InformacoesPets } from "../../../src/config/pets/informacoesPets.js";
import { CardsPets } from "../../../src/config/pets/cardsPet.js";

async function carregarPets() {
  try {
    const params = new URLSearchParams(window.location.search);
    const idOngUrl = params.get("id");

    const res = await fetch("https://api-patas-conscientes.onrender.com/pets"); 
    
    if (!res.ok) throw new Error("Erro na resposta da API");
    
    const todosOsPets = await res.json(); 

    if (todosOsPets.length > 0) {
        todosOsPets.forEach((pet, index) => {
            const idEncontrado = pet.fk_idong || pet.id_ong || pet.ong_id || "NÃO ACHEI";
    
            
        });
    }

    const petsFiltrados = idOngUrl 
      ? todosOsPets.filter(pet => {
          const idDoBanco = pet.fk_idong; 
          return String(idDoBanco) === String(idOngUrl);
      })
      : todosOsPets;


    const container = document.querySelector(".adotarSec");
    
    if (container) {
        container.innerHTML = "";

        if (petsFiltrados.length === 0) {
            const msg = idOngUrl 
                ? "Nenhum pet encontrado vinculado a esta ONG (ID " + idOngUrl + ")." 
                : "Nenhum pet disponível.";
            
            const aviso = document.createElement("p");
            aviso.textContent = msg;
            aviso.style.textAlign = "center";
            aviso.style.padding = "20px";
            container.appendChild(aviso);
            return;
        }

        petsFiltrados.forEach((dadoBanco) => {
            const petInfo = InformacoesPets.fromAPI(dadoBanco);

            if (dadoBanco.sexopet === 'Feminino' || dadoBanco.sexopet === '1') {
                petInfo.sexo = 1; 
            } else if (dadoBanco.sexopet === 'Masculino' || dadoBanco.sexopet === '2') {
                petInfo.sexo = 2;
            } else {
                petInfo.sexo = typeof dadoBanco.sexopet === 'number' ? dadoBanco.sexopet : 3;
            }

            const cardObj = new CardsPets(petInfo);
            if (cardObj.card) {
                container.appendChild(cardObj.card);
            }
        });
    }
  } catch (err) {
    console.error("Erro ao carregar pets:", err);
  }
}

document.addEventListener("DOMContentLoaded", carregarPets);