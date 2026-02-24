// Este documento é responsável por controlar o login

import { MensagemFeedback } from "../../../public/js/formularios/mensagemFeedback.js";

let entrarCard = document.getElementById("entrarCard");
let cadastroCard = document.getElementById("cadastroCard");
let acssCadastrar = document.getElementById("acssCadastrar");
let acssEntrar = document.getElementById("acssEntrar");

acssCadastrar.addEventListener("click", function () {
  event.preventDefault();
  entrarCard.style.display = "none";
  cadastroCard.style.display = "flex";
});

acssEntrar.addEventListener("click", function () {
  event.preventDefault();
  entrarCard.style.display = "flex";
  cadastroCard.style.display = "none";
});

const formEntrar = document.getElementById("formEntrar");
const feedbackPai = document.getElementById("mensagemcriacaodeconta");

if (formEntrar) {
  formEntrar.addEventListener("submit", async (e) => {
    e.preventDefault();

    const camposValidos = validarEmail() && validarSenhas();

    if (!camposValidos) {
      new MensagemFeedback(
        "Email ou senha inválidos.",
        feedbackPai
      ).feedbackError();
      return;
    }

    try {
      const email = document.getElementById("emailUsuarioAdt").value.trim();
      const senha = document.getElementById("senhaLoginUsuario").value.trim();

      const responseLogin = await fetch("http://localhost:6789/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      });

      const data = await responseLogin.json();

      if (!responseLogin.ok || data.success === false) {
        new MensagemFeedback(
          data.message || "Erro ao enviar dados.",
          feedbackPai
        ).feedbackError();
        return;
      }

if (responseLogin.ok) {

  // Salva tudo ANTES de qualquer redirecionamento
  localStorage.setItem("token", data.token);
  localStorage.setItem("usuario", JSON.stringify(data.usuario));

  if (data.ong) {
    localStorage.setItem("ong", JSON.stringify(data.ong));
  } else {
    localStorage.removeItem("ong");
  }

  // Feedback e redirecionamento
  new MensagemFeedback(
    "Login realizado com sucesso!",
    feedbackPai
  ).feedbackSucess();

  formEntrar.reset();

  setTimeout(() => {
    window.location.href = "/src/views/configuracoes.html";
  }, 2000);

  return;
}
    } catch (error) {
      console.error("Erro ao enviar dados:", error);
      new MensagemFeedback(
        "Erro ao enviar dados. Tente novamente.",
        feedbackPai
      ).feedbackError();
    }
  });
}

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
0
