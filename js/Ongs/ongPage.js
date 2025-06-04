//Este arquivo é responsável por gerar cada uma das páginas para cada ONG;
import { ongs } from "./valoresFicOng.js";

// 1. Pegando o ID da URL
const urlParams = new URLSearchParams(window.location.search);
const id = parseInt(urlParams.get("id"));

// 2. Buscando a ONG correspondente
const ongSelecionada = ongs.find((ong) => ong.id === id);

if (ongSelecionada) {
  console.log("ONG ENCONTRADA");

  let nomeOng = document.getElementById("nomeOng");
  nomeOng.textContent = ongSelecionada.nome;

  let enderecoOng = document.getElementById("enderecoOng");
  enderecoOng.textContent = ongSelecionada.endereco;

  let petsDisponiveis = document.getElementById("petsDisponiveis");
  petsDisponiveis.textContent = ongSelecionada.qntdanimais;

  let descricaoOng = document.getElementById("descricaoOng");
  descricaoOng.textContent = ongSelecionada.descricao;

  let petsAdotarSec = document.getElementById("petsAdotarSec");

  let fotoOng = document.getElementById("fotoOng");
  fotoOng.style.backgroundImage = `url(${ongSelecionada.foto})`;

  let caminhoPerfilOng = document.getElementById("caminhoPerfilOng");
  caminhoPerfilOng.textContent = ongSelecionada.nome;

  let bannerOng = document.getElementById("bannerOng");
  bannerOng.style.backgroundImage = `url(${ongSelecionada.banner})`;
} else {
  document.querySelector(".container").innerHTML = "<p>ONG não encontrada.</p>";
}
