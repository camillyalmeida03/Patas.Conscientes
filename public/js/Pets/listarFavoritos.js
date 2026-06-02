import { InformacoesPets } from "../../../src/config/pets/informacoesPets.js";
import { CardsPets } from "../../../src/config/pets/cardsPet.js";
import { Favoritar } from "../favoritar.js";

const API_BASE = "http://localhost:6789";
const containerPets = document.getElementById("petsLadoFavoritos");

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
    return;
  }

  if (sexo === "masculino" || sexo === "macho" || sexo === "1") {
    petInfo.sexo = 2;
    return;
  }

  petInfo.sexo = typeof dadoBanco.sexopet === "number" ? dadoBanco.sexopet : 3;
}

function renderizarAviso(mensagem) {
  if (!containerPets) return;

  containerPets.innerHTML = "";

  const aviso = document.createElement("p");
  aviso.classList.add("avisoFavoritos");
  aviso.textContent = mensagem;
  containerPets.appendChild(aviso);
}

function obterIdUsuarioLogado() {
  const usuario = Favoritar.obterUsuarioLogado();

  return (
    usuario?.id ||
    usuario?.idusuario ||
    usuario?.id_usuario ||
    usuario?.fk_idusuario ||
    usuario?.usuario?.id ||
    null
  );
}

function sincronizarCache(idUsuario, favoritos) {
  const ids = favoritos
    .map((pet) => Number(pet.fk_idpet || pet.idpet || pet.id_pet || pet.id))
    .filter((id) => Number.isFinite(id));

  const favoritosSet = new Set(ids);
  Favoritar.favoritosPorUsuario.set(idUsuario, favoritosSet);
  Favoritar.salvarFavoritosCache(idUsuario, favoritosSet);
}

function renderizarFavoritos(favoritos) {
  if (!containerPets) return;

  containerPets.innerHTML = "";

  if (!Array.isArray(favoritos) || favoritos.length === 0) {
    renderizarAviso("Voce ainda nao favoritou nenhum pet.");
    return;
  }

  favoritos.forEach((dadoBanco) => {
    const petInfo = InformacoesPets.fromAPI(dadoBanco);
    normalizarSexoPet(dadoBanco, petInfo);

    const cardObj = new CardsPets(petInfo);

    if (cardObj.card && cardObj.card.parentElement !== containerPets) {
      containerPets.appendChild(cardObj.card);
    }
  });
}

export async function carregarFavoritos() {
  if (!containerPets) return;

  const idUsuario = obterIdUsuarioLogado();

  if (!idUsuario) {
    renderizarAviso("Entre na sua conta para ver seus favoritos.");
    return;
  }

  renderizarAviso("Carregando favoritos...");

  try {
    const resposta = await fetch(`${API_BASE}/petsfavoritados/usuario/${idUsuario}`);

    if (!resposta.ok) {
      throw new Error("Erro ao carregar favoritos.");
    }

    const favoritos = await resposta.json();
    sincronizarCache(idUsuario, favoritos);
    renderizarFavoritos(favoritos);
  } catch (erro) {
    console.error("Erro ao carregar favoritos:", erro);
    renderizarAviso("Nao foi possivel carregar seus favoritos agora.");
  }
}

document.addEventListener("DOMContentLoaded", carregarFavoritos);

window.addEventListener("favoritosAtualizados", (event) => {
  const idUsuario = obterIdUsuarioLogado();

  if (String(event.detail?.idUsuario || "") !== String(idUsuario || "")) return;

  carregarFavoritos();
});
