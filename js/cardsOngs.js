// Este arquivo é responsável por criar os cards das ONGs via JS.

// Importando dados do arquivo criarElementos.js
import { CriarElementos } from "./criarElementos.js";

// Classe que representa puxar informações da ONG
export class InformacoesOng {
  constructor(id, foto, nome, descricao, cidade, qntdanimais) {
    this.id = id;
    this.foto = foto;
    this.nome = nome;
    this.descricao = descricao;
    this.cidade = cidade;
    this.qntdanimais = qntdanimais;
  }
}

// Classe que cria os cards das ONGs
export class CardsOngs {
  constructor(InformacoesOng = null) {
    this.criarElemento = new CriarElementos();

    if (InformacoesOng) {
      this.InfoOng = InformacoesOng;
      this.card = this.gerarCard(InformacoesOng);
    }
  }

  gerarCard(InfoOng) {
    this.InfoOng = InfoOng;
    const gridOng = document.querySelector(".gridOng");

    if (gridOng) {
      console.log("gridOng foi encontrada");

      this.cardOng = this.criarElemento.createA(
        "cardOng",
        "ongPage.html",
        "Ir para a página de " + InfoOng.nome,
        null,
        gridOng, 
        "Ver mais sobre " + this.InfoOng.nome
      )

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

      this.favoritar = this.criarElemento.createButton(
        ["favoritar", "apagarFav"],
        null,
        this.imgFav,
        "Desfavoritar " + this.InfoOng.nome
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

// Exemplo de informação de ONG
const ongs = [
  new InformacoesOng(
    1,
    "img/fotos/ong2.jpg",
    "Lar dos Peludos Matão",
    "Espaço dedicado ao cuidado de animais de rua, oferecendo abrigo e cuidados médicos.",
    "Matão",
    45
  ),
  new InformacoesOng(
    2,
    "img/fotos/ong3.jpg",
    "Vida Animal Matão",
    "Organização comprometida com o resgate e a adoção de animais em situações vulneráveis.",
    "Matão",
    25
  ),
  new InformacoesOng(
    3,
    "img/fotos/ong4.jpg",
    "Cãopanheiros Taquaritinga",
    "Focada em garantir que cada pet encontre um lar amoroso, seguro e responsável.",
    "Taquaritinga",
    40
  ),
  new InformacoesOng(
    4,
    "img/fotos/ong5.jpg",
    "Amor em Patas Taquaritinga",
    "ONG dedicada ao resgate de animais, gatos e cachorros, com ênfase na adoção consciente.",
    "Taquaritinga",
    50
  ),
  new InformacoesOng(
    5,
    "img/fotos/ong6.jpg",
    "Anjos de Quatro Patas",
    "Organização voltada para o acolhimento de cães e gatos até que encontrem um novo lar.",
    "Taquaritinga",
    35
  ),
  new InformacoesOng(
    6,
    "img/fotos/ong1.jpg",
    "Patas Amigas Matão",
    "A ONG resgata cães e gatos abandonados, focando em adoções responsáveis.",
    "Matão",
    30
  ),
];

const cards = [];

ongs.forEach((ong) => {
  const card = new CardsOngs(ong);
  cards.push(card);
  
});
