const formFinal = document.getElementById("cadastrarFormParceiro");

const dadosSalvos = JSON.parse(localStorage.getItem("usuario"));
console.log(dadosSalvos);

if (formFinal) {
  console.log("formFinal encontrado");

  formFinal.addEventListener("click", async (e) => {
    e.preventDefault();

    const mensagem = document.getElementById("mensagem").value;
    // const tipoCachorros = document.getElementById("cachorros").checked;
    // const tipoGatos = document.getElementById("gatos").checked;

    // const tipoPets = {
    //   cachorros: tipoCachorros,
    //   gatos: tipoGatos
    // };

    if (!dadosSalvos) {
      alert("Erro: dados do formulário não encontrados.");
      return;
    }

    const dadosParaEnvio = {
      ...dadosSalvos,
      cidade: dadosSalvos.endereco.id_cidade_fk, // 👈 necessário para o backend funcionar
      bairro: dadosSalvos.endereco.id_bairro_fk, // 👈 também pode ajudar
      rua: dadosSalvos.endereco.id_rua_fk,
      numero: dadosSalvos.endereco.numero,
      cep: dadosSalvos.endereco.cep,
      complemento: dadosSalvos.endereco.complemento,
      mensagem,
      // tipoPets
    };

    try {
      const response = await fetch("http://localhost:4501/ongs/ongs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dadosParaEnvio),
      });

      if (!response.ok) {
        const texto = await response.text(); // pega a mensagem bruta se não for JSON
        throw new Error(`Erro ${response.status}: ${texto}`);
      }

      const data = await response.json();

      if (response.ok) {
        alert(data.message || "Cadastro realizado com sucesso!");
        localStorage.removeItem("usuario");
        window.location.href = "ongPage.html"; // redireciona após sucesso
      } else {
        alert(data.message || "Erro ao cadastrar.");
      }
    } catch (error) {
      console.error("Erro ao enviar dados:", error);
      alert("Erro ao enviar dados. Tente novamente.");
    }
  });
}
