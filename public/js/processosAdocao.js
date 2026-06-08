const STORAGE_KEY = "solicitacoesAdocao";
const STORAGE_DETALHE_KEY = "processoAdocaoSelecionado";

const processosFallback = [
  {
    id: "pipoca-2023-10-12",
    petNome: "Pipoca",
    dataSolicitacao: "2023-10-12",
    ongNome: "ONG Patinhas Felizes",
    localizacao: "Sao Paulo, SP",
    status: "analise",
    foto: "/public/img/fotos/cat1.jpg",
  },
  {
    id: "mel-2023-10-05",
    petNome: "Mel",
    dataSolicitacao: "2023-10-05",
    ongNome: "Abrigo Coracao Animal",
    localizacao: "Curitiba, PR",
    status: "entrevista",
    foto: "/public/img/fotos/cat2.jpg",
  },
  {
    id: "thor-2023-09-28",
    petNome: "Thor",
    dataSolicitacao: "2023-09-28",
    ongNome: "ONG Patas Conscientes",
    localizacao: "Sao Paulo, SP",
    status: "aprovado",
    foto: "/public/img/fotos/dog1.jpg",
  },
];

const statusConfig = {
  analise: {
    label: "Em an\u00e1lise",
    badgeClass: "processos-adocao-badge--analise",
    icon:
      '<svg viewBox="0 -960 960 960" aria-hidden="true"><path d="M360-120q-17 0-28.5-11.5T320-160v-120q0-17 11.5-28.5T360-320h240q17 0 28.5 11.5T640-280v120q0 17-11.5 28.5T600-120H360Zm40-80h160v-40H400v40Zm-40-200v-120q0-17 11.5-28.5T400-560h160q17 0 28.5 11.5T600-520v120h-80v-80h-80v80h-80Zm120-240q-83 0-141.5-58.5T280-840h80q0 50 35 85t85 35q50 0 85-35t35-85h80q0 83-58.5 141.5T480-640Z"/></svg>',
  },
  entrevista: {
    label: "Entrevista agendada",
    badgeClass: "processos-adocao-badge--entrevista",
    icon:
      '<svg viewBox="0 -960 960 960" aria-hidden="true"><path d="M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm80 160h200v80H280v-80Zm0 120h320v80H280v-80Z"/></svg>',
  },
  aprovado: {
    label: "Aprovado",
    badgeClass: "processos-adocao-badge--aprovado",
    icon:
      '<svg viewBox="0 -960 960 960" aria-hidden="true"><path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z"/></svg>',
  },
};

const lista = document.getElementById("listaProcessosAdocao");
const resumo = document.getElementById("processosAdocaoResumoTexto");
const formFiltros = document.getElementById("processosAdocaoFiltros");

let processos = [];

function lerJsonLocal(chave, fallback) {
  try {
    const valor = localStorage.getItem(chave);
    return valor ? JSON.parse(valor) : fallback;
  } catch (erro) {
    return fallback;
  }
}

function formatarData(data) {
  if (!data) return "Data n\u00e3o informada";

  const valorData = String(data).includes("T") ? data : `${data}T00:00:00`;
  const date = new Date(valorData);
  if (Number.isNaN(date.getTime())) return "Data n\u00e3o informada";

  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function normalizarStatus(status) {
  const statusNormalizado = String(status || "").toLowerCase();

  if (["aprovado", "aprovada"].includes(statusNormalizado)) return "aprovado";
  if (["entrevista", "entrevista-agendada", "agendada"].includes(statusNormalizado)) return "entrevista";
  return "analise";
}

function obterLocalizacao(solicitacao) {
  return (
    solicitacao.localizacao ||
    solicitacao.pet?.localizacao ||
    solicitacao.pet?.cidade ||
    solicitacao.adotante?.cidade ||
    solicitacao.respostas?.cidade ||
    "Localiza\u00e7\u00e3o n\u00e3o informada"
  );
}

function normalizarProcesso(solicitacao, indice) {
  const pet = solicitacao.pet || {};
  const status = normalizarStatus(solicitacao.status);

  return {
    id: solicitacao.id || solicitacao.idSolicitacao || `processo-${indice}`,
    petNome: solicitacao.petNome || pet.nome || "Pet sem nome",
    dataSolicitacao: solicitacao.dataSolicitacao || solicitacao.data_solicitacao,
    ongNome: solicitacao.ongNome || pet.ong || solicitacao.ong?.nome || "ONG n\u00e3o informada",
    localizacao: obterLocalizacao(solicitacao),
    status,
    foto: solicitacao.foto || pet.foto || "/public/img/fotos/dog1.jpg",
  };
}

function carregarProcessos() {
  const dadosExternos = Array.isArray(window.processosAdocaoData) ? window.processosAdocaoData : null;
  const dadosLocais = lerJsonLocal(STORAGE_KEY, []);
  const fonte = dadosExternos || (Array.isArray(dadosLocais) && dadosLocais.length > 0 ? dadosLocais : processosFallback);

  return fonte
    .map(normalizarProcesso)
    .sort((a, b) => new Date(b.dataSolicitacao || 0) - new Date(a.dataSolicitacao || 0));
}

function escaparHtml(valor) {
  return String(valor ?? "").replace(/[&<>"']/g, (caractere) => {
    const entidades = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    };

    return entidades[caractere];
  });
}

function criarCard(processo) {
  const config = statusConfig[processo.status] || statusConfig.analise;
  const card = document.createElement("article");
  card.className = "processos-adocao-card";
  card.dataset.status = processo.status;
  const petNome = escaparHtml(processo.petNome);
  const ongNome = escaparHtml(processo.ongNome);
  const localizacao = escaparHtml(processo.localizacao);
  const foto = escaparHtml(processo.foto);
  const processoId = escaparHtml(processo.id);

  card.innerHTML = `
    <img class="processos-adocao-foto" src="${foto}" alt="Foto de ${petNome}" loading="lazy">
    <div class="processos-adocao-info">
      <h2>${petNome}</h2>
      <p>Solicitado em: ${formatarData(processo.dataSolicitacao)}</p>
      <p class="processos-adocao-local">
        <svg viewBox="0 -960 960 960" aria-hidden="true">
          <path d="M480-480q33 0 56.5-23.5T560-560q0-33-23.5-56.5T480-640q-33 0-56.5 23.5T400-560q0 33 23.5 56.5T480-480Zm0 400Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Z"/>
        </svg>
        <span>${ongNome} &bull; ${localizacao}</span>
      </p>
    </div>
    <div class="processos-adocao-acoes">
      <span class="processos-adocao-badge ${config.badgeClass}">${config.icon}${config.label}</span>
      <button class="processos-adocao-detalhes" type="button" data-processo-id="${processoId}">Ver detalhes</button>
    </div>
  `;

  card.querySelector(".processos-adocao-detalhes").addEventListener("click", () => {
    try {
      sessionStorage.setItem(STORAGE_DETALHE_KEY, JSON.stringify(processo));
    } catch (erro) {
      // Ignore storage errors and continue navigation.
    }

    const id = encodeURIComponent(processo.id || "");
    window.location.href = `/src/views/detalhesProcesso.html?id=${id}`;
  });

  return card;
}

function obterStatusSelecionados() {
  const selecionados = [...formFiltros.querySelectorAll('input[name="status"]:checked')].map((input) => input.value);
  return selecionados.includes("todos") ? ["todos"] : selecionados;
}

function atualizarResumo(quantidade, total) {
  if (!resumo) return;

  resumo.textContent =
    quantidade === total
      ? `${total} processo${total === 1 ? "" : "s"} de ado\u00e7\u00e3o encontrado${total === 1 ? "" : "s"}.`
      : `${quantidade} de ${total} processo${total === 1 ? "" : "s"} exibido${quantidade === 1 ? "" : "s"}.`;
}

function aplicarFiltros() {
  const selecionados = obterStatusSelecionados();
  const cards = [...lista.querySelectorAll(".processos-adocao-card")];
  let visiveis = 0;

  cards.forEach((card) => {
    const deveExibir = selecionados.includes("todos") || selecionados.includes(card.dataset.status);
    card.classList.toggle("is-hidden", !deveExibir);
    if (deveExibir) visiveis += 1;
  });

  atualizarResumo(visiveis, processos.length);

  const vazioExistente = lista.querySelector(".processos-adocao-vazio");
  if (vazioExistente) vazioExistente.remove();

  if (visiveis === 0) {
    const aviso = document.createElement("p");
    aviso.className = "processos-adocao-vazio";
    aviso.textContent = "Nenhum processo encontrado para o status selecionado.";
    lista.appendChild(aviso);
  }
}

function sincronizarFiltros(evento) {
  const alvo = evento.target;
  if (!alvo.matches('input[name="status"]')) return;

  const todos = formFiltros.querySelector('input[value="todos"]');
  const statusInputs = [...formFiltros.querySelectorAll('input[name="status"]:not([value="todos"])')];

  if (alvo.value === "todos" && alvo.checked) {
    statusInputs.forEach((input) => {
      input.checked = false;
    });
  } else if (alvo.checked) {
    todos.checked = false;
  }

  if (!todos.checked && statusInputs.every((input) => !input.checked)) {
    todos.checked = true;
  }

  aplicarFiltros();
}

function renderizarProcessos() {
  processos = carregarProcessos();
  lista.innerHTML = "";

  if (processos.length === 0) {
    atualizarResumo(0, 0);
    const aviso = document.createElement("p");
    aviso.className = "processos-adocao-vazio";
    aviso.textContent = "Voc\u00ea ainda n\u00e3o iniciou nenhum processo de ado\u00e7\u00e3o.";
    lista.appendChild(aviso);
    return;
  }

  processos.forEach((processo) => lista.appendChild(criarCard(processo)));
  aplicarFiltros();
}

document.addEventListener("DOMContentLoaded", () => {
  if (!lista || !formFiltros) return;

  renderizarProcessos();
  formFiltros.addEventListener("change", sincronizarFiltros);
});

window.addEventListener("solicitacaoAdocaoCriada", renderizarProcessos);
