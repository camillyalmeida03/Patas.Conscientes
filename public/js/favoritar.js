// Este arquivo controla favoritar/desfavoritar pets no site.
import { CriarElementos } from "./criarElementos.js";
import { MensagemFeedback } from "./formularios/mensagemFeedback.js";
import { InformacoesPets } from "../../src/config/pets/informacoesPets.js";

const API_BASE = "http://localhost:6789";
const CACHE_PREFIX = "petsFavoritadosUsuario";

function getFeedbackPai() {
  return document.getElementById("feedbackAdotar") || document.body;
}

export class Favoritar {
  static favoritosPorUsuario = new Map();
  static carregamentos = new Map();

  constructor(InfoPet = null) {
    this.criarElemento = new CriarElementos();
    this.InfoPet = InfoPet || new InformacoesPets();
    this.botaoFavorito = null;
    this.processando = false;
  }

  criarBotoesCards(elementoPai, nome = this.InfoPet.nome) {
    const botaoExistente = elementoPai.querySelector(".favoritar");

    if (botaoExistente) {
      this.botaoFavorito = botaoExistente;
      this.configurarBotao(nome);
      this.carregarEstadoInicial();
      return botaoExistente;
    }

    this.botaoFavorito = this.criarElemento.createButton(
      ["favoritar", "adicionarFav"],
      null,
      elementoPai,
      "Favoritar " + nome
    );

    this.configurarBotao(nome);
    this.carregarEstadoInicial();

    return this.botaoFavorito;
  }

  configurarBotao(nome) {
    const idPet = this.obterIdPet();
    const idUsuario = Favoritar.obterIdUsuarioLogado();
    const favoritosCache = Favoritar.lerFavoritosCache(idUsuario);

    this.botaoFavorito.type = "button";
    this.botaoFavorito.dataset.idPet = idPet || "";

    if (this.botaoFavorito._favoritarHandler) {
      this.botaoFavorito.removeEventListener("click", this.botaoFavorito._favoritarHandler);
    }

    this.botaoFavorito._favoritarHandler = (event) => this.alternarFavorito(event);
    this.botaoFavorito.addEventListener("click", this.botaoFavorito._favoritarHandler);
    this.atualizarBotao(favoritosCache.has(Number(idPet)), nome);
  }

  async carregarEstadoInicial() {
    const idUsuario = Favoritar.obterIdUsuarioLogado();
    const idPet = this.obterIdPet();

    if (!idUsuario || !idPet) return;

    const favoritos = await Favoritar.carregarFavoritos(idUsuario);
    Favoritar.sincronizarBotoesPet(idPet, favoritos.has(Number(idPet)));
  }

  async alternarFavorito(event) {
    event.preventDefault();
    event.stopPropagation();

    if (this.processando) return;

    const idUsuario = Favoritar.obterIdUsuarioLogado();
    const idPet = this.obterIdPet();

    if (!idUsuario) {
      this.adicionarFeedbackErro("Entre na sua conta para favoritar pets.");
      return;
    }

    if (!idPet) {
      this.adicionarFeedbackErro("Nao foi possivel identificar este pet.");
      return;
    }

    const favoritado = this.botaoFavorito.classList.contains("apagarFav");

    try {
      this.processando = true;
      this.botaoFavorito.disabled = true;

      if (favoritado) {
        await Favoritar.removerFavorito(idUsuario, idPet);
        Favoritar.atualizarFavoritosCache(idUsuario, idPet, false);
        Favoritar.sincronizarBotoesPet(idPet, false);
        Favoritar.notificarAtualizacao(idUsuario, idPet, false);
        this.adicionarFeedbackDesfavoritado();
        return;
      }

      await Favoritar.adicionarFavorito(idUsuario, idPet);
      Favoritar.atualizarFavoritosCache(idUsuario, idPet, true);
      Favoritar.sincronizarBotoesPet(idPet, true);
      Favoritar.notificarAtualizacao(idUsuario, idPet, true);
      this.adicionarFeedbackFavoritado();
    } catch (erro) {
      console.error("Erro ao atualizar favorito:", erro);
      this.adicionarFeedbackErro();
    } finally {
      this.processando = false;
      this.botaoFavorito.disabled = false;
    }
  }

  atualizarBotao(favoritado, nome = this.InfoPet.nome) {
    if (!this.botaoFavorito) return;

    this.botaoFavorito.classList.toggle("adicionarFav", !favoritado);
    this.botaoFavorito.classList.toggle("apagarFav", favoritado);
    this.botaoFavorito.title = favoritado
      ? "Remover " + nome + " dos favoritos"
      : "Favoritar " + nome;
    this.botaoFavorito.setAttribute("aria-label", this.botaoFavorito.title);
    this.botaoFavorito.setAttribute("aria-pressed", String(favoritado));
  }

  adicionarFeedbackFavoritado() {
    new MensagemFeedback(
      `O pet ${this.InfoPet.nome} foi favoritado!`,
      getFeedbackPai()
    ).feedbackSucess();
  }

  adicionarFeedbackDesfavoritado() {
    new MensagemFeedback(
      `O pet ${this.InfoPet.nome} foi removido dos favoritos!`,
      getFeedbackPai()
    ).feedbackSucess();
  }

  adicionarFeedbackErro(mensagem = "Nao foi possivel atualizar o favorito.") {
    new MensagemFeedback(mensagem, getFeedbackPai()).feedbackError();
  }

  obterIdPet() {
    const id =
      this.InfoPet?.id ||
      this.InfoPet?.idpet ||
      this.InfoPet?.id_pet ||
      this.InfoPet?.fk_idpet ||
      this.InfoPet?.pet?.id;
    return id ? Number(id) : null;
  }

  static async adicionarFavorito(idUsuario, idPet) {
    const resposta = await fetch(`${API_BASE}/petsfavoritados`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fk_idusuario: idUsuario,
        fk_idpet: idPet,
      }),
    });

    if (!resposta.ok) throw new Error("Erro ao favoritar pet.");
    return resposta.json();
  }

  static async removerFavorito(idUsuario, idPet) {
    const resposta = await fetch(
      `${API_BASE}/petsfavoritados/usuario/${idUsuario}/pet/${idPet}`,
      { method: "DELETE" }
    );

    if (!resposta.ok) throw new Error("Erro ao remover favorito.");
    return resposta.json();
  }

  static async carregarFavoritos(idUsuario) {
    if (!idUsuario) return new Set();

    if (Favoritar.favoritosPorUsuario.has(idUsuario)) {
      return Favoritar.favoritosPorUsuario.get(idUsuario);
    }

    if (Favoritar.carregamentos.has(idUsuario)) {
      return Favoritar.carregamentos.get(idUsuario);
    }

    const carregamento = fetch(`${API_BASE}/petsfavoritados/usuario/${idUsuario}`)
      .then(async (resposta) => {
        if (!resposta.ok) throw new Error("Erro ao carregar favoritos.");

        const dados = await resposta.json();
        const ids = Array.isArray(dados)
          ? dados
            .map((pet) =>
              Number(
                pet.fk_idpet ||
                pet.idpet ||
                pet.id_pet ||
                pet.pet?.id ||
                pet.id
              )
            )
            .filter((id) => Number.isFinite(id))
          : [];
        const favoritos = new Set(ids);

        Favoritar.favoritosPorUsuario.set(idUsuario, favoritos);
        Favoritar.salvarFavoritosCache(idUsuario, favoritos);

        return favoritos;
      })
      .catch((erro) => {
        console.warn("Nao foi possivel carregar favoritos da API.", erro);
        const cache = Favoritar.lerFavoritosCache(idUsuario);
        Favoritar.favoritosPorUsuario.set(idUsuario, cache);
        return cache;
      })
      .finally(() => {
        Favoritar.carregamentos.delete(idUsuario);
      });

    Favoritar.carregamentos.set(idUsuario, carregamento);
    return carregamento;
  }

  static sincronizarBotoesPet(idPet, favoritado) {
    document
      .querySelectorAll(`.favoritar[data-id-pet="${idPet}"]`)
      .forEach((botao) => {
        botao.classList.toggle("adicionarFav", !favoritado);
        botao.classList.toggle("apagarFav", favoritado);
        botao.setAttribute("aria-pressed", String(favoritado));

        const nome = botao.title
          .replace("Favoritar ", "")
          .replace("Remover ", "")
          .replace(" dos favoritos", "");
        botao.title = favoritado
          ? "Remover " + nome + " dos favoritos"
          : "Favoritar " + nome;
        botao.setAttribute("aria-label", botao.title);
      });
  }

  static atualizarFavoritosCache(idUsuario, idPet, favoritado) {
    const favoritos =
      Favoritar.favoritosPorUsuario.get(idUsuario) ||
      Favoritar.lerFavoritosCache(idUsuario);

    if (favoritado) {
      favoritos.add(Number(idPet));
    } else {
      favoritos.delete(Number(idPet));
    }

    Favoritar.favoritosPorUsuario.set(idUsuario, favoritos);
    Favoritar.salvarFavoritosCache(idUsuario, favoritos);
  }

  static notificarAtualizacao(idUsuario, idPet, favoritado) {
    window.dispatchEvent(
      new CustomEvent("favoritosAtualizados", {
        detail: {
          idUsuario,
          idPet: Number(idPet),
          favoritado,
        },
      })
    );
  }

  static obterUsuarioLogado() {
    try {
      return JSON.parse(localStorage.getItem("usuario"));
    } catch (erro) {
      return null;
    }
  }

  static obterIdUsuarioLogado() {
    const usuario = Favoritar.obterUsuarioLogado();
    return (
      usuario?.id ||
      usuario?.idusuario ||
      usuario?.id_usuario ||
      usuario?.fk_idusuario ||
      usuario?.usuario?.id ||
      null
    );
  }

  static chaveCache(idUsuario) {
    return `${CACHE_PREFIX}:${idUsuario}`;
  }

  static lerFavoritosCache(idUsuario) {
    if (!idUsuario) return new Set();

    try {
      const ids = JSON.parse(localStorage.getItem(Favoritar.chaveCache(idUsuario))) || [];
      return new Set(ids.map((id) => Number(id)).filter((id) => Number.isFinite(id)));
    } catch (erro) {
      return new Set();
    }
  }

  static salvarFavoritosCache(idUsuario, favoritos) {
    if (!idUsuario) return;

    localStorage.setItem(
      Favoritar.chaveCache(idUsuario),
      JSON.stringify(Array.from(favoritos))
    );
  }
}
