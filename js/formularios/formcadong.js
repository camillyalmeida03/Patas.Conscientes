document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("formOng");

  // Aplica máscara nos campos
  aplicarMascaraInput("cnpj", "cnpj");
  aplicarMascaraInput("tel", "tel");
  aplicarMascaraInput("cel", "cel");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    let formularioValido = true;

    if (!validarNomeOng()) formularioValido = false;
    if (!validarCnpj()) formularioValido = false;
    if (!validarNomeResponsavel()) formularioValido = false;
    if (!validarTel()) formularioValido = false;
    if (!validarCel()) formularioValido = false;
    if (!validarEmail()) formularioValido = false;
    if (!validarSenha()) formularioValido = false;
    if (!validarSenha2()) formularioValido = false;

    if (!formularioValido) {
      document
        .getElementById("MainFormCadOng")
        .scrollIntoView({ behavior: "smooth" });
    } else {
      // window.location.href = "index.html";
    }
  });

  // Função de máscara que não trava o backspace
  function aplicarMascaraInput(id, tipo) {
    const input = document.getElementById(id);
    input.addEventListener("input", () => {
      let valor = input.value.replace(/\D/g, "");

      if (tipo === "cnpj") {
        valor = valor.substring(0, 14);
        valor = valor.replace(/^(\d{2})(\d)/, "$1.$2");
        valor = valor.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
        valor = valor.replace(/\.(\d{3})(\d)/, ".$1/$2");
        valor = valor.replace(/(\d{4})(\d{1,2})$/, "$1-$2");
      }

      if (tipo === "tel" || tipo === "cel") {
        valor = valor.substring(0, 11);
        if (valor.length <= 10) {
          valor = valor.replace(/(\d{2})(\d)/, "($1) $2");
          valor = valor.replace(/(\d{4})(\d)/, "$1-$2");
        } else {
          valor = valor.replace(/(\d{2})(\d)/, "($1) $2");
          valor = valor.replace(/(\d{5})(\d)/, "$1-$2");
        }
      }

      input.value = valor;
    });
  }

  // [Suas funções de validação continuam iguais...]

  function validarNomeOng() {
    const nomeOng = document.getElementById("nomeOng").value.trim();
    const erroNomeOng = document.getElementById("erroNome");
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

  function validarTel() {
    const telefone = document.getElementById("tel").value.trim();
    const erroTelefone = document.getElementById("erroTelefone");
    const regexTelefone = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;

    if (telefone === "") {
      erroTelefone.innerHTML = "O campo Telefone é obrigatório.";
      erroTelefone.style.display = "block";
      return false;
    } else if (!regexTelefone.test(telefone)) {
      erroTelefone.innerHTML =
        "Por favor, insira um telefone válido (formato: (XX) XXXX-XXXX ou (XX) XXXXX-XXXX).";
      erroTelefone.style.display = "block";
      return false;
    } else {
      erroTelefone.style.display = "none";
      return true;
    }
  }

  function validarCel() {
    const cel = document.getElementById("cel").value.trim();
    const erroCel = document.getElementById("erroCel");
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

  function validarEmail() {
    const emailResponsavel = document.getElementById("emailCad").value.trim();
    const erroEmailResponsavel = document.getElementById("erroEmail");
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

  function validarSenha() {
    const senha = document.getElementById("senha").value;
    const erroSenha = document.getElementById("erroSenha");
    const regexSenha =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (senha === "") {
      erroSenha.innerHTML = "O campo senha é obrigatório.";
      erroSenha.style.display = "block";
      return false;
    } else if (!regexSenha.test(senha)) {
      erroSenha.innerHTML =
        "A senha deve ter no mínimo 8 caracteres, incluir pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial.";
      erroSenha.style.display = "block";
      return false;
    } else {
      erroSenha.style.display = "none";
      return true;
    }
  }

  function validarSenha2() {
    const senha = document.getElementById("senha").value.trim();
    const confirmarSenha = document
      .getElementById("confirmarSenha")
      .value.trim();
    const erroSenha = document.getElementById("erroSenha2");

    if (senha === "") {
      erroSenha.innerHTML = "O campo Senha é obrigatório.";
      erroSenha.style.display = "block";
      return false;
    } else if (senha !== confirmarSenha) {
      erroSenha.innerHTML = "As senhas não coincidem.";
      erroSenha.style.display = "block";
      return false;
    } else {
      erroSenha.style.display = "none";
      return true;
    }
  }
});

// conexão com o banco de dados

// const cadastroForm = document.getElementById('formOng');
// const verificacaoContainer = document.getElementById('verificacaoContainer');
// const verificarCodigoBtn = document.getElementById('verificarCodigoBtn');
// const codigoVerificacaoInput = document.getElementById('codigoVerificacao');

// let codigoGerado = null;
// let dadosTemporarios = {}; // para guardar os dados até verificar

// cadastroForm.addEventListener('submit', async (e) => {
//   e.preventDefault();

//   const nome = document.getElementById('nomeResp').value;
//   const cnpj = document.getElementById('cnpj').value;
//   const nome_ong = document.getElementById('nomeOng').value;
//   const telefone = document.getElementById('tel').value;
//   const celular = document.getElementById('cel').value;
//   const email = document.getElementById('emailCad').value;
//   const senha = document.getElementById('confirmarSenha').value;
//   const tipo = "ong"; // Tipo fixo para ong

//   // Salva para depois usar na criação
//   dadosTemporarios = { nome, cnpj, nome_ong, telefone, celular, email, senha, tipo };

//   try {
//     const response = await fetch('http://localhost:4501/usuarios/solicitar-criacao', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ nome, cnpj, nome_ong, telefone, celular, email, senha, tipo })
//     });

//     const data = await response.json();

//     if (!response.ok) {
//       alert('Erro ao solicitar verificação: ' + data.message);
//       return;
//     }

//     codigoGerado = data.codigo; // salvar o código enviado
//     verificacaoContainer.style.display = 'block'; // mostra o campo de verificação

//   } catch (err) {
//     alert("Erro: " + err.message);
//   }
// });

// // Verificação do código
// verificarCodigoBtn.addEventListener('click', async () => {
//   const codigoDigitado = codigoVerificacaoInput.value;

//   if (codigoDigitado != codigoGerado) {
//     alert("Código incorreto!");
//     return;
//   }
//   console.log("Dados temporários:", dadosTemporarios);

//   const formData = new FormData();
//     formData.append("nome", dadosTemporarios.nome);
//     formData.append("cnpj", dadosTemporarios.cnpj);
//     formData.append("nome_ong", dadosTemporarios.nome_ong);
//     formData.append("telefone", dadosTemporarios.telefone);
//     formData.append("celular", dadosTemporarios.celular);
//     formData.append("email", dadosTemporarios.email);
//     formData.append("senha", dadosTemporarios.senha);
//     formData.append("tipo", dadosTemporarios.tipo);

//   try {
//     const finalResponse = await fetch('http://localhost:4501/usuarios/criar-ong', {
//       method: 'POST',
//       body: formData
//     });

//     const finalData = await finalResponse.json();

//     if (finalResponse.ok) {
//       alert("Conta criada com sucesso!");
//       cadastroForm.reset();
//       verificacaoContainer.style.display = 'none';
//       codigoVerificacaoInput.value = '';
//     //   document.getElementById('sign-up-modal').style.display = 'none'; // Esconde o formulário de cadastro
//     } else {
//       alert("Erro ao criar conta: " + finalData.message);
//     }
//   } catch (err) {
//     alert("Erro ao criar conta: " + err.message);
//   }
// });

// });
