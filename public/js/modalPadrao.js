// Este arquivo é responsável por definir o comportamento padrão de todos os modais.

class ModalPadrao {
  static pilha = [];

  constructor(fundoModal) {
    this.fundoModal = fundoModal;
    this.modal = fundoModal.querySelector(".modal");
    this.botaoFechar = fundoModal.querySelector(".fechar-modal");
    this.fotoOng = document.querySelector(".fotoCard");
    this.originalZIndexFoto = window.getComputedStyle(this.fotoOng).zIndex;
    this.ultimoFoco = null;
    this.ativo = true;

    this.iniciar();
  }

  iniciar() {
    // verifica se o botão de fechar existe e adiciona um evento de clique nele
    this.botaoFechar?.addEventListener("click", () => this.fechar());

    // Caso clique fora do modal, no fundoModal, ele fecha
    this.fundoModal.addEventListener("click", (e) => {
      if (e.target === this.fundoModal) this.fechar();
    });

    // Ao clicar no ESC, o modal se fecha
    document.addEventListener("keydown", (e) => {
      if (
        e.key === "Escape" &&
        this.ativo &&
        !this.fundoModal.classList.contains("escondido")
      ) {
        this.fechar();
      }
    });
  }

  abrir() {
    if (!this.ativo) return;

    const modalAtual = ModalPadrao.pilha[ModalPadrao.pilha.length - 1];
    if (modalAtual && modalAtual !== this) {
      modalAtual.fundoModal.classList.add("escondido");
    }

    this.ultimoFoco = document.activeElement;
    this.fundoModal.classList.remove("escondido");
    document.body.style.overflow = "hidden";

    if (!ModalPadrao.pilha.includes(this)) {
      ModalPadrao.pilha.push(this);
    }

    const focavel = this.modal.querySelector(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focavel) focavel.focus();
  }

  fechar() {
    console.log("fechando");
    this.fundoModal.classList.add("escondido");
    document.body.style.overflow = "";

    ModalPadrao.pilha = ModalPadrao.pilha.filter((m) => m !== this);

    // Se houver um modal anterior, volta ele
    const anterior = ModalPadrao.pilha[ModalPadrao.pilha.length - 1];
    if (anterior && anterior.ativo) {
      anterior.fundoModal.classList.remove("escondido");
    }

    if (this.ultimoFoco) this.ultimoFoco.focus();
  }

  // Novo método: fecha tudo de verdade, sem restaurar nada
  fecharTudo() {
    console.log("fechando tudo");
    this.fundoModal.classList.add("escondido");
    document.body.style.overflow = "";

    // Limpa toda a pilha e esconde todos os modais
    ModalPadrao.pilha.forEach((m) => {
      m.fundoModal.classList.add("escondido");
    });
    ModalPadrao.pilha = [];

    if (this.ultimoFoco) this.ultimoFoco.focus();
  }

  desativar() {
    this.ativo = false;
    this.fechar();
  }
}

window.addEventListener("DOMContentLoaded", () => {
  const modalAdicionar = new ModalPadrao(
    document.getElementById("fundoAdicionarModal")
  );

  // Quando clicar no botão, abre o modal
  function esperarElemento(id, callback) {
    const el = document.getElementById(id);
    if (el) {
      callback(el);
    } else {
      const observer = new MutationObserver(() => {
        const el = document.getElementById(id);
        if (el) {
          observer.disconnect();
          callback(el);
        }
      });
      observer.observe(document.body, { childList: true, subtree: true });
    }
  }

  esperarElemento("abrirModalAdicionar", (btn) => {
    btn.addEventListener("click", () => {
      modalAdicionar.abrir();
    });
  });

  const modalAdicionarFunc = new ModalPadrao(
    document.getElementById("fundoAdicionarFuncionario")
  );

  // Quando clicar no botão, abre o modal
  document
    .getElementById("botaoAdicionarFuncionario")
    .addEventListener("click", () => {
      modalAdicionarFunc.abrir();
    });

  const modalAdicionarPet = new ModalPadrao(
    document.getElementById("fundoAdicionarPet")
  );

  // Quando clicar no botão, abre o modal
  document.getElementById("botaoAdicionarPet").addEventListener("click", () => {
    modalAdicionarPet.abrir();
  });
});
