document.addEventListener('DOMContentLoaded', function () {
    const institucional = document.getElementById('institucional');
    const caixaInst = document.querySelector('.caixaInst');
    const setinha = document.getElementById("setinha");
    const instA = document.getElementById("instA");

    const setaInst = document.getElementById("setaInst");
    const ulMenu = document.getElementById("ulMenu");

    function mostrarulMenu() {
        if (ulMenu.style.display === 'none') {
            ulMenu.style.display = 'flex';
            setaInst.style.transform = 'rotate(90deg)';
            setaInst.style.fill = '#0E457D';
            setaInst.style.backgroundColor = 'rgb(201, 201, 201)';
        } else {
            ulMenu.style.display = 'none';
            setaInst.style.transform = 'rotate(0deg)';
            setaInst.style.fill = ''; // Resetando a cor de preenchimento
            setaInst.style.backgroundColor = ''; // Resetando a cor de fundo
        }
    }

    setaInst.addEventListener('click', mostrarulMenu);

    let mouseOverCaixa = false;

    // Função para mostrar a caixa e alterar estilos
    function mostrarCaixa() {
        caixaInst.style.display = 'flex'; // Mostra a caixa
        instA.style.color = '#FE4E77';
        setinha.style.transform = 'rotate(90deg)';
        setinha.style.fill = '#FE4E77';
        mouseOverCaixa = true; // Indica que o mouse está sobre a caixa ou institucional
    }

    // Função para esconder a caixa se o mouse não estiver em institucional ou caixaInst
    function esconderCaixa() {
        if (!mouseOverCaixa) { // Somente esconde se o mouse não estiver em nenhum dos dois
            caixaInst.style.display = 'none';
            instA.style.color = 'white';
            setinha.style.transform = 'rotate(0deg)';
            setinha.style.fill = 'white';
        }
    }

    // Eventos para mostrar e esconder a caixa
    institucional.addEventListener('mouseenter', mostrarCaixa);
    institucional.addEventListener('mouseleave', () => {
        mouseOverCaixa = false; // Indica que o mouse saiu de institucional
        esconderCaixa();
    });

    caixaInst.addEventListener('mouseenter', () => {
        mouseOverCaixa = true; // Indica que o mouse entrou em caixaInst
        mostrarCaixa();
    });

    caixaInst.addEventListener('mouseleave', () => {
        mouseOverCaixa = false; // Indica que o mouse saiu de caixaInst
        esconderCaixa();
    });

    let hamburguer = document.getElementById("hamburguer");
    hamburguer.addEventListener("click", interagirmenu);

    let expandirMenu = document.getElementById("expandirMenu");

    let fecharMenu = document.getElementById("fecharMenu");
    fecharMenu.addEventListener("click", interagirmenu);

    function interagirmenu() {

        if (expandirMenu.style.right == "-100%" || expandirMenu.style.right == "") {
            expandirMenu.style.right = "0";
        }
        else
            if (expandirMenu.style.right == "0px") {
                expandirMenu.style.right = "-100%";
            }
    }
});

// abrir configurações de perfil

let abrirConfigPerfil = document.getElementById('abrirConfigPerfil');
let suaconta = document.getElementById('suaconta');
let cadastrarPopup = document.getElementById('cadastrarPopup');
let sairDaConta = document.getElementById('sairDaConta');
let entrarnaconta = document.getElementById('entrarnaconta');
let svgPerfil = document.getElementById('svgPerfil');

// function configuracoesdePefil() {
//     if (suaconta.style.display === "none" || suaconta.style.display === "") { // Considera também se display não foi setado
//         suaconta.style.display = 'flex';
//         // Só tenta mudar o 'fill' se svgPerfil existir (usuário não logado)
//         if (svgPerfil) {
//             svgPerfil.style.fill = 'var(--rosa)';
//         } else {
//             // Opcional: Lógica para quando o usuário está logado
//             // Por exemplo, você poderia querer mudar o estilo do botão #abrirConfigPerfil
//             // ou da div #fotoUsuario
//             // Ex: document.getElementById('fotoUsuario').style.borderColor = 'var(--rosa)';
//             // Ex: abrirConfigPerfil.classList.add('config-aberta');
//         }
//     } else {
//         suaconta.style.display = 'none';
//         // Só tenta mudar o 'fill' se svgPerfil existir
//         if (svgPerfil) {
//             svgPerfil.style.fill = ''; // Volta para a cor original (ou a definida no CSS)
//         } else {
//             // Opcional: Lógica para quando o usuário está logado ao fechar
//             // Ex: document.getElementById('fotoUsuario').style.borderColor = 'transparent';
//             // Ex: abrirConfigPerfil.classList.remove('config-aberta');
//         }
//     }
// }

// function irparaologin() {
//     window.location.href = "/login.html";
// }
// if (abrirConfigPerfil) {
//     abrirConfigPerfil.addEventListener('click', configuracoesdePefil);
// } else {
//     console.error("Botão 'abrirConfigPerfil' não encontrado. Verifique o ID no HTML.");
// }

import { CriarElementos } from "./criarElementos.js";

export class ContaPopup {
    constructor(tipo = "naoLogado") {
        this.tipo = tipo; // 'naoLogado', 'usuario', 'ong'
        this.criar = new CriarElementos();
        this.popup = null;
    }

    criarPopupConta(parent = document.querySelector("header")) {

        // se já existir, só alterna
        if (this.popup) {
            this.popup.classList.toggle("ativo");
            return;
        }

        // container principal
        const contaPopup = this.criar.createElement("div", ["contaPopup"], "", parent, "suaconta");

        // título principal
        this.criar.createElement("h5", ["titConfig"], "Conta", contaPopup);

        // bloco do usuário
        const usuarioPerfil = this.criar.createElement("div", [], "", contaPopup, "usuarioPerfil");
        const altFotoUsuario = this.criar.createElement("div", [], "", usuarioPerfil, "altFotoUsuario");
        this.criar.createElement("div", [], "", altFotoUsuario, "fotoUsuario");

        const infoUsuario = this.criar.createElement("div", [], "", usuarioPerfil);

        // nome e e-mail dinâmicos
        if (this.tipo === "usuario") {
            this.criar.createElement("p", [], "Maria Fernanda da Silva", infoUsuario, "nomeUsuario");
            this.criar.createElement("p", [], "mariafernanda@gmail.com", infoUsuario, "emaildouser");
        } else if (this.tipo === "ong") {
            this.criar.createElement("p", [], "ONG Esperança Animal", infoUsuario, "nomeUsuario");
            this.criar.createElement("p", [], "contato@ongesperanca.org", infoUsuario, "emaildouser");
        } else {
            this.criar.createElement("p", [], "Bem-vindo!", infoUsuario, "nomeUsuario");
            this.criar.createElement("p", [], "Acesse sua conta para continuar", infoUsuario, "emaildouser");
        }

        // linha divisória
        this.criar.createElement("div", ["linha"], "", contaPopup);

        // configurações (só aparecem se estiver logado)
        if (this.tipo !== "naoLogado") {
            this.criar.createElement("h5", ["titConfig"], "Configurações", contaPopup);

            const configPopup = this.criar.createElement("div", [], "", contaPopup, "configPopup");

            // link "Minha conta" (ou "Painel ONG")
            if (this.tipo === "usuario") {
                this.criar.createA([], "configuracoes.html", "Configurações da minha conta", "Minha conta", configPopup);
            } else if (this.tipo === "ong") {
                this.criar.createA([], "painelOng.html", "Painel administrativo da ONG", "Painel da ONG", configPopup);
            }

            // tema
            const tema = this.criar.createElement("div", ["tema"], "", configPopup);
            this.criar.createElement("p", [], "Tema", tema);

            const label = this.criar.createElement("label", ["ui-switch"], "", tema);
            label.setAttribute("aria-label", "Alternar tema");

            const input = this.criar.createElement("input", [], "", label);
            input.type = "checkbox";
            input.classList.add("definirTema");

            const slid = this.criar.createElement("div", ["slid"], "", label);
            this.criar.createElement("div", ["circle"], "", slid);
        }

        // botão de ação final
        const sairouentrar = this.criar.createElement("div", [], "", contaPopup, "sairouentrar");
        const botao = this.criar.createButton(
            ["verde", "buttonPerfil"],
            this.tipo === "naoLogado" ? "Entrar" : "Sair",
            sairouentrar,
            this.tipo === "naoLogado" ? "Entrar na conta" : "Sair da conta"
        );

        botao.id = "sairouentrar";
        botao.addEventListener("click", () => {
            if (this.tipo === "naoLogado") {
                window.location.href = "/login.html";
            } else {
                localStorage.removeItem("usuario");
                localStorage.removeItem("ong");
                window.location.reload();
            }
        });

        this.popup = contaPopup;

        // fecha ao clicar fora
        document.addEventListener("click", (e) => {
            const svgPerfil = document.getElementById("svgPerfil");
            if (this.popup && !this.popup.contains(e.target) && e.target !== svgPerfil) {
                this.popup.classList.remove("ativo");
            }
        });

        return contaPopup;
    }

    togglePopup() {
        const header = document.querySelector("header");
        if (!this.popup) this.criarPopupConta(header);
        this.popup.classList.toggle("ativo");
    }

}

import ModalPadrao from "./modalPadrao.js"

// ativa popup no header
document.addEventListener("DOMContentLoaded", () => {
    const abrirConfigPerfil = document.getElementById("abrirConfigPerfil");

    let tipo = "naoLogado";
    if (localStorage.getItem("usuario")) tipo = "usuario";
    if (localStorage.getItem("ong")) tipo = "ong";

    const conta = new ContaPopup(tipo);
    let modalConta = null;

    if (abrirConfigPerfil) {
        abrirConfigPerfil.addEventListener("click", (e) => {
            e.stopPropagation();

            // cria popup dentro de um fundo modal, se ainda não existir
            if (!modalConta) {
                const fundo = document.createElement("div");
                fundo.id = "fundoConta";
                fundo.classList.add("fundoModal", "escondido");

                const modal = document.createElement("div");
                modal.classList.add("modal");
                fundo.appendChild(modal);

                document.body.appendChild(fundo);

                conta.criarPopupConta(modal);

                modalConta = new ModalPadrao(fundo);
            }

            modalConta.abrir();
        });
    }
});

