// Este arquivo é responsável por gerar uma linha para cada pet nas tabelas de gerenciamento das ONGs

import { CriarElementos } from "../../../public/js/criarElementos.js";
import { InformacoesPets } from "./informacoesPets.js";

export class tabelaPets {
    constructor(InformacoesPet = null) {
        this.criarElemento = new CriarElementos();
        this.InformacoesPet = new InformacoesPets();

        if (InformacoesPet) {
            this.InfoPet = InformacoesPet;
            this.linhaTabPet = this.criarPetTabela(this.InfoPet);
        }

        this.informacoesExibidas = false;
    }

    criarPetTabela(InfoPet) {
        const tbody = document.getElementById('tbodyTabelaPet');

        if (tbody) {
            // Cria a linha para o pet na tabela
            this.trPet = this.criarElemento.createElement("tr", "trPet", null, tbody, null);

            // Cria a coluna de status
            this.tdStatus = this.criarElemento.createElement("td", "tdStatus", null, this.trPet);

            // Criar select do status do pet
            this.selectStatus = this.criarElemento.createElement("select", "statusSelect", null, this.tdStatus, "statusPetSelect");

                // Cria as opções do select:
                // Disponível
                this.optionDisp = this.criarElemento.createElement("option", "optionStatusSel", "Disponível", this.selectStatus, null);

                // Processo de adoção
                this.optionProc = this.criarElemento.createElement("option", "optionStatusSel", "Em processo", this.selectStatus, null);

                // Adotado
                this.optionAdot = this.criarElemento.createElement("option", "optionStatusSel", "Adotado", this.selectStatus, null);

                // Indisponível
                this.optionIndisp = this.criarElemento.createElement("option", "optionStatusSel", "Indisponível", this.selectStatus, null);



            this.tdFoto = this.criarElemento.createElement("td", "tdFoto", "Em breve", this.trPet);
            this.tdNome = this.criarElemento.createElement("td", "tdNome", InfoPet.nome, this.trPet);
            this.tdEspecie = this.criarElemento.createElement("td", "tdEspecie", InfoPet.especie, this.trPet);
            this.tdRaca = this.criarElemento.createElement("td", "tdRaca", InfoPet.raca, this.trPet);
            this.tdSexo = this.criarElemento.createElement("td", "tdSexo", InfoPet.sexo, this.trPet);
            this.tdPorte = this.criarElemento.createElement("td", "tdPorte", InfoPet.porte, this.trPet);
            this.tdIdade = this.criarElemento.createElement("td", "tdIdade", InfoPet.idade, this.trPet);
            this.tdPeso = this.criarElemento.createElement("td", "tdPeso", InfoPet.peso, this.trPet);
            this.tdDesc = this.criarElemento.createElement("td", "tdDesc", InfoPet.sobre, this.trPet);
            this.tdDtPost = this.criarElemento.createElement("td", "tdDtPost", "Em breve", this.trPet);
            this.tdDtAtt = this.criarElemento.createElement("td", "tdDtAtt", "Em breve", this.trPet);
            this.tdEditar = this.criarElemento.createElement("td", "tdEditar", null, this.trPet, "botaoEditarPet");
            this.tdDeletar = this.criarElemento.createElement("td", "tdDeletar", null, this.trPet, "botaoDeletarPet");
            this.botaoEditar = this.criarElemento.createButton("botaoTabela", "Editar", this.tdEditar, `Editar ${InfoPet.nome}`);
            this.botaoDeletar = this.criarElemento.createButton("botaoTabela", "Excluir", this.tdDeletar, `Excluir ${InfoPet.nome}`);

        }
    }
}

