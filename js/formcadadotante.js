document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('formAdotante');

    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Evita o envio do formulário inicialmente

        // Variável de controle de validade do formulário
        let formularioValido = true;

        // Validações independentes de cada campo
        if (!validarNomeAdotante()) formularioValido = false;
        if (!validarEmail()) formularioValido = false;
        if (!validarTel()) formularioValido = false;
        if (!validarCel()) formularioValido = false;
        if (!validarCpf()) formularioValido = false;
        if (!validarSenha()) formularioValido = false;
        if (!validarSenha2()) formularioValido = false;
        if (!validarGenero()) formularioValido = false;
        if (!validarDataNasc()) formularioValido = false;
        

        // Se o formulário não for válido, rola para o topo da página
        if (!formularioValido) {
            document.getElementById('MainFormCadAdotante').scrollIntoView({ behavior: 'smooth' });
        } else {
            // Redireciona para a próxima página caso o formulário seja válido
            window.location.href = "index.html"; // Substitua pela URL desejada
        }
    });

    function validarGenero() {
        const genero = document.getElementById('genero');
        const erroGenero = document.getElementById('erroGenero');
        const valorGenero = genero.value;

        if (valorGenero === "") {
            erroGenero.innerHTML = 'Por favor, selecione seu gênero.';
            erroGenero.style.display = 'block';
            return false;
        } else {
            erroGenero.style.display = 'none';
            return true;
        }
    }

    function validarDataNasc() {
        const dataNasc = document.getElementById('dataNasc');
        const erroDataNasc = document.getElementById('erroDataNasc');
        const valorDataNasc= dataNasc.value;

        if (valorDataNasc === "") {
            erroDataNasc.innerHTML = 'Por favor, selecione sua data de nascimento.';
            erroDataNasc.style.display = 'block';
            return false;
        } else {
            erroDataNasc.style.display = 'none';
            return true;
        }
    }

    // Funções de validação individuais
    function validarNomeAdotante() {
        const nomeOng = document.getElementById('nomeAdt').value.trim();
        const erroNomeOng = document.getElementById('erroNomeAdt');
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
    function validarEmail() {
        const emailAdt = document.getElementById('emailAdt').value.trim();
        const erroEmail = document.getElementById('erroEmailAdt');
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
        if (emailAdt === '') {
            erroEmail.innerHTML = 'O campo E-mail do Responsável é obrigatório.';
            erroEmail.style.display = 'block';
            return false;
        } else if (!regexEmail.test(emailAdt)) {
            erroEmail.innerHTML = 'Por favor, insira um e-mail válido.';
            erroEmail.style.display = 'block';
            return false;
        } else {
            erroEmail.style.display = 'none';
            return true;
            }
    }
    function validarTel() {
        const telefone = document.getElementById('telAdt').value.trim();
        const erroTelefone = document.getElementById('erroTelAdt');
            
        // Expressão regular para validar um número de telefone no formato (XX) XXXXX-XXXX
        const regexTelefone = /^\(\d{2}\)\s\d{5}-\d{4}$/;
        
        if (telefone === '') {
            erroTelefone.innerHTML = 'O campo Telefone é obrigatório.';
            erroTelefone.style.display = 'block';
            return false;
        } else if (!regexTelefone.test(telefone)) {
            erroTelefone.innerHTML = 'Por favor, insira um telefone válido (formato: (XX) XXXXX-XXXX).';
            erroTelefone.style.display = 'block';
            return false;
        } else {
            erroTelefone.style.display = 'none';
            return true;
            }
    }
    
    function validarCel() {
        const cel = document.getElementById('celAdt').value.trim();
        const erroCel = document.getElementById('erroCelAdt');
        
            // Expressão regular para validar um número de telefone no formato (XX) XXXXX-XXXX
        const regexCel = /^\(\d{2}\)\s\d{5}-\d{4}$/;
        
        if (cel === '') {
            erroCel.innerHTML = 'O campo Celular é obrigatório.';
            erroCel.style.display = 'block';
            return false;
        } else if (!regexCel.test(cel)) {
            erroCel.innerHTML = 'Por favor, insira um celular válido (formato: (XX) XXXXX-XXXX).';
            erroCel.style.display = 'block';
            return false;
        } else {
            erroCel.style.display = 'none';
            return true;
            }
    }


    function validarCpf() {
        const cpfAdt = document.getElementById('cpfAdt').value.trim();
        const erroCpfAdt = document.getElementById('erroCpfAdt');
        const regexCpf = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    
        if (cpfAdt === '') {
            erroCpfAdt.innerHTML = 'O campo CPF é obrigatório.';
            erroCpfAdt.style.display = 'block';
            return false;
        } else if (!regexCpf.test(cpfAdt)) {
            erroCpfAdt.innerHTML = 'Por favor, insira um CPF válido (formato: XXX.XXX.XXX-XX).';
            erroCpfAdt.style.display = 'block';
            return false;
        } else {
            erroCpfAdt.style.display = 'none';
            return true;
            }
    }

    function validarSenha() {
        const senhaAdt = document.getElementById('senhaAdt').value;
        const erroSenhaAdt = document.getElementById('erroSenhaAdt');
            
            // Expressão regular para verificar os requisitos da senha
        const regexSenha = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        
        if (senhaAdt === '') {
            erroSenhaAdt.innerHTML = 'O campo senha é obrigatório.';
            erroSenhaAdt.style.display = 'block';
            return false;
        } else if (!regexSenha.test(senhaAdt)) {
            erroSenhaAdt.innerHTML = 'A senha deve ter no mínimo 8 caracteres, incluir pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial.';
            erroSenhaAdt.style.display = 'block';
            return false;
        } else {
            erroSenhaAdt.style.display = 'none';
            return true;
            }
    }
        
    function validarSenha2() {
        const senhaAdt = document.getElementById('senhaAdt').value.trim();
        const confirmarSenha = document.getElementById('confirmaSenhaAdt').value.trim();
        const erroSenha = document.getElementById('erroConfirSenhaAdt');
        
            // Verificar se as senhas coincidem
        if (senhaAdt === '') {
            erroSenha.innerHTML = 'O campo senha é obrigatório.';
            erroSenha.style.display = 'block';
            return false;
        } else if (senhaAdt !== confirmarSenha) {
            erroSenha.innerHTML = 'As senhas não coincidem.';
            erroSenha.style.display = 'block';
            return false;
        } else {
            erroSenha.style.display = 'none';
            return true;
            }
        
    }
});