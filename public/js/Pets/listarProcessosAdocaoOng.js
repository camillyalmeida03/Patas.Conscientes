const STORAGE_KEY = "solicitacoesAdocao";

const lista = document.getElementById("listaProcessosAdocao");
const resumo = document.getElementById("processosAdocaoResumoTexto");
const nomeOngElemento = document.getElementById("processosOngNome");

function lerJsonLocal(chave, fallback) {
  try {
    const valor = localStorage.getItem(chave);
    return valor ? JSON.parse(valor) : fallback;
  } catch (erro) {
    return fallback;
  }
}

function obterOngLocal() {
  return lerJsonLocal("ong", null);
}

function obterIdOng(ong) {
  const params = new URLSearchParams(window.location.search);
  return (
    params.get("id") ||
    ong?.id ||
    ong?.idong ||
    ong?.id_ong ||
    ong?.fk_idong ||
    null
  );
}

function obterNomeOng(ong) {
  return ong?.nome || ong?.nome_ong || "ONG";
}

function normalizarTexto(texto) {
  return String(texto || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase();
}

function pertenceAOng(solicitacao, idOng, nomeOng) {
  const idSolicitacao =
    solicitacao?.fk_idong ||
    solicitacao?.pet?.fk_idong ||
    solicitacao?.pet?.idOng ||
    null;

  if (idOng && String(idSolicitacao || "") === String(idOng)) return true;

  const nomeSolicitacao = solicitacao?.pet?.ong || solicitacao?.ong?.nome || "";
  return normalizarTexto(nomeOng) && normalizarTexto(nomeSolicitacao) === normalizarTexto(nomeOng);
}

function formatarData(data) {
  if (!data) return "Data nao informada.";

  const date = new Date(data);
  if (Number.isNaN(date.getTime())) return "Data nao informada.";

  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function formatarStatus(status) {
  const statusNormalizado = String(status || "").toLowerCase();

  const nomes = {
    "preparada-localmente": "Solicitacao recebida.",
    preparada: "Solicitacao recebida.",
    enviada: "Enviada para analise.",
    analise: "Em analise.",
    aprovada: "Aprovada.",
    recusada: "Recusada.",
    cancelada: "Cancelada.",
  };

  return nomes[statusNormalizado] || "Solicitacao recebida.";
}

function criarElemento(tag, classes = [], texto = "") {
  const elemento = document.createElement(tag);

  if (Array.isArray(classes) && classes.length > 0) {
    elemento.classList.add(...classes);
  }

  if (texto) {
    elemento.textContent = texto;
  }

  return elemento;
}

function renderizarAviso(mensagem) {
  if (!lista) return;

  lista.innerHTML = "";
  lista.appendChild(criarElemento("p", ["avisoProcessosAdocao"], mensagem));
}

function criarLinhaInfo(label, valor) {
  const linha = criarElemento("div", ["processo-adocao-info-linha"]);
  linha.appendChild(criarElemento("span", [], label.endsWith(":") ? label : `${label}:`));
  linha.appendChild(criarElemento("strong", [], valor || "Nao informado."));
  return linha;
}

function criarEtapas(status) {
  const etapaAtual = String(status || "").toLowerCase();
  const etapaAtiva =
    etapaAtual === "aprovada" || etapaAtual === "recusada" || etapaAtual === "cancelada"
      ? 3
      : etapaAtual === "analise" || etapaAtual === "enviada"
        ? 2
        : 1;
  const etapas = ["Recebida.", "Analise.", "Retorno."];
  const container = criarElemento("ol", ["processo-adocao-etapas"]);

  etapas.forEach((etapa, index) => {
    const item = criarElemento("li", [], etapa);
    if (index + 1 <= etapaAtiva) item.classList.add("ativo");
    container.appendChild(item);
  });

  return container;
}

function criarCardProcesso(solicitacao) {
  const pet = solicitacao.pet || {};
  const adotante = solicitacao.adotante || {};
  const respostas = solicitacao.respostas || {};
  const status = solicitacao.status || "preparada-localmente";

  const card = criarElemento("article", ["processo-adocao-card"]);

  const topo = criarElemento("div", ["processo-adocao-card-topo"]);
  const foto = criarElemento("div", ["processo-adocao-foto"]);
  foto.style.backgroundImage = `url("${pet.foto || "/public/img/fotos/dog1.jpg"}")`;
  topo.appendChild(foto);

  const titulo = criarElemento("div", ["processo-adocao-titulo"]);
  titulo.appendChild(criarElemento("span", ["processo-adocao-data"], formatarData(solicitacao.data_solicitacao)));
  titulo.appendChild(criarElemento("h2", [], pet.nome || "Pet sem nome."));
  titulo.appendChild(
    criarElemento(
      "p",
      [],
      [pet.especie, pet.porte].filter(Boolean).join(" | ") || "Detalhes do pet nao informados."
    )
  );
  topo.appendChild(titulo);

  topo.appendChild(criarElemento("span", ["processo-adocao-status"], formatarStatus(status)));
  card.appendChild(topo);
  card.appendChild(criarEtapas(status));

  const detalhes = criarElemento("div", ["processo-adocao-detalhes"]);
  detalhes.appendChild(criarLinhaInfo("Adotante", adotante.nome || respostas.nome));
  detalhes.appendChild(criarLinhaInfo("E-mail", adotante.email || respostas.email));
  detalhes.appendChild(criarLinhaInfo("Telefone", adotante.telefone || respostas.telefone));
  detalhes.appendChild(criarLinhaInfo("Cidade", adotante.cidade || respostas.cidade));
  detalhes.appendChild(criarLinhaInfo("Moradia", respostas.moradia));
  detalhes.appendChild(criarLinhaInfo("Motivacao", respostas.motivacao));
  card.appendChild(detalhes);

  return card;
}

function renderizarProcessosOng() {
  if (!lista) return;

  const ong = obterOngLocal();
  const idOng = obterIdOng(ong);
  const nomeOng = obterNomeOng(ong);

  if (nomeOngElemento) nomeOngElemento.textContent = nomeOng;

  if (!ong && !idOng) {
    if (resumo) resumo.textContent = "Esta conta nao possui ONG vinculada.";
    renderizarAviso("Nenhuma ONG foi encontrada para esta conta.");
    return;
  }

  const solicitacoes = lerJsonLocal(STORAGE_KEY, []);
  const processos = Array.isArray(solicitacoes)
    ? solicitacoes
      .filter((solicitacao) => pertenceAOng(solicitacao, idOng, nomeOng))
      .sort((a, b) => new Date(b.data_solicitacao || 0) - new Date(a.data_solicitacao || 0))
    : [];

  lista.innerHTML = "";

  if (processos.length === 0) {
    if (resumo) resumo.textContent = `Nenhuma solicitacao recebida por ${nomeOng}.`;
    renderizarAviso("Esta ONG ainda nao recebeu processos de adocao pelo site.");
    return;
  }

  if (resumo) {
    resumo.textContent = `${processos.length} processo${processos.length > 1 ? "s" : ""} de adocao recebido${processos.length > 1 ? "s" : ""} por ${nomeOng}.`;
  }

  processos.forEach((solicitacao) => {
    lista.appendChild(criarCardProcesso(solicitacao));
  });
}

document.addEventListener("DOMContentLoaded", renderizarProcessosOng);
window.addEventListener("solicitacaoAdocaoCriada", renderizarProcessosOng);
