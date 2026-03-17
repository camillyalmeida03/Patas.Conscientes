// Este arquivo é responsável por fazer a troca de lados em algumas páginas

class TrocaLado {
  trocar(ladoParaEsconder, ladoParaMostrar, botao, tipo) {
    botao.addEventListener("click", () => {
      ladoParaEsconder.style.display = "none";
      ladoParaMostrar.style.display = "flex";

      this.atualizarBotoes(tipo);
    });
  }

  trocarGrid(ladoParaEsconder, ladoParaMostrar, botao, tipo) {
    botao.addEventListener("click", () => {
      ladoParaEsconder.style.display = "none";
      ladoParaMostrar.style.display = "grid";

      this.atualizarBotoes(tipo); // 👈 AQUI
    });
  }

  atualizarBotoes(ativo) {
    const btt1 = document.getElementById("bttEtapa1");
    const btt2 = document.getElementById("bttEtapa2");

    if (!btt1 || !btt2) return;

    if (ativo === "cadastro") {
      btt1.classList.remove("bttDesabilitado");
      btt2.classList.add("bttDesabilitado");
    } else {
      btt1.classList.add("bttDesabilitado");
      btt2.classList.remove("bttDesabilitado");
    }
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

let trocaLado = new TrocaLado();

if (formCadOng && formDocs) {
  trocaLado.trocar(
    formCadOng,
    formDocs,
    continuarCadOng,
    "cadastro"
  );

  trocaLado.trocar(
    formCadOng,
    formDocs,
    bttEtapa2,
    "cadastro"
  );

  trocaLado.trocar(
    formDocs,
    formCadOng,
    bttEtapa1,
    "login" // ou "etapa1"
  );

  trocaLado.atualizarBotoes("login");
}
