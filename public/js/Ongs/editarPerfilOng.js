import { MensagemFeedback } from "../formularios/mensagemFeedback.js";

const API_URL = "http://localhost:6789";

document.addEventListener("DOMContentLoaded", () => {
  const botaoEditar = document.querySelector(".bttEditarOng");
  if (!botaoEditar) return;

  const estados = [
    "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT",
    "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO",
    "RR", "SC", "SP", "SE", "TO"
  ];

  let ongAtual = null;
  let valoresIniciais = null;

  const modal = criarModal();
  const form = modal.querySelector("#formEditarOng");
  const feedbackPai = modal.querySelector("#feedbackEditarOng");
  const botaoSalvar = modal.querySelector("#salvarEdicaoOng");
  const botaoFechar = modal.querySelector(".fechar-modal");
  const contador = modal.querySelector("#editarOngContagem");

  const campos = {
    nome: modal.querySelector("#editarOngNome"),
    telefone: modal.querySelector("#editarOngTelefone"),
    foto: modal.querySelector("#editarOngFoto"),
    banner: modal.querySelector("#editarOngBanner"),
    fotoPreview: modal.querySelector("#editarOngFotoPreview"),
    bannerPreview: modal.querySelector("#editarOngBannerPreview"),
    fotoNome: modal.querySelector("#editarOngFotoNome"),
    bannerNome: modal.querySelector("#editarOngBannerNome"),
    cep: modal.querySelector("#editarOngCep"),
    estado: modal.querySelector("#editarOngEstado"),
    cidade: modal.querySelector("#editarOngCidade"),
    rua: modal.querySelector("#editarOngRua"),
    bairro: modal.querySelector("#editarOngBairro"),
    numero: modal.querySelector("#editarOngNumero"),
    complemento: modal.querySelector("#editarOngComplemento"),
    descricao: modal.querySelector("#editarOngDescricao")
  };

  botaoEditar.addEventListener("click", abrirEdicaoOng);
  botaoFechar.addEventListener("click", fecharModal);
  modal.addEventListener("click", (event) => {
    if (event.target === modal) fecharModal();
  });

  form.addEventListener("input", () => {
    atualizarContador();
    controlarBotaoSalvar();
  });

  form.addEventListener("change", controlarBotaoSalvar);
  form.addEventListener("submit", salvarEdicaoOng);
  campos.foto.addEventListener("change", () => prepararPreviewArquivo("foto"));
  campos.banner.addEventListener("change", () => prepararPreviewArquivo("banner"));

  function criarModal() {
    const fundoModal = document.createElement("div");
    fundoModal.className = "fundoModal escondido";
    fundoModal.id = "fundoEditarOng";

    fundoModal.innerHTML = `
      <div class="modal" id="editarOngModal">
        <button aria-label="Fechar" title="Fechar" class="fechar-modal" type="button">
          <svg height="24px" viewBox="0 -960 960 960" width="24px">
            <path d="m287-216-69-71 192-193-192-195 69-71 194 195 192-195 69 71-192 195 192 193-69 71-192-195-194 195Z" />
          </svg>
        </button>

        <form id="formEditarOng" class="formulario">
          <h3>Editar Perfil da ONG</h3>

          <div class="formEditarOngGrid">
            <div class="campoInteiro editarOngArquivos">
              <div class="editarOngArquivoCard">
                <div class="editarOngPreview editarOngPreviewFoto" id="editarOngFotoPreview"></div>
                <div>
                  <p>Foto de perfil</p>
                  <label for="editarOngFoto" class="botaoUpload">Alterar foto</label>
                  <input type="file" id="editarOngFoto" accept=".jpg,.jpeg,.png,.webp">
                  <span id="editarOngFotoNome">Nenhum arquivo selecionado</span>
                </div>
              </div>

              <div class="editarOngArquivoCard">
                <div class="editarOngPreview editarOngPreviewBanner" id="editarOngBannerPreview"></div>
                <div>
                  <p>Banner</p>
                  <label for="editarOngBanner" class="botaoUpload">Alterar banner</label>
                  <input type="file" id="editarOngBanner" accept=".jpg,.jpeg,.png,.webp">
                  <span id="editarOngBannerNome">Nenhum arquivo selecionado</span>
                </div>
              </div>
            </div>

            <div class="alinharErro">
              <label for="editarOngNome" class="labelEditarOng">Nome da ONG *</label>
              <input type="text" id="editarOngNome" class="inputCadastro" placeholder="Nome da ONG*">
              <p class="error-message" data-error-for="nome"></p>
            </div>

            <div class="alinharErro">
              <label for="editarOngTelefone" class="labelEditarOng">Telefone ou Celular *</label>
              <input type="tel" id="editarOngTelefone" class="inputCadastro" placeholder="Telefone ou Celular*" maxlength="15">
              <p class="error-message" data-error-for="telefone"></p>
            </div>

            <div class="alinharErro textAreaCont campoInteiro">
              <label for="editarOngDescricao" class="labelEditarOng">Descricao *</label>
              <div class="textAreaCont">
                <div class="textoArea">
                  <textarea id="editarOngDescricao" class="inputCadastro" placeholder="Descricao *" maxlength="200"></textarea>
                  <div class="fundoCont"></div>
                </div>
                <p id="editarOngContarCaracteres"><span id="editarOngContagem">0</span>/200</p>
              </div>
              <p class="error-message" data-error-for="descricao"></p>
            </div>

            <h2 class="campoInteiro">Informacoes de Endereco</h2>

            <div class="alinharErro">
              <label for="editarOngCep" class="labelEditarOng">CEP *</label>
              <input type="text" id="editarOngCep" class="inputCadastro" placeholder="CEP*" maxlength="9">
              <p class="error-message" data-error-for="cep"></p>
            </div>

            <div class="alinharErro">
              <label for="editarOngEstado" class="labelEditarOng">Estado *</label>
              <select id="editarOngEstado" class="inputCadastro">
                <option value="">Selecione seu estado:*</option>
                ${estados.map((estado) => `<option value="${estado}">${estado}</option>`).join("")}
              </select>
              <p class="error-message" data-error-for="estado"></p>
            </div>

            <div class="alinharErro">
              <label for="editarOngCidade" class="labelEditarOng">Cidade *</label>
              <input type="text" id="editarOngCidade" class="inputCadastro" placeholder="Cidade*">
              <p class="error-message" data-error-for="cidade"></p>
            </div>

            <div class="alinharErro">
              <label for="editarOngRua" class="labelEditarOng">Rua *</label>
              <input type="text" id="editarOngRua" class="inputCadastro" placeholder="Rua*">
              <p class="error-message" data-error-for="rua"></p>
            </div>

            <div class="alinharErro">
              <label for="editarOngBairro" class="labelEditarOng">Bairro *</label>
              <input type="text" id="editarOngBairro" class="inputCadastro" placeholder="Bairro*">
              <p class="error-message" data-error-for="bairro"></p>
            </div>

            <div class="alinharErro">
              <label for="editarOngNumero" class="labelEditarOng">Numero *</label>
              <input type="text" id="editarOngNumero" class="inputCadastro" placeholder="Numero*">
              <p class="error-message" data-error-for="numero"></p>
            </div>

            <div class="alinharErro campoInteiro">
              <label for="editarOngComplemento" class="labelEditarOng">Complemento</label>
              <input type="text" id="editarOngComplemento" class="inputCadastro" placeholder="Complemento">
            </div>

          </div>

          <button type="submit" id="salvarEdicaoOng" class="buttonRosa desabilitado" disabled>Salvar alteracoes</button>
          <p id="feedbackEditarOng"></p>
        </form>
      </div>
    `;

    document.body.appendChild(fundoModal);
    return fundoModal;
  }

  function getIdOng() {
    return new URLSearchParams(window.location.search).get("id");
  }

  async function abrirEdicaoOng() {
    try {
      const idOng = getIdOng();
      if (!idOng) throw new Error("ONG nao encontrada.");

      const response = await fetch(`${API_URL}/ongs/${idOng}`);
      if (!response.ok) throw new Error("Erro ao buscar ONG.");

      const dados = await response.json();
      ongAtual = Array.isArray(dados) ? dados[0] : dados;
      if (!ongAtual) throw new Error("ONG nao encontrada.");

      preencherFormulario();
      modal.classList.remove("escondido");
      document.body.style.overflow = "hidden";
      campos.nome.focus();
    } catch (error) {
      console.error("Erro ao abrir edicao da ONG:", error);
      new MensagemFeedback("Erro ao carregar dados da ONG.", document.body).feedbackError();
    }
  }

  function fecharModal() {
    modal.classList.add("escondido");
    document.body.style.overflow = "";
  }

  function preencherFormulario() {
    limparErros();

    campos.nome.value = ongAtual.nome || "";
    campos.telefone.value = ongAtual.telefone || "";
    campos.cep.value = ongAtual.cep || "";
    campos.estado.value = ongAtual.sigla || "";
    campos.cidade.value = ongAtual.cidade || "";
    campos.rua.value = ongAtual.rua || "";
    campos.bairro.value = ongAtual.bairro || "";
    campos.numero.value = ongAtual.numero || "";
    campos.complemento.value = ongAtual.complemento || "";
    campos.descricao.value = ongAtual.descricao || "";
    campos.foto.value = "";
    campos.banner.value = "";
    campos.fotoNome.textContent = "Nenhum arquivo selecionado";
    campos.bannerNome.textContent = "Nenhum arquivo selecionado";
    campos.fotoPreview.style.backgroundImage = `url('${resolverImagem(ongAtual.foto, "/public/img/user_ong/user/gato_user_ONG.svg")}')`;
    campos.bannerPreview.style.backgroundImage = `url('${resolverImagem(ongAtual.banner, "/public/img/user_ong/banners/Banner_misto_rosa_ONG.svg")}')`;

    valoresIniciais = getValoresFormulario();
    atualizarContador();
    controlarBotaoSalvar();
  }

  function atualizarContador() {
    contador.textContent = String(campos.descricao.value.length);
  }

  function normalizarTelefone(event) {
    event.target.value = event.target.value.replace(/[^\d()+\-\s]/g, "");
  }

  campos.telefone.addEventListener("input", normalizarTelefone);
  campos.cep.addEventListener("input", (event) => {
    event.target.value = event.target.value.replace(/\D/g, "").replace(/^(\d{5})(\d)/, "$1-$2");
    const cepLimpo = event.target.value.replace(/\D/g, "");

    if (cepLimpo.length === 8) {
      buscarEnderecoPorCep(cepLimpo);
    }
  });

  function resolverImagem(caminho, fallback) {
    if (!caminho) return fallback;
    if (String(caminho).startsWith("http")) return caminho;
    return caminho;
  }

  function prepararPreviewArquivo(tipo) {
    const input = tipo === "foto" ? campos.foto : campos.banner;
    const preview = tipo === "foto" ? campos.fotoPreview : campos.bannerPreview;
    const nomeArquivo = tipo === "foto" ? campos.fotoNome : campos.bannerNome;
    const arquivo = input.files[0];

    if (!arquivo) {
      nomeArquivo.textContent = "Nenhum arquivo selecionado";
      controlarBotaoSalvar();
      return;
    }

    nomeArquivo.textContent = arquivo.name;
    preview.style.backgroundImage = `url('${URL.createObjectURL(arquivo)}')`;
    controlarBotaoSalvar();
  }

  async function buscarEnderecoPorCep(cep) {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const endereco = await response.json();

      if (!response.ok || endereco.erro) {
        erro("cep", "CEP nao encontrado.");
        return;
      }

      campos.estado.value = endereco.uf || "";
      campos.cidade.value = endereco.localidade || "";
      campos.bairro.value = endereco.bairro || "";
      campos.rua.value = endereco.logradouro || "";

      limparErro("cep");
      controlarBotaoSalvar();
    } catch (error) {
      console.error("Erro ao buscar CEP:", error);
      erro("cep", "Nao foi possivel buscar este CEP.");
    }
  }

  function getValoresFormulario() {
    const valores = {
      nome: campos.nome.value.trim(),
      telefone: campos.telefone.value.trim(),
      cep: campos.cep.value.trim(),
      estado: campos.estado.value,
      cidade: campos.cidade.value.trim(),
      rua: campos.rua.value.trim(),
      bairro: campos.bairro.value.trim(),
      numero: campos.numero.value.trim(),
      complemento: campos.complemento.value.trim(),
      descricao: campos.descricao.value.trim()
    };

    return valores;
  }

  function controlarBotaoSalvar() {
    const valoresAtuais = getValoresFormulario();
    const houveMudanca = JSON.stringify(valoresAtuais) !== JSON.stringify(valoresIniciais);
    const arquivosSelecionados = campos.foto.files[0] || campos.banner.files[0];

    const habilitar = camposObrigatoriosPreenchidos() && (houveMudanca || arquivosSelecionados);
    botaoSalvar.disabled = !habilitar;
    botaoSalvar.classList.toggle("desabilitado", !habilitar);
  }

  function camposObrigatoriosPreenchidos() {
    const valores = getValoresFormulario();
    return [
      valores.nome,
      valores.telefone,
      valores.cep,
      valores.estado,
      valores.cidade,
      valores.rua,
      valores.bairro,
      valores.numero,
      valores.descricao
    ].every(Boolean);
  }

  function validarFormulario() {
    limparErros();
    let valido = true;
    const valores = getValoresFormulario();

    if (!valores.nome) valido = erro("nome", "O campo Nome e obrigatorio.");
    if (!valores.telefone) valido = erro("telefone", "O campo Telefone e obrigatorio.");
    if (!valores.cep) valido = erro("cep", "O campo CEP e obrigatorio.");
    if (!valores.estado) valido = erro("estado", "Selecione um estado.");
    if (!valores.cidade) valido = erro("cidade", "O campo Cidade e obrigatorio.");
    if (!valores.rua) valido = erro("rua", "O campo Rua e obrigatorio.");
    if (!valores.bairro) valido = erro("bairro", "O campo Bairro e obrigatorio.");
    if (!valores.numero) valido = erro("numero", "O campo Numero e obrigatorio.");
    if (!valores.descricao) valido = erro("descricao", "O campo Descricao e obrigatorio.");

    return valido;
  }

  function dadosPerfilMudaram() {
    const valoresAtuais = getValoresFormulario();
    return JSON.stringify(valoresAtuais) !== JSON.stringify(valoresIniciais);
  }

  function erro(campo, mensagem) {
    const elemento = modal.querySelector(`[data-error-for="${campo}"]`);
    if (elemento) {
      elemento.textContent = mensagem;
      elemento.style.display = "block";
    }

    return false;
  }

  function limparErros() {
    modal.querySelectorAll(".error-message").forEach((erroElemento) => {
      erroElemento.textContent = "";
      erroElemento.style.display = "none";
    });
  }

  function limparErro(campo) {
    const elemento = modal.querySelector(`[data-error-for="${campo}"]`);
    if (!elemento) return;

    elemento.textContent = "";
    elemento.style.display = "none";
  }

  async function salvarEdicaoOng(event) {
    event.preventDefault();

    const perfilMudou = dadosPerfilMudaram();
    const fotoSelecionada = campos.foto.files[0];
    const bannerSelecionado = campos.banner.files[0];

    if (!perfilMudou && !fotoSelecionada && !bannerSelecionado) {
      new MensagemFeedback("Nenhuma alteracao foi feita.", feedbackPai).feedbackError();
      return;
    }

    if (!validarFormulario()) {
      new MensagemFeedback("Por favor, corrija os erros antes de salvar.", feedbackPai).feedbackError();
      return;
    }

    botaoSalvar.disabled = true;
    botaoSalvar.classList.add("desabilitado");

    try {
      if (perfilMudou) {
        const fkIdEndereco = await criarEndereco();
        const body = {
          nome: campos.nome.value.trim(),
          telefone: campos.telefone.value.trim(),
          descricao: campos.descricao.value.trim(),
          fk_idendereco: fkIdEndereco,
          foto: ongAtual.foto || null,
          banner: ongAtual.banner || null
        };

        const response = await fetch(`${API_URL}/ongs/perfil/${ongAtual.idong}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(body)
        });

        const data = await response.json().catch(() => ({}));
        if (!response.ok) throw new Error(data.message || "Erro ao salvar ONG.");

        atualizarLocalStorage();
      }

      if (fotoSelecionada) {
        await enviarImagem("foto", fotoSelecionada);
      }

      if (bannerSelecionado) {
        await enviarImagem("banner", bannerSelecionado);
      }

      new MensagemFeedback("Perfil da ONG atualizado com sucesso!", feedbackPai).feedbackSucess();

      setTimeout(() => {
        window.location.reload();
      }, 1200);
    } catch (error) {
      console.error("Erro ao salvar ONG:", error);
      new MensagemFeedback("Erro ao salvar alteracoes da ONG.", feedbackPai).feedbackError();
      controlarBotaoSalvar();
    }
  }

  async function enviarImagem(tipo, arquivo) {
    const formData = new FormData();
    formData.append(tipo, arquivo);

    const response = await fetch(`${API_URL}/ongs/${tipo}/${ongAtual.idong}`, {
      method: "PATCH",
      body: formData
    });

    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(data.message || `Erro ao atualizar ${tipo}.`);
    }
  }

  async function criarEndereco() {
    const headers = { "Content-Type": "application/json" };

    const estado = await postJson("/estados", { sigla: campos.estado.value }, headers);
    const cidade = await postJson("/cidades", {
      fk_idestado: estado.id,
      cidade: campos.cidade.value.trim()
    }, headers);
    const bairro = await postJson("/bairros", {
      fk_idcidade: cidade.id,
      bairro: campos.bairro.value.trim()
    }, headers);
    const rua = await postJson("/ruas", {
      fk_idbairro: bairro.id,
      rua: campos.rua.value.trim()
    }, headers);
    const endereco = await postJson("/enderecos", {
      cep: campos.cep.value.trim(),
      fk_idestado: estado.id,
      fk_idcidade: cidade.id,
      fk_idbairro: bairro.id,
      fk_idrua: rua.id,
      numero: campos.numero.value.trim(),
      complemento: campos.complemento.value.trim()
    }, headers);

    return endereco.id;
  }

  async function postJson(endpoint, body, headers) {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: "POST",
      headers,
      body: JSON.stringify(body)
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Erro ao salvar endereco.");

    return data;
  }

  function atualizarLocalStorage() {
    const ongSalva = JSON.parse(localStorage.getItem("ong"));
    if (!ongSalva) return;

    ongSalva.nome = campos.nome.value.trim();
    ongSalva.telefone = campos.telefone.value.trim();
    ongSalva.descricao = campos.descricao.value.trim();

    localStorage.setItem("ong", JSON.stringify(ongSalva));
  }
});
