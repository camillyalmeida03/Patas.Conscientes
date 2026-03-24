// Lógica para mostrar/ocultar senha (se já não estiver implementada em outro lugar)
const togglePassword = document.getElementById("togglePassword");
const senhaInput = document.getElementById("senhaLoginUsuario");
const olhoIcon = document.getElementById("olho"); // Assumindo que o ID da tag <img> é "olho"

if (togglePassword && senhaInput && olhoIcon) {
  togglePassword.addEventListener("click", function () {
    const type = senhaInput.getAttribute("type") === "password" ? "text" : "password";
    senhaInput.setAttribute("type", type);

    // Altera o ícone do olho
    if (type === "password") {
      olhoIcon.src = "/public/img/icons/olhofechado.svg";
      olhoIcon.title = "Mostrar senha";
    } else {
      olhoIcon.src = "/public/img/icons/olhoaberto.svg"; // Certifique-se que este ícone existe
      olhoIcon.title = "Ocultar senha";
    }
  });
};


const botaoRecuperar = document.getElementById("botaorecuperarsenha");
const modal = document.getElementById("modalRecuperarSenha");
const fecharModal = document.getElementById("fecharModalRecuperar");

const botaoEnviarCodigo = document.getElementById("enviarCodigo");
const botaoConfirmarCodigo = document.getElementById("confirmarCodigo");
const botaoAlterarSenha = document.getElementById("alterarSenha");

const emailInput = document.getElementById("emailRecuperar");
const codigoInput = document.getElementById("codigoRecuperacao");
const novaSenhaInput = document.getElementById("novaSenha");

const mensagem = document.getElementById("mensagemRecuperacao");


// abrir modal
botaoRecuperar.addEventListener("click", () => {
  modal.style.display = "flex";
});


// fechar modal
fecharModal.addEventListener("click", () => {
  modal.style.display = "none";
});


// enviar código
botaoEnviarCodigo.addEventListener("click", async () => {

  const email = emailInput.value;

  if (!email) {
    mensagem.innerHTML = '<span class="entrardigiteemailrecuperar" data-key="idioma">Digite um email</span>';
    mensagem.style.color = "red";
    traduzir();
    return;
  }

  try {

    const resposta = await fetch("http://localhost:6789/usuarios/gerar-codigo-verificacao", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        motivo: "Recuperação de conta"
      })
    });

    const dados = await resposta.json();


    if (dados.success) {
      mensagem.innerHTML = '<span class="entrarcodverificacaocriado" data-key="idioma">Código de verificação criado e email enviado</span>';
      mensagem.style.color = "green";
      traduzir();
    } else {
      mensagem.innerHTML = '<span class="entraremailnaoencontrado" data-key="idioma">Email não encontrado</span>';
      mensagem.style.color = "red";
      traduzir();
    }

  }
  catch (erro) {
    // mensagem.innerText = "Erro ao enviar código.";
    // mensagem.style.color = "red";
    console.error(erro);
  }

});


// verificar código
botaoConfirmarCodigo.addEventListener("click", async () => {

  const email = emailInput.value;
  const codigo = codigoInput.value;

  if (!codigo) {
    mensagem.innerHTML = '<span class="entrardigitecodrecuperar" data-key="idioma">Digite o código</span>';
    mensagem.style.color = "red";
    traduzir();
    return;
  }

  try {

    const resposta = await fetch("http://localhost:6789/usuarios/verificar-codigo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        codigo: codigo
      })
    });

    const dados = await resposta.json();


    if (dados.success) {
      // mensagem.innerText = dados.message;
      // console.log("SUCESSO!!! entrou aqui");

      //     mensagem.innerHTML = '<span class="entrarcodvalido" data-key="idioma">Código válido</span>';
      //     mensagem.style.color = "green";
      //     traduzir();

      // esconder campo código
      codigoInput.style.display = "none";
      botaoConfirmarCodigo.style.display = "none";

      // mostrar campo nova senha
      novaSenhaInput.style.display = "block";
      botaoAlterarSenha.style.display = "block";

    } else {
      mensagem.innerHTML = '<span class="entrarcodinvalido" data-key="idioma">Código inválido ou expirado</span>';
      mensagem.style.color = "red";
      traduzir();

    }

  } catch (erro) {
    mensagem.innerText = "Erro ao enviar código.";
    mensagem.style.color = "red";
    console.error(erro);
  }


});


// alterar senha
botaoAlterarSenha.addEventListener("click", async () => {

  const email = emailInput.value;
  const novaSenha = novaSenhaInput.value;

  if (!novaSenha) {
    mensagem.innerHTML = '<span class="entrarnovasenha" data-key="idioma">Digite a nova senha</span>';
    mensagem.style.color = "red";
    traduzir();
    return;
  }

  try {

    const resposta = await fetch("http://localhost:6789/usuarios/alterar-senha", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        novaSenha: novaSenha
      })
    });

    const dados = await resposta.json();

    mensagem.innerHTML = '<span class="entrarsenhaalterada" data-key="idioma">Senha alterada com sucesso!</span>';
    mensagem.style.color = "green";
    modal.style.opacity = "10";

    setTimeout(() => {
      modal.style.display = "none";
    }, 300); // tempo da animação
    traduzir();




  } catch (erro) {
    // mensagem.innerText = "Erro ao alterar senha.";
    // mensagem.style.color = "red";
    console.error(erro);
  }

});


