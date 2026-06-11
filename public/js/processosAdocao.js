const API_URL = "http://localhost:6789";
const STORAGE_DETALHE_KEY = "processoAdocaoSelecionado";

const statusConfig = {
  nova: {
    label: "Nova",
    badgeClass: "processos-adocao-badge--analise",
    icon:
      '<svg viewBox="0 -960 960 960" aria-hidden="true"><path d="M360-120q-17 0-28.5-11.5T320-160v-120q0-17 11.5-28.5T360-320h240q17 0 28.5 11.5T640-280v120q0 17-11.5 28.5T600-120H360Zm40-80h160v-40H400v40Zm-40-200v-120q0-17 11.5-28.5T400-560h160q17 0 28.5 11.5T600-520v120h-80v-80h-80v80h-80Zm120-240q-83 0-141.5-58.5T280-840h80q0 50 35 85t85 35q50 0 85-35t35-85h80q0 83-58.5 141.5T480-640Z"/></svg>',
  },
  analise: {
    label: "Em análise",
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
  visita: {
    label: "Visita",
    badgeClass: "processos-adocao-badge--entrevista",
    icon:
      '<svg viewBox="0 -960 960 960" aria-hidden="true"><path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Z"/></svg>',
  },
  aprovado: {
    label: "Aprovado",
    badgeClass: "processos-adocao-badge--aprovado",
    icon:
      '<svg viewBox="0 -960 960 960" aria-hidden="true"><path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z"/></svg>',
  },
  reprovado: {
    label: "Reprovado",
    badgeClass: "processos-adocao-badge--analise",
    icon:
      '<svg viewBox="0 -960 960 960" aria-hidden="true"><path d="m336-280 144-144 144 144 56-56-144-144 144-144-56-56-144 144-144-144-56 56 144 144-144 144 56 56Z"/></svg>',
  },
  finalizado: {
    label: "Finalizado",
    badgeClass: "processos-adocao-badge--aprovado",
    icon:
      '<svg viewBox="0 -960 960 960" aria-hidden="true"><path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm-42-240 226-226-56-58-170 170-86-84-56 56 142 142Z"/></svg>',
  },
  visita: {
    label: "Visita",
    badgeClass: "processos-adocao-badge--entrevista",
    icon:
      '<svg viewBox="0 -960 960 960" aria-hidden="true"><path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Z"/></svg>',
  },
};

document.addEventListener("DOMContentLoaded", () => {
  const lista = document.getElementById("listaProcessosAdocao");
  const resumo = document.getElementById("processosAdocaoResumoTexto");
  const formFiltros = document.getElementById("processosAdocaoFiltros");

  if (!lista || !formFiltros) return;

  let processos = [];

  function lerJsonStorage(chave) {
    try {
      const local = localStorage.getItem(chave);
      if (local) return JSON.parse(local);

      const session = sessionStorage.getItem(chave);
      if (session) return JSON.parse(session);
    } catch (erro) {
      return null;
    }

    return null;
  }

  function decodificarToken(token) {
    try {
      const partePayload = token.split(".")[1];
      if (!partePayload) return null;

      const payload = partePayload.replace(/-/g, "+").replace(/_/g, "/");
      return JSON.parse(atob(payload));
    } catch (erro) {
      return null;
    }
  }

  function obterUsuarioLogado() {
    const possiveisChavesUsuario = [
      "usuario",
      "usuarioLogado",
      "user",
      "userData",
      "dadosUsuario",
      "loginUsuario",
    ];

    for (const chave of possiveisChavesUsuario) {
      const dados = lerJsonStorage(chave);
      if (dados?.id || dados?.idusuario) {
        return dados;
      }
    }

    const possiveisChavesToken = ["token", "authToken", "jwt", "accessToken"];

    for (const chave of possiveisChavesToken) {
      const token = localStorage.getItem(chave) || sessionStorage.getItem(chave);
      const payload = token ? decodificarToken(token) : null;

      if (payload?.id) {
        return {
          id: payload.id,
          email: payload.email,
          tipo: payload.tipo,
          ong: payload.ong,
        };
      }
    }

    return null;
  }

  function getIdUsuarioLogado() {
    const usuario = obterUsuarioLogado();
    return usuario?.id || usuario?.idusuario || null;
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

  function formatarData(data) {
    if (!data) return "Data não informada";

    const valorData = String(data).includes("T") ? data : `${data}T00:00:00`;
    const date = new Date(valorData);
    if (Number.isNaN(date.getTime())) return "Data não informada";

    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  }

  function normalizarTexto(texto) {
    return String(texto || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim();
  }

  function normalizarStatus(status) {
    const valor = normalizarTexto(status);

    if (!valor || valor === "nova" || valor === "novo") return "nova";
    if (valor.includes("analise")) return "analise";
    if (valor.includes("entrevista")) return "entrevista";
    if (valor.includes("visita")) return "visita";
    if (valor.includes("aprov")) return "aprovado";
    if (valor.includes("reprov")) return "reprovado";
    if (valor.includes("final")) return "finalizado";



    return "analise";
  }
  function converterFoto(foto) {
    if (!foto) return "/public/img/fotos/dog1.jpg";
    if (String(foto).startsWith("http")) return foto;
    if (String(foto).startsWith("/")) return foto;
    return `/public/img/fotos/${foto}`;
  }

  function montarLocalizacao(solicitacao) {
    const cidade = solicitacao.ong_cidade || solicitacao.cidade || "";
    const estado = solicitacao.ong_estado || solicitacao.estado_sigla || solicitacao.sigla || "";
    const local = [cidade, estado].filter(Boolean).join(", ");

    return local || "Localização não informada";
  }

  function normalizarProcesso(solicitacao) {

    console.log("STATUS VINDO DA API:", solicitacao.status);
    console.log("STATUS NORMALIZADO:", normalizarStatus(solicitacao.status));
    return {
      id: solicitacao.idsolicitacao || solicitacao.id,
      petNome: solicitacao.pet || solicitacao.pet_nome || "Pet sem nome",
      dataSolicitacao: solicitacao.data_solicitacao,
      ongNome: solicitacao.ong || solicitacao.ong_nome || "ONG não informada",
      localizacao: montarLocalizacao(solicitacao),
      status: normalizarStatus(solicitacao.status),
      statusOriginal: solicitacao.status || "Nova",
      foto: converterFoto(solicitacao.pet_foto || solicitacao.fotos),
      dadosCompletos: solicitacao,
    };
  }

async function buscarProcessos() {
  const idUsuario = getIdUsuarioLogado();

  console.log("ID USUÁRIO USADO NA PÁGINA:", idUsuario);
  console.log("URL CHAMADA:", `${API_URL}/solicitacoesadocao/usuario/${idUsuario}`);

  if (!idUsuario) {
    throw new Error(
      "Não consegui identificar o usuário logado. Confira onde o login salva o usuário/token."
    );
  }

  const response = await fetch(`${API_URL}/solicitacoesadocao/usuario/${idUsuario}`);
  const data = await response.json().catch(() => []);

  console.log("DADOS RECEBIDOS NA PÁGINA:", data);

  if (!response.ok) {
    throw new Error(data.message || "Erro ao buscar processos de adoção.");
  }

  return Array.isArray(data)
    ? data
      .map(normalizarProcesso)
      .sort((a, b) => new Date(b.dataSolicitacao || 0) - new Date(a.dataSolicitacao || 0))
    : [];
}

  function atualizarResumo(quantidade, total) {
    if (!resumo) return;

    resumo.textContent =
      quantidade === total
        ? `${total} processo${total === 1 ? "" : "s"} de adoção encontrado${total === 1 ? "" : "s"}.`
        : `${quantidade} de ${total} processo${total === 1 ? "" : "s"} exibido${quantidade === 1 ? "" : "s"}.`;
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
        sessionStorage.setItem(STORAGE_DETALHE_KEY, JSON.stringify(processo.dadosCompletos));
      } catch (erro) {
        console.warn("Não foi possível salvar o processo na sessão:", erro);
      }

      window.location.href = `/src/views/detalhesProcesso.html?id=${encodeURIComponent(processo.id)}`;
    });

    return card;
  }

  function obterStatusSelecionados() {
    const selecionados = [...formFiltros.querySelectorAll('input[name="status"]:checked')].map(
      (input) => input.value
    );

    return selecionados.includes("todos") ? ["todos"] : selecionados;
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

  async function renderizarProcessos() {
    lista.innerHTML = `<p class="processos-adocao-vazio">Carregando processos...</p>`;

    try {
      processos = await buscarProcessos();
      lista.innerHTML = "";

      if (processos.length === 0) {
        atualizarResumo(0, 0);
        const aviso = document.createElement("p");
        aviso.className = "processos-adocao-vazio";
        aviso.textContent = "Você ainda não iniciou nenhum processo de adoção.";
        lista.appendChild(aviso);
        return;
      }

      processos.forEach((processo) => lista.appendChild(criarCard(processo)));
      aplicarFiltros();
    } catch (error) {
      console.error("Erro ao carregar processos:", error);
      atualizarResumo(0, 0);
      lista.innerHTML = `<p class="processos-adocao-vazio">${escaparHtml(error.message)}</p>`;
    }
  }

  renderizarProcessos();
  formFiltros.addEventListener("change", sincronizarFiltros);
});
