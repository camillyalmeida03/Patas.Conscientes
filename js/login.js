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
  
    const email = document.getElementById('email').value;
    const erro1 = document.getElementById('erro1');
  
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    if (!regexEmail.test(email) || email.length <= 3) {
        erro1.textContent = 'Por favor, insira um email válido.';
    } else {
        erro1.style.display = 'none'; // Aqui você pode prosseguir com o envio do formulário
        // Para prosseguir com o envio, você pode usar:
        // this.submit();
    }
  });
  
  document.getElementById('formEntrar').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita o envio do formulário
  
   
    const email = document.getElementById('email').value;
    
    // Validação do e-mail: formato padrão
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!regexNome.test(nome) || nome.length <= 3) {
      nome.textContent = 'Por favor, insira um nome válido (apenas letras, mais de 3 letras).';
    } else if (!regexEmail.test(email)) {
      email.textContent = 'Por favor, insira um e-mail válido.';
    } else {
      submit.style.display = 'none'; // Aqui você pode prosseguir com o envio do formulário
      certo.textContent = 'Formulário enviado com sucesso!'; // Mensagem de sucesso
      certo.style.color = 'green'; // Altera a cor da mensagem para verde
      // Para prosseguir com o envio, você pode usar:
      // this.submit();
    }
  });