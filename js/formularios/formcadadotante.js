document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("formAdotante");

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Evita o envio do formulário inicialmente

    // Variável de controle de validade do formulário
    let formularioValido = true;

    // Validações independentes de cada campo
    if (!validarNomeAdotante()) formularioValido = false;
    if (!validarEmail()) formularioValido = false;
    if (!validarTel()) formularioValido = false;
    if (!validarCel()) formularioValido = false;
    if (!validarCpf()) formularioValido = false;
    if (!validarSenhas()) formularioValido = false;
    if (!validarGenero()) formularioValido = false;
    if (!validarDataNasc()) formularioValido = false;

    // Se o formulário não for válido, rola para o topo da página
    if (!formularioValido) {
      document
        .getElementById("MainFormCadAdotante")
        .scrollIntoView({ behavior: "smooth" });
    } else {
      criarContaAdotante(); // Chama a função para criar a conta adotante
      // Redireciona para a próxima página caso o formulário seja válido
      // window.location.href = "index.html"; // Substitua pela URL desejada
    }
  });

  function validarGenero() {
    const genero = document.getElementById("genero");
    const erroGenero = document.getElementById("erroGenero");
    const valorGenero = genero.value;

    if (valorGenero === "") {
      erroGenero.innerHTML = "Por favor, selecione seu gênero.";
      erroGenero.style.display = "block";
      return false;
    } else {
      erroGenero.style.display = "none";
      return true;
    }
  }

  function validarDataNasc() {
    const dataNasc = document.getElementById("dataNasc");
    const erroDataNasc = document.getElementById("erroDataNasc");
    const valorDataNasc = dataNasc.value;

    if (valorDataNasc === "") {
      erroDataNasc.innerHTML = "Por favor, selecione sua data de nascimento.";
      erroDataNasc.style.display = "block";
      return false;
    } else {
      erroDataNasc.style.display = "none";
      return true;
    }
  }

  // Funções de validação individuais
  function validarNomeAdotante() {
    const nomeOng = document.getElementById("nomeAdt").value.trim();
    const erroNomeOng = document.getElementById("erroNomeAdt");
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
  function validarEmail() {
    const emailAdt = document.getElementById("emailAdt").value.trim();
    const erroEmail = document.getElementById("erroEmailAdt");
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailAdt === "") {
      erroEmail.innerHTML = "O campo E-mail do Responsável é obrigatório.";
      erroEmail.style.display = "block";
      return false;
    } else if (!regexEmail.test(emailAdt)) {
      erroEmail.innerHTML = "Por favor, insira um e-mail válido.";
      erroEmail.style.display = "block";
      return false;
    } else {
      erroEmail.style.display = "none";
      return true;
    }
  }

  // function validarTel() {
  //     const telefone = document.getElementById('telAdt').value.trim();
  //     const erroTelefone = document.getElementById('erroTelAdt');

  //     // Expressão regular para validar um número de telefone no formato (XX) XXXXX-XXXX
  //     const regexTelefone = /^\(\d{2}\)\s\d{5}-\d{4}$/;

  //     if (telefone === '') {
  //         erroTelefone.innerHTML = 'O campo Telefone é obrigatório.';
  //         erroTelefone.style.display = 'block';
  //         return false;
  //     } else if (!regexTelefone.test(telefone)) {
  //         erroTelefone.innerHTML = 'Por favor, insira um telefone válido (formato: (XX) XXXXX-XXXX).';
  //         erroTelefone.style.display = 'block';
  //         return false;
  //     } else {
  //         erroTelefone.style.display = 'none';
  //         return true;
  //         }
  // }
  function validarTel() {
    const telefone = document.getElementById("telAdt");
    const erroTelefone = document.getElementById("erroTelAdt");
    let valorTelefone = telefone.value.trim();

    // Remover formatação para validar apenas números
    const telefoneSemFormatacao = valorTelefone.replace(/[^\d]/g, "");

    // Validação: Verificar se contém exatamente 11 dígitos
    if (telefoneSemFormatacao.length !== 11) {
      erroTelefone.innerHTML =
        "Por favor, insira um telefone válido com 11 dígitos.";
      erroTelefone.style.display = "block";
      return false;
    }

    // Caso seja válido, limpar mensagem de erro
    erroTelefone.style.display = "none";
    return true;
  }

  document.getElementById("telAdt").addEventListener("input", function (e) {
    let value = e.target.value.replace(/\D/g, ""); // Remove tudo que não for número

    // Aplica a máscara de telefone fixo: (XX) XXXX-XXXX
    if (value.length > 2) value = value.replace(/^(\d{2})(\d)/, "($1) $2");
    if (value.length > 6) value = value.replace(/(\d{4})(\d)/, "$1-$2");

    e.target.value = value;
  });

  function validarCel() {
    const cel = document.getElementById("celAdt").value.trim();
    const erroCel = document.getElementById("erroCelAdt");

    // Expressão regular para validar um número de telefone no formato (XX) XXXXX-XXXX
    const regexCel = /^\(\d{2}\)\s\d{5}-\d{4}$/;

    if (cel === "") {
      erroCel.innerHTML = "O campo Celular é obrigatório.";
      erroCel.style.display = "block";
      return false;
    } else if (!regexCel.test(cel)) {
      erroCel.innerHTML =
        "Por favor, insira um celular válido (formato: (XX) XXXXX-XXXX).";
      erroCel.style.display = "block";
      return false;
    } else {
      erroCel.style.display = "none";
      return true;
    }
  }

  document.getElementById("celAdt").addEventListener("input", function (e) {
    let value = e.target.value.replace(/\D/g, ""); // Remove tudo que não for número

    // Aplica a máscara de celular: (XX) 9XXXX-XXXX
    if (value.length > 2) value = value.replace(/^(\d{2})(\d)/, "($1) $2");
    if (value.length > 7) value = value.replace(/(\d{5})(\d)/, "$1-$2");

    e.target.value = value;
  });

  function validarCpf() {
    const cpfAdt = document.getElementById("cpfAdt").value.trim();
    const erroCpfAdt = document.getElementById("erroCpfAdt");
    const regexCpf = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;

    if (cpfAdt === "") {
      erroCpfAdt.innerHTML = "O campo CPF é obrigatório.";
      erroCpfAdt.style.display = "block";
      return false;
    } else if (!regexCpf.test(cpfAdt)) {
      erroCpfAdt.innerHTML =
        "Por favor, insira um CPF válido (formato: XXX.XXX.XXX-XX).";
      erroCpfAdt.style.display = "block";
      return false;
    } else {
      erroCpfAdt.style.display = "none";
      return true;
    }
  }

  document.getElementById("cpfAdt").addEventListener("input", function (e) {
    let value = e.target.value.replace(/\D/g, ""); // Remove tudo que não for número

    // Aplica a máscara
    if (value.length > 3) value = value.replace(/^(\d{3})(\d)/, "$1.$2");
    if (value.length > 6)
      value = value.replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3");
    if (value.length > 9)
      value = value.replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3-$4");

    e.target.value = value;
  });

  function validarSenhas() {
    const senha = document.getElementById("senhaAdt").value.trim();
    const confirmar = document.getElementById("confirmaSenhaAdt").value.trim();
    const erroSenha = document.getElementById("erroSenhaAdt");
    const erroConfirmar = document.getElementById("erroConfirSenhaAdt");

    const regexSenha =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    let valido = true;

    // Verifica se a senha está vazia
    if (senha === "") {
      erroSenha.innerHTML = "O campo senha é obrigatório.";
      erroSenha.style.display = "block";
      valido = false;
    } else if (!regexSenha.test(senha)) {
      erroSenha.innerHTML =
        "A senha deve ter no mínimo 8 caracteres, incluindo uma letra maiúscula, uma minúscula, um número e um caractere especial.";
      erroSenha.style.display = "block";
      valido = false;
    } else {
      erroSenha.style.display = "none";
    }

    // Verifica se a confirmação está vazia ou diferente da senha
    if (confirmar === "") {
      erroConfirmar.innerHTML = "O campo de confirmação é obrigatório.";
      erroConfirmar.style.display = "block";
      valido = false;
    } else if (senha !== confirmar) {
      erroConfirmar.innerHTML = "As senhas não coincidem.";
      erroConfirmar.style.display = "block";
      valido = false;
    } else {
      erroConfirmar.style.display = "none";
    }

    return valido;
  }
});

// // conexão com o banco de dados

const cadastroForm = document.getElementById("formAdotante");
const verificacaoContainer = document.getElementById("verificacaoContainer");
// Removido: const verificarCodigoBtn = document.getElementById('verificarCodigoBtn');
// Removido: const codigoVerificacaoInput = document.getElementById('codigoVerificacao');

let dadosTemporarios = {}; // para guardar os dados até enviar

async function criarContaAdotante() {
  const nome = document.getElementById("nomeAdt").value;
  const email = document.getElementById("emailAdt").value;
  const telefone = document.getElementById("telAdt").value;
  const celular = document.getElementById("celAdt").value;
  const sexo = document.getElementById("genero").value;
  const data_nascimento = document.getElementById("dataNasc").value;
  const cpf = document.getElementById("cpfAdt").value;
  const senha = document.getElementById("confirmaSenhaAdt").value;
  const tipo = "adotante";

  const formData = new FormData();
  formData.append("nome", nome);
  formData.append("email", email);
  formData.append("telefone", telefone);
  formData.append("celular", celular);
  formData.append("sexo", sexo);
  formData.append("data_nascimento", data_nascimento);
  formData.append("cpf", cpf);
  formData.append("senha", senha);
  formData.append("tipo", tipo);

  try {
    const response = await fetch(
      "http://localhost:4501/usuarios/criar-adotante",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();

    if (response.ok) {
      // Se a conta foi criada com sucesso, exibe uma mensagem de sucesso
      document.getElementById("mensagemcriacaodeconta").innerText = "Conta criada com sucesso!";
      document.getElementById("mensagemcriacaodeconta").style.color = "green";
      document.getElementById("formAdotante").reset();
      document.getElementById("verificacaoContainer").style.display = "none";
    } else {
      document.getElementById("mensagemcriacaodeconta").innerText = "Erro ao criar conta: " + data.message;
      document.getElementById("mensagemcriacaodeconta").style.color = "red";
    }
  } catch (err) {
    document.getElementById("mensagemcriacaodeconta").innerText = "Erro ao criar conta: " + err.message;
  }
}
