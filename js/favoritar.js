//Este arquivo é responsável por favoritar/desfavoritar ONGs e Pets

// Importando informações de outros arquivos
import { CriarElementos } from "./criarElementos.js";


export class Favoritar {
  constructor(infoOng = null, InfoPet = null) {
    this.criarElemento = new CriarElementos();
    this.infoOng = infoOng;
    this.InfoPet = InfoPet;
    this.adicionarFavorito = null;
    this.apagarFavorito = null;
  }


  // Mostra mensagem de feedback confirmando que foi favoritado
  adicionarFeedbackFavoritado() {
    const imgAdd = document.createElement("img");
    imgAdd.src = "/img/feedback/fav_adicionado.svg";
    imgAdd.style.position = "fixed";
    imgAdd.style.top = "5rem";
    imgAdd.style.right = "2rem";
    imgAdd.style.zIndex = "4000";
    imgAdd.style.height = "6rem";
    document.body.appendChild(imgAdd);
    setTimeout(() => imgAdd.remove(), 3000);
  }

  // Mostra mensagem de feedback confirmando que foi desfavoritado
  adicionarFeedbackDesfavoritado() {
    const imgRem = document.createElement("img");
    imgRem.src = "/img/feedback/fav_removido.svg";
    imgRem.style.position = "fixed";
    imgRem.style.top = "5rem";
    imgRem.style.right = "2rem";
    imgRem.style.zIndex = "4000";
    imgRem.style.height = "6rem";
    document.body.appendChild(imgRem);
    setTimeout(() => imgRem.remove(), 3000);
  }

  // Remove o feedback, caso eles esteja na tela
  removeFeedback() {
    const imgFeedback = document.querySelector(
      'body > img[src="/img/feedback/fav_adicionado.svg"], body > img[src="/img/feedback/fav_removido.svg"]'
    );
    if (imgFeedback) imgFeedback.remove();
  }

  // Evento de clique no botão de favoritar
  cliqueNoBotFavoritar(elementoPai, nome) {
    this.adicionarFavorito.addEventListener("click", (event) => {
      event.preventDefault();

      this.adicionarFavorito.classList.remove("adicionarFav");
      this.adicionarFavorito.remove(); // Remove o botão atual

      // Cria o botão de desfavoritar
      this.apagarFavorito = this.criarElemento.createButton(
        ["favoritar", "apagarFav"],
        null,
        elementoPai,
        "DesFavoritar " + nome
      );

      this.cliqueNoBotDesfavoritar(elementoPai, nome);

      this.removeFeedback();
      this.adicionarFeedbackFavoritado();
    });
  }

  // Evento de clique no botão de desfavoritar
  cliqueNoBotDesfavoritar(elementoPai, nome) {
    this.apagarFavorito.addEventListener("click", (event) => {
      event.preventDefault();

      this.apagarFavorito.classList.remove("apagarFav");
      this.apagarFavorito.remove(); // Remove o botão atual

      // Cria o botão de favoritar novamente
      this.adicionarFavorito = this.criarElemento.createButton(
        ["favoritar", "adicionarFav"],
        null,
        elementoPai,
        "Favoritar " + nome
      );

      this.cliqueNoBotFavoritar(elementoPai, nome);

      this.removeFeedback();
      this.adicionarFeedbackDesfavoritado();
    });
  }

  // Cria os botões nos cards
  criarBotoesCards(elementoPai, nome) {
    // Verifica se já existe um botão de favoritar ou desfavoritar no elemento pai
    const botaoExistente = elementoPai.querySelector(".favoritar");

    if (!botaoExistente) {
      // Cria o botão de favoritar
      this.adicionarFavorito = this.criarElemento.createButton(
        ["favoritar", "adicionarFav"],
        null,
        elementoPai,
        "Favoritar " + nome
      );

      // Adiciona o evento de clique
      this.cliqueNoBotFavoritar(elementoPai, nome);
    }

    // Retorna o botão atual (se já existia, ou o recém-criado)
    return elementoPai.querySelector(".favoritar");
  }
}
