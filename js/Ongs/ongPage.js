//Este arquivo é responsável por gerar cada uma das páginas para cada ONG;
import { ongs } from "./valoresFicOng.js";
import { CriarElementos } from "../criarElementos.js";
import { InformacoesOng } from "./informacoesOng.js";

// 1. Pegando o ID da URL
const urlParams = new URLSearchParams(window.location.search);
const id = parseInt(urlParams.get("id"));

// 2. Função para buscar ONG do banco
async function buscarOngPorId(id) {
  try {
    const response = await fetch(`http://localhost:4501/ongs/${id}`);
    if (!response.ok) throw new Error("Erro ao buscar ONG");
    const [ong] = await response.json(); // assume que retorna array com um único objeto
    return ong;
  } catch (error) {
    console.error("Erro ao buscar ONG:", error);
    return null;
  }
}

// 3. Preenche os dados na tela
async function preencherPagina() {
  const ongSelecionada = await buscarOngPorId(id);

  if (!ongSelecionada) {
    document.querySelector(".adotarSec").innerHTML = "<p>ONG não encontrada.</p>";
    return;
  }

  console.log("ONG encontrada:", ongSelecionada);

  document.getElementById("titleOng").textContent = `${ongSelecionada.nome_ong} - Patas Conscientes`;
  document.getElementById("nomeOng").textContent = ongSelecionada.nome_ong;
  document.getElementById("enderecoOng").textContent = `${ongSelecionada.rua}, ${ongSelecionada.numero}, ${ongSelecionada.bairro}, ${ongSelecionada.cidade} - ${ongSelecionada.sigla}`;
  document.getElementById("petsDisponiveis").textContent = "Carregando...";
  document.getElementById("descricaoOng").textContent = ongSelecionada.descricao || "Sem descrição.";

  // document.getElementById("fotoOng").style.backgroundImage = "url('/img/default-foto.jpg')";
  // document.getElementById("bannerOng").style.backgroundImage = "url('/img/default-banner.jpg')";
  document.getElementById("caminhoPerfilOng").textContent = ongSelecionada.nome_ong;
}
preencherPagina();

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
