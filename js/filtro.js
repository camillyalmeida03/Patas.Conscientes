//Este arquivo é responsável por trazer as funcionalidades dos filtros.

function limparRadioButtons() {
    // Grupos de radio buttons para limpar
    const radioGroups = ['filter1', 'filter2', 'filter3'];

    // Desmarca todos os radios em cada grupo
    radioGroups.forEach(group => {
        const radios = document.getElementsByName(group);
        radios.forEach(radio => radio.checked = false);
    });

    // IDs de checkboxes para desmarcar
    const todasOngs = ["ong1F", "ong2F", "ong3F", "ong4F", "ong5F"];
    todasOngs.forEach(id => document.getElementById(id).checked = false);

    const sexos = ["femeaF", "machoF"];
    sexos.forEach(id => document.getElementById(id).checked = false);

    // Criação do elemento de imagem para "removido"
    const feedback = document.createElement('img');
    feedback.src = '/img/feedback/filtro_limpo.svg';
    feedback.style.position = 'fixed';
    feedback.style.top = '5rem';
    feedback.style.right = '2rem';
    feedback.style.zIndex = '4000';
    feedback.style.height = '6rem';

    // Adiciona a imagem ao body
    document.body.appendChild(feedback);

    // Remove a imagem após 3 segundos
    setTimeout(() => {
        feedback.remove();
    }, 3000);
}

const filtro = document.getElementById("filtro");
const botFiltros = document.getElementById("botFiltros");
const fecharFiltrosBtn = document.getElementById("fecharFiltros"); // Alterei o nome da variável

// Função para abrir os filtros
function abrirFiltros() {
    filtro.style.display = "flex";
    document.body.classList.add("no-scroll");
}

// Função para fechar os filtros
function fecharFiltros() {  
    filtro.style.display = "none";
    document.body.classList.remove("no-scroll");
}

// Adicionando eventos
botFiltros.addEventListener("click", abrirFiltros);
fecharFiltrosBtn.addEventListener("click", fecharFiltros);

// 🔥 Evento para restaurar sidebar ao aumentar a tela
window.addEventListener("resize", () => {
    if (window.innerWidth > 1050) {  
        filtro.style.removeProperty("display");
        document.body.classList.remove("no-scroll");
    }
});

const radios = document.querySelectorAll('input[type="radio"]');

radios.forEach(radio => {
    radio.addEventListener('click', function () {
        if (this.checked) {
            const wasChecked = this.dataset.checked === "true";
            if (wasChecked) {
                this.checked = false;
                this.dataset.checked = "false";
            } else {
                radios.forEach(r => r.dataset.checked = "false");
                this.dataset.checked = "true";
            }
        }
    });
});