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
    const form = document.getElementById('formParceiro');

    form.addEventListener('submit', function(event) {
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

        // Se todos os campos estiverem válidos, redireciona para a próxima página
        if (formularioValido) {
            window.location.href = "formularioparceiro2.html"; // Substitua pela URL desejada
        }
    });

    // Funções de validação individuais
    function validarNomeOng() {
        const nomeOng = document.getElementById('nomeOng').value.trim();
        const erroNomeOng = document.getElementById('erro3');
        const regexNome = /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/;
        if (!regexNome.test(nomeOng) || nomeOng.length <= 3) {
            erroNomeOng.innerHTML = 'Por favor, insira um nome válido.';
            erroNomeOng.style.display = 'block';
            return false;
        } else {
            erroNomeOng.style.display = 'none';
            return true;
        }
    }

    function validarEmailOng() {
        const emailOng = document.getElementById('emailOng').value.trim();
        const erroEmailOng = document.getElementById('erroEmail');
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regexEmail.test(emailOng)) {
            erroEmailOng.innerHTML = 'Por favor, insira um e-mail válido.';
            erroEmailOng.style.display = 'block';
            return false;
        } else {
            erroEmailOng.style.display = 'none';
            return true;
        }
    }

    function validarCnpj() {
        const cnpj = document.getElementById('cnpj').value.trim();
        const erroCnpj = document.getElementById('erroCnpj');
        const regexCnpj = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;
        if (!regexCnpj.test(cnpj)) {
            erroCnpj.innerHTML = 'Por favor, insira um CNPJ válido (formato: XX.XXX.XXX/XXXX-XX).';
            erroCnpj.style.display = 'block';
            return false;
        } else {
            erroCnpj.style.display = 'none';
            return true;
        }
    }

    function validarNomeResponsavel() {
        const nomeResponsavel = document.getElementById('nomeResp').value.trim();
        const erroNomeResponsavel = document.getElementById('erroNomeResponsavel');
        const regexNome = /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/;
        if (!regexNome.test(nomeResponsavel) || nomeResponsavel.length <= 3) {
            erroNomeResponsavel.innerHTML = 'Por favor, insira um nome válido.';
            erroNomeResponsavel.style.display = 'block';
            return false;
        } else {
            erroNomeResponsavel.style.display = 'none';
            return true;
        }
    }

    function validarCpfResponsavel() {
        const cpfResponsavel = document.getElementById('cpf').value.trim();
        const erroCpfResponsavel = document.getElementById('erroCpfResponsavel');
        const regexCpf = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
        if (!regexCpf.test(cpfResponsavel)) {
            erroCpfResponsavel.innerHTML = 'Por favor, insira um CPF válido (formato: XXX.XXX.XXX-XX).';
            erroCpfResponsavel.style.display = 'block';
            return false;
        } else {
            erroCpfResponsavel.style.display = 'none';
            return true;
        }
    }

    function validarEmailResponsavel() {
        const emailResponsavel = document.getElementById('emailResp').value.trim();
        const erroEmailResponsavel = document.getElementById('erroEmailResponsavel');
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regexEmail.test(emailResponsavel)) {
            erroEmailResponsavel.innerHTML = 'Por favor, insira um e-mail válido.';
            erroEmailResponsavel.style.display = 'block';
            return false;
        } else {
            erroEmailResponsavel.style.display = 'none';
            return true;
        }
    }
});



