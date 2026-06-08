const STORAGE_KEY = "solicitacoesAdocao";
const STORAGE_DETALHE_KEY = "processoAdocaoSelecionado";

const processosFallback = [
  {
    id: "1",
    petNome: "Pipoca",
    dataSolicitacao: "2023-10-12",
    ongNome: "ONG Patinhas Felizes",
    localizacao: "Sao Paulo, SP",
    status: "analise",
    foto: "/public/img/fotos/cat1.jpg",
    pet: {
      idade: "3 meses",
      genero: "Femea",
      raca: "SRD",
      tags: ["Docil", "Brincalhona", "Castracao pendente"],
    },
    ong: {
      email: "contato@patinhasfelizes.org",
      telefone: "(11) 98765-4321",
      endereco: "Vila Mariana, Sao Paulo",
      perfilUrl: "/src/views/ongPage.html",
    },
  },
  {
    id: "2",
    petNome: "Mel",
    dataSolicitacao: "2023-10-05",
    ongNome: "Abrigo Coracao Animal",
    localizacao: "Curitiba, PR",
    status: "entrevista",
    foto: "/public/img/fotos/cat2.jpg",
    pet: {
      idade: "1 ano",
      genero: "Femea",
      raca: "Mestica",
      tags: ["Calma", "Carinhosa", "Vacinada"],
    },
    ong: {
      email: "adocao@coracaoanimal.org",
      telefone: "(41) 99888-7711",
      endereco: "Batel, Curitiba",
      perfilUrl: "/src/views/ongPage.html",
    },
  },
  {
    id: "3",
    petNome: "Thor",
    dataSolicitacao: "2023-09-28",
    ongNome: "ONG Patas Conscientes",
    localizacao: "Sao Paulo, SP",
    status: "aprovado",
    foto: "/public/img/fotos/dog1.jpg",
    pet: {
      idade: "2 anos",
      genero: "Macho",
      raca: "Labrador",
      tags: ["Sociavel", "Adestrado", "Castrado"],
    },
    ong: {
      email: "contato@patasconscientes.org",
      telefone: "(11) 97777-1010",
      endereco: "Pinheiros, Sao Paulo",
      perfilUrl: "/src/views/ongPage.html",
    },
  },
];

const statusConfig = {
  analise: {
    label: "Em analise",
    badgeClass: "processos-adocao-badge--entrevista",
    etapaAtual: 2,
    mensagem:
      "Nossa equipe de voluntarios esta analisando seu perfil para garantir uma adocao segura. Esse processo costuma levar de 3 a 5 dias uteis. Mantenha seu celular por perto, pois podemos entrar em contato para validar algumas informacoes.",
  },
  entrevista: {
    label: "Entrevista agendada",
    badgeClass: "processos-adocao-badge--analise",
    etapaAtual: 3,
    mensagem:
      "Sua analise foi concluida e a entrevista e o proximo passo. Separe um horario tranquilo para conversar com a equipe e tirar duvidas sobre rotina, espaco e cuidados com o pet.",
  },
  aprovado: {
    label: "Aprovado",
    badgeClass: "processos-adocao-badge--aprovado",
    etapaAtual: 5,
    mensagem:
      "Parabens! Sua adocao foi aprovada. Agora seguimos para os ultimos detalhes, incluindo assinatura do termo e orientacoes finais para a chegada do pet no novo lar.",
  },
};

function lerJsonLocal(chave, fallback) {
  try {
    const valor = localStorage.getItem(chave);
    return valor ? JSON.parse(valor) : fallback;
  } catch (erro) {
    return fallback;
  }
}

function lerJsonSessao(chave, fallback) {
  try {
    const valor = sessionStorage.getItem(chave);
    return valor ? JSON.parse(valor) : fallback;
  } catch (erro) {
    return fallback;
  }
}

function normalizarStatus(status) {
  const valor = String(status || "").toLowerCase();

  if (["aprovado", "aprovada"].includes(valor)) return "aprovado";
  if (["entrevista", "entrevista-agendada", "agendada"].includes(valor)) return "entrevista";
  return "analise";
}

function obterLocalizacao(solicitacao) {
  return (
    solicitacao.localizacao ||
    solicitacao.pet?.localizacao ||
    solicitacao.pet?.cidade ||
    solicitacao.adotante?.cidade ||
    solicitacao.respostas?.cidade ||
    "Localizacao nao informada"
  );
}

function normalizarProcesso(solicitacao, indice = 0) {
  const pet = solicitacao.pet || {};
  const respostas = solicitacao.respostas || {};

  return {
    id: String(solicitacao.id || solicitacao.idSolicitacao || indice + 1),
    petNome: solicitacao.petNome || pet.nome || "Pet sem nome",
    dataSolicitacao: solicitacao.dataSolicitacao || solicitacao.data_solicitacao || "",
    ongNome: solicitacao.ongNome || pet.ong || solicitacao.ong?.nome || "ONG nao informada",
    localizacao: obterLocalizacao(solicitacao),
    status: normalizarStatus(solicitacao.status),
    foto: solicitacao.foto || pet.foto || "/public/img/fotos/dog1.jpg",
    pet: {
      idade: solicitacao.pet?.idade || pet.idade || "Nao informado",
      genero: solicitacao.pet?.genero || pet.genero || "Nao informado",
      raca: solicitacao.pet?.raca || pet.raca || pet.especie || "Nao informado",
      tags: Array.isArray(solicitacao.pet?.tags)
        ? solicitacao.pet.tags
        : [pet.porte, respostas.possuiAnimais === "Sim" ? "Possui outros animais" : "", respostas.moradia]
            .filter(Boolean)
            .slice(0, 3),
    },
    ong: {
      email: solicitacao.ong?.email || respostas.emailOng || "contato@ong.org",
      telefone: solicitacao.ong?.telefone || "(00) 00000-0000",
      endereco: solicitacao.ong?.endereco || obterLocalizacao(solicitacao),
      perfilUrl: solicitacao.ong?.perfilUrl || "/src/views/ongPage.html",
    },
  };
}

function carregarProcessos() {
  const dadosExternos = Array.isArray(window.processosAdocaoData) ? window.processosAdocaoData : null;
  const dadosLocais = lerJsonLocal(STORAGE_KEY, []);
  const origem = dadosExternos || (Array.isArray(dadosLocais) && dadosLocais.length > 0 ? dadosLocais : processosFallback);

  return origem.map(normalizarProcesso);
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

function obterGeneroIcone(genero) {
  const valor = String(genero || "").toLowerCase();
  if (valor.includes("f")) return "\u2640";
  if (valor.includes("m")) return "\u2642";
  return "\u25cf";
}

function montarTimeline(processo) {
  const config = statusConfig[processo.status] || statusConfig.analise;
  const dataTexto = processo.dataSolicitacao
    ? `Realizada com sucesso em ${new Date(processo.dataSolicitacao).toLocaleDateString("pt-BR")}`
    : "Sua solicitacao foi enviada com sucesso.";

  return [
    {
      titulo: "Solicitacao Enviada",
      descricao: dataTexto,
      estado: config.etapaAtual >= 1 ? (config.etapaAtual === 1 ? "atual" : "concluida") : "pendente",
    },
    {
      titulo: "Em Analise pela ONG",
      descricao: "Estamos revisando seu formulario. Aguarde nosso contato!",
      estado: config.etapaAtual >= 2 ? (config.etapaAtual === 2 ? "atual" : "concluida") : "pendente",
    },
    {
      titulo: "Entrevista Agendada",
      descricao: "Proximo passo apos a analise positiva.",
      estado: config.etapaAtual >= 3 ? (config.etapaAtual === 3 ? "atual" : "concluida") : "pendente",
    },
    {
      titulo: "Visita a ONG",
      descricao: `Conheca ${processo.petNome} pessoalmente!`,
      estado: config.etapaAtual >= 4 ? (config.etapaAtual === 4 ? "atual" : "concluida") : "pendente",
    },
    {
      titulo: "Finalizacao",
      descricao: "Assinatura do termo de adocao responsavel.",
      estado: config.etapaAtual >= 5 ? (config.etapaAtual === 5 ? "atual" : "concluida") : "pendente",
    },
  ];
}

function renderizarBreadcrumb(processo) {
  const caminho = document.querySelector(".caminho");
  if (!caminho) return;

  caminho.innerHTML = `
    <p>
      <a href="/index.html" class="link" title="Link que direciona para a pagina Inicial">Inicio</a>
      &gt;
      <a href="/src/views/processosAdocao.html" class="link">Meus processos de adocao</a>
      &gt;
      <span>Detalhes de ${escaparHtml(processo.petNome)}</span>
    </p>
  `;
}

function renderizarPet(processo) {
  const foto = document.getElementById("detalhesProcessoPetFoto");
  const nome = document.getElementById("detalhesProcessoPetNome");
  const idade = document.getElementById("detalhesProcessoPetIdade");
  const genero = document.getElementById("detalhesProcessoPetGenero");
  const raca = document.getElementById("detalhesProcessoPetRaca");
  const generoIcone = document.getElementById("detalhesProcessoPetGeneroIcone");
  const tags = document.getElementById("detalhesProcessoPetTags");

  if (foto) {
    foto.src = processo.foto;
    foto.alt = `Foto de ${processo.petNome}`;
  }

  if (nome) nome.textContent = processo.petNome;
  if (idade) idade.textContent = processo.pet.idade || "Nao informado";
  if (genero) genero.textContent = processo.pet.genero || "Nao informado";
  if (raca) raca.textContent = processo.pet.raca || "Nao informado";
  if (generoIcone) generoIcone.textContent = obterGeneroIcone(processo.pet.genero);

  if (tags) {
    tags.innerHTML = "";
    const listaTags = Array.isArray(processo.pet.tags) && processo.pet.tags.length > 0 ? processo.pet.tags : ["Perfil em analise"];

    listaTags.forEach((tag) => {
      const item = document.createElement("li");
      item.textContent = tag;
      tags.appendChild(item);
    });
  }
}

function renderizarOng(processo) {
  const nome = document.getElementById("detalhesProcessoOngTitulo");
  const local = document.getElementById("detalhesProcessoOngLocal");
  const email = document.getElementById("detalhesProcessoOngEmail");
  const telefone = document.getElementById("detalhesProcessoOngTelefone");
  const endereco = document.getElementById("detalhesProcessoOngEndereco");
  const link = document.getElementById("detalhesProcessoPerfilOng");

  if (nome) nome.textContent = processo.ongNome;
  if (local) local.textContent = processo.localizacao;
  if (email) email.textContent = processo.ong.email;
  if (telefone) telefone.textContent = processo.ong.telefone;
  if (endereco) endereco.textContent = processo.ong.endereco;
  if (link) link.href = processo.ong.perfilUrl || "/src/views/ongPage.html";
}

function renderizarStatusAtual(processo) {
  const badge = document.getElementById("detalhesProcessoBadge");
  const mensagem = document.getElementById("detalhesProcessoProximosPassos");
  const config = statusConfig[processo.status] || statusConfig.analise;

  if (badge) {
    badge.className = `processos-adocao-badge ${config.badgeClass}`;
    badge.textContent = config.label;
  }

  if (mensagem) {
    mensagem.textContent = config.mensagem;
  }
}

function renderizarTimeline(processo) {
  const timeline = document.getElementById("detalhesProcessoTimeline");
  if (!timeline) return;

  const etapas = montarTimeline(processo);
  timeline.innerHTML = "";

  etapas.forEach((etapa) => {
    const item = document.createElement("li");
    item.className = `detalhes-processo-etapa detalhes-processo-etapa--${etapa.estado}`;

    item.innerHTML = `
      <span class="detalhes-processo-etapa-icone" aria-hidden="true"></span>
      <div class="detalhes-processo-etapa-texto">
        <h3>${escaparHtml(etapa.titulo)}</h3>
        <p>${escaparHtml(etapa.descricao)}</p>
      </div>
    `;

    timeline.appendChild(item);
  });
}

function vincularVoltar() {
  const botao = document.getElementById("detalhesProcessoVoltar");
  if (!botao) return;

  botao.addEventListener("click", () => {
    if (window.history.length > 1) {
      window.history.back();
      return;
    }

    window.location.href = "/src/views/processosAdocao.html";
  });
}

function obterProcessoSelecionado(processos) {
  const params = new URLSearchParams(window.location.search);
  const idUrl = params.get("id");
  const processoSessao = lerJsonSessao(STORAGE_DETALHE_KEY, null);

  if (idUrl) {
    const porId = processos.find((processo) => String(processo.id) === String(idUrl));
    if (porId) return porId;
  }

  if (processoSessao && processoSessao.id) {
    const porSessao = processos.find((processo) => String(processo.id) === String(processoSessao.id));
    if (porSessao) return porSessao;
    return normalizarProcesso(processoSessao, 0);
  }

  return processos[0] || normalizarProcesso(processosFallback[0], 0);
}

function init() {
  const processos = carregarProcessos();
  const processo = obterProcessoSelecionado(processos);

  renderizarBreadcrumb(processo);
  renderizarPet(processo);
  renderizarOng(processo);
  renderizarStatusAtual(processo);
  renderizarTimeline(processo);
  vincularVoltar();
}

document.addEventListener("DOMContentLoaded", init);