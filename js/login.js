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
      window.location.href = 'index.html';
    }
  }
  );

 // Seleciona o botão e o campo de senha
const togglePasswordButton = document.getElementById("togglePassword");
const passwordField = document.getElementById("senhaEntrar");
const eyeIcon = document.getElementById("olho");

togglePasswordButton.addEventListener("click", function (event) {
  event.preventDefault(); // Evita o envio do formulário ao clicar no botão
  
  // Alterna o tipo de campo entre "password" e "text"
  const isPassword = passwordField.getAttribute("type") === "password";
  passwordField.setAttribute("type", isPassword ? "text" : "password");
  
  // Alterna a imagem do olho entre aberto e fechado
  eyeIcon.setAttribute("src", isPassword ? "img/icons/olhofechado.svg" : "img/icons/olhoaberto.svg");
  eyeIcon.setAttribute("alt", isPassword ? "Esconder senha" : "Mostrar senha");
});

