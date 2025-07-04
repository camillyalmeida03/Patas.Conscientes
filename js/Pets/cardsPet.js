//Este arquivo JS é responsável por gerar os cards de cada pet.

// Importando dados do arquivo criarElementos.js
import { CriarElementos } from "../criarElementos.js";
// import { Favoritar } from "../favoritar.js";
import { InformacoesPets } from "./informacoesPets.js";

// Classe responsável por gerar os cards e os modais de cada pet
export class CardsPets {
  constructor(InformacoesPet = null) {
    this.criarElemento = new CriarElementos();
    this.InformacoesPet = new InformacoesPets();

    if (InformacoesPet) {
      this.InfoPet = InformacoesPet;
      this.modalPet(this.InfoPet); // cria o modal no construtor
      this.card = this.gerarCard(this.InfoPet); // cria o card
    }

    this.informacoesExibidas = false;
  }

  // Método responsável por criar o modal de cada pet
  modalPet(InfoPet) {
    this.InfoPet = InfoPet;
    this.fundoAba = this.criarElemento.createElement(
      "div",
      "fundoAba",
      null,
      document.body
    );
    this.fundoAba.style.display = "none"; // Esconde o fundo da aba

    this.maisInfoPet = this.criarElemento.createElement(
      "div",
      "maisInfoPet",
      null,
      this.fundoAba
    );

    this.fotoPet = this.criarElemento.createElement(
      "div",
      "fotoPet",
      null,
      this.maisInfoPet
    );
    this.fotoPet.style.backgroundImage = `url(${this.InfoPet.foto})`;

    this.infoBotaoCardPet = this.criarElemento.createElement(
      "div",
      "infoBotaoCardPet",
      null,
      this.maisInfoPet
    );

    this.conjOngBotFechar = this.criarElemento.createElement(
      "div",
      "conjOngBotFechar",
      null,
      this.infoBotaoCardPet
    );

    this.linkOng = this.criarElemento.createA(
      ["linkDesc"],
      this.InfoPet.ongLink,
      `Link para - ${this.InfoPet.ongNome}`,
      `${this.InfoPet.ongNome}`,
      this.conjOngBotFechar
    );

    this.fecharAba = this.criarElemento.createButton(
      [],
      null,
      this.conjOngBotFechar,
      "Fechar Modal"
    );

    this.fecharAba.addEventListener("click", () => {
      this.esconderFundoDaAba();
    });

    this.fecharAba.innerHTML = `<svg viewBox="0 -960 960 960" fill="#5f6368" class="iconFechar">
    <path d="m287-216-69-71 192-193-192-195 69-71 194 195 192-195 69 71-192 195 192 193-69 71-192-195-194 195Z" />
    </svg>`;

    this.conjNomeSexo = this.criarElemento.createElement(
      "div",
      "conjNomeSexo",
      null,
      this.infoBotaoCardPet
    );
    this.nomePet = this.criarElemento.createElement(
      "h2",
      [],
      InfoPet.nome,
      this.conjNomeSexo
    );

    this.sexoPet = this.criarElemento.createElement(
      "div",
      "sexoPet",
      null,
      this.conjNomeSexo
    );

    // Chamar o método que faz a condição do sexo do pet
    this.condicaoSexoPet(this.InfoPet);

    this.conjInfoPetBtt = this.criarElemento.createElement(
      "div",
      "conjInfoPetBtt",
      null,
      this.infoBotaoCardPet
    );

    this.informPet = this.criarElemento.createElement(
      "div",
      "informPet",
      null,
      this.conjInfoPetBtt
    );

    this.pesoIdade = this.criarElemento.createElement(
      "div",
      "pesoIdade",
      null,
      this.informPet,
      "pesoIdade"
    );

    this.conjTituloPeso = this.criarElemento.createElement(
      "div",
      [],
      null,
      this.pesoIdade
    );

    this.tituloPeso = this.criarElemento.createElement(
      "h3",
      "tituloInfoPet",
      "Peso",
      this.conjTituloPeso
    );

    this.pesoPet = this.criarElemento.createElement(
      "p",
      [],
      InfoPet.peso,
      this.conjTituloPeso,
      "pesoPet"
    );

    this.conjTituloIdade = this.criarElemento.createElement(
      "div",
      [],
      null,
      this.pesoIdade
    );

    this.tituloIdade = this.criarElemento.createElement(
      "h3",
      "tituloInfoPet",
      "Idade",
      this.conjTituloIdade
    );

    this.idadePet = this.criarElemento.createElement(
      "p",
      [],
      InfoPet.idade,
      this.conjTituloIdade,
      "idadePet"
    );

    this.especPorte = this.criarElemento.createElement(
      "div",
      "especPorte",
      null,
      this.informPet,
      "especPorte"
    );

    this.conjTituloEspecie = this.criarElemento.createElement(
      "div",
      [],
      null,
      this.especPorte
    );
    this.tituloEspecie = this.criarElemento.createElement(
      "h3",
      "tituloInfoPet",
      "Espécie",
      this.conjTituloEspecie
    );
    this.especiePet = this.criarElemento.createElement(
      "p",
      [],
      InfoPet.especie,
      this.conjTituloEspecie
    );
    this.especiePet.id = "especiePet";

    this.conjTituloPorte = this.criarElemento.createElement(
      "div",
      [],
      null,
      this.especPorte
    );

    this.tituloPorte = this.criarElemento.createElement(
      "h3",
      "tituloInfoPet",
      "Porte",
      this.conjTituloPorte
    );

    this.portePet = this.criarElemento.createElement(
      "p",
      [],
      InfoPet.porte,
      this.conjTituloPorte,
      "portePet"
    );

    this.triploInfo = this.criarElemento.createElement(
      "div",
      "triploInfo",
      null,
      this.informPet,
      "triploInfo"
    );

    this.conjTituloRaca = this.criarElemento.createElement(
      "div",
      [],
      null,
      this.triploInfo
    );

    this.tituloRaca = this.criarElemento.createElement(
      "h3",
      "tituloInfoPet",
      "Raça",
      this.conjTituloRaca
    );

    this.racaPet = this.criarElemento.createElement(
      "p",
      [],
      InfoPet.raca,
      this.conjTituloRaca,
      "racaPet"
    );

    this.conjTituloOng = this.criarElemento.createElement(
      "div",
      [],
      null,
      this.triploInfo
    );

    this.tituloOng = this.criarElemento.createElement(
      "h3",
      "tituloInfoPet",
      "Local",
      this.conjTituloOng
    );

    this.ongPet = this.criarElemento.createElement(
      "p",
      [],
      InfoPet.ongNome,
      this.conjTituloOng,
      "ongPet"
    );

    this.conjTituloSobre = this.criarElemento.createElement(
      "div",
      [],
      null,
      this.triploInfo
    );

    this.tituloSobre = this.criarElemento.createElement(
      "h3",
      "tituloInfoPet",
      "Sobre",
      this.conjTituloSobre
    );

    this.sobrePet = this.criarElemento.createElement(
      "p",
      [],
      InfoPet.sobre,
      this.conjTituloSobre,
      "sobrePet"
    );

    this.bttcard = this.criarElemento.createElement(
      "div",
      "bttcard",
      null,
      this.conjInfoPetBtt
    );

    this.botaoAdotar = this.criarElemento.createButton(
      "buttonRosa",
      "Adotar",
      this.bttcard,
      "Adotar " + this.InfoPet.nome
    );

    this.conjFavoritarCompartilhar = this.criarElemento.createElement(
      "div",
      "conjFavoritarCompartilhar",
      null,
      this.bttcard
    );

    // Chama o método favoritar, adiciona botão de favoritar e sua funcionalidade
    // this.favoritar = new Favoritar(InfoPet);
    // this.botaoFavorito = this.favoritar.criarBotoesCards(
    //   this.conjFavoritarCompartilhar,
    //   this.InfoPet.nome
    // );

    this.compartilharPet = this.criarElemento.createButton(
      "compartilharPet",
      null,
      this.conjFavoritarCompartilhar,
      "Compartilhar " + this.InfoPet.nome
    );

    this.compartilharPet.innerHTML = `<svg viewBox="0 -960 960 960" fill="#000000"><path d="M640.22-116q-44.91 0-76.26-31.41-31.34-31.41-31.34-76.28 0-9 5.15-30.16L297.31-402.31q-14.46 14-33.41 22-18.94 8-40.59 8-44.71 0-76.01-31.54Q116-435.39 116-480q0-44.61 31.3-76.15 31.3-31.54 76.01-31.54 21.74 0 40.64 8 18.9 8 33.36 22l240.46-148.08q-2.38-7.38-3.77-14.77-1.38-7.39-1.38-15.77 0-44.87 31.43-76.28Q595.49-844 640.4-844t76.25 31.44Q748-781.13 748-736.22q0 44.91-31.41 76.26-31.41 31.34-76.28 31.34-21.85 0-40.5-8.19Q581.15-645 566.69-659L326.23-510.54q2.38 7.39 3.77 14.77 1.38 7.39 1.38 15.77 0 8.38-1.38 15.77-1.39 7.38-3.77 14.77L566.69-301q14.46-14 33.16-22.19 18.7-8.19 40.46-8.19 44.87 0 76.28 31.43Q748-268.51 748-223.6t-31.44 76.25Q685.13-116 640.22-116Zm.09-52q23.67 0 39.68-16.01Q696-200.02 696-223.69q0-23.67-16.01-39.68-16.01-16.02-39.68-16.02-23.67 0-39.68 16.02-16.02 16.01-16.02 39.68 0 23.67 16.02 39.68Q616.64-168 640.31-168Zm-417-256.31q23.83 0 39.95-16.01 16.13-16.01 16.13-39.68 0-23.67-16.13-39.68-16.12-16.01-39.95-16.01-23.51 0-39.41 16.01Q168-503.67 168-480q0 23.67 15.9 39.68 15.9 16.01 39.41 16.01Zm417-256.3q23.67 0 39.68-16.02Q696-712.64 696-736.31q0-23.67-16.01-39.68Q663.98-792 640.31-792q-23.67 0-39.68 16.01-16.02 16.01-16.02 39.68 0 23.67 16.02 39.68 16.01 16.02 39.68 16.02Zm0 456.92ZM223.69-480Zm416.62-256.31Z" /></svg>`;
  }

  //Método responsável por mostrar o modal de cada pet
  mostrarFundoDaAba() {
    if (!this.fundoAba) {
      console.warn("⚠️ fundoAba não foi criado ainda.");
      return;
    }

    if (window.innerWidth > 650) {
      this.fundoAba.style.display = "flex";
      document.body.style.overflow = "hidden";
    } else {
      this.fundoAba.style.display = "none";
      document.body.style.overflow = "auto";
    }

    this.verificarResize();
  }

  //Método responsável por verificar se é mobile ou desktop
  verificarResize() {
    // Verifica se a largura da tela mudar para 650px ou menos
    window.addEventListener("resize", () => {
      if (window.innerWidth <= 650) {
        this.esconderFundoDaAba();
      }
    });
  }

  //Método responsável por esconder o modal ao clicar no X
  esconderFundoDaAba() {
    this.fundoAba.style.display = "none";
    document.body.style.overflow = "auto";
  }

  //Método responsável por expandir o card na versão mobile
  mostrarMaisInformacoesPetCard(InfoPet) {
    this.conjFavoritarCompartilhar = this.criarElemento.createElement(
      "div",
      "conjFavoritarCompartilhar",
      null,
      this.nomIconAdotar
    );

    this.compartilharPet = this.criarElemento.createButton(
      "compartilharPet",
      null,
      this.conjFavoritarCompartilhar,
      "Compartilhar " + this.InfoPet.nome
    );

    // Chama o método favoritar, adiciona botão de favoritar e sua funcionalidade
    // this.favoritar = new Favoritar(InfoPet);
    // this.botaoFavorito = this.favoritar.criarBotoesCards(
    //   this.conjFavoritarCompartilhar,
    //   this.InfoPet.nome
    // );

    this.compartilharPet.innerHTML = `<svg viewBox="0 -960 960 960" fill="#000000"><path d="M640.22-116q-44.91 0-76.26-31.41-31.34-31.41-31.34-76.28 0-9 5.15-30.16L297.31-402.31q-14.46 14-33.41 22-18.94 8-40.59 8-44.71 0-76.01-31.54Q116-435.39 116-480q0-44.61 31.3-76.15 31.3-31.54 76.01-31.54 21.74 0 40.64 8 18.9 8 33.36 22l240.46-148.08q-2.38-7.38-3.77-14.77-1.38-7.39-1.38-15.77 0-44.87 31.43-76.28Q595.49-844 640.4-844t76.25 31.44Q748-781.13 748-736.22q0 44.91-31.41 76.26-31.41 31.34-76.28 31.34-21.85 0-40.5-8.19Q581.15-645 566.69-659L326.23-510.54q2.38 7.39 3.77 14.77 1.38 7.39 1.38 15.77 0 8.38-1.38 15.77-1.39 7.38-3.77 14.77L566.69-301q14.46-14 33.16-22.19 18.7-8.19 40.46-8.19 44.87 0 76.28 31.43Q748-268.51 748-223.6t-31.44 76.25Q685.13-116 640.22-116Zm.09-52q23.67 0 39.68-16.01Q696-200.02 696-223.69q0-23.67-16.01-39.68-16.01-16.02-39.68-16.02-23.67 0-39.68 16.02-16.02 16.01-16.02 39.68 0 23.67 16.02 39.68Q616.64-168 640.31-168Zm-417-256.31q23.83 0 39.95-16.01 16.13-16.01 16.13-39.68 0-23.67-16.13-39.68-16.12-16.01-39.95-16.01-23.51 0-39.41 16.01Q168-503.67 168-480q0 23.67 15.9 39.68 15.9 16.01 39.41 16.01Zm417-256.3q23.67 0 39.68-16.02Q696-712.64 696-736.31q0-23.67-16.01-39.68Q663.98-792 640.31-792q-23.67 0-39.68 16.01-16.02 16.01-16.02 39.68 0 23.67 16.02 39.68 16.01 16.02 39.68 16.02Zm0 456.92ZM223.69-480Zm416.62-256.31Z" /></svg>`;

    this.p = this.criarElemento.createElement(
      "p",
      null,
      null,
      this.descMiniAdotar
    );

    this.linkDesc = this.criarElemento.createA(
      "linkDesc",
      "ongs.html",
      "Link para a página de " + this.InfoPet.ongNome,
      this.InfoPet.ongNome,
      this.p
    );

    this.expansaoCard = this.criarElemento.createElement(
      "div",
      "expansaoCard",
      null,
      this.adotarMiniCard
    );

    this.informPet = this.criarElemento.createElement(
      "div",
      "informPet",
      null,
      this.expansaoCard
    );

    this.pesoIdade = this.criarElemento.createElement(
      "div",
      "pesoIdade",
      null,
      this.informPet,
      "pesoIdade"
    );

    this.conjTituloPeso = this.criarElemento.createElement(
      "div",
      [],
      null,
      this.pesoIdade
    );

    this.tituloPeso = this.criarElemento.createElement(
      "h3",
      "tituloInfoPet",
      "Peso",
      this.conjTituloPeso
    );

    this.pesoPet = this.criarElemento.createElement(
      "p",
      [],
      this.InfoPet.peso,
      this.conjTituloPeso,
      "pesoPet"
    );

    this.conjTituloIdade = this.criarElemento.createElement(
      "div",
      [],
      null,
      this.pesoIdade
    );

    this.tituloIdade = this.criarElemento.createElement(
      "h3",
      "tituloInfoPet",
      "Idade",
      this.conjTituloIdade
    );

    this.idadePet = this.criarElemento.createElement(
      "p",
      [],
      this.InfoPet.idade,
      this.conjTituloIdade,
      "idadePet"
    );

    this.especPorte = this.criarElemento.createElement(
      "div",
      "especPorte",
      null,
      this.informPet,
      "especPorte"
    );

    this.conjTituloEspecie = this.criarElemento.createElement(
      "div",
      [],
      null,
      this.especPorte
    );

    this.tituloEspecie = this.criarElemento.createElement(
      "h3",
      "tituloInfoPet",
      "Espécie",
      this.conjTituloEspecie
    );

    this.especiePet = this.criarElemento.createElement(
      "p",
      [],
      this.InfoPet.especie,
      this.conjTituloEspecie
    );

    this.especiePet.id = "especiePet";

    this.conjTituloPorte = this.criarElemento.createElement(
      "div",
      [],
      null,
      this.especPorte
    );

    this.tituloPorte = this.criarElemento.createElement(
      "h3",
      "tituloInfoPet",
      "Porte",
      this.conjTituloPorte
    );

    this.portePet = this.criarElemento.createElement(
      "p",
      [],
      this.InfoPet.porte,
      this.conjTituloPorte,
      "portePet"
    );

    this.triploInfo = this.criarElemento.createElement(
      "div",
      "triploInfo",
      null,
      this.informPet,
      "triploInfo"
    );

    this.conjTituloRaca = this.criarElemento.createElement(
      "div",
      [],
      null,
      this.triploInfo
    );

    this.tituloRaca = this.criarElemento.createElement(
      "h3",
      "tituloInfoPet",
      "Raça",
      this.conjTituloRaca
    );

    this.racaPet = this.criarElemento.createElement(
      "p",
      [],
      this.InfoPet.raca,
      this.conjTituloRaca,
      "racaPet"
    );

    this.conjTituloOng = this.criarElemento.createElement(
      "div",
      [],
      null,
      this.triploInfo
    );

    this.tituloOng = this.criarElemento.createElement(
      "h3",
      "tituloInfoPet",
      "Local",
      this.conjTituloOng
    );

    this.ongPet = this.criarElemento.createElement(
      "p",
      [],
      this.InfoPet.ongNome,
      this.conjTituloOng,
      "ongPet"
    );

    this.conjTituloSobre = this.criarElemento.createElement(
      "div",
      [],
      null,
      this.triploInfo
    );

    this.tituloSobre = this.criarElemento.createElement(
      "h3",
      "tituloInfoPet",
      "Sobre",
      this.conjTituloSobre
    );

    this.sobrePet = this.criarElemento.createElement(
      "p",
      [],
      this.InfoPet.sobre,
      this.conjTituloSobre,
      "sobrePet"
    );

    this.bttcard = this.criarElemento.createElement(
      "div",
      "bttcard",
      null,
      this.adotarMiniCard
    );

    this.verMenos = this.criarElemento.createButton(
      "verMenos",
      "Ver menos",
      this.bttcard,
      "Ver menos sobre " + this.InfoPet.nome
    );

    this.verMenos.addEventListener("click", () => {
      if (window.innerWidth <= 650) {
        this.limparCardNormal();
        this.mostrarCardNormal();
      }
    });

    this.botaoAdotar = this.criarElemento.createButton(
      "buttonRosa",
      "Adotar",
      this.bttcard,
      "Adotar " + this.InfoPet.nome
    );

    this.cardsAnimais.classList.add("mostrar-mais");
    this.informacoesExibidas = true;

    this.verMenos.addEventListener("click", () => {
      this.limparCardMaisInfo();
      this.limparCardNormal();
      this.mostrarCardNormal();
    });
  }

  //Método responsável por mostrar o card minimizado
  mostrarCardNormal(InfoPet) {
    this.limparCardNormal();
    // Chama o método favoritar, adiciona botão de favoritar e sua funcionalidade
    // this.favoritar = new Favoritar(InfoPet);
    // this.botaoFavorito = this.favoritar.criarBotoesCards(
    //   this.nomIconAdotar,
    //   this.InfoPet.nome
    // );

    this.p = this.criarElemento.createElement(
      "p",
      null,
      null,
      this.descMiniAdotar
    );

    this.linkDesc = this.criarElemento.createA(
      "linkDesc",
      "ongs.html",
      "Link para a página de " + this.InfoPet.ongNome,
      this.InfoPet.ongNome,
      this.p
    );

    this.bttcard = this.criarElemento.createElement(
      "div",
      "bttcard",
      null,
      this.adotarMiniCard
    );

    this.verMais = this.criarElemento.createButton(
      "verMais",
      "Ver mais",
      this.bttcard,
      "Ver mais informações sobre " + this.InfoPet.nome
    );

    this.botaoAdotar = this.criarElemento.createButton(
      "buttonRosa",
      "Adotar",
      this.bttcard,
      "Adotar " + this.InfoPet.nome
    );

    this.cardsAnimais.classList.remove("mostrar-mais");
    this.informacoesExibidas = false;

    this.verMais.addEventListener("click", () => {
      if (window.innerWidth <= 650) {
        if (!this.informacoesExibidas) {
          this.limparCardNormal();
          this.mostrarMaisInformacoesPetCard();
        }
      } else {
        this.mostrarFundoDaAba();
      }
    });
  }

  //Método responsável por gerar um card para cada pet
  gerarCard(InfoPet) {
    this.InfoPet = InfoPet;
    const adotarSec = document.querySelector(".adotarSec");

    if (adotarSec) {
      this.adotarSec = adotarSec;

      this.cardsAnimais = this.criarElemento.createElement(
        "div",
        "cardsAnimais",
        null,
        adotarSec
      );

      this.cardsAnimais.id = `pet-${this.InfoPet.id}`;
      this.card = this.cardsAnimais;

      this.adotarMiniCard = this.criarElemento.createElement(
        "div",
        "adotarMiniCard",
        null,
        this.cardsAnimais
      );

      this.fotoPet = this.criarElemento.createImg(
        [],
        this.InfoPet.foto,
        "Foto de " + this.InfoPet.nome,
        "lazy",
        this.adotarMiniCard
      );

      this.descMiniAdotar = this.criarElemento.createElement(
        "div",
        "descMiniAdotar",
        null,
        this.adotarMiniCard
      );

      this.nomIconAdotar = this.criarElemento.createElement(
        "div",
        ["nomIconAdotar", "favoritado"],
        null,
        this.descMiniAdotar
      );

      this.iconsAdotar = this.criarElemento.createElement(
        "div",
        "iconsAdotar",
        null,
        this.nomIconAdotar
      );

      this.nomePet = this.criarElemento.createElement(
        "h2",
        "nomePet",
        this.InfoPet.nome,
        this.iconsAdotar
      );

      this.sexoPet = this.criarElemento.createElement(
        "div",
        "sexoPet",
        null,
        this.iconsAdotar
      );

      // Chamar o método que faz a condição do sexo do pet
      this.condicaoSexoPet(this.InfoPet);

      this.mostrarCardNormal();

      this.card = this.cardsAnimais;
    }
  }

  // Método responsável por fazer a condição do sexo do Pet
  condicaoSexoPet(InfoPet) {
    if (InfoPet.sexo === 1) {
      this.sexoPet.classList.add("femea");
    } else if (InfoPet.sexo === 2) {
      this.sexoPet.classList.add("macho");
    }
  }

  //Método responsável por limpar o card em seu estado normal para virar card expandido
  limparCardNormal() {
    if (this.bttcard && this.bttcard.parentNode) {
      this.bttcard.remove();
    }
    if (this.p && this.p.parentNode) {
      this.p.remove();
    }
    // if (this.nomIconAdotar && this.nomIconAdotar.parentNode) {
    //   this.favoritarDireto = Array.from(this.nomIconAdotar.children).find(
    //     (filho) => filho.classList.contains("favoritar")
    //   );
    //   if (this.favoritarDireto) {
    //     this.favoritarDireto.remove();
    //   }
    // }
  }

  //Método responsável por limpar o conteúdo do card expandido para virar o card normal
  limparCardMaisInfo() {
    if (this.expansaoCard && this.expansaoCard.parentNode) {
      this.expansaoCard.remove();
    }

    if (
      this.conjFavoritarCompartilhar &&
      this.conjFavoritarCompartilhar.parentNode
    ) {
      this.conjFavoritarCompartilhar.remove();
    }

    if (this.bttcard && this.bttcard.parentNode) {
      this.bttcard.remove();
    }
  }
}

window.addEventListener("load", paginacarregada); //A página espera o JS carregar antes de executar ele

function paginacarregada() {

  // ✅ Agora, só UM resize, fora do forEach
  window.addEventListener("resize", () => {
    if (window.innerWidth > 650) {
      cards.forEach((card) => {
        if (card.informacoesExibidas) {
          console.log("Redimensionou - revertendo card:", card.InfoPet.nome);
          card.limparCardMaisInfo();
          card.limparCardNormal();
          card.mostrarCardNormal();
        }
        card.esconderFundoDaAba();
      });
    }
  });
}
