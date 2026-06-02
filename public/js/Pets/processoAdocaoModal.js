import { ModalPadrao } from "../modalPadrao.js";
import { MensagemFeedback } from "../formularios/mensagemFeedback.js";

const API_BASE = "http://localhost:6789";
const STORAGE_KEY = "solicitacoesAdocao";

let modalAdocao = null;
let elementos = null;

const estado = {
  etapa: 1,
  pet: null,
  usuario: null,
  carregandoPerfil: false,
  enviando: false,
  enviado: false,
  bloqueado: false,
  solicitacaoExistente: null,
  form: criarFormInicial(),
};

function criarFormInicial() {
  return {
    nome: "",
    idade: "",
    telefone: "",
    email: "",
    cidade: "",
    moradia: "Casa",
    possuiAnimais: "Sim",
    possuiCriancas: "Nao",
    motivacao: "Dar um lar",
    motivacaoOutro: "",
    experiencia: "Ja teve pets",
    experienciaTexto: "",
    apoioFamilia: "Sim",
    rotina: "Algumas horas",
    financeiro: "Sim",
    ambiente: "Sim",
    observacoes: "",
    aceitouTermo: false,
  };
}

export function abrirModalAdocao(pet) {
  garantirModal();

  estado.etapa = 1;
  estado.pet = pet;
  estado.usuario = lerUsuarioLocal();
  estado.carregandoPerfil = false;
  estado.enviando = false;
  estado.enviado = false;
  estado.bloqueado = false;
  estado.solicitacaoExistente = null;
  estado.form = criarFormInicial();

  preencherComUsuario(estado.usuario);
  estado.solicitacaoExistente = buscarSolicitacaoExistente();
  estado.bloqueado = Boolean(estado.solicitacaoExistente);
  renderizarModal();
  modalAdocao.abrir();

  if (!estado.bloqueado) {
    buscarPerfilAtualizado();
  }
}

function garantirModal() {
  if (modalAdocao && elementos) return;

  let fundo = document.getElementById("fundoProcessoAdocao");

  if (!fundo) {
    fundo = document.createElement("div");
    fundo.id = "fundoProcessoAdocao";
    fundo.className = "fundoModal escondido";
    fundo.innerHTML = `
      <section class="modal processo-adocao-modal" role="dialog" aria-modal="true" aria-labelledby="adocaoTitulo">
        <div class="adocao-modal-topo">
          <div class="adocao-pet-resumo">
            <div class="adocao-pet-foto" aria-hidden="true"></div>
            <div>
              <p class="adocao-etapa-label">Processo de ado&ccedil;&atilde;o</p>
              <h2 id="adocaoTitulo"></h2>
              <p class="adocao-pet-meta"></p>
            </div>
          </div>
          <button type="button" class="fechar-modal adocao-fechar" aria-label="Fechar processo de ado&ccedil;&atilde;o" title="Fechar">
            <svg viewBox="0 -960 960 960" aria-hidden="true">
              <path d="m287-216-69-71 192-193-192-195 69-71 194 195 192-195 69 71-192 195 192 193-69 71-192-195-194 195Z"></path>
            </svg>
          </button>
        </div>

        <div class="adocao-progresso" aria-hidden="true">
          <div class="adocao-progresso-barra"></div>
        </div>
        <p class="adocao-status"></p>

        <div class="adocao-modal-corpo"></div>
        <div class="adocao-modal-rodape"></div>
      </section>
    `;
    document.body.appendChild(fundo);
  }

  modalAdocao = new ModalPadrao(fundo);
  elementos = {
    fundo,
    titulo: fundo.querySelector("#adocaoTitulo"),
    foto: fundo.querySelector(".adocao-pet-foto"),
    meta: fundo.querySelector(".adocao-pet-meta"),
    status: fundo.querySelector(".adocao-status"),
    progresso: fundo.querySelector(".adocao-progresso-barra"),
    corpo: fundo.querySelector(".adocao-modal-corpo"),
    rodape: fundo.querySelector(".adocao-modal-rodape"),
  };

  fundo.addEventListener("click", lidarComClique);
  fundo.addEventListener("input", lidarComInput);
  fundo.addEventListener("change", lidarComChange);
}

function renderizarModal() {
  const pet = estado.pet || {};
  const etapaAtual = estado.enviado || estado.bloqueado ? 3 : estado.etapa;
  const progresso = estado.enviado || estado.bloqueado ? 100 : etapaAtual * 33.333;

  elementos.titulo.textContent = pet.nome || "Pet escolhido";
  elementos.foto.style.backgroundImage = `url("${pet.foto || "/public/img/fotos/dog1.jpg"}")`;
  elementos.meta.textContent = montarMetaPet(pet);
  elementos.progresso.style.width = `${progresso}%`;
  elementos.status.innerHTML = estado.bloqueado
    ? "Solicita&ccedil;&atilde;o j&aacute; enviada"
    : estado.enviado
    ? "Solicita&ccedil;&atilde;o preparada"
    : `Etapa ${estado.etapa} de 3${estado.carregandoPerfil ? " - atualizando dados..." : ""}`;

  if (estado.bloqueado) {
    elementos.corpo.innerHTML = renderizarBloqueio();
  } else if (estado.enviado) {
    elementos.corpo.innerHTML = renderizarSucesso();
  } else if (estado.etapa === 1) {
    elementos.corpo.innerHTML = renderizarEtapaDados();
  } else if (estado.etapa === 2) {
    elementos.corpo.innerHTML = renderizarEtapaPerfil();
  } else {
    elementos.corpo.innerHTML = renderizarEtapaRevisao();
  }

  elementos.rodape.innerHTML = renderizarRodape();
}

function renderizarEtapaDados() {
  return `
    <div class="adocao-card">
      <h3>Dados b&aacute;sicos</h3>
      <p>Preencha ou revise os dados que ser&atilde;o enviados para a ONG conhecer melhor seu perfil.</p>

      <div class="adocao-grid dois">
        ${campoTexto("Nome completo", "nome", "Digite seu nome")}
        ${campoTexto("Idade", "idade", "22", "number")}
      </div>

      <div class="adocao-grid dois">
        ${campoTexto("Telefone", "telefone", "(16) 99999-9999", "tel")}
        ${campoTexto("E-mail", "email", "seuemail@exemplo.com", "email")}
      </div>

      ${campoTexto("Cidade", "cidade", "Digite sua cidade")}

      <div class="adocao-pergunta">
        <h4>Tipo de moradia</h4>
        <div class="adocao-opcoes">
          ${opcao("Casa", "moradia", "Casa")}
          ${opcao("Apartamento", "moradia", "Apartamento")}
        </div>
      </div>

      <div class="adocao-grid dois">
        <div class="adocao-pergunta">
          <h4>Possui outros animais?</h4>
          <div class="adocao-opcoes">
            ${opcao("Sim", "possuiAnimais", "Sim")}
            ${opcao("N&atilde;o", "possuiAnimais", "Nao")}
          </div>
        </div>
        <div class="adocao-pergunta">
          <h4>Possui crian&ccedil;as?</h4>
          <div class="adocao-opcoes">
            ${opcao("Sim", "possuiCriancas", "Sim")}
            ${opcao("N&atilde;o", "possuiCriancas", "Nao")}
          </div>
        </div>
      </div>
    </div>

    <div class="adocao-card compacto">
      <h3>Pr&oacute;ximas etapas</h3>
      <ol class="adocao-timeline">
        <li>Question&aacute;rio emocional</li>
        <li>Revis&atilde;o da solicita&ccedil;&atilde;o</li>
      </ol>
    </div>
  `;
}

function renderizarEtapaPerfil() {
  const mostrarMotivoOutro = estado.form.motivacao === "Outro";
  const mostrarExperiencia = estado.form.experiencia === "Ja teve pets";

  return `
    <div class="adocao-card">
      <h3>Question&aacute;rio emocional</h3>
      <p>Essas respostas ajudam a ONG a entender sua rotina e preparar uma ado&ccedil;&atilde;o mais segura.</p>

      <div class="adocao-pergunta">
        <h4>Qual o principal motivo da ado&ccedil;&atilde;o?</h4>
        <div class="adocao-opcoes grade">
          ${opcao("Companhia", "motivacao", "Companhia")}
          ${opcao("Dar um lar", "motivacao", "Dar um lar")}
          ${opcao("Fam&iacute;lia", "motivacao", "Familia")}
          ${opcao("Cresci com pets", "motivacao", "Cresci com pets")}
          ${opcao("Outro", "motivacao", "Outro")}
        </div>
        ${mostrarMotivoOutro ? campoArea("Conte seu motivo", "motivacaoOutro", "Escreva rapidamente o motivo da ado&ccedil;&atilde;o...") : ""}
      </div>

      <div class="adocao-pergunta">
        <h4>Voc&ecirc; j&aacute; teve pets antes?</h4>
        <div class="adocao-opcoes">
          ${opcao("Sim", "experiencia", "Ja teve pets")}
          ${opcao("N&atilde;o", "experiencia", "Primeiro pet")}
        </div>
        ${mostrarExperiencia ? campoArea("Conte sua experi&ecirc;ncia", "experienciaTexto", "Compartilhe um pouco da sua experi&ecirc;ncia...") : ""}
      </div>

      <div class="adocao-grid dois">
        <div class="adocao-pergunta">
          <h4>Todos da casa concordam?</h4>
          <div class="adocao-opcoes coluna">
            ${opcao("Sim", "apoioFamilia", "Sim")}
            ${opcao("Ainda estou conversando", "apoioFamilia", "Conversando")}
            ${opcao("N&atilde;o", "apoioFamilia", "Nao")}
          </div>
        </div>

        <div class="adocao-pergunta">
          <h4>Quanto tempo o pet ficar&aacute; sozinho?</h4>
          <div class="adocao-opcoes coluna">
            ${opcao("Quase nunca", "rotina", "Quase nunca")}
            ${opcao("Algumas horas", "rotina", "Algumas horas")}
            ${opcao("Muito tempo", "rotina", "Muito tempo")}
          </div>
        </div>
      </div>

      <div class="adocao-grid dois">
        <div class="adocao-pergunta">
          <h4>Condi&ccedil;&otilde;es para alimenta&ccedil;&atilde;o, vacinas e consultas?</h4>
          <div class="adocao-opcoes coluna">
            ${opcao("Sim", "financeiro", "Sim")}
            ${opcao("Parcialmente", "financeiro", "Parcialmente")}
            ${opcao("N&atilde;o", "financeiro", "Nao")}
          </div>
        </div>

        <div class="adocao-pergunta">
          <h4>O pet ter&aacute; acesso seguro ao ambiente?</h4>
          <div class="adocao-opcoes coluna">
            ${opcao("Sim", "ambiente", "Sim")}
            ${opcao("Parcialmente", "ambiente", "Parcialmente")}
          </div>
        </div>
      </div>

      ${campoArea("Observa&ccedil;&otilde;es para a ONG", "observacoes", "Algo importante sobre sua rotina, casa ou o pet escolhido?")}
    </div>
  `;
}

function renderizarEtapaRevisao() {
  return `
    <div class="adocao-card">
      <h3>Pet escolhido</h3>
      <div class="adocao-revisao-pet">
        <img src="${escapar(estado.pet?.foto || "")}" alt="Foto de ${escapar(estado.pet?.nome || "pet")}">
        <div>
          <strong>${escapar(estado.pet?.nome || "Pet escolhido")}</strong>
          <span>${escapar(montarMetaPet(estado.pet || {}))}</span>
        </div>
      </div>
    </div>

    <div class="adocao-grid dois">
      <div class="adocao-card">
        <div class="adocao-card-topo">
          <h3>Seus dados</h3>
          <button type="button" data-action="editar-dados">Editar</button>
        </div>
        ${linhaInfo("Nome", estado.form.nome)}
        ${linhaInfo("Cidade", estado.form.cidade)}
        ${linhaInfo("Telefone", estado.form.telefone)}
        ${linhaInfo("Moradia", estado.form.moradia)}
        ${linhaInfo("Outros animais", estado.form.possuiAnimais)}
        ${linhaInfo("Possui crian&ccedil;as", estado.form.possuiCriancas)}
      </div>

      <div class="adocao-card">
        <div class="adocao-card-topo">
          <h3>Perfil emocional</h3>
          <button type="button" data-action="editar-perfil">Editar</button>
        </div>
        ${linhaInfo("Motivo", estado.form.motivacao === "Outro" ? estado.form.motivacaoOutro : estado.form.motivacao)}
        ${linhaInfo("Experi&ecirc;ncia", estado.form.experiencia)}
        ${linhaInfo("Apoio da casa", estado.form.apoioFamilia)}
        ${linhaInfo("Rotina", estado.form.rotina)}
        ${linhaInfo("Financeiro", estado.form.financeiro)}
        ${linhaInfo("Ambiente", estado.form.ambiente)}
      </div>
    </div>

    <label class="adocao-termo">
      <input type="checkbox" data-field="aceitouTermo" ${estado.form.aceitouTermo ? "checked" : ""}>
      <span>Declaro que as informa&ccedil;&otilde;es fornecidas s&atilde;o verdadeiras e que estou ciente das responsabilidades envolvidas na ado&ccedil;&atilde;o.</span>
    </label>
  `;
}

function renderizarSucesso() {
  return `
    <div class="adocao-sucesso">
      <div class="adocao-sucesso-icone" aria-hidden="true">OK</div>
      <h3>Solicita&ccedil;&atilde;o preparada!</h3>
      <p>Os dados foram preenchidos e salvos localmente no site. Quando a rota de ado&ccedil;&atilde;o existir na API, o mesmo payload j&aacute; pode ser enviado para o banco.</p>
    </div>
  `;
}

function renderizarBloqueio() {
  const petNome = escapar(estado.pet?.nome || "este pet");
  const dataEnvio = formatarDataSolicitacao(estado.solicitacaoExistente?.data_solicitacao);
  const complementoData = dataEnvio ? ` Solicita&ccedil;&atilde;o salva em ${dataEnvio}.` : "";

  return `
    <div class="adocao-sucesso adocao-bloqueio">
      <div class="adocao-sucesso-icone" aria-hidden="true">!</div>
      <h3>Voc&ecirc; j&aacute; enviou essa solicita&ccedil;&atilde;o</h3>
      <p>J&aacute; existe uma solicita&ccedil;&atilde;o de ado&ccedil;&atilde;o para ${petNome} salva neste navegador.${complementoData} Para evitar duplicidade, o envio fica bloqueado.</p>
    </div>
  `;
}

function renderizarRodape() {
  if (estado.bloqueado) {
    return `<button type="button" class="buttonRosa adocao-botao-principal" data-action="fechar-bloqueio">Entendi</button>`;
  }

  if (estado.enviado) {
    return `<button type="button" class="buttonRosa adocao-botao-principal" data-action="fechar-sucesso">Concluir</button>`;
  }

  if (estado.etapa === 1) {
    return `
      <button type="button" class="adocao-botao-secundario" data-action="cancelar">Cancelar</button>
      <button type="button" class="buttonRosa adocao-botao-principal" data-action="proximo">Pr&oacute;ximo</button>
    `;
  }

  if (estado.etapa === 2) {
    return `
      <button type="button" class="adocao-botao-secundario" data-action="voltar">Voltar</button>
      <button type="button" class="buttonRosa adocao-botao-principal" data-action="proximo">Continuar</button>
    `;
  }

  return `
    <button type="button" class="adocao-botao-secundario" data-action="voltar">Voltar</button>
    <button type="button" class="buttonRosa adocao-botao-principal" data-action="enviar" ${estado.enviando ? "disabled" : ""}>
      ${estado.enviando ? "Preparando..." : "Enviar solicita&ccedil;&atilde;o"}
    </button>
  `;
}

function campoTexto(label, field, placeholder = "", type = "text") {
  return `
    <label class="adocao-campo">
      <span>${label}</span>
      <input type="${type}" data-field="${field}" value="${escapar(estado.form[field])}" placeholder="${placeholder}">
    </label>
  `;
}

function campoArea(label, field, placeholder = "") {
  return `
    <label class="adocao-campo adocao-area">
      <span>${label}</span>
      <textarea data-field="${field}" placeholder="${placeholder}">${escapar(estado.form[field])}</textarea>
    </label>
  `;
}

function opcao(label, field, value) {
  const selecionado = estado.form[field] === value;
  return `
    <button type="button" class="adocao-opcao ${selecionado ? "selecionado" : ""}" data-option-field="${field}" data-option-value="${escapar(value)}" aria-pressed="${selecionado}">
      ${label}
    </button>
  `;
}

function linhaInfo(label, value) {
  return `
    <div class="adocao-info-linha">
      <span>${label}</span>
      <strong>${escapar(valorExibicao(value))}</strong>
    </div>
  `;
}

function lidarComClique(event) {
  const opcaoClicada = event.target.closest("[data-option-field]");
  if (opcaoClicada) {
    estado.form[opcaoClicada.dataset.optionField] = opcaoClicada.dataset.optionValue;
    renderizarModal();
    return;
  }

  const acao = event.target.closest("[data-action]")?.dataset.action;
  if (!acao) return;

  if (acao === "cancelar") {
    modalAdocao.fechar();
    return;
  }

  if (acao === "voltar") {
    estado.etapa = Math.max(1, estado.etapa - 1);
    renderizarModal();
    return;
  }

  if (acao === "proximo") {
    irParaProximaEtapa();
    return;
  }

  if (acao === "editar-dados") {
    estado.etapa = 1;
    renderizarModal();
    return;
  }

  if (acao === "editar-perfil") {
    estado.etapa = 2;
    renderizarModal();
    return;
  }

  if (acao === "enviar") {
    enviarSolicitacao();
    return;
  }

  if (acao === "fechar-sucesso") {
    modalAdocao.fechar();
    return;
  }

  if (acao === "fechar-bloqueio") {
    modalAdocao.fechar();
  }
}

function lidarComInput(event) {
  const field = event.target.dataset.field;
  if (!field || event.target.type === "checkbox") return;

  estado.form[field] = event.target.value;
}

function lidarComChange(event) {
  const field = event.target.dataset.field;
  if (!field) return;

  if (event.target.type === "checkbox") {
    estado.form[field] = event.target.checked;
    renderizarModal();
    return;
  }

  estado.form[field] = event.target.value;
}

function irParaProximaEtapa() {
  const erro = validarEtapa(estado.etapa);
  if (erro) {
    notificar(erro, "erro");
    return;
  }

  estado.etapa = Math.min(3, estado.etapa + 1);
  renderizarModal();
}

function validarEtapa(etapa) {
  if (etapa === 1) {
    const obrigatorios = ["nome", "idade", "telefone", "cidade", "moradia", "possuiAnimais", "possuiCriancas"];
    const incompleto = obrigatorios.some((campo) => !String(estado.form[campo] || "").trim());
    return incompleto ? "Preencha os dados basicos antes de continuar." : "";
  }

  if (etapa === 2) {
    const obrigatorios = ["motivacao", "experiencia", "apoioFamilia", "rotina", "financeiro", "ambiente"];
    const incompleto = obrigatorios.some((campo) => !String(estado.form[campo] || "").trim());
    return incompleto ? "Responda o questionario antes de revisar." : "";
  }

  if (!estado.form.aceitouTermo) {
    return "Confirme a responsabilidade pela adocao antes de enviar.";
  }

  return "";
}

async function enviarSolicitacao() {
  const erro = validarEtapa(3);
  if (erro) {
    notificar(erro, "erro");
    return;
  }

  estado.enviando = true;
  renderizarModal();

  const payload = montarPayloadSolicitacao();
  const solicitacaoExistente = buscarSolicitacaoExistente(payload);

  if (solicitacaoExistente) {
    estado.enviando = false;
    estado.bloqueado = true;
    estado.solicitacaoExistente = solicitacaoExistente;
    renderizarModal();
    notificar("Voce ja enviou uma solicitacao para esse pet.", "erro");
    return;
  }

  salvarSolicitacaoLocal(payload);
  window.ultimaSolicitacaoAdocao = payload;

  await new Promise((resolve) => setTimeout(resolve, 650));

  estado.enviando = false;
  estado.enviado = true;
  renderizarModal();
  notificar("Solicitacao de adocao preparada com sucesso.", "sucesso");
}

function montarPayloadSolicitacao() {
  const usuarioId = obterIdUsuario(estado.usuario);
  const petId = estado.pet?.id || null;

  return {
    id: `adocao-${Date.now()}`,
    chave_solicitacao: criarChaveSolicitacao(usuarioId, estado.form.email, petId),
    origem: "site",
    status: "preparada-localmente",
    data_solicitacao: new Date().toISOString(),
    fk_idusuario: usuarioId || null,
    fk_idpet: petId,
    fk_idong: estado.pet?.idOng || null,
    pet: {
      id: estado.pet?.id || null,
      nome: estado.pet?.nome || "",
      foto: estado.pet?.foto || "",
      idade: converterIdadePet(estado.pet?.idade),
      especie: estado.pet?.especie || "",
      porte: estado.pet?.porte || "",
      ong: estado.pet?.ongNome || "",
    },
    adotante: {
      id: usuarioId || null,
      nome: estado.form.nome,
      idade: estado.form.idade,
      telefone: estado.form.telefone,
      email: estado.form.email,
      cidade: estado.form.cidade,
    },
    respostas: { ...estado.form },
  };
}

function salvarSolicitacaoLocal(payload) {
  const solicitacoes = lerJsonLocal(STORAGE_KEY, []);

  if (buscarSolicitacaoExistente(payload, solicitacoes)) return;

  solicitacoes.push(payload);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(solicitacoes));
  window.dispatchEvent(new CustomEvent("solicitacaoAdocaoCriada", { detail: payload }));
}

async function buscarPerfilAtualizado() {
  const idUsuario = obterIdUsuario(estado.usuario);
  if (!idUsuario) return;

  estado.carregandoPerfil = true;
  renderizarModal();

  try {
    const resposta = await fetch(`${API_BASE}/usuarios/perfil-comum/${idUsuario}`);
    if (!resposta.ok) return;

    const dados = await resposta.json();
    const perfil = dados.data || dados;

    estado.usuario = {
      ...estado.usuario,
      ...perfil,
    };

    preencherComUsuario(perfil);

    const solicitacaoExistente = buscarSolicitacaoExistente();
    if (solicitacaoExistente) {
      estado.bloqueado = true;
      estado.solicitacaoExistente = solicitacaoExistente;
    }
  } catch (erro) {
    console.warn("Nao foi possivel atualizar o perfil do usuario.", erro);
  } finally {
    estado.carregandoPerfil = false;
    renderizarModal();
  }
}

function preencherComUsuario(usuario) {
  if (!usuario) return;

  const endereco = usuario.endereco || {};
  const cidade = endereco.cidade || usuario.cidade || "";
  const idade = calcularIdade(usuario.data_nasc);

  preencherSeVazio("nome", usuario.nome);
  preencherSeVazio("telefone", usuario.telefone);
  preencherSeVazio("email", usuario.email);
  preencherSeVazio("cidade", cidade);
  preencherSeVazio("idade", idade);
}

function preencherSeVazio(campo, valor) {
  if (valor === undefined || valor === null || valor === "") return;
  if (String(estado.form[campo] || "").trim()) return;
  estado.form[campo] = String(valor);
}

function lerUsuarioLocal() {
  return lerJsonLocal("usuario", null);
}

function lerJsonLocal(chave, fallback) {
  try {
    const valor = localStorage.getItem(chave);
    return valor ? JSON.parse(valor) : fallback;
  } catch (erro) {
    return fallback;
  }
}

function obterIdUsuario(usuario) {
  return usuario?.id || usuario?.idusuario || null;
}

function buscarSolicitacaoExistente(payload = null, lista = null) {
  const solicitacoes = Array.isArray(lista) ? lista : lerJsonLocal(STORAGE_KEY, []);
  const usuarioId = payload?.fk_idusuario || obterIdUsuario(estado.usuario);
  const email = payload?.adotante?.email || estado.form.email || estado.usuario?.email || "";
  const petId = payload?.fk_idpet || estado.pet?.id;
  const chave = payload?.chave_solicitacao || criarChaveSolicitacao(usuarioId, email, petId);

  if (!petId || (!usuarioId && !email)) return null;

  return solicitacoes.find((solicitacao) => {
    const petSalvo = solicitacao.fk_idpet || solicitacao.pet?.id;
    const usuarioSalvo = solicitacao.fk_idusuario || solicitacao.adotante?.id;
    const emailSalvo = solicitacao.adotante?.email || solicitacao.respostas?.email || "";
    const chaveSalva =
      solicitacao.chave_solicitacao ||
      criarChaveSolicitacao(usuarioSalvo, emailSalvo, petSalvo);

    if (chave && chaveSalva === chave) return true;

    const mesmoPet = String(petSalvo || "") === String(petId || "");
    const mesmoUsuario = usuarioId && String(usuarioSalvo || "") === String(usuarioId);
    const mesmoEmail = normalizarEmail(emailSalvo) && normalizarEmail(emailSalvo) === normalizarEmail(email);

    return mesmoPet && (mesmoUsuario || mesmoEmail);
  }) || null;
}

function criarChaveSolicitacao(usuarioId, email, petId) {
  if (!petId) return "";

  const adotante = usuarioId
    ? `usuario:${usuarioId}`
    : `email:${normalizarEmail(email)}`;

  if (adotante === "email:") return "";

  return `${adotante}|pet:${petId}`;
}

function normalizarEmail(email) {
  return String(email || "").trim().toLowerCase();
}

function formatarDataSolicitacao(data) {
  if (!data) return "";

  const date = new Date(data);
  if (Number.isNaN(date.getTime())) return "";

  return date.toLocaleDateString("pt-BR");
}

function calcularIdade(dataNasc) {
  if (!dataNasc) return "";

  const nascimento = new Date(dataNasc);
  if (Number.isNaN(nascimento.getTime())) return "";

  const hoje = new Date();
  let idade = hoje.getFullYear() - nascimento.getFullYear();
  const aindaNaoFezAniversario =
    hoje.getMonth() < nascimento.getMonth() ||
    (hoje.getMonth() === nascimento.getMonth() && hoje.getDate() < nascimento.getDate());

  if (aindaNaoFezAniversario) idade -= 1;
  return idade > 0 ? idade : "";
}

function montarMetaPet(pet) {
  const partes = [
    converterIdadePet(pet.idade),
    pet.especie,
    pet.porte,
    pet.ongNome,
  ].filter(Boolean);

  return partes.join(" - ");
}

function converterIdadePet(meses) {
  const numero = Number(meses);
  if (!Number.isFinite(numero)) return meses || "";

  const anos = Math.floor(numero / 12);
  if (anos > 1) return `${anos} anos`;
  if (anos === 1) return "1 ano";
  return `${numero} meses`;
}

function valorExibicao(value) {
  if (value === "Nao") return "Nao";
  if (value === true) return "Sim";
  if (value === false) return "Nao";
  return value || "Nao informado";
}

function notificar(mensagem, tipo = "sucesso") {
  const alvo = document.getElementById("feedbackAdotar") || document.body;
  const feedback = new MensagemFeedback(mensagem, alvo);

  if (tipo === "erro") {
    feedback.feedbackError();
    return;
  }

  feedback.feedbackSucess();
}

function escapar(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
