const STORAGE_KEY = "solicitacoesAdocao";

const lista = document.getElementById("listaProcessosAdocao");
const resumo = document.getElementById("processosAdocaoResumoTexto");

function lerJsonLocal(chave, fallback) {
  try {
    const valor = localStorage.getItem(chave);
    return valor ? JSON.parse(valor) : fallback;
  } catch (erro) {
    return fallback;
  }
}

function obterUsuarioLogado() {
  return lerJsonLocal("usuario", null);
}

function obterIdUsuario(usuario) {
  return (
    usuario?.id ||
    usuario?.idusuario ||
    usuario?.id_usuario ||
    usuario?.fk_idusuario ||
    usuario?.usuario?.id ||
    null
  );
}

function normalizarEmail(email) {
  return String(email || "").trim().toLowerCase();
}

function pertenceAoUsuario(solicitacao, usuario) {
  const idUsuario = obterIdUsuario(usuario);
  const emailUsuario = normalizarEmail(usuario?.email);
  const idSolicitacao =
    solicitacao?.fk_idusuario ||
    solicitacao?.adotante?.id ||
    solicitacao?.respostas?.idUsuario ||
    null;
  const emailSolicitacao = normalizarEmail(
    solicitacao?.adotante?.email || solicitacao?.respostas?.email
  );

  if (idUsuario && String(idSolicitacao || "") === String(idUsuario)) return true;
  if (emailUsuario && emailSolicitacao === emailUsuario) return true;

  return false;
}

function formatarData(data) {
  if (!data) return "Data nao informada";

  const date = new Date(data);
  if (Number.isNaN(date.getTime())) return "Data nao informada";

  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function formatarStatus(status) {
  const statusNormalizado = String(status || "").toLowerCase();

  const nomes = {
    "preparada-localmente": "Solicitacao preparada",
    preparada: "Solicitacao preparada",
    enviada: "Enviada para analise",
    analise: "Em analise",
    aprovada: "Aprovada",
    recusada: "Recusada",
    cancelada: "Cancelada",
  };

  return nomes[statusNormalizado] || "Solicitacao preparada";
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
  linha.appendChild(criarElemento("span", [], label));
  linha.appendChild(criarElemento("strong", [], valor || "Nao informado"));
  return linha;
}

function criarEtapas(status) {
  const etapaAtual = String(status || "").toLowerCase();
  const etapas = [
    { id: "preparada-localmente", label: "Formulario preenchido" },
    { id: "analise", label: "Analise da ONG" },
    { id: "retorno", label: "Retorno da ONG" },
  ];

  const etapaAtiva =
    etapaAtual === "aprovada" || etapaAtual === "recusada" || etapaAtual === "cancelada"
      ? 3
      : etapaAtual === "analise" || etapaAtual === "enviada"
        ? 2
        : 1;

  const container = criarElemento("ol", ["processo-adocao-etapas"]);

  etapas.forEach((etapa, index) => {
    const item = criarElemento("li", [], etapa.label);
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
  titulo.appendChild(criarElemento("h2", [], pet.nome || "Pet sem nome"));
  titulo.appendChild(
    criarElemento(
      "p",
      [],
      [pet.especie, pet.porte, pet.ong].filter(Boolean).join(" | ") || "Detalhes do pet nao informados"
    )
  );
  topo.appendChild(titulo);

  const statusTag = criarElemento("span", ["processo-adocao-status"], formatarStatus(status));
  topo.appendChild(statusTag);
  card.appendChild(topo);

  card.appendChild(criarEtapas(status));

  const detalhes = criarElemento("div", ["processo-adocao-detalhes"]);
  detalhes.appendChild(criarLinhaInfo("Adotante", adotante.nome || respostas.nome));
  detalhes.appendChild(criarLinhaInfo("Telefone", adotante.telefone || respostas.telefone));
  detalhes.appendChild(criarLinhaInfo("Cidade", adotante.cidade || respostas.cidade));
  detalhes.appendChild(criarLinhaInfo("Moradia", respostas.moradia));
  card.appendChild(detalhes);

  return card;
}

function renderizarProcessos() {
  if (!lista) return;

  const usuario = obterUsuarioLogado();

  if (!usuario) {
    if (resumo) resumo.textContent = "Entre na sua conta para acompanhar seus processos.";
    renderizarAviso("Entre na sua conta para ver seus processos de adocao.");
    return;
  }

  const solicitacoes = lerJsonLocal(STORAGE_KEY, []);
  const processos = Array.isArray(solicitacoes)
    ? solicitacoes
      .filter((solicitacao) => pertenceAoUsuario(solicitacao, usuario))
      .sort((a, b) => new Date(b.data_solicitacao || 0) - new Date(a.data_solicitacao || 0))
    : [];

  lista.innerHTML = "";

  if (processos.length === 0) {
    if (resumo) resumo.textContent = "Nenhuma solicitacao iniciada nesta conta.";
    renderizarAviso("Voce ainda nao iniciou nenhum processo de adocao.");
    return;
  }

  if (resumo) {
    resumo.textContent = `${processos.length} processo${processos.length > 1 ? "s" : ""} de adocao encontrado${processos.length > 1 ? "s" : ""}.`;
  }

  processos.forEach((solicitacao) => {
    lista.appendChild(criarCardProcesso(solicitacao));
  });
}

document.addEventListener("DOMContentLoaded", renderizarProcessos);
window.addEventListener("solicitacaoAdocaoCriada", renderizarProcessos);
