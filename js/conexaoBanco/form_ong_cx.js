const formOng = document.getElementById("formOng");

if (formOng) {
  console.log("Aqui tem o form");
  formOng.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("botão funcionando");

    // Pega os valores
    const nomeOng = document.getElementById("nomeOng").value.trim();
    const cnpj = document.getElementById("cnpj").value.trim();
    const nomeResp = document.getElementById("nomeResp").value.trim();
    const telefone = document.getElementById("tel").value.trim();
    const celular = document.getElementById("cel").value.trim();
    const email = document.getElementById("emailCad").value.trim();
    const senha = document.getElementById("senha").value.trim();
    const confirmarSenha = document.getElementById("confirmarSenha").value.trim();

    // Verifica se todos os campos foram preenchidos
    if (
      !nomeOng ||
      !cnpj ||
      !nomeResp ||
      !telefone ||
      !celular ||
      !email ||
      !senha ||
      !confirmarSenha
    ) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    // Verifica se as senhas coincidem
    if (senha !== confirmarSenha) {
      document.getElementById("erroSenha2").textContent = "As senhas não coincidem.";
      return;
    } else {
      document.getElementById("erroSenha2").textContent = "";
    }

    // Monta o objeto com os dados
    const dadosParciais = {
      nome_ong: nomeOng,
      cnpj: cnpj,
      nome_responsavel: nomeResp,
      telefone: telefone,
      celular: celular,
      email: email,
      senha: senha,
    };

    // Salva no localStorage
    localStorage.setItem("usuario", JSON.stringify(dadosParciais));

    console.log(localStorage.getItem("usuario"));

    // Vai para a próxima página
    window.location.href = "formularioparceiro.html";
  });
}
