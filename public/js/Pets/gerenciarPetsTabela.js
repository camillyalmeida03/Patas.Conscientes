import { MensagemFeedback } from "../formularios/mensagemFeedback.js";

const API_URL = "http://localhost:6789";

document.addEventListener("DOMContentLoaded", () => {
  const tbody = document.getElementById("tbodyTabelaPet");
  const formPet = document.getElementById("formInfoPet");
  const fundoModal = document.getElementById("fundoAdicionarPet");
  const botaoSalvar = document.getElementById("bttAddPet");
  const botaoCadastrar = document.getElementById("abrirModalAdicionar");
  const feedbackPai = document.getElementById("mensagemFeedback");

  if (!tbody || !formPet || !botaoSalvar) return;

  const campos = {
    foto: document.getElementById("fotopetatt"),
    nomeArquivo: document.getElementById("nomeArquivo"),
    preview: document.getElementById("previewFotoPet"),
    nome: document.getElementById("nomePet"),
    peso: document.getElementById("pesoPetInput"),
    idade: document.getElementById("idadePetInput"),
    tipoIdade: document.getElementById("tipoIdade"),
    especie: document.getElementById("especiePet"),
    raca: document.getElementById("racaPetSel"),
    porte: document.getElementById("portePetSel"),
    sexo: document.getElementById("sexoPetSel"),
    descricao: document.getElementById("mensagem"),
    titulo: formPet.querySelector("h3"),
    contagem: document.getElementById("contagem")
  };

  const estado = {
    editando: false,
    pet: null,
    valoresIniciais: null,
    statusCache: null
  };

  const mapaEspecies = {
    cachorro: "1",
    gato: "2"
  };

  const mapaSexos = {
    macho: "1",
    masculino: "1",
    femea: "2",
    feminino: "2",
    "nao informado": "3"
  };

  const mapaPortes = {
    miniatura: "1",
    pequeno: "2",
    medio: "3",
    grande: "4",
    gigante: "5"
  };

  const mapaStatus = {
    disponivel: "1",
    "em processo": "2",
    adotado: "3",
    indisponivel: "4"
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

  function getIdPorNome(mapa, valor, fallback = "0") {
    return mapa[normalizar(valor)] || fallback;
  }

  async function getIdStatus(statusAtual) {
    try {
      if (!estado.statusCache) {
        const response = await fetch(`${API_URL}/status`);
        estado.statusCache = response.ok ? await response.json() : [];
      }

      const statusEncontrado = estado.statusCache.find((statusItem) => {
        return normalizar(statusItem.status) === normalizar(statusAtual);
      });

      return statusEncontrado?.idstatus || getIdPorNome(mapaStatus, statusAtual, "1");
    } catch (error) {
      console.error("Erro ao buscar status:", error);
      return getIdPorNome(mapaStatus, statusAtual, "1");
    }
  }

  function converterFoto(foto) {
    if (!foto || foto.length < 5) {
      return "https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg";
    }

    if (foto.startsWith("http")) return foto;
    if (!foto.includes(".")) {
      return "https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg";
    }

    return `/public/img/fotos/${foto}`;
  }

  function converterIdadeParaCampo(idadeMeses) {
    const meses = Number(idadeMeses) || 0;

    if (meses > 0 && meses < 12) {
      return { idade: String(meses), tipo: "meses" };
    }

    return {
      idade: String(Math.max(1, Math.floor(meses / 12) || meses || 1)),
      tipo: "anos"
    };
  }

  function converterIdadeParaMeses() {
    const idade = Number(campos.idade.value);
    return campos.tipoIdade.value === "anos" ? idade * 12 : idade;
  }

  function limparErros() {
    formPet.querySelectorAll(".error-message").forEach((erro) => {
      erro.textContent = "";
      erro.style.display = "none";
    });
  }

  function abrirModalPet() {
    if (!fundoModal) return;
    fundoModal.classList.remove("escondido");
    document.body.style.overflow = "hidden";
    campos.nome?.focus();
  }

  function setBotaoHabilitado(habilitado) {
    botaoSalvar.disabled = !habilitado;
    botaoSalvar.classList.toggle("desabilitado", !habilitado);
  }

  function getValoresFormulario() {
    return {
      nome: campos.nome.value.trim(),
      peso: campos.peso.value.trim(),
      idade: String(converterIdadeParaMeses()),
      especie: campos.especie.value,
      raca: campos.raca.value,
      porte: campos.porte.value,
      sexo: campos.sexo.value,
      descricao: campos.descricao.value.trim()
    };
  }

  function formularioPreenchido() {
    const valores = getValoresFormulario();
    return Object.values(valores).every((valor) => valor && valor !== "0");
  }

  function controlarBotaoEdicao() {
    if (!estado.editando) return;

    const valoresAtuais = getValoresFormulario();
    const mudou = JSON.stringify(valoresAtuais) !== JSON.stringify(estado.valoresIniciais);

    setBotaoHabilitado(formularioPreenchido() && mudou);
  }

  async function buscarPetsDaOng() {
    const response = await fetch(`${API_URL}/pets`);
    if (!response.ok) throw new Error("Erro ao buscar pets.");

    const pets = await response.json();
    const idOng = getIdOngUrl();

    return idOng
      ? pets.filter((pet) => String(pet.fk_idong) === String(idOng))
      : pets;
  }

  async function buscarPetPelaLinha(linha) {
    const linhas = Array.from(tbody.querySelectorAll("tr"));
    const indice = linhas.indexOf(linha);
    const pets = await buscarPetsDaOng();

    if (pets[indice]) return pets[indice];

    const nomeLinha = linha.querySelector(".tdNome")?.textContent?.trim();
    return pets.find((pet) => pet.nome === nomeLinha);
  }

  async function carregarRacas(especie, racaAtual) {
    if (!campos.raca) return;

    campos.raca.innerHTML = '<option value="0">Raca *</option>';

    let url = "";
    if (especie === "1") url = `${API_URL}/racaspets/racascachorro`;
    if (especie === "2") url = `${API_URL}/racaspets/selectracagato`;
    if (!url) return;

    const response = await fetch(url);
    if (!response.ok) return;

    const racas = await response.json();
    let racaSelecionada = "0";

    racas.forEach((raca) => {
      const option = document.createElement("option");
      option.value = raca.idracapet;
      option.textContent = raca.raca;
      campos.raca.appendChild(option);

      if (normalizar(raca.raca) === normalizar(racaAtual)) {
        racaSelecionada = String(raca.idracapet);
      }
    });

    campos.raca.value = racaSelecionada;
  }

  async function montarBodyEdicao() {
    const pet = estado.pet;

    return {
      nome: campos.nome.value.trim(),
      fk_idsexopet: campos.sexo.value,
      fk_idespecie: campos.especie.value,
      fk_idraca: campos.raca.value,
      fk_idporte: campos.porte.value,
      fk_idong: pet.fk_idong || getIdOngUrl(),
      peso: campos.peso.value.trim(),
      idade: converterIdadeParaMeses(),
      descricao: campos.descricao.value.trim(),
      fotos: pet.fotos || null,
      fk_idstatus: await getIdStatus(pet.status)
    };
  }

  function validarEdicao() {
    const validadores = [
      "validarNome",
      "validarPesoPet",
      "validarIdadePet",
      "validarEspecie",
      "validarRaca",
      "validarPorte",
      "validarSexoPet",
      "validarDescricao"
    ];

    return validadores.every((nomeValidador) => {
      const validador = window[nomeValidador];
      return typeof validador === "function" ? validador() : true;
    });
  }

  async function preencherFormularioEdicao(pet) {
    estado.editando = true;
    estado.pet = pet;
    estado.valoresIniciais = null;

    formPet.dataset.modo = "edicao";
    formPet.dataset.petId = pet.idpet;

    if (campos.titulo) campos.titulo.textContent = "Editar Pet";
    botaoSalvar.value = "Salvar alteracoes";

    limparErros();

    campos.nome.value = pet.nome || "";
    campos.peso.value = pet.peso || "";
    campos.descricao.value = pet.descricao || "";

    const idade = converterIdadeParaCampo(pet.idade);
    campos.idade.value = idade.idade;
    campos.tipoIdade.value = idade.tipo;

    campos.especie.value = getIdPorNome(mapaEspecies, pet.especie);
    campos.sexo.value = getIdPorNome(mapaSexos, pet.sexopet);
    campos.porte.value = getIdPorNome(mapaPortes, pet.porte);

    await carregarRacas(campos.especie.value, pet.raca);

    if (campos.foto) {
      campos.foto.value = "";
      campos.foto.disabled = true;
    }

    if (campos.nomeArquivo) {
      campos.nomeArquivo.textContent = "Foto atual do pet";
    }

    if (campos.preview) {
      campos.preview.src = converterFoto(pet.fotos);
      campos.preview.style.display = "block";
    }

    if (campos.contagem) {
      campos.contagem.textContent = campos.descricao.value.length;
    }

    estado.valoresIniciais = getValoresFormulario();
    setBotaoHabilitado(false);
    abrirModalPet();
  }

  function voltarModoCadastro() {
    estado.editando = false;
    estado.pet = null;
    estado.valoresIniciais = null;

    delete formPet.dataset.modo;
    delete formPet.dataset.petId;

    if (campos.titulo) campos.titulo.textContent = "Cadastrar Pet";
    botaoSalvar.value = "Adicionar";

    if (campos.foto) campos.foto.disabled = false;
    if (campos.preview) campos.preview.style.display = "none";
    if (campos.nomeArquivo) campos.nomeArquivo.textContent = "Nenhum arquivo selecionado";
    if (campos.contagem) campos.contagem.textContent = "0";

    setBotaoHabilitado(false);
  }

  async function salvarEdicao(event) {
    if (!estado.editando) return;

    event.preventDefault();
    event.stopImmediatePropagation();

    if (botaoSalvar.disabled) return;

    if (!validarEdicao()) {
      new MensagemFeedback(
        "Por favor, corrija os erros antes de salvar.",
        feedbackPai || document.body
      ).feedbackError();
      return;
    }

    setBotaoHabilitado(false);

    try {
      const response = await fetch(`${API_URL}/pets/${estado.pet.idpet}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(await montarBodyEdicao())
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok || data.success === false) {
        throw new Error(data.message || "Erro ao atualizar pet.");
      }

      new MensagemFeedback(
        "Pet atualizado com sucesso!",
        feedbackPai || document.body
      ).feedbackSucess();

      setTimeout(() => {
        window.location.reload();
      }, 1200);
    } catch (error) {
      console.error("Erro ao atualizar pet:", error);
      new MensagemFeedback(
        "Erro ao atualizar pet. Tente novamente.",
        feedbackPai || document.body
      ).feedbackError();
      controlarBotaoEdicao();
    }
  }

  async function excluirPet(pet) {
    const confirmou = window.confirm(`Deseja excluir ${pet.nome}?`);
    if (!confirmou) return;

    try {
      const response = await fetch(`${API_URL}/pets/${pet.idpet}`, {
        method: "DELETE"
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok || data.success === false) {
        throw new Error(data.message || "Erro ao excluir pet.");
      }

      new MensagemFeedback("Pet excluido com sucesso!", document.body).feedbackSucess();

      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error("Erro ao excluir pet:", error);
      new MensagemFeedback(
        "Erro ao excluir pet. Tente novamente.",
        document.body
      ).feedbackError();
    }
  }

  tbody.addEventListener("click", async (event) => {
    const botao = event.target.closest("button.botaoTabela");
    if (!botao) return;

    const linha = botao.closest("tr");
    if (!linha) return;

    try {
      const pet = await buscarPetPelaLinha(linha);
      if (!pet) throw new Error("Pet nao encontrado.");

      const acao = normalizar(botao.textContent);

      if (acao === "editar") {
        await preencherFormularioEdicao(pet);
      } else if (acao === "excluir") {
        await excluirPet(pet);
      }
    } catch (error) {
      console.error("Erro ao executar acao da tabela:", error);
      new MensagemFeedback(
        "Nao foi possivel encontrar este pet.",
        document.body
      ).feedbackError();
    }
  });

  formPet.addEventListener("input", controlarBotaoEdicao);
  formPet.addEventListener("change", controlarBotaoEdicao);
  formPet.addEventListener("submit", salvarEdicao, true);

  botaoCadastrar?.addEventListener("click", () => {
    voltarModoCadastro();
    formPet.reset();
  });
});
