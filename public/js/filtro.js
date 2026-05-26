//Este arquivo é responsável por trazer as funcionalidades dos filtros.

const API_CIDADES_URL = "http://localhost:6789/cidades";
const API_ONGS_URL = "http://localhost:6789/ongs";
const API_FILTRO_PETS_URL = "http://192.168.1.15:6789/filtro/pets/filtro";

const MAPA_ESPECIE = {
    cachorroF: 1,
    gatoF: 2
};

const MAPA_PORTE = {
    pequenoF: 2,
    medioF: 3,
    grandeF: 4
};

const MAPA_SEXO = {
    machoF: 1,
    femeaF: 2
};

const ONGS_FILTRO_POR_NOME = new Map();

function normalizarTexto(texto) {
    return String(texto || "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim()
        .toLowerCase();
}

function prepararRadioComToggle(radio, onChange) {
    radio.addEventListener('click', function () {
        if (!this.checked) return;

        const wasChecked = this.dataset.checked === "true";

        if (wasChecked) {
            this.checked = false;
            this.dataset.checked = "false";

            if (typeof onChange === "function") {
                onChange("");
            }
        } else {
            document.querySelectorAll(`input[name="${this.name}"]`).forEach(item => {
                item.dataset.checked = "false";
            });

            this.dataset.checked = "true";

            if (typeof onChange === "function") {
                onChange(this.value || this.dataset.cidade || this.id);
            }
        }
    });
}

function criarRadioCidade(cidade) {
    const item = document.createElement("div");
    const radioId = `cidadeF-${cidade.idcidade}`;

    const input = document.createElement("input");
    input.type = "radio";
    input.name = "filter1";
    input.id = radioId;
    input.value = String(cidade.idcidade);
    input.dataset.cidade = cidade.cidade || "";

    const label = document.createElement("label");
    label.htmlFor = radioId;
    label.textContent = cidade.cidade || `Cidade ${cidade.idcidade}`;

    prepararRadioComToggle(input, aplicarFiltrosApi);

    item.appendChild(input);
    item.appendChild(label);

    return item;
}

function criarCheckboxOng(ong) {
    const item = document.createElement("div");
    const checkboxId = `ongF-${ong.idong}`;
    const nomeOng = ong.nome || `ONG ${ong.idong}`;

    const input = document.createElement("input");
    input.type = "checkbox";
    input.name = "ongFiltro";
    input.id = checkboxId;
    input.value = String(ong.idong);
    input.dataset.nome = ong.nome || "";
    input.dataset.cidade = ong.cidade || "";

    const label = document.createElement("label");
    label.htmlFor = checkboxId;
    label.textContent = ong.cidade ? `${nomeOng} - ${ong.cidade}` : nomeOng;

    item.appendChild(input);
    item.appendChild(label);

    return item;
}

async function carregarCidadesFiltro() {
    const lista = document.getElementById("cidadeFiltroLista");
    const mensagem = document.getElementById("cidadeFiltroMensagem");

    if (!lista) return;

    try {
        const response = await fetch(API_CIDADES_URL);

        if (!response.ok) {
            throw new Error(`Erro ao buscar cidades: ${response.status}`);
        }

        const cidades = await response.json();

        lista.innerHTML = "";

        if (!Array.isArray(cidades) || cidades.length === 0) {
            if (mensagem) mensagem.textContent = "Nenhuma cidade cadastrada.";
            return;
        }

        if (mensagem) mensagem.remove();

        cidades.forEach((cidade) => {
            if (!cidade || !cidade.cidade) return;
            lista.appendChild(criarRadioCidade(cidade));
        });
    } catch (error) {
        console.error("Erro ao carregar cidades do filtro:", error);

        if (mensagem) {
            mensagem.textContent = "Não foi possível carregar as cidades.";
        }
    }
}

function obterValorRadioSelecionado(nome, mapaValores) {
    const selecionado = document.querySelector(`input[name="${nome}"]:checked`);

    if (!selecionado) return [];

    const valor = mapaValores ? mapaValores[selecionado.id] : Number(selecionado.value);
    return Number.isFinite(valor) ? [valor] : [];
}

function obterValoresCheckboxSelecionados(seletor, mapaValores = null) {
    return Array.from(document.querySelectorAll(seletor))
        .filter(input => input.checked)
        .map(input => mapaValores ? mapaValores[input.id] : Number(input.value))
        .filter(valor => Number.isFinite(valor));
}

function montarBodyFiltroPets() {
    return {
        cidade: obterValorRadioSelecionado("filter1"),
        ong: obterValoresCheckboxSelecionados('#ongsFiltro input[type="checkbox"]'),
        especie: obterValorRadioSelecionado("filter2", MAPA_ESPECIE),
        porte: obterValorRadioSelecionado("filter3", MAPA_PORTE),
        sexo: obterValoresCheckboxSelecionados('input[name="sexo"]', MAPA_SEXO)
    };
}

async function aplicarFiltrosApi() {
    const body = montarBodyFiltroPets();

    try {
        const response = await fetch(API_FILTRO_PETS_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            throw new Error(`Erro ao filtrar pets: ${response.status}`);
        }

        const resultado = await response.json();
        const pets = Array.isArray(resultado) ? resultado : resultado.data;
        const petsComIdOng = Array.isArray(pets)
            ? pets.map(pet => {
                if (pet.fk_idong || pet.id_ong || pet.ong_id || pet.idong) {
                    return pet;
                }

                const idOng = ONGS_FILTRO_POR_NOME.get(normalizarTexto(pet.nome_ong));
                return idOng ? { ...pet, fk_idong: idOng } : pet;
            })
            : [];

        window.dispatchEvent(new CustomEvent("petsFiltrados", {
            detail: {
                pets: petsComIdOng,
                filtros: body
            }
        }));
    } catch (error) {
        console.error("Erro ao aplicar filtros de pets:", error);
    }
}

async function carregarOngsFiltro() {
    const lista = document.getElementById("ongsFiltroLista");
    const mensagem = document.getElementById("ongsFiltroMensagem");

    if (!lista) return;

    try {
        const response = await fetch(API_ONGS_URL);

        if (!response.ok) {
            throw new Error(`Erro ao buscar ONGs: ${response.status}`);
        }

        const ongs = await response.json();

        lista.innerHTML = "";

        if (!Array.isArray(ongs) || ongs.length === 0) {
            if (mensagem) mensagem.textContent = "Nenhuma ONG cadastrada.";
            return;
        }

        if (mensagem) mensagem.remove();

        ongs.forEach((ong) => {
            if (!ong || !ong.idong) return;
            ONGS_FILTRO_POR_NOME.set(normalizarTexto(ong.nome), ong.idong);
            lista.appendChild(criarCheckboxOng(ong));
        });
    } catch (error) {
        console.error("Erro ao carregar ONGs do filtro:", error);

        if (mensagem) {
            mensagem.textContent = "Não foi possível carregar as ONGs.";
        }
    }
}

function limparRadioButtons() {
    // Grupos de radio buttons para limpar
    const radioGroups = ['filter1', 'filter2', 'filter3'];

    // Desmarca todos os radios em cada grupo
    radioGroups.forEach(group => {
        const radios = document.getElementsByName(group);
        radios.forEach(radio => {
            radio.checked = false;
            radio.dataset.checked = "false";
        });
    });

    document.querySelectorAll('#cidadeFiltroLista input[type="radio"]').forEach(radio => {
        radio.checked = false;
        radio.dataset.checked = "false";
    });

    // Desmarca dinamicamente todas as ONGs carregadas da API
    document.querySelectorAll('#ongsFiltro input[type="checkbox"]').forEach(checkbox => {
        checkbox.checked = false;
    });

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

    window.dispatchEvent(new CustomEvent("filtrosPetsLimpos"));
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

document.addEventListener("DOMContentLoaded", carregarCidadesFiltro);
document.addEventListener("DOMContentLoaded", carregarOngsFiltro);

const radios = document.querySelectorAll('input[type="radio"]');

radios.forEach(radio => {
    if (radio.name === "filter1") {
        return;
    }

    radio.addEventListener('click', function () {
        if (this.checked) {
            const wasChecked = this.dataset.checked === "true";
            if (wasChecked) {
                this.checked = false;
                this.dataset.checked = "false";
            } else {
                document.querySelectorAll(`input[name="${this.name}"]`).forEach(r => r.dataset.checked = "false");
                this.dataset.checked = "true";
            }

            aplicarFiltrosApi();
        }
    });
});

document.querySelectorAll('input[name="sexo"]').forEach(checkbox => {
    checkbox.addEventListener("change", aplicarFiltrosApi);
});

document.addEventListener("change", (event) => {
    if (event.target.matches('#ongsFiltro input[type="checkbox"]')) {
        aplicarFiltrosApi();
    }
});
  
