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

    form.addEventListener('submit', function (event) {
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
            document.getElementById('mainFormParc').scrollIntoView({ behavior: 'smooth' });
        } else {
            // Redireciona para a próxima página caso o formulário seja válido
            window.location.href = "formularioparceiro2.html"; // Substitua pela URL desejada
        }
    });

    // Funções de validação individuais
    function validarNomeOng() {
        const nomeOng = document.getElementById('nomeOng').value.trim();
        const erroNomeOng = document.getElementById('erro3');
        const regexNome = /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/;

        if (nomeOng === '') {
            erroNomeOng.innerHTML = 'O campo Nome da ONG é obrigatório.';
            erroNomeOng.style.display = 'block';
            return false;
        } else if (!regexNome.test(nomeOng) || nomeOng.length <= 3) {
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

        if (emailOng === '') {
            erroEmailOng.innerHTML = 'O campo E-mail é obrigatório.';
            erroEmailOng.style.display = 'block';
            return false;
        } else if (!regexEmail.test(emailOng)) {
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

        if (cnpj === '') {
            erroCnpj.innerHTML = 'O campo CNPJ é obrigatório.';
            erroCnpj.style.display = 'block';
            return false;
        } else if (!regexCnpj.test(cnpj)) {
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

        if (nomeResponsavel === '') {
            erroNomeResponsavel.innerHTML = 'O campo Nome do Responsável é obrigatório.';
            erroNomeResponsavel.style.display = 'block';
            return false;
        } else if (!regexNome.test(nomeResponsavel) || nomeResponsavel.length <= 3) {
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

        if (cpfResponsavel === '') {
            erroCpfResponsavel.innerHTML = 'O campo CPF é obrigatório.';
            erroCpfResponsavel.style.display = 'block';
            return false;
        } else if (!regexCpf.test(cpfResponsavel)) {
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

        if (emailResponsavel === '') {
            erroEmailResponsavel.innerHTML = 'O campo E-mail do Responsável é obrigatório.';
            erroEmailResponsavel.style.display = 'block';
            return false;
        } else if (!regexEmail.test(emailResponsavel)) {
            erroEmailResponsavel.innerHTML = 'Por favor, insira um e-mail válido.';
            erroEmailResponsavel.style.display = 'block';
            return false;
        } else {
            erroEmailResponsavel.style.display = 'none';
            return true;
        }
    }

    function validarCep() {
        const cep = document.getElementById('cep').value.trim();
        const erroCep = document.getElementById('erroCep');
        const regexCep = /^\d{5}-\d{3}$/;

        if (cep === '') {
            erroCep.innerHTML = 'O campo CEP é obrigatório.';
            erroCep.style.display = 'block';
            return false;
        } else if (!regexCep.test(cep)) {
            erroCep.innerHTML = 'Por favor, insira um CEP válido (formato: XXXXX-XXX).';
            erroCep.style.display = 'block';
            return false;
        } else {
            erroCep.style.display = 'none';
            return true;
        }
    }

    function validarEstado() {
        const estado = document.getElementById('estado').value.trim();
        const erroEstado = document.getElementById('erroEstado');

        // Lista de estados brasileiros
        const estados = [
            "Acre", "AC", "Alagoas", "AL", "Amapá", "AP", "Amazonas", "AM", "Bahia", "BA", "Ceará", "CE", "Espírito Santo", "ES", "Goiás", "GO", "Maranhão", "MA", "Mato Grosso", "MT", "Mato Grosso do Sul", "MS", "Minas Gerais", "MG", "Pará", "PA", "Paraíba", "PB", "Paraná", "PR", "Pernambuco", "PE", "Piauí", "PI", "Rio de Janeiro", "RJ", "Rio Grande do Norte", "RN", "Rio Grande do Sul", "RS", "Rondônia", "RO", "Roraima", "RR", "Santa Catarina", "SC", "São Paulo", "SP", "Sergipe", "SE", "Tocantins", "TO"
        ];

        if (estado === '') {
            erroEstado.innerHTML = 'O campo Estado é obrigatório.';
            erroEstado.style.display = 'block';
            return false;
        }
        if (!estados.some(est => est.toLowerCase() === estado.toLowerCase())) {
            erroEstado.innerHTML = 'Por favor, insira um estado válido.';
            erroEstado.style.display = 'block';
            return false;
        }
        erroEstado.style.display = 'none';
        return true;
    }


    function validarCidade() {
        const cidade = document.getElementById('cidade').value.trim();
        const erroCidade = document.getElementById('erroCidade');
        const regexCidade = /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/;

        if (cidade === '') {
            erroCidade.innerHTML = 'O campo Cidade é obrigatório.';
            erroCidade.style.display = 'block';
            return false;
        } else if (!regexCidade.test(cidade)) {
            erroCidade.innerHTML = 'Por favor, insira uma Cidade válida';
            erroCidade.style.display = 'block';
            return false;
        } else {
            erroCidade.style.display = 'none';
            return true;
        }
    }
    function validarBairro() {
        const bairro = document.getElementById('bairro').value.trim();
        const erroBairro = document.getElementById('erroBairro');
        const regexBairro = /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/;

        if (bairro === '') {
            erroBairro.innerHTML = 'O campo Cidade é obrigatório.';
            erroBairro.style.display = 'block';
            return false;
        } else if (!regexBairro.test(bairro)) {
            erroBairro.innerHTML = 'Por favor, insira um Bairro válido';
            erroBairro.style.display = 'block';
            return false;
        } else {
            erroBairro.style.display = 'none';
            return true;
        }
    }
    function validarNmr() {
        const nmr = document.getElementById('nmr').value.trim();
        const erroNmr = document.getElementById('erroNmr');
        const regexNmr = /^[0-9]+[a-zA-Z0-9/-]*$/;

        if (nmr === '') {
            erroNmr.innerHTML = 'O campo Número é obrigatório.';
            erroNmr.style.display = 'block';
            return false;
        } else if (!regexNmr.test(nmr)) {
            erroNmr.innerHTML = 'Por favor, insira um Número válido';
            erroNmr.style.display = 'block';
            return false;
        } else {
            erroNmr.style.display = 'none';
            return true;
        }
    }
});

document.getElementById('outros').addEventListener('change', function() {
    var campoOutros = document.getElementById('campoOutros');
    if (this.checked) {
      campoOutros.style.display = 'block';
    } else {
      campoOutros.style.display = 'none';
    }
  });








