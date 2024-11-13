window.addEventListener("load", paginacarregada);

function paginacarregada(){

let formParceiro1 = document.getElementById("formParceiro1");
let formParceiro2 = document.getElementById("formParceiro2");
let continuarFormParc = document.getElementById("continuarFormParc");
let cadastrarFormParceiro = document.getElementById("cadastrarFormParceiro");

continuarFormParc.addEventListener("click", function(){
    event.preventDefault();
    
    formParceiro1.style.display = 'none';
    formParceiro2.style.display = 'flex';
})

cadastrarFormParceiro.addEventListener("click", function(){
    event.preventDefault();
    
    formParceiro1.style.display = 'flex';
    formParceiro2.style.display = 'none';
})
}

function atualizarContagem() {
    contagem.innerHTML = mensagem.value.length;
  }

// Validação do formulário campo nome

document.addEventListener('DOMContentLoaded', function () {  
document.getElementById('formParceiro').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita o envio do formulário
  
    const nome = document.getElementById('nomeOng').value;
    const erro3 = document.getElementById('erro3');
  
    const regexNome = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    if (!regexNome.test(nome) || nome.length <= 3) {
        erro3.textContent = 'Por favor, insira um nome.';
        erro3.style.display = 'block';
    } else {
        erro3.style.display = 'none'; 
    }
  });

// Validação do formulário campo email

document.getElementById('formParceiro').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita o envio do formulário
  
    const email = document.getElementById('email').value;
    const erro1 = document.getElementById('erro3');
  
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    if (!regexEmail.test(email) || email.length <= 3) {
        erro1.textContent = 'Por favor, insira um nome válido.';
    } else {
        erro1.style.display = 'none'; 
        window.location.href = 'index.html';
    }
  });




});
