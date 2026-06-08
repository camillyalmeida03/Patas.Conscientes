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
  analise: { label: "Em Analise", classe: "status-analise" },
  entrevista: { label: "Entrevista", classe: "status-entrevista" },
  aguardando: { label: "Aguardando Visita", classe: "status-aguardando" },
  aprovado: { label: "Aprovado", classe: "status-aprovado" },
};

const metricasConfig = [
  { id: "novas", titulo: "Novas Solicitacoes", status: "analise", variacao: "+12%", cor: "metrica-azul" },
  { id: "entrevista", titulo: "Em Entrevista", status: "entrevista", variacao: "+5%", cor: "metrica-ciano" },
  { id: "aguardando", titulo: "Aguardando Visita", status: "aguardando", variacao: "0%", cor: "metrica-rosa" },
  { id: "aprovados", titulo: "Aprovados", status: "aprovado", variacao: "+8%", cor: "metrica-verde" },
];

const estado = {
  paginaAtual: 1,
  porPagina: 5,
  filtroStatus: "todos",
  buscaPet: "",
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

function contarPorStatus(status) {
  return solicitacoesMock.filter((item) => item.status === status).length;
}

function renderizarMetricas() {
  if (!refs.metricas) return;

  refs.metricas.innerHTML = "";

  metricasConfig.forEach((metrica) => {
    const total = contarPorStatus(metrica.status);

    const card = document.createElement("article");
    card.className = "ong-admin-metrica-card";
    card.innerHTML = `
      <div class="ong-admin-metrica-topo">
        <span class="ong-admin-metrica-icone ${metrica.cor}" aria-hidden="true"></span>
        <span class="ong-admin-metrica-variacao">${metrica.variacao}</span>
      </div>
      <p>${metrica.titulo}</p>
      <strong>${String(total).padStart(2, "0")}</strong>
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
          <button class="ong-admin-btn-status" type="button">Alterar Status</button>
        </div>
      </td>
    `;

    refs.tabelaBody.appendChild(linha);
  });

  refs.resumo.textContent = `Exibindo ${Math.min(fim, total)} de ${total} registros`;
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
  const valor = window.prompt("Digite o nome do pet para buscar:", estado.buscaPet || "");
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
