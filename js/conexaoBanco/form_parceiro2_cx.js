const formFinal = document.getElementById("cadastrarFormParceiro");

if (formFinal) {
  console.log("formFinal encontrado");

  formFinal.addEventListener("click", (e) => {
    e.preventDefault();

    // Pega os dados do formulário
    const mensagem = document.getElementById("mensagem").value;
    // const arquivo = document.getElementById("arquivo").files[0];'
    const tipoCachorros = document.getElementById("cachorros").checked;
    const tipoGatos = document.getElementById("gatos").checked;
    // const tipoOutros = document.getElementById("outros").checked;
    // const especificar = document.getElementById("especificar").value;

    // Monta o objeto tipoPets com os tipos de pets selecionados
    const tipoPets = {
      cachorros: tipoCachorros,
      gatos: tipoGatos,
      // outros: tipoOutros,
      // especificar: tipoOutros ? especificar : ""
    };

    // Pega os dados salvos no localStorage
    const dadosSalvos = JSON.parse(localStorage.getItem("usuario"));

    // Formata os dados para envio
    const formData = new FormData();
    formData.append("nome_ong", dadosSalvos.nome_ong);
    formData.append("email_ong", dadosSalvos.email_ong);
    formData.append("cnpj", dadosSalvos.cnpj);
    formData.append("nome_responsavel", dadosSalvos.nome_responsavel);
    formData.append("cpf", dadosSalvos.cpf_responsavel);
    formData.append("email_responsavel", dadosSalvos.email_responsavel);
    formData.append("endereco", JSON.stringify(dadosSalvos.endereco));
    formData.append("mensagem", mensagem);
    formData.append("tipoPets", JSON.stringify(tipoPets));

    // Adiciona o arquivo
    formData.append("foto", arquivo);

    //   // Envia os dados para a API
    //   fetch("/api/registrar", {
    //     method: "POST",
    //     body: formData,
    //   })
    //     .then((response) => response.json())
    //     .then((data) => {
    //       if (data.message) {
    //         alert(data.message);
    //         localStorage.removeItem("usuario"); // Limpa o localStorage após o envio
    //         window.location.href = "ongPage.html"; // Redireciona após sucesso
    //       }
    //     })
    //     .catch((error) => {
    //       console.error("Erro ao enviar dados:", error);
    //       alert("Erro ao enviar dados. Tente novamente.");
    //     });
  });
}
