import { InformacoesPets } from "../../../src/config/pets/informacoesPets.js";
import { CardsPets } from "../../../src/config/pets/cardsPet.js";
import { tabelaPets } from "../../../src/config/pets/tabelaPet.js";

let todosOsPetsCarregados = [];

function normalizarTexto(texto) {
    return String(texto || "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim()
        .toLowerCase();
}

function normalizarSexoPet(dadoBanco, petInfo) {
    const sexo = normalizarTexto(dadoBanco.sexopet);

    if (sexo === "feminino" || sexo === "femea" || sexo === "2") {
        petInfo.sexo = 1;
    } else if (sexo === "masculino" || sexo === "macho" || sexo === "1") {
        petInfo.sexo = 2;
    } else {
        petInfo.sexo = typeof dadoBanco.sexopet === "number" ? dadoBanco.sexopet : 3;
    }
}

function renderizarPets(pets, mensagemVazia = "Nenhum pet disponivel.") {
    const container = document.querySelector(".adotarSec");
    const tbody = document.getElementById("tbodyTabelaPet");

    if (!container && !tbody) return;

    if (container) {
        container.innerHTML = "";
    }

    if (tbody) {
        tbody.innerHTML = "";
    }

    if (!Array.isArray(pets) || pets.length === 0) {
        if (container) {
            const aviso = document.createElement("p");
            aviso.textContent = mensagemVazia;
            container.appendChild(aviso);
        }

        return;
    }

    pets.forEach((dadoBanco) => {
        const petInfo = InformacoesPets.fromAPI(dadoBanco);
        normalizarSexoPet(dadoBanco, petInfo);

        if (container) {
            const cardObj = new CardsPets(petInfo);

            if (cardObj.card) {
                container.appendChild(cardObj.card);
            }
        }

        if (tbody) {
            new tabelaPets(petInfo);
        }
    });
}

export async function carregarPets() {
    try {
        const params = new URLSearchParams(window.location.search);
        const idOngUrl = params.get("id");

        const res = await fetch("http://localhost:6789/pets");

        if (!res.ok) throw new Error("Erro na resposta da API");

        todosOsPetsCarregados = await res.json();

        const petsFiltrados = idOngUrl
            ? todosOsPetsCarregados.filter(pet => {
                const idDoBanco = pet.fk_idong || pet.id_ong || pet.ong_id;
                return String(idDoBanco) === String(idOngUrl);
            })
            : todosOsPetsCarregados;

        const msg = idOngUrl
            ? "Nenhum pet encontrado vinculado a esta ONG ainda."
            : "Nenhum pet disponivel.";

        renderizarPets(petsFiltrados, msg);
    } catch (err) {
        console.error("Erro ao carregar pets:", err);
    }
}

document.addEventListener("DOMContentLoaded", carregarPets);

window.addEventListener("petsFiltrados", (event) => {
    renderizarPets(event.detail?.pets || [], "Nenhum pet encontrado com esses filtros.");
});

window.addEventListener("filtrosPetsLimpos", () => {
    carregarPets();
});
