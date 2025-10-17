// Este arquivo montaa uma padrão para as mensagens de feeback no site
import { CriarElementos } from "../criarElementos.js";

export class MensagemFeedback {
    constructor(mensagem, pai) {
        this.mensagem = mensagem;
        this.criar = new CriarElementos();
        this.pai = pai;
    }

    feedbackSucess() {
        this.divPai = this.criar.createElement(
            "div",
            ["feedback", "feedbackSucess"],
            null,
            this.pai,
            "feedback"
        );

        this.pFeedback = this.criar.createElement(
            "p",
            null,
            this.mensagem,
            this.divPai,
            null
        );

        this.iconeFeedback = this.criar.createElement(
            "div",
            "iconeFeedback",
            null,
            this.divPai,
            null
        );

        setTimeout(() => {
            this.divPai.remove();
        }, 3000);
    }

    feedbackError() {
        this.divPai = this.criar.createElement(
            "div",
            ["feedback", "feedbackError"],
            null,
            this.pai,
            "feedback"
        );

        this.pFeedback = this.criar.createElement(
            "p",
            null,
            this.mensagem,
            this.divPai,
            null
        );

        this.iconeFeedback = this.criar.createElement(
            "div",
            "iconeFeedback",
            null,
            this.divPai,
            null
        );

        setTimeout(() => {
            this.divPai.remove();
        }, 3000);
    }
}