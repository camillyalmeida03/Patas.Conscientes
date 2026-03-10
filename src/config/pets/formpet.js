import { MensagemFeedback } from "../../../public/js/formularios/mensagemFeedback.js";
import {
  validarNomePet,
  validarEspecie,
  validarPorte,
  validarSexo,
  validarPeso,
  validarIdadePet,
  validarDescricao
} from "/public/js/formularios/validacaoFormularios.js";

document.addEventListener("DOMContentLoaded", () => {


  const formPet = document.getElementById("formInfoPet");
  const paiFeedback = document.body;
  const botao = document.getElementById("bttAddPet");

  if (botao) {
    botao.disabled = true;
    botao.classList.add("desabilitado");
  }

  function controlarBotao() {

    let valido = true;

    if (!validarNomePet()) valido = false;
    if (!validarEspecie()) valido = false;
    if (!validarPorte()) valido = false;
    if (!validarSexo()) valido = false;
    if (!validarPeso()) valido = false;
    if (!validarIdadePet()) valido = false;
    if (!validarDescricao()) valido = false;

    if (!valido) {
      botao.disabled = true;
      botao.classList.add("desabilitado");
    } else {
      botao.disabled = false;
      botao.classList.remove("desabilitado");
    }

    return valido;
  }

  if (formPet) {

    const inputs = formPet.querySelectorAll("input, select, textarea");

    inputs.forEach(input => {
      input.addEventListener("input", controlarBotao);
    });

    controlarBotao();

  }

  if (formPet) {
    formPet.addEventListener("submit", async (e) => {
      e.preventDefault();

      const form = e.target;
      const formData = new FormData();

      const idade = parseInt(form.idade.value || 0);
      const tipo = form.tipoIdade.value;

      let totalMeses = 0;

      if (tipo === "anos") {
        totalMeses = idade * 12;
      } else {
        totalMeses = idade;
      }
      formData.append("nome", form.nome_pet.value);
      formData.append("fk_idespecie", parseInt(form.especie.value));
      formData.append("nomeRaca", form.raca.value);
      formData.append("fk_idsexopet", parseInt(form.sexo.value));
      formData.append("fk_idporte", parseInt(form.porte.value));
      formData.append("peso", parseFloat(form.peso.value) || 0);
      formData.append("idade", totalMeses); // Salva total em meses
      formData.append("descricao", form.sobre.value);
      formData.append("fk_idstatus", 1);

      const inputFoto = document.getElementById("fotopetatt");
      if (inputFoto && inputFoto.files[0]) {
        formData.append("fotopet", inputFoto.files[0]);
      }

      if (!controlarBotao()) {
        new MensagemFeedback("Preencha todos os campos corretamente", document.body).feedbackAlert();
        return;
      }

      try {
        const res = await fetch("http://localhost:6789/pets/pornome", {
          method: "POST",
          body: formData,
        });

        if (!res.ok) throw new Error("Falha ao salvar pet");

        new MensagemFeedback("Pet cadastrado com sucesso!", paiFeedback).feedbackSucess();

        setTimeout(() => {
          window.location.href = `ongPage.html?id=${new URLSearchParams(window.location.search).get("id") || 1}`;
        }, 2500);

      } catch (err) {
        new MensagemFeedback("Erro ao cadastrar: " + err.message, paiFeedback).feedbackError();
      }
    });
  }
});