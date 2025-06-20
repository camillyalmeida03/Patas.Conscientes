console.log(localStorage.getItem("usuario"));

// Preenche o formulário automaticamente ao carregar a página
window.onload = () => {
  const dadosCadastro = JSON.parse(localStorage.getItem("usuario"));

  if (dadosCadastro) {
    document.getElementById("nomeOng").value = dadosCadastro.nome_ong || "";
    document.getElementById("emailOng").value = dadosCadastro.email || "";
    document.getElementById("cnpj").value = dadosCadastro.cnpj || "";
    document.getElementById("nomeResp").value =
      dadosCadastro.nome_responsavel || "";
    document.getElementById("emailResp").value = dadosCadastro.email || "";

    console.log("Todos os dados foram encontrados e preenchidos");
  }
};

const formParceiro = document.getElementById("formParceiro");

if (formParceiro) {
  formParceiro.addEventListener("submit", (e) => {
    e.preventDefault();

    // Captura valores do formulário
    const nomeOng = document.getElementById("nomeOng").value;
    const emailOng = document.getElementById("emailOng").value;
    const cnpj = document.getElementById("cnpj").value;
    const nomeResp = document.getElementById("nomeResp").value;
    const cpf = document.getElementById("cpf").value;
    const emailResp = document.getElementById("emailResp").value;
    const cep = document.getElementById("cep").value;
    const estado = document.getElementById("estado").value;
    const cidade = document.getElementById("cidade").value;
    const logradouro = document.getElementById("logradouro").value;
    const bairro = document.getElementById("bairro").value;
    const nmr = document.getElementById("nmr").value;
    const complemento = document.getElementById("complemento").value;

    // Monta o novo objeto
    const dadosParciais = {
      nome_ong: nomeOng,
      email_ong: emailOng,
      cnpj: cnpj,
      nome_responsavel: nomeResp,
      cpf_responsavel: cpf,
      email_responsavel: emailResp,
      endereco: {
        id_uf_fk: estado,
        id_cidade_fk: cidade,
        id_bairro_fk: bairro,
        id_rua_fk: logradouro,
        numero: nmr,
        cep: cep,
        complemento: complemento,
      },
    };

    // Mescla com dados anteriores
    let dadosAnteriores = JSON.parse(localStorage.getItem("usuario")) || {};
    dadosAnteriores = { ...dadosAnteriores, ...dadosParciais };

    // Atualiza o localStorage
    localStorage.setItem("usuario", JSON.stringify(dadosAnteriores));
    console.log("Dados atualizados:", localStorage.getItem("usuario"));

    // Redireciona para a próxima página
    window.location.href = "formularioparceiro2.html";
  });
}
