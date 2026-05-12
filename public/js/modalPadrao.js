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
// pega usuario do localStorage
const usuario = JSON.parse(localStorage.getItem("usuario"));

// Modal de exclusão de conta 

document.getElementById("alterarEmail")
  .addEventListener("click", () => {
    abrirModalAlteracao(
      "email",
      "Alteração de E-mail",
      "Digite seu novo e-mail",
      "email"
    );
  });

document.getElementById("alterarSenha")
  .addEventListener("click", () => {
    abrirModalAlteracao(
      "senha",
      "Alteração de senha",
      "Digite sua nova senha",
      "password"
    );
  });

document.getElementById("alterarTelefone")
  .addEventListener("click", () => {
    abrirModalAlteracao(
      "telefone",
      "Alteração de telefone",
      "Digite seu novo telefone",
      "text"
    );
  });

document.getElementById("alterarCpf")
  .addEventListener("click", () => {
    abrirModalAlteracao(
      "cpf",
      "Alteração de CPF",
      "Digite seu novo CPF",
      "text"
    );
  });


document.getElementById("excluirconta")
  .addEventListener("click", () => {
    abrirModalAlteracao(
      "excluir",
      "Excluir conta",
      "Digite seu email para receber o código de confirmação",
      "email"
    );
  });

function abrirModalAlteracao(campo, motivo, placeholder, tipoInput) {

  const modal = document.createElement("div");

  modal.id = "modalAlteracao";

  modal.innerHTML = `
    <div class="modalBox">

      <h2>${motivo}</h2>

      <p>
        Digite seu email para receber o código de confirmação
      </p>

      <input 
        type="email" 
        id="emailVerificacao"
        class="modalemail"
        placeholder="Seu email"
      >

      <div class="botoes">
        <button id="enviarCodigo" class="modalenvcod">
          Enviar código
        </button>

        <button id="fecharModal" class="modalcancelar">
          Cancelar
        </button>
      </div>

      <p id="mensagemAlteracao"></p>

    </div>
  `;

  document.body.appendChild(modal);

  document.getElementById("fecharModal")
    .onclick = () => modal.remove();

  document.getElementById("enviarCodigo")
    .onclick = () =>
      enviarCodigoAlteracao(
        campo,
        motivo,
        placeholder,
        tipoInput
      );
}

async function enviarCodigoAlteracao(
  campo,
  motivo,
  placeholder,
  tipoInput
) {

  const email =
    document.getElementById("emailVerificacao").value;

  try {

    const resposta = await fetch(
      "http://localhost:6789/usuarios/gerar-codigo-verificacao",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          motivo
        })
      }
    );

    const dados = await resposta.json();

    if (!dados.success) {
      alert("Erro ao enviar código");
      return;
    }

    mostrarConfirmacaoCodigo(
      email,
      campo,
      placeholder,
      tipoInput
    );

  } catch (erro) {

    console.error(erro);

  }

}
function mostrarConfirmacaoCodigo(
  email,
  campo,
  placeholder,
  tipoInput
) {

  const modalBox =
    document.querySelector(".modalBox");

  modalBox.innerHTML = `
  
    <h2>Confirmar alteração</h2>

    <p>
      Digite o código enviado para seu email
    </p>

    <input
      type="text"
      id="codigoVerificacao"
      class="modalcod"
      placeholder="Código"
    >

    <div class="botoes">

      <button
        id="confirmarCodigo"
        class="modalconfirmar"
      >
        Confirmar
      </button>

      <button
        id="cancelarModal"
        class="modalcancelar"
      >
        Cancelar
      </button>

    </div>
  `;

  document.getElementById("cancelarModal")
    .onclick = () =>
      document.getElementById("modalAlteracao")
        .remove();

  document.getElementById("confirmarCodigo")
    .onclick = () =>
      validarCodigoAlteracao(
        email,
        campo,
        placeholder,
        tipoInput
      );

}

async function validarCodigoAlteracao(
  email,
  campo,
  placeholder,
  tipoInput
) {

  const codigo =
    document.getElementById("codigoVerificacao").value;

  try {

    const resposta = await fetch(
      "http://localhost:6789/usuarios/verificar-codigo",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          codigo: Number(codigo)
        })
      }
    );

    const dados = await resposta.json();

    if (!dados.success) {
      alert("Código inválido");
      return;
    }

    mostrarCampoNovoValor(
      campo,
      placeholder,
      tipoInput
    );

  } catch (erro) {

    console.error(erro);

  }

}

function mostrarCampoNovoValor(
  campo,
  placeholder,
  tipoInput
) {

  const modalBox =
    document.querySelector(".modalBox");

  modalBox.innerHTML = `

    <h2>Alterar ${campo}</h2>

    <input
      type="${tipoInput}"
      id="novoValor"
      class="modalemail"
      placeholder="${placeholder}"
    >

    <div class="botoes">

      <button
        id="salvarAlteracao"
        class="modalconfirmar"
      >
        Salvar
      </button>

      <button
        id="cancelarAlteracao"
        class="modalcancelar"
      >
        Cancelar
      </button>

    </div>
  `;

  document.getElementById("cancelarAlteracao")
    .onclick = () =>
      document.getElementById("modalAlteracao")
        .remove();

  document.getElementById("salvarAlteracao")
    .onclick = () =>
      salvarAlteracao(campo);

}

async function salvarAlteracao(campo) {

  const novoValor =
    document.getElementById("novoValor").value;

  let url = "";
  let body = {};
  let metodo = "";



  // EMAIL
  if (campo === "email") {

    url =
      `http://localhost:6789/usuarios/email/${usuario.id}`;

    metodo = "PATCH";

    body = {
      email: novoValor
    };

  }



  // TELEFONE
  else if (campo === "telefone") {

    url =
      `http://localhost:6789/usuarios/telefone/${usuario.id}`;

    metodo = "PATCH";

    body = {
      telefone: novoValor
    };

  }



  // CPF
  else if (campo === "cpf") {

    url =
      `http://localhost:6789/usuarios/cpf/${usuario.id}`;

    metodo = "PATCH";

    body = {
      cpf: novoValor
    };

  }



  // SENHA
  else if (campo === "senha") {

    url =
      `http://localhost:6789/usuarios/alterar-senha`;

    metodo = "POST";

    body = {
      senha: novoValor
    };

  }

  try {

    const resposta = await fetch(url, {

      method: metodo,

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify(body)

    });

    const dados = await resposta.json();

    if (dados.success || resposta.ok) {

      alert("Alteração realizada com sucesso");



      // atualiza localStorage
      if (campo !== "senha") {

        usuario[campo] = novoValor;

        localStorage.setItem(
          "usuario",
          JSON.stringify(usuario)
        );

      }



      document
        .getElementById("modalAlteracao")
        .remove();

    } else {

      alert("Erro ao alterar");

    }

  } catch (erro) {

    console.error(erro);

  }

}