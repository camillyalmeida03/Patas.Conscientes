function atualizarContagem() {
  contagem.innerHTML = mensagem.value.length;
}

document.addEventListener("DOMContentLoaded", function () {
  const formu = document.getElementById("formParceiro");

  if (formu) {
    formu.addEventListener("submit", function (event) {
      event.preventDefault(); // Evita o envio do formulário inicialmente

      // Variável de controle de validade do formulário
      let formularioValido = true;

      // Validações independentes de cada campo
      if (!validarNomeOng()) formularioValido = false;
      if (!validarEmailOng()) formularioValido = false;
      if (!validarCnpj()) formularioValido = false;
      if (!validarNomeResponsavel()) formularioValido = false;
      if (!validarCpfResponsavel()) formularioValido = false;
      if (!validarEmailResponsavel()) formularioValido = false;
      if (!validarCep()) formularioValido = false;
      if (!validarEstado()) formularioValido = false;
      if (!validarCidade()) formularioValido = false;
      if (!validarBairro()) formularioValido = false;
      if (!validarNmr()) formularioValido = false;

      // Se o formulário não for válido, rola para o topo da página
      if (!formularioValido) {
        document
          .getElementById("mainFormParc")
          .scrollIntoView({ behavior: "smooth" });
      } else {
        // Redireciona para a próxima página caso o formulário seja válido
        window.location.href = "formularioparceiro2.html"; // Substitua pela URL desejada
      }
    });
  }

  // Funções de validação individuais
  function validarNomeOng() {
    const nomeOng = document.getElementById("nomeOng").value.trim();
    const erroNomeOng = document.getElementById("erro3");
    const regexNome = /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/;

    if (nomeOng === "") {
      erroNomeOng.innerHTML = "O campo Nome da ONG é obrigatório.";
      erroNomeOng.style.display = "block";
      return false;
    } else if (!regexNome.test(nomeOng) || nomeOng.length <= 3) {
      erroNomeOng.innerHTML = "Por favor, insira um nome válido.";
      erroNomeOng.style.display = "block";
      return false;
    } else {
      erroNomeOng.style.display = "none";
      return true;
    }
  }

  function validarEmailOng() {
    const emailOng = document.getElementById("emailOng").value.trim();
    const erroEmailOng = document.getElementById("erroEmail");
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailOng === "") {
      erroEmailOng.innerHTML = "O campo E-mail é obrigatório.";
      erroEmailOng.style.display = "block";
      return false;
    } else if (!regexEmail.test(emailOng)) {
      erroEmailOng.innerHTML = "Por favor, insira um e-mail válido.";
      erroEmailOng.style.display = "block";
      return false;
    } else {
      erroEmailOng.style.display = "none";
      return true;
    }
  }

  function validarCnpj() {
    const cnpj = document.getElementById("cnpj").value.trim();
    const erroCnpj = document.getElementById("erroCnpj");
    const regexCnpj = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;

    if (cnpj === "") {
      erroCnpj.innerHTML = "O campo CNPJ é obrigatório.";
      erroCnpj.style.display = "block";
      return false;
    } else if (!regexCnpj.test(cnpj)) {
      erroCnpj.innerHTML =
        "Por favor, insira um CNPJ válido (formato: XX.XXX.XXX/XXXX-XX).";
      erroCnpj.style.display = "block";
      return false;
    } else {
      erroCnpj.style.display = "none";
      return true;
    }
  }

  const cnpj = document.getElementById("cnpj");

  if (cnpj) {
    cnpj.addEventListener("input", function (e) {
      let value = e.target.value.replace(/\D/g, ""); // Remove tudo que não for número

      // Aplica a máscara de CNPJ: 00.000.000/0000-00
      if (value.length > 2) value = value.replace(/^(\d{2})(\d)/, "$1.$2");
      if (value.length > 5)
        value = value.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
      if (value.length > 8) value = value.replace(/\.(\d{3})(\d)/, ".$1/$2");
      if (value.length > 12) value = value.replace(/(\d{4})(\d)/, "$1-$2");

      e.target.value = value;
    });
  }

  function validarNomeResponsavel() {
    const nomeResponsavel = document.getElementById("nomeResp").value.trim();
    const erroNomeResponsavel = document.getElementById("erroNomeResponsavel");
    const regexNome = /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/;

    if (nomeResponsavel === "") {
      erroNomeResponsavel.innerHTML =
        "O campo Nome do Responsável é obrigatório.";
      erroNomeResponsavel.style.display = "block";
      return false;
    } else if (
      !regexNome.test(nomeResponsavel) ||
      nomeResponsavel.length <= 3
    ) {
      erroNomeResponsavel.innerHTML = "Por favor, insira um nome válido.";
      erroNomeResponsavel.style.display = "block";
      return false;
    } else {
      erroNomeResponsavel.style.display = "none";
      return true;
    }
  }

  function validarCpfResponsavel() {
    const cpfResponsavel = document.getElementById("cpf").value.trim();
    const erroCpfResponsavel = document.getElementById("erroCpfResponsavel");
    const regexCpf = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;

    if (cpfResponsavel === "") {
      erroCpfResponsavel.innerHTML = "O campo CPF é obrigatório.";
      erroCpfResponsavel.style.display = "block";
      return false;
    } else if (!regexCpf.test(cpfResponsavel)) {
      erroCpfResponsavel.innerHTML =
        "Por favor, insira um CPF válido (formato: XXX.XXX.XXX-XX).";
      erroCpfResponsavel.style.display = "block";
      return false;
    } else {
      erroCpfResponsavel.style.display = "none";
      return true;
    }
  }

  const cpf = document.getElementById("cpf");

  if (cpf) {
    cpf.addEventListener("input", function (e) {
      let value = e.target.value.replace(/\D/g, ""); // Remove tudo que não for número

      // Aplica a máscara de CPF: 000.000.000-00
      if (value.length > 3) value = value.replace(/^(\d{3})(\d)/, "$1.$2");
      if (value.length > 6)
        value = value.replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3");
      if (value.length > 9)
        value = value.replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3-$4");

      e.target.value = value;
    });
  }

  function validarEmailResponsavel() {
    const emailResponsavel = document.getElementById("emailResp").value.trim();
    const erroEmailResponsavel = document.getElementById(
      "erroEmailResponsavel"
    );
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailResponsavel === "") {
      erroEmailResponsavel.innerHTML =
        "O campo E-mail do Responsável é obrigatório.";
      erroEmailResponsavel.style.display = "block";
      return false;
    } else if (!regexEmail.test(emailResponsavel)) {
      erroEmailResponsavel.innerHTML = "Por favor, insira um e-mail válido.";
      erroEmailResponsavel.style.display = "block";
      return false;
    } else {
      erroEmailResponsavel.style.display = "none";
      return true;
    }
  }

  function validarCep() {
    const cep = document.getElementById("cep").value.trim();
    const erroCep = document.getElementById("erroCep");
    const regexCep = /^\d{5}-\d{3}$/;

    if (cep === "") {
      erroCep.innerHTML = "O campo CEP é obrigatório.";
      erroCep.style.display = "block";
      return false;
    } else if (!regexCep.test(cep)) {
      erroCep.innerHTML =
        "Por favor, insira um CEP válido (formato: XXXXX-XXX).";
      erroCep.style.display = "block";
      return false;
    } else {
      erroCep.style.display = "none";
      return true;
    }
  }

  function validarEstado() {
    const estado = document.getElementById("estado").value.trim();
    const erroEstado = document.getElementById("erroEstado");

    // Lista de estados brasileiros
    const estados = [
      "Acre",
      "AC",
      "Alagoas",
      "AL",
      "Amapá",
      "AP",
      "Amazonas",
      "AM",
      "Bahia",
      "BA",
      "Ceará",
      "CE",
      "Espírito Santo",
      "ES",
      "Goiás",
      "GO",
      "Maranhão",
      "MA",
      "Mato Grosso",
      "MT",
      "Mato Grosso do Sul",
      "MS",
      "Minas Gerais",
      "MG",
      "Pará",
      "PA",
      "Paraíba",
      "PB",
      "Paraná",
      "PR",
      "Pernambuco",
      "PE",
      "Piauí",
      "PI",
      "Rio de Janeiro",
      "RJ",
      "Rio Grande do Norte",
      "RN",
      "Rio Grande do Sul",
      "RS",
      "Rondônia",
      "RO",
      "Roraima",
      "RR",
      "Santa Catarina",
      "SC",
      "São Paulo",
      "SP",
      "Sergipe",
      "SE",
      "Tocantins",
      "TO",
    ];

    if (estado === "") {
      erroEstado.innerHTML = "O campo Estado é obrigatório.";
      erroEstado.style.display = "block";
      return false;
    }
    if (!estados.some((est) => est.toLowerCase() === estado.toLowerCase())) {
      erroEstado.innerHTML = "Por favor, insira um estado válido.";
      erroEstado.style.display = "block";
      return false;
    }
    erroEstado.style.display = "none";
    return true;
  }

  function validarCidade() {
    const cidade = document.getElementById("cidade").value.trim();
    const erroCidade = document.getElementById("erroCidade");
    const regexCidade = /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/;

    if (cidade === "") {
      erroCidade.innerHTML = "O campo Cidade é obrigatório.";
      erroCidade.style.display = "block";
      return false;
    } else if (!regexCidade.test(cidade)) {
      erroCidade.innerHTML = "Por favor, insira uma Cidade válida";
      erroCidade.style.display = "block";
      return false;
    } else {
      erroCidade.style.display = "none";
      return true;
    }
  }
  function validarBairro() {
    const bairro = document.getElementById("bairro").value.trim();
    const erroBairro = document.getElementById("erroBairro");
    const regexBairro = /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/;

    if (bairro === "") {
      erroBairro.innerHTML = "O campo Cidade é obrigatório.";
      erroBairro.style.display = "block";
      return false;
    } else if (!regexBairro.test(bairro)) {
      erroBairro.innerHTML = "Por favor, insira um Bairro válido";
      erroBairro.style.display = "block";
      return false;
    } else {
      erroBairro.style.display = "none";
      return true;
    }
  }
  function validarNmr() {
    const nmr = document.getElementById("nmr").value.trim();
    const erroNmr = document.getElementById("erroNmr");
    const regexNmr = /^[0-9]+[a-zA-Z0-9/-]*$/;

    if (nmr === "") {
      erroNmr.innerHTML = "O campo Número é obrigatório.";
      erroNmr.style.display = "block";
      return false;
    } else if (!regexNmr.test(nmr)) {
      erroNmr.innerHTML = "Por favor, insira um Número válido";
      erroNmr.style.display = "block";
      return false;
    } else {
      erroNmr.style.display = "none";
      return true;
    }
  }
});

const cep = document.getElementById("cep");

if (cep) {
  cep.addEventListener("blur", async function () {
    const cep = this.value.replace(/\D/g, ""); // remove hífen e não números

    if (cep.length !== 8) {
      document.getElementById("erroCep").textContent = "CEP inválido.";
      return;
    }

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();

      if (data.erro) {
        document.getElementById("erroCep").textContent = "CEP não encontrado.";
        return;
      }

      document.getElementById("erroCep").textContent = "";

      document.getElementById("logradouro").value = data.logradouro || "";
      document.getElementById("bairro").value = data.bairro || "";
      document.getElementById("cidade").value = data.localidade || "";
      document.getElementById("estado").value = data.uf || "";
      document.getElementById("complemento").value = data.complemento || "";
    } catch (error) {
      document.getElementById("erroCep").textContent = "Erro ao buscar o CEP.";
      console.error(error);
    }
  });

  cep.addEventListener("input", function (e) {
    let value = e.target.value.replace(/\D/g, ""); // Remove tudo que não for número

    // Aplica a máscara de CEP: 00000-000
    if (value.length > 5) value = value.replace(/^(\d{5})(\d)/, "$1-$2");

    e.target.value = value;
  });
}

// window.onload = () => {
//   // Verifica se os dados estão no localStorage
//   const dadosCadastro = JSON.parse(localStorage.getItem("dadosCadastro"));

//   if (dadosCadastro) {
//     // Preenche os campos do formulário com os dados salvos
//     document.getElementById("nomeOng").value = dadosCadastro.nome_ong;
//     document.getElementById("emailOng").value = dadosCadastro.email;
//     document.getElementById("cnpj").value = dadosCadastro.cnpj;
//     document.getElementById("nomeResp").value = dadosCadastro.nome_responsavel;
//     document.getElementById("emailResp").value = dadosCadastro.email;

//     // Caso queira preencher o CPF ou outras informações, adicione:
//     // document.getElementById("cpf").value = dadosCadastro.cpfResponsavel;
//   }
// };

// Adicione a lógica de envio do formulário para enviar as informações para a próxima parte
// const formParceiro = document.getElementById("formParceiro");
// formParceiro.addEventListener("submit", (event) => {
//   event.preventDefault(); // Evita o envio do formulário padrão

//   // Coleta os dados do segundo formulário
//   const nomeOng = document.getElementById("nomeOng").value;
//   const emailOng = document.getElementById("emailOng").value;
//   const cnpj = document.getElementById("cnpj").value;
//   const nomeResp = document.getElementById("nomeResp").value;
//   const cpf = document.getElementById("cpf").value;
//   const emailResp = document.getElementById("emailResp").value;

//   const cep = document.getElementById("cep").value;
//   const estado = document.getElementById("estado").value;
//   const cidade = document.getElementById("cidade").value;
//   const logradouro = document.getElementById("logradouro").value;
//   const bairro = document.getElementById("bairro").value;
//   const numero = document.getElementById("nmr").value;
//   const complemento = document.getElementById("complemento").value;

//   // Prepara os dados para o envio
//   const parceiroData = {
//     nome_ong: nomeOng,
//     email_ong: emailOng,
//     cnpj,
//     nome_responsavel: nomeResp,
//     cpf_responsavel: cpf,
//     email_responsavel: emailResp,
//     endereco: {
//       cep,
//       estado,
//       cidade,
//       logradouro,
//       bairro,
//       numero,
//       complemento,
//     },
//   };

//   // Enviar para o backend ou fazer qualquer outra lógica de envio
//   console.log(parceiroData);

//   // Caso queira fazer um POST para o backend:
//   fetch("http://localhost:4501/ongs/criar-ong", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(parceiroData), // Envia os dados como JSON
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       console.log("Sucesso:", data);
//       alert("Parceiro cadastrado com sucesso!");
//       // Limpa os campos ou redireciona para a próxima página
//       formParceiro.reset();
//     })
//     .catch((error) => {
//       console.error("Erro ao cadastrar parceiro:", error);
//       alert("Erro ao cadastrar parceiro. Tente novamente mais tarde.");
//     });
// });
