// import { Favoritar } from "../favoritar.js";
import { CriarElementos } from "../criarElementos.js";
import { InformacoesOng } from "./informacoesOng.js";

// Classe que cria os cards das ONGs
export class CardsOngs {
  constructor(InformacoesOng = null) {
    this.criarElemento = new CriarElementos();
    // this.favoritar = new Favoritar();

    if (InformacoesOng) {
      this.InfoOng = InformacoesOng;
      this.card = this.gerarCard(InformacoesOng);
    }
  }

  gerarCard(InfoOng) {
    const gridOng = document.querySelector(".gridOng");
    if (!gridOng) return console.log("gridOng não encontrada");

    const cardOng = this.criarElemento.createA(
      "cardOng",
      `ongPage.html?id=${InfoOng.id}`,
      `Ir para a página de ${InfoOng.nome}`,
      null,
      gridOng
    );

    cardOng.addEventListener("click", () => {
      window.location.href = `ongPage.html?id=${InfoOng.id}`;
    });

    const imgFav = this.criarElemento.createElement(
      "div",
      ["imgFav", "favoritado"],
      null,
      cardOng
    );

    const img = this.criarElemento.createImg(
      [],
      InfoOng.foto || "/img/user_ong/banners/Banner_misto_rosa_ONG.svg",
      `Foto de ${InfoOng.nome}`,
      "lazy",
      imgFav
    );

    // Evita imagem quebrada se o caminho não for válido
    img.onerror = () => {
      img.src = "/img/user_ong/banners/Banner_misto_rosa_ONG.svg";
    };

    // const favorito = new Favoritar(InfoOng);
    // favorito.criarBotoesCards(imgFav, InfoOng.nome);

    const descOng = this.criarElemento.createElement(
      "div",
      "descOng",
      null,
      cardOng
    );
    this.criarElemento.createElement("h2", [], InfoOng.nome, descOng);
    this.criarElemento.createElement(
      "p",
      [],
      InfoOng.descricao || "Sem descrição.",
      descOng
    );
    this.criarElemento.createElement("p", "cidadeOng", InfoOng.cidade, descOng);
    this.criarElemento.createElement(
      "p",
      "qntdAnimaisOng",
      `Animais: ${InfoOng.qntdanimais || 0}`,
      descOng
    );
  }

  abrirOngPage() {
    console.log("Conexão entre arquivos ocorreu perfeitamente");
  }
}

// 🔽 BUSCA ONGs DO BACKEND E CRIA OS CARDS
async function carregarOngsDoBanco() {
  try {
    const response = await fetch("http://localhost:4501/ongs");
    if (!response.ok) throw new Error("Falha ao buscar ONGs");

    const ongsDoBanco = await response.json();

    ongsDoBanco.forEach((ong) => {
      const ongInfo = InformacoesOng.fromAPI(ong);
      new CardsOngs(ongInfo);
    });
  } catch (error) {
    console.error("Erro ao carregar as ONGs:", error);
    const grid = document.querySelector(".gridOng");
    if (grid) grid.innerHTML = "<p>Erro ao carregar ONGs.</p>";
  }
}

carregarOngsDoBanco(); // ✅ fora da função, chamado corretamente
