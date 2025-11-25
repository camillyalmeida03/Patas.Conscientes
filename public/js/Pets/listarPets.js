import { InformacoesPets } from "../../../src/config/pets/informacoesPets.js";
import { CardsPets } from "../../../src/config/pets/cardsPet.js";

async function carregarPets() {
  try {
    const params = new URLSearchParams(window.location.search);
    const idOngUrl = params.get("id");

    console.log("--- DEBUG INICIAL ---");
    console.log("ID procurado (URL):", idOngUrl);

    const res = await fetch("http://localhost:6789/pets"); 
    
    if (!res.ok) throw new Error("Erro na resposta da API");
    
    const todosOsPets = await res.json(); 

    // === ÁREA DE DIAGNÓSTICO ===
    // Isso vai mostrar no console EXATAMENTE o que o banco está mandando
    if (todosOsPets.length > 0) {
        console.log("--- VERIFICANDO DADOS DOS PETS ---");
        todosOsPets.forEach((pet, index) => {
            // Tenta achar o ID da ONG em várias propriedades comuns
            const idEncontrado = pet.fk_idong || pet.id_ong || pet.ong_id || "NÃO ACHEI";
            
            console.log(`Pet #${index} (${pet.nome}): ID da ONG no banco = ${idEncontrado}`);
            
            // Se aparecer "NÃO ACHEI", liste todas as chaves para descobrirmos o nome certo
            if (idEncontrado === "NÃO ACHEI") {
                console.log("⚠️ Chaves disponíveis neste pet:", Object.keys(pet));
            }
        });
    }
    // ===========================

    const petsFiltrados = idOngUrl 
      ? todosOsPets.filter(pet => {
          // Normaliza os IDs para comparação segura (texto vs número)
          // Tenta pegar o ID da propriedade fk_idong (padrão do seu informacoesPets.js)
          const idDoBanco = pet.fk_idong; 
          return String(idDoBanco) === String(idOngUrl);
      })
      : todosOsPets;

    console.log(`Resultado do filtro: ${petsFiltrados.length} pets encontrados.`);

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
            // Cria o objeto de informações
            const petInfo = InformacoesPets.fromAPI(dadoBanco);

            // Ajuste robusto para o sexo
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