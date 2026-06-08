const solicitacoesMock = [
  { id: 1, candidato: "Joao Silva", pet: "Pipoca", dataPedido: "2023-10-12", status: "analise" },
  { id: 2, candidato: "Maria de Andrade", pet: "Rex", dataPedido: "2023-10-11", status: "entrevista" },
  { id: 3, candidato: "Ricardo Pereira", pet: "Bolinha", dataPedido: "2023-10-10", status: "aprovado" },
  { id: 4, candidato: "Carla Lima", pet: "Mel", dataPedido: "2023-10-09", status: "analise" },
  { id: 5, candidato: "Fernando Bruno", pet: "Luna", dataPedido: "2023-10-08", status: "entrevista" },
  { id: 6, candidato: "Paula Ramos", pet: "Nick", dataPedido: "2023-10-07", status: "aguardando" },
  { id: 7, candidato: "Bruno Mello", pet: "Belinha", dataPedido: "2023-10-06", status: "aprovado" },
  { id: 8, candidato: "Aline Rocha", pet: "Mingau", dataPedido: "2023-10-05", status: "analise" },
  { id: 9, candidato: "Sergio Luiz", pet: "Toddy", dataPedido: "2023-10-04", status: "aguardando" },
  { id: 10, candidato: "Vanessa Costa", pet: "Bidu", dataPedido: "2023-10-03", status: "entrevista" },
  { id: 11, candidato: "Elisa Prado", pet: "Thor", dataPedido: "2023-10-02", status: "aprovado" },
  { id: 12, candidato: "Diego Santos", pet: "Lili", dataPedido: "2023-10-01", status: "analise" },
];

const statusMap = {
  analise: { label: "EM ANALISE", classe: "status-analise" },
  entrevista: { label: "ENTREVISTA", classe: "status-entrevista" },
  aguardando: { label: "AGUARDANDO", classe: "status-aguardando" },
  aprovado: { label: "APROVADO", classe: "status-aprovado" },
};

const metricasConfig = [
  {
    id: "novas",
    titulo: "Novas Solicitacoes",
    total: 24,
    variacao: "+12%",
    cor: "metrica-azul",
    icone: `<svg viewBox="0 -960 960 960" aria-hidden="true"><path d="M680-80q-50 0-85-35t-35-85q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35Zm-30-80h60v-30h30v-60h-30v-30h-60v30h-30v60h30v30ZM200-120q-33 0-56.5-23.5T120-200v-520q0-33 23.5-56.5T200-800h80v-80h80v80h240v-80h80v80h80q33 0 56.5 23.5T840-720v313q-18-12-38-20t-42-11v-122H200v360h280q4 22 12 42t20 38H200Zm0-520h560v-80H200v80Z"/></svg>`,
  },
  {
    id: "entrevista",
    titulo: "Em Entrevista",
    total: 18,
    variacao: "+5%",
    cor: "metrica-ciano",
    icone: `<svg viewBox="0 -960 960 960" aria-hidden="true"><path d="M240-400h320v-80H240v80Zm0-120h480v-80H240v80Zm0-120h480v-80H240v80ZM80-80v-720q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H240L80-80Zm126-240h594v-480H160v525l46-45Z"/></svg>`,
  },
  {
    id: "aguardando",
    titulo: "Aguardando Visita",
    total: 7,
    variacao: "0%",
    cor: "metrica-rosa",
    icone: `<svg viewBox="0 -960 960 960" aria-hidden="true"><path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z"/></svg>`,
  },
  {
    id: "aprovados",
    titulo: "Aprovados",
    total: 42,
    variacao: "+8%",
    cor: "metrica-verde",
    icone: `<svg viewBox="0 -960 960 960" aria-hidden="true"><path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z"/></svg>`,
  },
];

const estado = {
  paginaAtual: 1,
  porPagina: 5,
  filtroStatus: "todos",
  buscaPet: "",
  totalRegistros: 49,
};

const refs = {
  metricas: document.getElementById("ongAdminMetricas"),
  resumo: document.getElementById("ongAdminResumoRegistros"),
  tabelaBody: document.getElementById("ongAdminTabelaBody"),
  paginas: document.getElementById("ongAdminPaginas"),
  anterior: document.getElementById("ongAdminPagAnterior"),
  proximo: document.getElementById("ongAdminPagProximo"),
  filtrar: document.getElementById("ongAdminFiltrarBtn"),
  buscar: document.getElementById("ongAdminBuscarBtn"),
};

function renderizarMetricas() {
  if (!refs.metricas) return;

  refs.metricas.innerHTML = "";

  metricasConfig.forEach((metrica) => {
    const card = document.createElement("article");
    card.className = "ong-admin-metrica-card";
    card.innerHTML = `
      <div class="ong-admin-metrica-topo">
        <span class="ong-admin-metrica-icone ${metrica.cor}" aria-hidden="true">${metrica.icone}</span>
        <span class="ong-admin-metrica-variacao">${metrica.variacao}</span>
      </div>
      <p>${metrica.titulo}</p>
      <strong>${String(metrica.total).padStart(2, "0")}</strong>
    `;

    refs.metricas.appendChild(card);
  });
}

function formatarData(dataIso) {
  const data = new Date(`${dataIso}T00:00:00`);
  if (Number.isNaN(data.getTime())) return "--/--/----";

  return data.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function gerarAvatar(nome) {
  const partes = String(nome || "").trim().split(/\s+/);
  const iniciais = `${partes[0]?.[0] || ""}${partes[1]?.[0] || ""}`.toUpperCase();
  return iniciais || "NA";
}

function obterDadosFiltrados() {
  const statusAtivo = estado.filtroStatus;
  const busca = estado.buscaPet.trim().toLowerCase();

  return solicitacoesMock.filter((item) => {
    const filtraStatus = statusAtivo === "todos" || item.status === statusAtivo;
    const filtraBusca = !busca || item.pet.toLowerCase().includes(busca);
    return filtraStatus && filtraBusca;
  });
}

function renderizarTabela() {
  if (!refs.tabelaBody || !refs.resumo) return;

  const filtrados = obterDadosFiltrados();
  const total = filtrados.length;
  const totalPaginas = Math.max(1, Math.ceil(total / estado.porPagina));

  if (estado.paginaAtual > totalPaginas) {
    estado.paginaAtual = totalPaginas;
  }

  const inicio = (estado.paginaAtual - 1) * estado.porPagina;
  const fim = inicio + estado.porPagina;
  const pagina = filtrados.slice(inicio, fim);

  refs.tabelaBody.innerHTML = "";

  if (pagina.length === 0) {
    const linha = document.createElement("tr");
    linha.innerHTML = `<td class="ong-admin-vazio" colspan="5">Nenhuma solicitacao encontrada para os filtros atuais.</td>`;
    refs.tabelaBody.appendChild(linha);
  }

  pagina.forEach((item) => {
    const statusInfo = statusMap[item.status] || statusMap.analise;
    const linha = document.createElement("tr");

    linha.innerHTML = `
      <td>
        <div class="ong-admin-candidato">
          <span class="ong-admin-avatar">${gerarAvatar(item.candidato)}</span>
          <span>${item.candidato}</span>
        </div>
      </td>
      <td>
        <span class="ong-admin-pet-nome">
          <svg viewBox="0 -960 960 960" aria-hidden="true">
            <path d="M180-475q-24 0-42-18t-18-42q0-24 18-42t42-18q24 0 42 18t18 42q0 24-18 42t-42 18Zm600 0q-24 0-42-18t-18-42q0-24 18-42t42-18q24 0 42 18t18 42q0 24-18 42t-42 18ZM312-312q-33 0-56.5-23.5T232-392v-47q0-38 25-68.5t63-39.5q34-7 68.5-10.5T460-561q37 0 71.5 3.5T600-547q38 9 63 39.5t25 68.5v47q0 33-23.5 56.5T608-312H312Zm168-290q-48 0-81-33t-33-81q0-48 33-81t81-33q48 0 81 33t33 81q0 48-33 81t-81 33Z" />
          </svg>
          ${item.pet}
        </span>
      </td>
      <td>${formatarData(item.dataPedido)}</td>
      <td><span class="ong-admin-status ${statusInfo.classe}">${statusInfo.label}</span></td>
      <td>
        <div class="ong-admin-acoes-linha">
          <button class="ong-admin-link-acao" type="button">Analisar Perfil</button>
          <button class="ong-admin-btn-status" type="button">Alterar Situacao</button>
        </div>
      </td>
    `;

    refs.tabelaBody.appendChild(linha);
  });

  const totalGeral = estado.filtroStatus === "todos" && !estado.buscaPet ? estado.totalRegistros : total;
  refs.resumo.textContent = `Exibindo ${Math.min(fim, total)} de ${totalGeral} registros`;
  renderizarPaginacao(totalPaginas);
}

function renderizarPaginacao(totalPaginas) {
  if (!refs.paginas || !refs.anterior || !refs.proximo) return;

  refs.paginas.innerHTML = "";

  for (let i = 1; i <= totalPaginas; i += 1) {
    const botao = document.createElement("button");
    botao.type = "button";
    botao.className = `ong-admin-pag-numero ${i === estado.paginaAtual ? "ativo" : ""}`;
    botao.textContent = String(i);
    botao.addEventListener("click", () => {
      estado.paginaAtual = i;
      renderizarTabela();
    });

    refs.paginas.appendChild(botao);
  }

  refs.anterior.disabled = estado.paginaAtual === 1;
  refs.proximo.disabled = estado.paginaAtual === totalPaginas;
}

function alternarFiltroStatus() {
  const ordem = ["todos", "analise", "entrevista", "aguardando", "aprovado"];
  const indiceAtual = ordem.indexOf(estado.filtroStatus);
  const proximoIndice = (indiceAtual + 1) % ordem.length;
  const labels = {
    todos: "Todos",
    analise: "Em Analise",
    entrevista: "Entrevista",
    aguardando: "Aguardando Visita",
    aprovado: "Aprovado",
  };

   estado.filtroStatus = ordem[proximoIndice];
  refs.filtrar.querySelector("span").textContent = `Filtrar: ${labels[estado.filtroStatus]}`;
   estado.paginaAtual = 1;
   renderizarTabela();
 }

function buscarPet() {
  const valor = window.prompt("Digite o nome do animal para buscar:", estado.buscaPet || "");
  if (valor === null) return;

  estado.buscaPet = valor;
   estado.paginaAtual = 1;
   renderizarTabela();
 }

function configurarEventos() {
  if (refs.filtrar) {
    refs.filtrar.addEventListener("click", alternarFiltroStatus);
  }

  if (refs.buscar) {
    refs.buscar.addEventListener("click", buscarPet);
  }

  if (refs.anterior) {
    refs.anterior.addEventListener("click", () => {
      if (estado.paginaAtual <= 1) return;
      estado.paginaAtual -= 1;
      renderizarTabela();
    });
  }

  if (refs.proximo) {
    refs.proximo.addEventListener("click", () => {
      const totalPaginas = Math.max(1, Math.ceil(obterDadosFiltrados().length / estado.porPagina));
      if (estado.paginaAtual >= totalPaginas) return;
      estado.paginaAtual += 1;
      renderizarTabela();
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderizarMetricas();
  configurarEventos();
  renderizarTabela();
});
