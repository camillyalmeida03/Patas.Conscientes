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

let verMais = document.querySelectorAll(".verMais");

for (let g = 0; g < verMais.length; g++) {
    verMais[g].addEventListener("click", girarcartao);
}

function girarcartao() {
    // Capturar o pai imediato do elemento de botão que foi clicado
    let pai = this.parentNode;

    // Executar o código a seguir em loop, enquanto a condição não for alcançada
    // Enquanto o elemento pai não tiver o nome de classe -cardsAnimais-
    while (!pai.classList.contains("cardsAnimais")) {
        // Verifica se o pai contém a classe específica, independente de outras classes
        pai = pai.parentNode;

        // Opcional: verifica se `pai` ainda é um elemento válido para evitar loops infinitos
        if (!pai) break;
    }

    // Se a propriedade css transform estiver vazia ou for rotateY(0deg)
    if (pai.style.transform == "" || pai.style.transform == "rotateY(0deg)") {
        // Aplica o giro de 180 graus negativos
        pai.style.transform = "rotateY(-180deg)";
    } else if (pai.style.transform == "rotateY(-180deg)") {
        // Retorna o giro para 0 graus
        pai.style.transform = "rotateY(0deg)";
    }
}





