const formFinal = document.getElementById("cadastrarFormParceiro");

const dadosSalvos = JSON.parse(localStorage.getItem("usuario"));
console.log(dadosSalvos);

if (formFinal) {
  console.log("formFinal encontrado");

  formFinal.addEventListener("click", async (e) => {
    e.preventDefault();

    if (!dadosSalvos) {
      document.getElementById("mensagemcriacaodeconta").textContent = "Erro: dados do formulário não encontrados.";
      return;
    }

    const dadosParaEnvio = {
      ...dadosSalvos,
      cidade: dadosSalvos.endereco.id_cidade_fk,
      bairro: dadosSalvos.endereco.id_bairro_fk,
      rua: dadosSalvos.endereco.id_rua_fk,
      numero: dadosSalvos.endereco.numero,
      cep: dadosSalvos.endereco.cep,
      complemento: dadosSalvos.endereco.complemento,
      descricao: document.getElementById("mensagem").value // ✅ aqui está certo agora
    };

    try {
      const response = await fetch("http://localhost:4501/ongs/ongs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dadosParaEnvio),
      });

      if (!response.ok) {
        const texto = await response.text();
        throw new Error(`Erro ${response.status}: ${texto}`);
      }

      const data = await response.json();

      document.getElementById("mensagemcriacaodeconta").textContent = data.message || "Cadastro realizado com sucesso!";
      localStorage.removeItem("usuario");
      window.location.href = `ongs.html`;
    } catch (error) {
      console.error("Erro ao enviar dados:", error);
      document.getElementById("mensagemcriacaodeconta").textContent = "Erro ao enviar dados. Tente novamente.";
    }
  });
}
