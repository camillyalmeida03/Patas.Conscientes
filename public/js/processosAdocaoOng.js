const API_URL = "http://localhost:6789";

const statusMap = {
  nova: { label: "NOVA", classe: "status-aguardando" },
  analise: { label: "EM ANALISE", classe: "status-analise" },
  entrevista: { label: "ENTREVISTA", classe: "status-entrevista" },
  visita: { label: "VISITA", classe: "status-aguardando" },
  aprovado: { label: "APROVADO", classe: "status-aprovado" },
  reprovado: { label: "REPROVADO", classe: "status-reprovado" },
  finalizado: { label: "FINALIZADO", classe: "status-aprovado" },
};

const metricasConfig = [
  {
    id: "novas",
    titulo: "Novas Solicitacoes",
    status: "nova",
    cor: "metrica-azul",
    icone: `<svg viewBox="0 -960 960 960" aria-hidden="true"><path d="M680-80q-50 0-85-35t-35-85q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35Zm-30-80h60v-30h30v-60h-30v-30h-60v30h-30v60h30v30ZM200-120q-33 0-56.5-23.5T120-200v-520q0-33 23.5-56.5T200-800h80v-80h80v80h240v-80h80v80h80q33 0 56.5 23.5T840-720v313q-18-12-38-20t-42-11v-122H200v360h280q4 22 12 42t20 38H200Zm0-520h560v-80H200v80Z"/></svg>`,
  },
  {
    id: "entrevista",
    titulo: "Em Entrevista",
    status: "entrevista",
    cor: "metrica-ciano",
    icone: `<svg viewBox="0 -960 960 960" aria-hidden="true"><path d="M240-400h320v-80H240v80Zm0-120h480v-80H240v80Zm0-120h480v-80H240v80ZM80-80v-720q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H240L80-80Zm126-240h594v-480H160v525l46-45Z"/></svg>`,
  },
  {
    id: "visita",
    titulo: "Aguardando Visita",
    status: "visita",
    cor: "metrica-rosa",
    icone: `<svg viewBox="0 -960 960 960" aria-hidden="true"><path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z"/></svg>`,
  },
  {
    id: "aprovados",
    titulo: "Aprovados",
    status: "aprovado",
    cor: "metrica-verde",
    icone: `<svg viewBox="0 -960 960 960" aria-hidden="true"><path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z"/></svg>`,
  },
];

const estado = {
  solicitacoes: [],
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

function normalizar(texto) {
  return String(texto || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function getIdOngUrl() {
  return new URLSearchParams(window.location.search).get("id");
}

function getTokenSalvo() {
  return (
    localStorage.getItem("token") ||
    localStorage.getItem("authToken") ||
    sessionStorage.getItem("token") ||
    sessionStorage.getItem("authToken")
  );
}

function getIdOngDoToken() {
  const token = getTokenSalvo();
  if (!token || !token.includes(".")) return null;

  try {
    const payloadBase64 = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
    const payload = JSON.parse(atob(payloadBase64));
    return payload.ong || null;
  } catch (error) {
    console.warn("Nao foi possivel ler o token do login:", error);
    return null;
  }
}

function getIdOng() {
  return getIdOngUrl() || getIdOngDoToken();
}

function getHeadersJson() {
  const headers = { "Content-Type": "application/json" };
  const token = getTokenSalvo();

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
}

function statusChave(status) {
  const chave = normalizar(status);
  if (!chave) return "nova";
  if (chave === "em analise") return "analise";
  if (chave === "nao aprovado") return "reprovado";
  return chave;
}

function statusParaBanco(chave) {
  const mapa = {
    nova: "Nova",
    analise: "Em análise",
    entrevista: "Entrevista",
    visita: "Visita",
    aprovado: "Aprovado",
    reprovado: "Reprovado",
    finalizado: "Finalizado",
  };

  return mapa[chave] || "Nova";
}

function formatarData(dataIso) {
  if (!dataIso) return "--/--/----";

  const data = new Date(dataIso);
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

function adaptarSolicitacao(item) {
  const status = item.status || "Nova";

  return {
    id: item.idsolicitacao,
    fk_idpet: item.fk_idpet,
    fk_idusuario: item.fk_idusuario,
    candidato: item.etapa1_nome || item.usuario || "Candidato nao informado",
    pet: item.pet || "Animal nao informado",
    dataPedido: item.data_solicitacao,
    statusOriginal: status,
    status: statusChave(status),
  };
}

async function buscarSolicitacoesDaOng() {
  const idOng = getIdOng();

  if (!idOng) {
    throw new Error("ID da ONG nao encontrado. Abra a pagina com ?id=ID_DA_ONG, igual ao gerenciar pets.");
  }

  const response = await fetch(`${API_URL}/solicitacoesadocao/ong/${idOng}`, {
    headers: getHeadersJson(),
  });

  const data = await response.json().catch(() => []);

  if (!response.ok) {
    throw new Error(data.message || "Erro ao buscar solicitacoes da ONG.");
  }

  return Array.isArray(data) ? data.map(adaptarSolicitacao) : [];
}

function obterDadosFiltrados() {
  const statusAtivo = estado.filtroStatus;
  const busca = normalizar(estado.buscaPet);

  return estado.solicitacoes.filter((item) => {
    const filtraStatus = statusAtivo === "todos" || item.status === statusAtivo;
    const filtraBusca = !busca || normalizar(item.pet).includes(busca);
    return filtraStatus && filtraBusca;
  });
}

function renderizarMetricas() {
  if (!refs.metricas) return;

  refs.metricas.innerHTML = "";

  metricasConfig.forEach((metrica) => {
    const total = estado.solicitacoes.filter((item) => item.status === metrica.status).length;
    const card = document.createElement("article");
    card.className = "ong-admin-metrica-card";
    card.innerHTML = `
      <div class="ong-admin-metrica-topo">
        <span class="ong-admin-metrica-icone ${metrica.cor}" aria-hidden="true">${metrica.icone}</span>
        <span class="ong-admin-metrica-variacao">BD</span>
      </div>
      <p>${metrica.titulo}</p>
      <strong>${String(total).padStart(2, "0")}</strong>
    `;

    refs.metricas.appendChild(card);
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
    const statusInfo = statusMap[item.status] || statusMap.nova;
    const linha = document.createElement("tr");
    linha.dataset.id = item.id;

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
          <button class="ong-admin-link-acao" data-acao="analisar" type="button">Analisar Perfil</button>
          <button class="ong-admin-btn-status" data-acao="status" type="button">Alterar Situacao</button>
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
  const ordem = ["todos", "nova", "analise", "entrevista", "visita", "aprovado", "reprovado", "finalizado"];
  const indiceAtual = ordem.indexOf(estado.filtroStatus);
  const proximoIndice = (indiceAtual + 1) % ordem.length;
  const labels = {
    todos: "Todos",
    nova: "Nova",
    analise: "Em Analise",
    entrevista: "Entrevista",
    visita: "Visita",
    aprovado: "Aprovado",
    reprovado: "Reprovado",
    finalizado: "Finalizado",
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

async function alterarStatus(solicitacao) {
  const ordem = ["Nova", "Em análise", "Entrevista", "Visita", "Aprovado", "Reprovado", "Finalizado"];
  const atual = statusParaBanco(solicitacao.status);
  const indiceAtual = ordem.indexOf(atual);
  const proximoStatus = ordem[(indiceAtual + 1) % ordem.length];

  const confirmou = window.confirm(`Alterar situacao de ${solicitacao.pet} para "${proximoStatus}"?`);
  if (!confirmou) return;

  const response = await fetch(`${API_URL}/solicitacoesadocao/${solicitacao.id}`, {
    method: "PUT",
    headers: getHeadersJson(),
    body: JSON.stringify({ status: proximoStatus }),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Erro ao alterar situacao.");
  }

  solicitacao.statusOriginal = proximoStatus;
  solicitacao.status = statusChave(proximoStatus);
  renderizarMetricas();
  renderizarTabela();
}

function analisarPerfil(solicitacao) {
  const etapa1 = `${API_URL}/adocaoetapa1/solicitacao/${solicitacao.id}`;
  const etapa2 = `${API_URL}/adocaoetapa2/solicitacao/${solicitacao.id}`;

  window.alert(
    `Solicitacao #${solicitacao.id}\n\n` +
    `Candidato: ${solicitacao.candidato}\n` +
    `Animal: ${solicitacao.pet}\n` +
    `Status: ${solicitacao.statusOriginal}\n\n` +
    `Dados completos no backend:\n${etapa1}\n${etapa2}`
  );
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

  if (refs.tabelaBody) {
    refs.tabelaBody.addEventListener("click", async (event) => {
      const botao = event.target.closest("button[data-acao]");
      if (!botao) return;

      const linha = botao.closest("tr");
      const id = linha?.dataset?.id;
      const solicitacao = estado.solicitacoes.find((item) => String(item.id) === String(id));

      if (!solicitacao) {
        window.alert("Solicitacao nao encontrada.");
        return;
      }

      try {
        if (botao.dataset.acao === "status") {
          await alterarStatus(solicitacao);
        }

        if (botao.dataset.acao === "analisar") {
          analisarPerfil(solicitacao);
        }
      } catch (error) {
        console.error("Erro ao executar acao:", error);
        window.alert(error.message || "Nao foi possivel executar esta acao.");
      }
    });
  }
}

async function inicializar() {
  configurarEventos();

  try {
    estado.solicitacoes = await buscarSolicitacoesDaOng();
    renderizarMetricas();
    renderizarTabela();
  } catch (error) {
    console.error("Erro ao carregar solicitacoes:", error);

    if (refs.metricas) refs.metricas.innerHTML = "";
    if (refs.tabelaBody) {
      refs.tabelaBody.innerHTML = `<tr><td class="ong-admin-vazio" colspan="5">${error.message}</td></tr>`;
    }
    if (refs.resumo) refs.resumo.textContent = "Exibindo 0 de 0 registros";
  }
}

document.addEventListener("DOMContentLoaded", inicializar);
