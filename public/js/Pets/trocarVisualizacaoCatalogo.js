document.addEventListener("DOMContentLoaded", () => {
  const botaoVisualizarCat = document.getElementById("visualizarCat");
  const gerenciarCatalogoPet = document.getElementById("gerenciarCatalogoPet");
  const adotarSec = document.querySelector(".adotarSec");

  if (!botaoVisualizarCat || !gerenciarCatalogoPet || !adotarSec) return;

  const textoBotao = botaoVisualizarCat.querySelector("p");

  function atualizarVisualizacao(mostrarGerenciamento) {
    gerenciarCatalogoPet.classList.toggle("escondido", !mostrarGerenciamento);
    adotarSec.classList.toggle("escondido", mostrarGerenciamento);

    const texto = mostrarGerenciamento ? "Visualizar" : "Gerenciar";
    const titulo = mostrarGerenciamento
      ? "Visualizar catalogo em cards"
      : "Gerenciar catalogo";

    if (textoBotao) textoBotao.textContent = texto;

    botaoVisualizarCat.title = titulo;
    botaoVisualizarCat.setAttribute("aria-label", titulo);
    botaoVisualizarCat.setAttribute("aria-pressed", String(mostrarGerenciamento));
  }

  atualizarVisualizacao(false);

  botaoVisualizarCat.addEventListener("click", () => {
    const mostrandoGerenciamento = !gerenciarCatalogoPet.classList.contains("escondido");
    atualizarVisualizacao(!mostrandoGerenciamento);
  });
});
