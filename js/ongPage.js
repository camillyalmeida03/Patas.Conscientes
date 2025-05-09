//Este arquivo é responsável por gerar cada uma das páginas para cada ONG;

// Importação de informações de outro arquivo.js
import { CardsOngs, InformacoesOng } from "./cardsOngs.js";
import { CriarElementos } from "./criarElementos.js";

const teste = new CardsOngs();
teste.abrirOngPage();

export class OngPage {
    constructor(InformacoesOng) {
        this.criarElemento = new CriarElementos();
        this.InfoOng = InformacoesOng;
    }

    mostrarInformacoesOng() {
        this.h1NomeDaOng = document.querySelector(".nomedaOng");

        if (this.h1NomeDaOng && this.InfoOng?.nome) {
            this.h1NomeDaOng.innerText = this.InfoOng.nome;
        } else {
            console.error("Elemento .nomedaOng ou InfoOng.nome não encontrado");
        }
    }
}
