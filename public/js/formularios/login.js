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

  if(!email){
    mensagem.innerText = "Digite um email.";
    mensagem.style.color = "red";
    return;
  }

  try{

    const resposta = await fetch("http://localhost:6789/usuarios/gerar-codigo-verificacao",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        email:email,
        motivo:"Recuperação de conta"
      })
    });

    const dados = await resposta.json();

    mensagem.innerText = dados.message;

    if(dados.success){
      mensagem.style.color = "green";
    }else{
      mensagem.style.color = "red";
    }

  }catch(erro){
    mensagem.innerText = "Erro ao enviar código.";
    mensagem.style.color = "red";
    console.error(erro);
  }

});


// verificar código
botaoConfirmarCodigo.addEventListener("click", async () => {

  const email = emailInput.value;
  const codigo = codigoInput.value;

  if(!codigo){
    mensagem.innerText = "Digite o código.";
    mensagem.style.color = "red";
    return;
  }

  try{

    const resposta = await fetch("http://localhost:6789/usuarios/verificar-codigo",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        email:email,
        codigo:codigo
      })
    });

    const dados = await resposta.json();

    mensagem.innerText = dados.message;

    if(dados.success){

      mensagem.style.color = "green";

      // esconder campo código
      codigoInput.style.display = "none";
      botaoConfirmarCodigo.style.display = "none";

      // mostrar campo nova senha
      novaSenhaInput.style.display = "block";
      botaoAlterarSenha.style.display = "block";

    }else{

      mensagem.style.color = "red";

    }

  }catch(erro){
    mensagem.innerText = "Erro ao verificar código.";
    mensagem.style.color = "red";
    console.error(erro);
  }

});


// alterar senha
botaoAlterarSenha.addEventListener("click", async () => {

  const email = emailInput.value;
  const novaSenha = novaSenhaInput.value;

  if(!novaSenha){
    mensagem.innerText = "Digite a nova senha.";
    mensagem.style.color = "red";
    return;
  }

  try{

    const resposta = await fetch("http://localhost:6789/usuarios/alterar-senha",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        email:email,
        novaSenha:novaSenha
      })
    });

    const dados = await resposta.json();

    mensagem.innerText = "Senha alterada com sucesso!";
    mensagem.style.color = "green";

    setTimeout(()=>{
      modal.style.display="none";
    },2000);

  }catch(erro){
    mensagem.innerText = "Erro ao alterar senha.";
    mensagem.style.color = "red";
    console.error(erro);
  }

});
