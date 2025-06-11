//Este arquivo é responsável por gerar cada uma das páginas para cada ONG;
import { ongs } from "./valoresFicOng.js";
import { CriarElementos } from "../criarElementos.js";
import { InformacoesOng } from "./informacoesOng.js";

// 1. Pegando o ID da URL
const urlParams = new URLSearchParams(window.location.search);
const id = parseInt(urlParams.get("id"));

// 2. Buscando a ONG correspondente
const ongSelecionada = ongs.find((ong) => ong.id === id);

if (ongSelecionada) {
  console.log("ONG ENCONTRADA");

  let titleOng = document.getElementById("titleOng");
  titleOng.textContent = `${ongSelecionada.nome} - Patas Conscientes`

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
  document.querySelector(".adotarSec").innerHTML = "<p>ONG não encontrada.</p>";
}

class Redes {
  constructor() {
    this.criarElemento = new CriarElementos();
  }

  redes() {
    this.infoCardOngPerfil = document.querySelector(".infoCardOngPerfil");

    const temRede = Object.values(ongSelecionada.redes).some((url) => url);

    if (temRede) {
      // Cria o bloco só se tiver pelo menos uma rede com URL
      this.redesDiv = this.criarElemento.createElement(
        "div",
        "redes",
        null,
        this.infoCardOngPerfil,
        null
      );

      this.linha = this.criarElemento.createElement(
        "div",
        "linha",
        null,
        this.redesDiv,
        null
      );

      this.pNossasRedes = this.criarElemento.createElement(
        "p",
        "redesOng",
        "Nossas redes: ",
        this.redesDiv,
        null
      );

      this.divbttRedes = this.criarElemento.createElement(
        "div",
        "bttRedes",
        null,
        this.redesDiv,
        null
      );

      // Agora sim, cria um <a> por rede válida
      Object.entries(ongSelecionada.redes).forEach(([tipo, url]) => {
        if (url) {
          this.redeA = this.criarElemento.createA(
            null,
            url,
            `${tipo} da ${ongSelecionada.nome}.`,
            null,
            this.divbttRedes
          );

          this.imgA = this.criarElemento.createImg(
            null,
            `img/icons/${tipo}-icon.svg`,
            `Ícone do ${tipo}`,
            "lazy",
            this.redeA
          );

          this.redeA.append(` ${tipo}`);
        }
      });
    } else {
      console.log("Esta ONG não tem redes sociais cadastradas.");
    }
  }
}

class AdicionarBotao {
  constructor() {
    this.criarElemento = new CriarElementos();
  }

  botaoAdicionar() {
    this.infoCardOngPerfil = document.querySelector(".infoCardOngPerfil");

    this.adicionarBttOngAdm = this.criarElemento.createElement(
      "div",
      "adicionarBttOngAdm",
      null,
      this.infoCardOngPerfil,
      null
    );

    this.linha = this.criarElemento.createElement(
      "div",
      "linha",
      null,
      this.adicionarBttOngAdm,
      null
    );

    this.botaoAdd = this.criarElemento.createButton(
      "buttonRosa",
      "Adicionar",
      this.adicionarBttOngAdm,
      "Adicionar..."
    );

    this.botaoAdd.id = "abrirModalAdicionar"
  }
}

let redesSec = new Redes();
redesSec.redes();

let adicionar = new AdicionarBotao();
adicionar.botaoAdicionar();
