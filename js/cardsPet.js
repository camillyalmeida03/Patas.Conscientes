//Este arquivo JS é responsável por gerar os cards de cada pet.

// Classe representando os dados de um Pet
class InformacoesPet {
  constructor(
    id,
    foto,
    nome,
    sexo,
    peso,
    idade,
    especie,
    porte,
    raca,
    sobre,
    ongNome,
    ongLink
  ) {
    this.id = id;
    this.foto = foto;
    this.nome = nome;
    this.sexo = sexo;
    this.peso = peso;
    this.idade = idade;
    this.especie = especie;
    this.raca = raca;
    this.sobre = sobre;
    this.porte = porte;
    this.ongNome = ongNome;
    this.ongLink = ongLink;
  }
}

// Classe responsável por gerar os cards e os modais de cada pet
class CardsPets {
  constructor(InformacoesPet) {
    this.InfoPet = InformacoesPet; // Puxa os dados da classe anterior (classe que pega os dados de cada pet)
    this.card = this.gerarCard(); //Puxa os dados do método dentro desta mesma classe que cria o Card
  }

  // Método responsável por otimizar a linha de criação de cada elemento HTML
  // O método recebe o nome da tag, as classes, texto interno do elemento e seu pai
  createElement(tag, classes = [], innerText = "", parent = null, alt = "") {
    const element = document.createElement(tag);

    if (Array.isArray(classes)) {
      element.classList.add(...classes);
    } else if (classes) {
      element.classList.add(classes);
    }

    if (innerText) element.innerText = innerText;
    if (parent) parent.appendChild(element);
    if (alt && tag === "img") {
      element.alt = alt;
    }

    if (alt && tag === "img") {
      element.alt = alt;
    }

    return element;
  }

  // Método responsável por otimizar a linha de criação de cada elemento IMG
  // O método recebe as classes, src, alt, loading e seu pai
  createImg(classes = [], src = "", alt = "", loading = "lazy", parent = null) {
    const img = document.createElement("img");

    if (Array.isArray(classes)) {
      img.classList.add(...classes);
    } else if (classes) {
      img.classList.add(classes);
    }

    if (src) img.src = src;
    if (loading) img.loading = loading;
    if (alt) img.alt = alt;
    if (parent) parent.appendChild(img);

    return img;
  }

  // Método responsável por otimizar a linha de criação de cada botão no HTML
  // O método recebe o nome da as classes, texto interno do elemento, seu pai e seu title
  createButton(classes = [], innerText = "", parent = null, title = "") {
    const button = document.createElement("button");

    if (Array.isArray(classes)) {
      button.classList.add(...classes);
    } else if (classes) {
      button.classList.add(classes);
    }

    if (innerText) button.innerText = innerText;
    if (parent) parent.appendChild(button);
    if (title) button.title = title;

    return button;
  }

  //Método responsável por gerar um card para cada pet
  gerarCard(InfoPet) {
    const adotarSec = document.querySelector(".adotarSec"); //Identifica o elemento pai de tudo que já existe no html

    this.cardsAnimais = this.createElement(
      "div",
      "cardsAnimais",
      null,
      adotarSec,
      null
    );
    this.adotarMiniCard = this.createElement(
      "div",
      "adotarMiniCard",
      null,
      this.cardsAnimais,
      null
    );

    this.fotoPet = this.createElement(
      "img",
      null,
      null,
      "Foto do animalzinho",
      this.adotarMiniCard
    );
  }
}

window.addEventListener("load", paginacarregada); //A página espera o JS carregar antes de executar ele.

function paginacarregada() {
  const teste = new CardsPets();
}
