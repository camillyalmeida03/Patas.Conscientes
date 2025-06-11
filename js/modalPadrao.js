class ModalPadrao {
  static pilha = [];

  constructor(fundoModal) {
    this.fundoModal = fundoModal;
    this.modal = fundoModal.querySelector(".modal");
    this.botaoFechar = fundoModal.querySelector(".fechar-modal");
    this.ultimoFoco = null;
    this.ativo = true;

    this.iniciar();
  }

  iniciar() {
    if (this.botaoFechar) {
      this.botaoFechar.addEventListener("click", () => this.fechar());
    }

    this.fundoModal.addEventListener("click", (e) => {
      if (e.target === this.fundoModal) this.fechar();
    });

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
    const modalAdicionar = new ModalPadrao(document.getElementById("adicionarModal"));

    // Quando clicar no botão, abre o modal
    document.getElementById("botaoAbrirModal").addEventListener("click", () => {
      modalAdicionar.abrir();
    });
  });
