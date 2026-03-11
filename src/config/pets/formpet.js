import { MensagemFeedback } from "../../../public/js/formularios/mensagemFeedback.js";

document.addEventListener("DOMContentLoaded", () => {

  const inputFoto = document.getElementById("fotopetatt");
  const nomeArquivo = document.getElementById("nomeArquivo");
  const preview = document.getElementById("previewFotoPet");

  if (inputFoto) {

    inputFoto.addEventListener("change", () => {

      const arquivo = inputFoto.files[0];

      if (!arquivo) {
        nomeArquivo.textContent = "Nenhum arquivo selecionado";
        preview.style.display = "none";
        return;
      }

      nomeArquivo.textContent = arquivo.name;

      const leitor = new FileReader();

      leitor.onload = function (e) {
        preview.src = e.target.result;
        preview.style.display = "block";
      };

      leitor.readAsDataURL(arquivo);

    });

  }

  const formPet = document.getElementById("formInfoPet");
  const botaoEnviar = document.getElementById("bttAddPet");
  const feedbackPai = document.getElementById("mensagemFeedback");

  function converterIdadeParaMeses() {

    const idade = Number(document.getElementById("idadePetInput").value);
    const tipo = document.getElementById("tipoIdade").value;

    if (tipo === "anos") {
      return idade * 12;
    }

    return idade;
  }

  function controlarBotao() {

    const nome = document.getElementById("nomePet").value.trim();
    const peso = document.getElementById("pesoPetInput").value.trim();
    const idade = document.getElementById("idadePetInput").value.trim();
    const especie = document.getElementById("especiePet").value;
    const raca = document.getElementById("racaPetSel").value.trim();
    const porte = document.getElementById("portePetSel").value;
    const sexo = document.getElementById("sexoPetSel").value;

    const camposPreenchidos =
      nome &&
      peso &&
      idade &&
      especie &&
      raca &&
      porte &&
      sexo;

    if (camposPreenchidos) {
      botaoEnviar.classList.remove("desabilitado");
      botaoEnviar.disabled = false;
    } else {
      botaoEnviar.classList.add("desabilitado");
      botaoEnviar.disabled = true;
    }

  }

  if (!formPet) return;

  formPet.addEventListener("change", controlarBotao);

  controlarBotao();

  formPet.addEventListener("submit", async (e) => {
    e.preventDefault();

    botaoEnviar.classList.add("desabilitado");
    botaoEnviar.disabled = true;

    const camposValidos =
      validarNome() &&
      validarPesoPet() &&
      validarIdadePet() &&
      validarEspecie() &&
      validarPorte() &&
      validarSexoPet() &&
      validarFotoPet();

    if (!camposValidos) {
      botaoEnviar.classList.remove("desabilitado");
      botaoEnviar.disabled = false;

      new MensagemFeedback(
        "Por favor, corrija os erros antes de enviar o formulário.",
        feedbackPai
      ).feedbackError();

      return;
    }

    try {
      const nome = document.getElementById("nomePet").value.trim();
      const peso = document.getElementById("pesoPetInput").value.trim();
      const especie = document.getElementById("especiePet").value;
      const raca = document.getElementById("racaPetSel").value.trim();
      const porte = document.getElementById("portePetSel").value;
      const sexo = document.getElementById("sexoPetSel").value;
      const descricao = document.getElementById("mensagem").value.trim();
      const idadeMeses = converterIdadeParaMeses();

      const ong = JSON.parse(localStorage.getItem("ong"));

      if (!ong) {
        new MensagemFeedback(
          "Nenhuma ONG encontrada. Faça login novamente.",
          feedbackPai
        ).feedbackError();
        return;
      }

      const formData = new FormData();

      formData.append("nome", nome);
      formData.append("peso", peso);
      formData.append("idade", idadeMeses);
      formData.append("especie", especie);
      formData.append("raca", raca);
      formData.append("porte", porte);
      formData.append("sexo", sexo);
      formData.append("descricao", descricao);
      formData.append("fk_idong", ong.id);

      const inputFoto = document.getElementById("fotopetatt");
      if (inputFoto && inputFoto.files[0]) {
        formData.append("fotopet", inputFoto.files[0]);
      }

      const responsePet = await fetch("http://localhost:6789/pets/pornome", {
        method: "POST",
        body: formData
      });

      const data = await responsePet.json();

      if (!responsePet.ok || data.success === false) {
        new MensagemFeedback(data.message || "Erro ao enviar dados.", feedbackPai).feedbackError();
        return;
      }

      if (data.success) {
        new MensagemFeedback(
          "Cadastro realizado com sucesso!",
          feedbackPai
        ).feedbackSucess();
        formPet.reset();
        setTimeout(() => {
          window.location.href = `ongPage.html?id=${new URLSearchParams(window.location.search).get("id") || 1}`;
        }, 2000);
      }

    } catch (error) {
      console.error("Erro ao enviar dados:", error);
      new MensagemFeedback("Erro ao enviar dados. Tente novamente.", feedbackPai).feedbackError();
    }
  });
}
);