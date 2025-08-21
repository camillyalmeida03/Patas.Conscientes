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
    feedback.src = '/public/img/feedback/filtro_limpo.svg';
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

    // Exibe todos os cards novamente
    const cards = document.querySelectorAll(".cardsAnimais");
    cards.forEach(card => card.style.display = "block");

    // Resetar os filtros para que todos os pets apareçam
    const filtros = document.querySelectorAll('input[name="filter1"]');
    filtros.forEach(filtro => filtro.checked = false);
    
    // Quando os filtros são desmarcados, todos os cards são exibidos
    cards.forEach(card => card.style.display = "block");
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


// Função para aplicar os filtro cidades

document.querySelectorAll('input[name="filter1"]').forEach(radio => {
    radio.addEventListener('change', function () {
      const cidadeSelecionada = this.id;
  
      // Mapeamento: cidade → array de IDs dos pets
      const mapaIds = {
        mt: ["pet-3", "pet-6"],
        tq: ["pet-2", "pet-5"],
        arq: ["pet-1", "pet-4"]
      };
  
      const idsVisiveis = mapaIds[cidadeSelecionada];
      
  
      // Esconde todos os cards
      document.querySelectorAll(".cardsAnimais").forEach(card => {
        if (idsVisiveis.includes(card.id)) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    });
  });
  