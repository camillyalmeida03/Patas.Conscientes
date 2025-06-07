// Este arquivo é responsável por criar os cards das ONGs via JS.

// Importando dados do arquivo criarElementos.js
import { Favoritar } from "../favoritar.js";
import { CriarElementos } from "../criarElementos.js";
import { ongs } from "./valoresFicOng.js";

// Classe que cria os cards das ONGs
export class CardsOngs {
  constructor(InformacoesOng = null) {
    this.criarElemento = new CriarElementos();
    this.favoritar = new Favoritar();

    if (InformacoesOng) {
      this.InfoOng = InformacoesOng;
      this.card = this.gerarCard(InformacoesOng);
    }
  }

  gerarCard(InfoOng) {
    this.InfoOng = InfoOng;
    const gridOng = document.querySelector(".gridOng");

    if (gridOng) {
      console.log("gridOng foi encontrada.");

      this.cardOng = this.criarElemento.createA(
        "cardOng",
        "ongPage.html?id=" + InfoOng.id,
        "Ir para a página de " + InfoOng.nome,
        null,
        gridOng,
        "Ver mais sobre " + this.InfoOng.nome
      );

      this.cardOng.addEventListener("click", () => {
        // Passa o ID da ONG para a URL
        window.location.href = `ongPage.html?id=${this.InfoOng.id}`;
      });

      this.imgFav = this.criarElemento.createElement(
        "div",
        ["imgFav", "favoritado"],
        null,
        this.cardOng
      );

      this.imgOng = this.criarElemento.createImg(
        [],
        this.InfoOng.foto,
        "Foto de " + this.InfoOng.nome,
        "lazy",
        this.imgFav
      );

      // Chama o método favoritar, adiciona botão de favoritar e sua funcionalidade
      this.favoritar = new Favoritar(InfoOng);
      this.botaoFavorito = this.favoritar.criarBotoesCards(
        this.imgFav,
        this.InfoOng.nome
      );

      this.descOng = this.criarElemento.createElement(
        "div",
        "descOng",
        null,
        this.cardOng
      );

      this.h2nome = this.criarElemento.createElement(
        "h2",
        [],
        this.InfoOng.nome,
        this.descOng
      );

      this.pDesc = this.criarElemento.createElement(
        "p",
        [],
        this.InfoOng.descricao,
        this.descOng
      );

      this.cidadeOng = this.criarElemento.createElement(
        "p",
        "cidadeOng",
        this.InfoOng.cidade,
        this.descOng
      );

      this.qntdAnimaisOng = this.criarElemento.createElement(
        "p",
        "qntdAnimaisOng",
        this.InfoOng.qntdanimais,
        this.descOng
      );
    } else {
      console.log("ERROR: gridOng não encontrada");
    }
  }

  abrirOngPage() {
    console.log("Conexão entre arquivos ocorreu perfeitamente");
  }
}

const cards = [];
ongs.forEach((ong) => {
  const card = new CardsOngs(ong);
  cards.push(card);
});
