const API_URL = "http://localhost:6789";
const STORAGE_DETALHE_KEY = "processoAdocaoSelecionado";
import { formatarIdade } from "../../../src/config/pets/idadePet.js";

const statusConfig = {
  nova: {
    label: "Nova",
    badgeClass: "processos-adocao-badge--analise",
    etapaAtual: 1,
    mensagem: "Sua solicitação foi enviada para a ONG. Aguarde a primeira análise do seu pedido.",
  },
  analise: {
    label: "Em análise",
    badgeClass: "processos-adocao-badge--analise",
    etapaAtual: 2,
    mensagem:
      "A ONG está analisando seu perfil para verificar se o pet combina com sua rotina e estrutura.",
  },
  entrevista: {
    label: "Entrevista agendada",
    badgeClass: "processos-adocao-badge--entrevista",
    etapaAtual: 3,
    mensagem:
      "Sua análise avançou para a etapa de entrevista. Fique atento aos próximos contatos da ONG.",
  },
  visita: {
    label: "Visita",
    badgeClass: "processos-adocao-badge--entrevista",
    etapaAtual: 4,
    mensagem: "A próxima etapa é a visita ou encontro com a ONG e com o pet.",
  },
  aprovado: {
    label: "Aprovado",
    badgeClass: "processos-adocao-badge--aprovado",
    etapaAtual: 5,
    mensagem:
      "Parabéns! Sua adoção foi aprovada. Agora a ONG deve orientar os últimos detalhes.",
  },
  reprovado: {
    label: "Reprovado",
    badgeClass: "processos-adocao-badge--analise",
    etapaAtual: 2,
    mensagem:
      "A solicitação não foi aprovada neste momento. Você pode conversar com a ONG para entender melhor o motivo.",
  },
  finalizado: {
    label: "Finalizado",
    badgeClass: "processos-adocao-badge--aprovado",
    etapaAtual: 5,
    mensagem: "Processo finalizado. Confira com a ONG qualquer orientação final sobre a adoção.",
  },
};

document.addEventListener("DOMContentLoaded", () => {
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

  function lerJsonSessao(chave) {
    try {
      const valor = sessionStorage.getItem(chave);
      return valor ? JSON.parse(valor) : null;
    } catch (erro) {
      return null;
    }
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

  function montarEnderecoOng(solicitacao) {
    const partes = [
      solicitacao.ong_rua,
      solicitacao.ong_numero,
      solicitacao.ong_bairro,
      solicitacao.ong_cidade,
      solicitacao.ong_estado,
    ].filter(Boolean);

    return partes.join(", ") || montarLocalizacao(solicitacao);
  }

  function normalizarProcesso(solicitacao) {
    return {
      id: solicitacao.idsolicitacao || solicitacao.id,
      petNome: solicitacao.pet || solicitacao.pet_nome || "Pet sem nome",
      dataSolicitacao: solicitacao.data_solicitacao,
      ongNome: solicitacao.ong || solicitacao.ong_nome || "ONG não informada",
      localizacao: montarLocalizacao(solicitacao),
      status: normalizarStatus(solicitacao.status),
      foto: converterFoto(solicitacao.pet_foto || solicitacao.fotos),
      pet: {
        idade: formatarIdade(solicitacao.pet_idade),
        genero: solicitacao.pet_sexo || solicitacao.sexopet || "Não informado",
        raca: solicitacao.pet_raca || solicitacao.raca || "Não informado",
        porte: solicitacao.pet_porte || solicitacao.porte || "Não informado",
        especie: solicitacao.pet_especie || solicitacao.especie || "Não informado",
      },
      ong: {
        id: solicitacao.fk_idong,
        email: solicitacao.ong_email || "E-mail não informado",
        telefone: solicitacao.ong_telefone || "Telefone não informado",
        endereco: montarEnderecoOng(solicitacao),
        fotoOng: solicitacao.ong_foto || "/public/img/fotos/ong1.jpg",
        perfilUrl: solicitacao.fk_idong
          ? `/src/views/ongPage.html?id=${encodeURIComponent(solicitacao.fk_idong)}`
          : "/src/views/ongs.html",
      },
    };
  }

  async function buscarProcessoPorId(id) {
    const response = await fetch(`${API_URL}/solicitacoesadocao/${id}`);
    const data = await response.json().catch(() => []);

    if (!response.ok) {
      throw new Error(data.message || "Erro ao buscar detalhes do processo.");
    }

    const item = Array.isArray(data) ? data[0] : data;
    if (!item) throw new Error("Processo de adoção não encontrado.");

    return normalizarProcesso(item);
  }

  function obterGeneroIcone(genero) {
    const valor = normalizarTexto(genero);
    if (valor.includes("femea") || valor.includes("feminino")) return "♀";
    if (valor.includes("macho") || valor.includes("masculino")) return "♂";
    return "●";
  }

  function montarTimeline(processo) {
    const config = statusConfig[processo.status] || statusConfig.analise;
    const dataTexto = processo.dataSolicitacao
      ? `Realizada com sucesso em ${new Date(processo.dataSolicitacao).toLocaleDateString("pt-BR")}`
      : "Sua solicitação foi enviada com sucesso.";

    return [
      {
        titulo: "Solicitação enviada",
        descricao: dataTexto,
        estado: config.etapaAtual >= 1 ? (config.etapaAtual === 1 ? "atual" : "concluida") : "pendente",
      },
      {
        titulo: "Em análise pela ONG",
        descricao: "A ONG está revisando seu formulário.",
        estado: config.etapaAtual >= 2 ? (config.etapaAtual === 2 ? "atual" : "concluida") : "pendente",
      },
      {
        titulo: "Entrevista agendada",
        descricao: "Próximo passo após a análise positiva.",
        estado: config.etapaAtual >= 3 ? (config.etapaAtual === 3 ? "atual" : "concluida") : "pendente",
      },
      {
        titulo: "Visita à ONG",
        descricao: `Conheça ${processo.petNome} pessoalmente.`,
        estado: config.etapaAtual >= 4 ? (config.etapaAtual === 4 ? "atual" : "concluida") : "pendente",
      },
      {
        titulo: "Finalização",
        descricao: "Assinatura do termo de adoção responsável.",
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
        <a href="/src/views/processosAdocao.html" class="link">Meus processos de adoção</a>
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
    if (idade) idade.textContent = processo.pet.idade;
    if (genero) genero.textContent = processo.pet.genero;
    if (raca) raca.textContent = processo.pet.raca;
    if (generoIcone) generoIcone.textContent = obterGeneroIcone(processo.pet.genero);

    if (tags) {
      tags.innerHTML = "";

      [processo.pet.especie, processo.pet.porte]
        .filter((tag) => tag && tag !== "Não informado")
        .forEach((tag) => {
          const item = document.createElement("li");
          item.textContent = tag;
          tags.appendChild(item);
        });

      if (!tags.children.length) {
        const item = document.createElement("li");
        item.textContent = "Perfil em análise";
        tags.appendChild(item);
      }
    }
  }

  function renderizarOng(processo) {
    const nome = document.getElementById("detalhesProcessoOngTitulo");
    const local = document.getElementById("detalhesProcessoOngLocal");
    const email = document.getElementById("detalhesProcessoOngEmail");
    const telefone = document.getElementById("detalhesProcessoOngTelefone");
    const endereco = document.getElementById("detalhesProcessoOngEndereco");
    const link = document.getElementById("detalhesProcessoPerfilOng");
    const foto = document.getElementById("detalhes-processo-ong-icone");

    if (nome) nome.textContent = processo.ongNome;
    if (local) local.textContent = processo.localizacao;
    if (email) email.textContent = processo.ong.email;
    if (telefone) telefone.textContent = processo.ong.telefone;
    if (endereco) endereco.textContent = processo.ong.endereco;
    if (link) link.href = processo.ong.perfilUrl;
    if (foto) foto.style.backgroundImage = `url('${processo.ong.fotoOng}')`;
  
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

  function renderizarErro(mensagem) {
    const main = document.querySelector(".detalhes-processo-page");
    if (!main) return;

    main.innerHTML = `
      <section class="detalhes-processo-card">
        <h1 class="azul">Não foi possível carregar o processo</h1>
        <p>${escaparHtml(mensagem)}</p>
        <a class="detalhes-processo-botao-ong" href="/src/views/processosAdocao.html">Voltar para meus processos</a>
      </section>
    `;
  }

  async function init() {
    const params = new URLSearchParams(window.location.search);
    const idUrl = params.get("id");
    const processoSessao = lerJsonSessao(STORAGE_DETALHE_KEY);

    try {
      let processo;

      if (idUrl) {
        processo = await buscarProcessoPorId(idUrl);
      } else if (processoSessao?.idsolicitacao || processoSessao?.id) {
        processo = normalizarProcesso(processoSessao);
      } else {
        throw new Error("Nenhum processo foi selecionado.");
      }

      renderizarBreadcrumb(processo);
      renderizarPet(processo);
      renderizarOng(processo);
      renderizarStatusAtual(processo);
      renderizarTimeline(processo);
      vincularVoltar();
    } catch (error) {
      console.error("Erro ao carregar detalhes do processo:", error);
      renderizarErro(error.message);
    }
  }

  init();
});
