// Este arquivo é responsável por definir o comportamento padrão de todos os modais.
export class ModalPadrao {
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

  // const modalAdicionar = new ModalPadrao(
  //   document.getElementById("fundoAdicionarModal")
  // );

  const modalAdicionarPet = new ModalPadrao(
    document.getElementById("fundoAdicionarPet")
  );

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
      modalAdicionarPet.abrir();
    });
  });

  /*
  const modalAdicionarFunc = new ModalPadrao(
    document.getElementById("fundoAdicionarFuncionario")
  );

    .getElementById("botaoAdicionarFuncionario")
    .addEventListener("click", () => {
      modalAdicionarFunc.abrir();
    });
  */


  // document.getElementById("botaoAdicionarPet").addEventListener("click", () => {
  //   modalAdicionarPet.abrir();
  // });


});
// Modal de exclusão de conta 
const btnExcluir = document.getElementById("excluirconta");

// pega usuario do localStorage
const usuario = JSON.parse(localStorage.getItem("usuario"));

btnExcluir.addEventListener("click", () => {
  criarModalEmail();
});

function criarModalEmail() {

  const modal = document.createElement("div");
  modal.id = "modalExcluirConta";
  modal.innerHTML = `
    <div class="modalBox">
      <h2 class="configexcluirconta">Excluir conta</h2>
      <p class="modalexcluir">Digite seu email para receber o código de confirmação</p>

      <input type="email" id="emailExcluir" class="modalemail" placeholder="Seu email">

        <div class="botoes">
          <button id="enviarCodigo" class="modalenvcod">Enviar código</button>
          <button id="fecharModal" class="modalcancelar">Cancelar</button>
        </div>

        <p id="mensagemExcluir"></p>
    </div>

    `;
    document.body.appendChild(modal);
  document.getElementById("fecharModal").onclick = () => modal.remove();
  // mantem a area de mensagem escondida por padrão - iremos apenas controlar display
  const msgElem = document.getElementById("mensagemExcluir");
  if (msgElem) msgElem.style.display = "none";
    document.getElementById("enviarCodigo").onclick = enviarCodigo;
    traduzir();
}

async function enviarCodigo() {

  const email = document.getElementById("emailExcluir").value;
  const msg = document.getElementById("mensagemExcluir");
  // esconder mensagem anterior
  if (msg) msg.style.display = "none";

  try {

    const resposta = await fetch("http://localhost:6789/usuarios/gerar-codigo-verificacao", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        motivo: "Exclusão de conta"
      })
    });

    const dados = await resposta.json();

    if (!dados.success) {
      if (msg) msg.style.display = "flex"; // mostra aviso (texto não alterado aqui)
      return;
    }

    if (msg) msg.style.display = "flex"; // mostra confirmação (texto pré-existente)

    mostrarCampoCodigo(email);

  } catch (erro) {
    if (msg) msg.style.display = "flex";
    console.error(erro);
  }

}

function mostrarCampoCodigo(email) {

  const modalBox = document.querySelector(".modalBox");

  modalBox.innerHTML = `
    <h2 class="modalconfirexclusao">Confirmar exclusão</h2>
    <p class="modaldigiteocod">Digite o código enviado para seu email</p>

    <input type="text" id="codigoExcluir" class="modalcod" placeholder="Código">

      <div class="botoes">
        <button id="validarCodigo" class="modalconfirmar">Confirmar</button>
        <button id="cancelarExcluir" class="modalcancelar">Cancelar</button>
      </div>

      <p class="modalexclusao" id="mensagemExcluir"></p>
      `;
  // manter a mensagem escondida quando trocamos o conteúdo do modal
  const msgElem = document.getElementById("mensagemExcluir");
  if (msgElem) msgElem.style.display = "none";

  traduzir()
  document.getElementById("cancelarExcluir").onclick = () => {
    document.getElementById("modalExcluirConta").remove();
  };

  document.getElementById("validarCodigo").onclick = () => validarCodigo(email);
}

async function validarCodigo(email) {

  const codigo = document.getElementById("codigoExcluir").value;
  const msg = document.getElementById("mensagemExcluir");
  // esconder mensagem anterior
  if (msg) msg.style.display = "none";

  try {

    const resposta = await fetch("http://localhost:6789/usuarios/verificar-codigo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        codigo: Number(codigo)
      })
    });

    const dados = await resposta.json();

    if (!dados.success) {
      if (msg) msg.style.display = "flex"; // mostra erro
      return;
    }

    if (msg) msg.style.display = "flex"; // mostra confirmação

    excluirConta();

  } catch (erro) {
    if (msg) msg.style.display = "flex";
    console.error(erro);
  }

}

async function excluirConta() {

  try {

    const resposta = await fetch(`http://localhost:6789/usuarios/${usuario.id}`, {
      method: "DELETE"
    });

    if (resposta.ok) {

      alert("Conta excluída com sucesso");

      localStorage.removeItem("usuario");

      window.location.href = "/";

    } else {

      alert("Erro ao excluir conta");

    }

  } catch (erro) {
    console.error(erro);
  }

}


