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

if (botaoOngLadoFavoritos) {
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
}

// Trocar lados da página de cadastro de ONG
let formCadOng = document.querySelector("#formCadOng");
let formDocs = document.querySelector("#formDocs");
let continuarCadOng = document.querySelector("#continuarCadOng");

let bttEtapa1 = document.querySelector("#bttEtapa1");
let bttEtapa2 = document.querySelector("#bttEtapa2")

let trocaLado = new TrocaLado();

if (formCadOng && formDocs) {
  trocaLado.trocar(
    formCadOng,
    formDocs,
    continuarCadOng
  )

  trocaLado.trocar(
    formCadOng,
    formDocs,
    bttEtapa2
  )

  trocaLado.trocar(
    formDocs,
    formCadOng,
    bttEtapa1
  )
}




