// Este arquivo é responsável por fazer a troca de lados em algumas páginas

class TrocaLado {
  trocar(ladoParaEsconder, ladoParaMostrar, botao) {
    botao.addEventListener("click", () => {
      ladoParaEsconder.style.display = "none";
      ladoParaMostrar.style.display = "flex";
    });
  }

  trocarGrid(ladoParaEsconder, ladoParaMostrar, botao) {
    botao.addEventListener("click", () => {
      ladoParaEsconder.style.display = "none";
      ladoParaMostrar.style.display = "grid";
    });
  }
}

let petsLadoFavoritos = document.getElementById("petsLadoFavoritos");
let ongLadoFavoritos = document.getElementById("ongLadoFavoritos");
let botaoPetLadoFavoritos = document.getElementById("botaoPetLadoFavoritos");
let botaoOngLadoFavoritos = document.getElementById("botaoOngLadoFavoritos");

let trocaLadoFavoritos = new TrocaLado();

trocaLadoFavoritos.trocarGrid(
  ongLadoFavoritos,
  petsLadoFavoritos,
  botaoPetLadoFavoritos
);
trocaLadoFavoritos.trocarGrid(
  petsLadoFavoritos,
  ongLadoFavoritos,
  botaoOngLadoFavoritos
);
