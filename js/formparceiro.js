// window.addEventListener("load", paginacarregada);

// function paginacarregada(){

// let formParceiro1 = document.getElementById("formParceiro1");
// let formParceiro2 = document.getElementById("formParceiro2");
// let continuarFormParc = document.getElementById("continuarFormParc");
// let cadastrarFormParceiro = document.getElementById("cadastrarFormParceiro");

// continuarFormParc.addEventListener("click", function(){
//     event.preventDefault();
    
//     formParceiro1.style.display = 'none';
//     formParceiro2.style.display = 'flex';
// })

// cadastrarFormParceiro.addEventListener("click", function(){
//     event.preventDefault();
    
//     formParceiro1.style.display = 'flex';
//     formParceiro2.style.display = 'none';
// })
// }

function atualizarContagem() {
    contagem.innerHTML = mensagem.value.length;
  }

  document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('formParceiro').addEventListener('submit', function(event) {
        event.preventDefault(); // Evita o envio do formulário inicialmente

        const nomeOng = document.getElementById('nomeOng').value.trim();
        const emailOng = document.getElementById('email1').value.trim();
        const cnpj = document.querySelector('.cnpj').value.trim();
        const nomeResponsavel = document.querySelector('.inputCadastro[placeholder="Nome do Responsável"]').value.trim();
        const cpfResponsavel = document.querySelector('.cpf').value.trim();
        const emailResponsavel = document.querySelector('.inputCadastro[placeholder="E-mail"]').value.trim();

        const erroNomeOng = document.getElementById('erro3');
        const erroEmailOng = document.getElementById('erro1');
        const erroCnpj = document.getElementById('erroCnpj');
        const erroNomeResponsavel = document.getElementById('erroNomeResponsavel');
        const erroCpfResponsavel = document.getElementById('erroCpfResponsavel');
        const erroEmailResponsavel = document.getElementById('erroEmailResponsavel');

        // Expressões regulares para validação
        const regexNome = /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/;
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const regexCnpj = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;
        const regexCpf = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;

        // Variável de controle de validade do formulário
        let formularioValido = true;

        // Validação do nome da ONG
        if (!regexNome.test(nomeOng) || nomeOng.length <= 3) {
            erroNomeOng.innerHTML = 'Por favor, insira um nome válido.';
            erroNomeOng.style.display = 'block';
            formularioValido = false;
        } else {
            erroNomeOng.style.display = 'none';
        }

        // Validação do e-mail da ONG
        if (!regexEmail.test(emailOng)) {
            erroEmailOng.innerHTML = 'Por favor, insira um e-mail válido.';
            erroEmailOng.style.display = 'block';
            formularioValido = false;
        } else {
            erroEmailOng.style.display = 'none';
        }

        // Validação do CNPJ
        if (!regexCnpj.test(cnpj)) {
            erroCnpj.innerHTML = 'Por favor, insira um CNPJ válido (formato: XX.XXX.XXX/XXXX-XX).';
            erroCnpj.style.display = 'block';
            formularioValido = false;
        } else {
            erroCnpj.style.display = 'none';
        }

        // Validação do nome do responsável
        if (!regexNome.test(nomeResponsavel) || nomeResponsavel.length <= 3) {
            erroNomeResponsavel.innerHTML = 'Por favor, insira um nome válido.';
            erroNomeResponsavel.style.display = 'block';
            formularioValido = false;
        } else {
            erroNomeResponsavel.style.display = 'none';
        }

        // Validação do CPF do responsável
        if (!regexCpf.test(cpfResponsavel)) {
            erroCpfResponsavel.innerHTML = 'Por favor, insira um CPF válido (formato: XXX.XXX.XXX-XX).';
            erroCpfResponsavel.style.display = 'block';
            formularioValido = false;
        } else {
            erroCpfResponsavel.style.display = 'none';
        }

        // Validação do e-mail do responsável
        if (!regexEmail.test(emailResponsavel)) {
            erroEmailResponsavel.innerHTML = 'Por favor, insira um e-mail válido.';
            erroEmailResponsavel.style.display = 'block';
            formularioValido = false;
        } else {
            erroEmailResponsavel.style.display = 'none';
        }

        // Se todos os campos estiverem válidos, redireciona para a próxima página
        if (formularioValido) {
            window.location.href = "formularioparceiro2.html"; // Substitua pela URL desejada
        }
    });
});
