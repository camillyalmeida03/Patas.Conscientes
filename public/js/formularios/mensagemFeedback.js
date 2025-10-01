// Este arquivo montaa uma padrão para as mensagens de feeback no site
import { CriarElementos } from "../criarElementos";
class MensagemFeedback{
    constructor(mensagem, pai){
        this.mensagem = mensagem;
        // this.elementoHtml = elemento
        this.criar = new CriarElementos();
        this.pai = pai
    }

    feedbackSucess(mensagem, pai){
        this.divPai = this.criar.createElement(
            "div",
            ["feedback", "feedbackSucess"], 
            null,
            pai,
            "feedback"
        )

        this.pFeedback = this.criar.createElement(
            "p",
            null,
            mensagem,
            this.divPai,
            null
        )

        this.iconeFeedback = this.criar.createElement(
            "div",
            "iconeFeedback",
            null,
            this.divPai,
            null
        )
    }
}

const teste = document.getElementById("feedback");
const testinho = new MensagemFeedback()
testinho.feedbackSucess("Deu certo", teste)