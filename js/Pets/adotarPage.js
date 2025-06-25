import { InformacoesPets } from "./informacoesPets.js";
import { CardsPets } from "./cardsPet.js";

async function carregarTodosOsPets() {
  try {
    const res = await fetch("http://localhost:4501/pets");
    const pets = await res.json();

    const container = document.querySelector(".adotarSec");
    container.innerHTML = "";

    pets.forEach((pet) => {
      const especie = pet.especie || "Não informado";
      const porte = pet.porte_pet || "Não informado";

      const petInfo = new InformacoesPets(
        pet.id_pet,
        pet.id_ong_fk ?? null,
        pet.foto || "img/fotos/default.jpg",
        pet.nome_pet,
        pet.sexo_pet,
        pet.peso,
        pet.idade,
        especie,
        porte,
        pet.raca,
        pet.sobre_pet,
        pet.nome_ong,
        "#" // ou link real para a ONG
      );

      const card = new CardsPets(petInfo).card;

      if (card) container.appendChild(card);
      else console.warn("Card não gerado para:", pet.nome_pet);
    });
  } catch (err) {
    console.error("Erro ao carregar pets:", err);
  }
}

carregarTodosOsPets();
