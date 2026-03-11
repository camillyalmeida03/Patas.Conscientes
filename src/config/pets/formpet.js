import { MensagemFeedback } from "../../../public/js/formularios/mensagemFeedback.js";

document.addEventListener("DOMContentLoaded", () => {

  const formPet = document.getElementById("formInfoPet");
  const feedbackPai = document.getElementById("mensagemFeedback");
  const contentTypeJson = { "Content-Type": "application/json" };

  function converterIdadeParaMeses() {

    const idade = Number(document.getElementById("idadePetInput").value);
    const tipo = document.getElementById("tipoIdade").value;

    if (tipo === "anos") {
        return idade * 12;
    }

    return idade;
}

  if (!formPet) return;

  formPet.addEventListener("submit", async (e) => {
    e.preventDefault();

    const inputFoto = document.getElementById("fotopetatt");
    if (inputFoto && inputFoto.files[0]) {
      formData.append("fotopet", inputFoto.files[0]);
    }

    const camposValidos = validarNome() && validarPesoPet() && validarIdadePet();

    if (!camposValidos) {
      new MensagemFeedback("Por favor, corrija os erros antes de enviar o formulário.", feedbackPai).feedbackError();
      return;
    }
    try {

      // Campos do formulário de adição de pet
      const nome = document.getElementById("nomePet").value.trim();
      const peso = document.getElementById("pesoPetInput").value.trim()

      const idadeMeses = converterIdadeParaMeses();

      const dadosPet = {
        nome,
        peso,
        idade: idadeMeses
      }

      const responsePet = await fetch("http://localhost:6789/pets/pornome", {
        method: "POST",
        headers: contentTypeJson,
        body: JSON.stringify(dadosPet)
      });

      const data = await responsePet.json();

      if (!responsePet.ok || data.success === false) {
        new MensagemFeedback(data.message || "Erro ao enviar dados.", feedbackPai).feedbackError();
        return;
      }

      if (data.success) {
        new MensagemFeedback("Cadastro realizado com sucesso!", feedbackPai).feedbackSucess();
        formPet.reset();
        setTimeout(() => {
          window.location.href = `ongPage.html?id=${new URLSearchParams(window.location.search).get("id") || 1}`;
        }, 3000);
      }

    } catch (error) {
      console.error("Erro ao enviar dados:", error);
      new MensagemFeedback("Erro ao enviar dados. Tente novamente.", feedbackPai).feedbackError();
    }
  });
}
);