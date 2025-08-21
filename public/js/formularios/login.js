window.addEventListener("load", paginacarregada);

function paginacarregada(){

    let entrarCard = document.getElementById("entrarCard");
    let cadastroCard = document.getElementById("cadastroCard");
    let acssCadastrar = document.getElementById("acssCadastrar");
    let acssEntrar = document.getElementById("acssEntrar");

    acssCadastrar.addEventListener("click", function(){
        event.preventDefault();
        entrarCard.style.display = 'none';
        cadastroCard.style.display = 'flex';
    })

    acssEntrar.addEventListener("click", function(){
        event.preventDefault();
        entrarCard.style.display = 'flex';
        cadastroCard.style.display = 'none';
    })



}

// Validação do formulário
  
  document.getElementById('formEntrar').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita o envio do formulário
  
    const email = document.getElementById('email2').value;
    const erro1 = document.getElementById('erro1');
  
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    if (!regexEmail.test(email) || email.length <= 3) {
        erro1.textContent = 'Por favor, insira um email válido.';
    } else {
        erro1.style.display = 'none'; 
    }
  });

  //Validação senha
  document.getElementById('formEntrar').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita o envio do formulário
  
    const senhaEntrar = document.getElementById('senhaEntrar').value;
    const erro2 = document.getElementById('erro2');
  
    if (senhaEntrar !== '12345') {
        erro2.textContent = 'Por favor, insira uma senha válida.';
    } else {
        erro2.style.display = 'none'; 
    }
  });
  
  //Botão confirmar
  document.getElementById('formEntrar').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita o envio do formulário
  
   
    const email = document.getElementById('email2').value;
    const senhaEntrar = document.getElementById('senhaEntrar').value;
    
    // Validação do e-mail: formato padrão
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!regexEmail.test(email)) {
      email.textContent = 'Por favor, insira um e-mail válido.';
    } else if ( senhaEntrar !== '12345') {
      senhaEntrar.textContent = 'Por favor, insira uma senha válida.';
    }else {
      // window.location.href = 'index.html';
    }
  }
  );

//  // Seleciona o botão e o campo de senha
// const togglePasswordButton = document.getElementById("togglePassword");
// const passwordField = document.getElementById("senhaEntrar");
// const eyeIcon = document.getElementById("olho");

// togglePasswordButton.addEventListener("click", function (event) {
//   event.preventDefault(); // Evita o envio do formulário ao clicar no botão
  
//   // Alterna o tipo de campo entre "password" e "text"
//   const isPassword = passwordField.getAttribute("type") === "password";
//   passwordField.setAttribute("type", isPassword ? "text" : "password");
  
//   // Alterna a imagem do olho entre aberto e fechado
//   eyeIcon.setAttribute("src", isPassword ? "/public/img/icons/olhofechado.svg" : "/public/img/icons/olhoaberto.svg");
//   eyeIcon.setAttribute("alt", isPassword ? "Esconder senha" : "Mostrar senha");
// });

// const togglePassword = document.getElementById("togglePassword");
// const senhaInput = document.getElementById("senhaEntrar");
// const olhoIcon = document.getElementById("olho");

// if (togglePassword && senhaInput && olhoIcon) {
//     togglePassword.addEventListener("click", function () {
//         const isPassword = senhaInput.getAttribute("type") === "password";
//         senhaInput.setAttribute("type", isPassword ? "text" : "password");
//         olhoIcon.src = isPassword ? "/public/img/icons/olhoaberto.svg" : "/public/img/icons/olhofechado.svg";
//         olhoIcon.title = isPassword ? "Ocultar senha" : "Mostrar senha";
//     });
// }

// conexão com o banco de dados
// function alterarBotao() {
//   let botao = document.getElementById("botaoentrarlogin");
//   botao.disabled = true; // Desabilita o botão para evitar múltiplos cliques
//   botao.textContent = "Carregando..."; // Altera o texto do botão
// }


// const loginForm = document.getElementById("formEntrar");
// loginForm.addEventListener("submit", async (e) => {
//   e.preventDefault();

//   const email = document.getElementById("email2").value;
//   const senha = document.getElementById("senhaEntrar").value;

//   try {
//     const response = await fetch("http://localhost:4501/usuarios/login", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ email, senha }),
//     });

//     const data = await response.json();

//     if (response.ok && data.usuario) {
//       // Escolha só os dados que você quer salvar
//       const usuarioSeguro = {
//         id: data.usuario.id,
//         nome: data.usuario.nome,
//         foto: data.usuario.foto,
//         tema: data.usuario.tema,
//         acessibilidade_ativa: data.usuario.acessibilidade_ativa,
//       };

//       localStorage.setItem("usuarioLogado", JSON.stringify(usuarioSeguro));
//       window.location.href = "/index.html";
//     } else {
//       alert("Email ou senha inválidos.");
//     }
//   } catch (err) {
//     alert("Erro na requisição: " + err.message);
//   }
// });

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById("formEntrar");
    const loginButton = document.getElementById("botaoentrarlogin");
    const originalButtonText = loginButton.textContent; // Salva o texto original do botão

    if (loginForm) {
        loginForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const emailInput = document.getElementById("email2");
            const senhaInput = document.getElementById("senhaEntrar");
            const erro1 = document.getElementById("erro1");
            const erro2 = document.getElementById("erro2");

            // Limpa mensagens de erro anteriores
            if (erro1) erro1.textContent = "";
            if (erro2) erro2.textContent = "";

            const email = emailInput.value;
            const senha = senhaInput.value;

            // Validação básica no frontend (opcional, mas recomendada)
            if (!email) {
                if (erro1) erro1.textContent = "Por favor, digite seu e-mail.";
                emailInput.focus();
                return;
            }
            if (!senha) {
                if (erro2) erro2.textContent = "Por favor, digite sua senha.";
                senhaInput.focus();
                return;
            }

            // Desabilita o botão e mostra "Carregando..."
            loginButton.disabled = true;
            loginButton.textContent = "Carregando...";

            try {
                const response = await fetch("http://localhost:4501/usuarios/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, senha }),
                });

                const data = await response.json();

                if (response.ok && data.usuario) {
                    // Escolha só os dados que você quer salvar
                    const usuarioSeguro = {
                        id: data.usuario.id,
                        nome: data.usuario.nome,
                        foto: data.usuario.foto,
                        tema: data.usuario.tema,
                        acessibilidade_ativa: data.usuario.acessibilidade_ativa,
                    };

                    localStorage.setItem("usuarioLogado", JSON.stringify(usuarioSeguro));
                    window.location.href = "/index.html";
                    // Não é necessário reabilitar o botão aqui, pois a página será redirecionada
                } else {
                    // Se a resposta não for ok ou não tiver data.usuario, trata como erro de login
                    const errorMessage = data.message || "Email ou senha inválidos.";
                    
                    // Exibe a mensagem de erro. Você pode direcionar para erro1 ou erro2
                    // ou um campo de erro geral.
                    if (erro2) { // Exemplo: mostrar erro genérico abaixo da senha
                        erro2.textContent = errorMessage;
                    } else {
                        // Fallback caso erro2 não exista, use um alert (embora menos ideal)
                        // Idealmente, você teria um local específico para erros gerais do formulário.
                        // Removi o alert() para seguir as boas práticas.
                        console.error("Erro no login:", errorMessage);
                        // Considere adicionar um elemento de mensagem de erro geral no seu HTML
                        // e atualizá-lo aqui.
                    }
                    
                    // Reabilita o botão e restaura o texto original em caso de falha no login
                    loginButton.disabled = false;
                    loginButton.textContent = originalButtonText;
                }
            } catch (err) {
                console.error("Erro na requisição:", err);
                if (erro2) { // Exemplo: mostrar erro genérico abaixo da senha
                    erro2.textContent = "Erro ao tentar conectar. Tente novamente.";
                } else {
                    // Fallback
                    // Removi o alert()
                    console.error("Erro na requisição: " + err.message);
                }
                
                // Reabilita o botão e restaura o texto original em caso de erro na requisição
                loginButton.disabled = false;
                loginButton.textContent = originalButtonText;
            }
        });
    }

    // Lógica para mostrar/ocultar senha (se já não estiver implementada em outro lugar)
    const togglePassword = document.getElementById("togglePassword");
    const senhaInput = document.getElementById("senhaEntrar");
    const olhoIcon = document.getElementById("olho"); // Assumindo que o ID da tag <img> é "olho"

    if (togglePassword && senhaInput && olhoIcon) {
        togglePassword.addEventListener("click", function () {
            const type = senhaInput.getAttribute("type") === "password" ? "text" : "password";
            senhaInput.setAttribute("type", type);

            // Altera o ícone do olho
            if (type === "password") {
                olhoIcon.src = "/public/img/icons/olhofechado.svg";
                olhoIcon.title = "Mostrar senha";
            } else {
                olhoIcon.src = "/public/img/icons/olhoaberto.svg"; // Certifique-se que este ícone existe
                olhoIcon.title = "Ocultar senha";
            }
        });
    }
});


