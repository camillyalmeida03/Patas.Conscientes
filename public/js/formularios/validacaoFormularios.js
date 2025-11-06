document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".formulario");

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Evita o envio do formulário inicialmente

        // Variável de controle de validade do formulário
        let formularioValido = true;

        // Validações independentes de cada campo

        if (!validarNome()) formularioValido = false;
        if (!validarEmail()) formularioValido = false;
        if (!validarTelCel()) formularioValido = false;
        if (!validarCpf()) formularioValido = false;
        if (!validarCnpj()) formularioValido = false;
        if (!validarGenero()) formularioValido = false;
        if (!validarDataNasc()) formularioValido = false;
        if(!validarData()) formularioValido = false;
        if (!validarSenhas()) formularioValido = false;
        if (!validarSenhaLogin()) formularioValido = false;

        // Validações de endereço
        if (!validarCep()) formularioValido = false;
        if (!validarEstado()) formularioValido = false;
        if (!validarCidade()) formularioValido = false;
        if (!validarBairro()) formularioValido = false;
        if (!validarRua()) formularioValido = false;
        if (!validarNmr()) formularioValido = false;

    });
    // A partir de agora, teremos as funções de validação individuais

    // Validação dos nomes de usuário / Ongs / Pets
    function validarNome() {
        const regexNome = /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/;
        const mensagemNomeObrigatorio = "O campo Nome é obrigatório.";
        const mensagemNomeInvalido = "Por favor, insira um nome válido.";

        // Lista de campos a validar
        const campos = [
            { input: "#nomeUsuarioAdt", erro: "#erroNomeUsuarioAdt", minLength: 3 },
            { input: "#nomeOng", erro: "#erroNomeOng", minLength: 3 }
        ];
        ;

        let tudoValido = true; // Flag geral

        campos.forEach(campo => {
            const inputEl = document.querySelector(campo.input);
            const erroEl = document.querySelector(campo.erro);

            if (!inputEl || !erroEl) return; // ignora se não existir no DOM

            const valor = inputEl.value.trim();

            if (valor === "") {
                erroEl.innerHTML = mensagemNomeObrigatorio;
                erroEl.style.display = "block";
                tudoValido = false;
            } else if (!regexNome.test(valor) || valor.length < campo.minLength) {
                erroEl.innerHTML = mensagemNomeInvalido;
                erroEl.style.display = "block";
                tudoValido = false;
            } else {
                erroEl.style.display = "none";
            }
        });

        return tudoValido;
    }

    // Validação de e-mail usuários / ONGs
    function validarEmail() {

        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Mensagens de retorno
        const mensagemEmailObrigatorio = "O campo E-mail é obrigatório." // Mensagem indicando que o campo é obrigatório
        const mensagemEmailInvalido = "Por favor, insira um e-mail válido." // Mensagem indicando que o campo não foi preenchido de forma válida

        // Dados do email do usuário
        const inputEmailUsuario = document.getElementById("emailUsuarioAdt");
        const erroEmailUsuario = document.getElementById("erroEmailUsuarioAdt");

        if (inputEmailUsuario) {
            const emailUsuario = inputEmailUsuario.value.trim();

            if (emailUsuario === "") {
                erroEmailUsuario.innerHTML = mensagemEmailObrigatorio;
                erroEmailUsuario.style.display = "block";
                return false;
            } else if (!regexEmail.test(emailUsuario)) {
                erroEmailUsuario.innerHTML = mensagemEmailInvalido;
                erroEmailUsuario.style.display = "block";
                return false;
            } else {
                erroEmailUsuario.style.display = "none";
                return true;
            }
        }

        // Dados do email da ONG
        const inputEmailOng = document.getElementById("emailOng");
        const erroEmailOng = document.getElementById("erroEmailOng");

        if (inputEmailOng) {
            const emailOng = inputEmailOng.value.trim();

            if (emailOng === "") {
                erroEmailOng.innerHTML = mensagemEmailObrigatorio;
                erroEmailOng.style.display = "block";
                return false;
            } else if (!regexEmail.test(emailOng)) {
                erroEmailOng.innerHTML = mensagemEmailInvalido;
                erroEmailOng.style.display = "block";
                return false;
            } else {
                erroEmailOng.style.display = "none";
                return true;
            }
        }

    }

    // Validação do Telefone/Celular usuários / ONGs
    const inputTelCelUsuario = document.getElementById("telcelUsuarioAdt");

    function validarTelCel() {
        const inputTelCelUsuario = document.getElementById("telcelUsuarioAdt");
        if (!inputTelCelUsuario) return true;
        // Mensagens de retorno
        const mensagemTelCelObrigatório = "O campo Telefone/Celular é obrigatório."
        const mensagemTelCelInvalido = "Por favor, insira um telefone fixo com 10 dígitos ou celular com 11 dígitos."

        // Dados de telefone/celular usuário
        const erroTelCelUsuario = document.getElementById("erroTelCelUsuarioAdt");
        const telCelUsuario = inputTelCelUsuario.value.trim();

        // Remover formatação para validar apenas números
        const telefoneSemFormatacao = telCelUsuario.replace(/[^\d]/g, "");

        if (inputTelCelUsuario) {
            if (telefoneSemFormatacao === "") {
                erroTelCelUsuario.innerHTML = mensagemTelCelObrigatório;
                erroTelCelUsuario.style.display = "block";
                return false;
            } else

                // Validação: Deve conter mais de 10 dígitos dígitos
                if (telefoneSemFormatacao.length < 10) {
                    erroTelCelUsuario.innerHTML =
                        mensagemTelCelInvalido;
                    erroTelCelUsuario.style.display = "block";
                    return false;
                }

            // Caso seja válido, limpar mensagem de erro
            erroTelCelUsuario.style.display = "none";
            return true;
        }
    }

    if (inputTelCelUsuario) {
        inputTelCelUsuario.addEventListener("input", function (e) {
            let value = e.target.value.replace(/\D/g, ""); // Remove tudo que não for número

            // Limita no máximo 11 dígitos
            value = value.substring(0, 11);

            if (value.length > 2 && value.length <= 6) {
                // Até 6 dígitos (XX) XXXX
                value = value.replace(/^(\d{2})(\d{0,4})/, "($1) $2");
            } else if (value.length > 6 && value.length <= 10) {
                // Telefone fixo (10 dígitos) (XX) XXXX-XXXX
                value = value.replace(/^(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
            } else if (value.length > 10) {
                // Celular (11 dígitos) (XX) XXXXX-XXXX
                value = value.replace(/^(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
            }

            e.target.value = value;
        });
    };

    // Validação do CPF do usuário
    const inputCpfUsuarioAdt = document.getElementById("cpfUsuarioAdt");

    function validarCpf() {
        if (!inputCpfUsuarioAdt) return true;

        // Mensagens de retorno
        const mensagemCpfObrigatorio = "O campo CPF é obrigatório."
        const mensagemCpfInvalido = "Por favor, insira um CPF válido."

        // Pegando dados do doc HTML
        const cpfUsuarioAdt = inputCpfUsuarioAdt.value.trim();
        const erroCpfUsuarioAdt = document.getElementById("erroCpfUsuarioAdt");

        const regexCpf = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;

        if (inputCpfUsuarioAdt) {
            if (cpfUsuarioAdt === "") {
                erroCpfUsuarioAdt.innerHTML = mensagemCpfObrigatorio;
                erroCpfUsuarioAdt.style.display = "block";
                return false;
            } else if (!regexCpf.test(cpfUsuarioAdt)) {
                erroCpfUsuarioAdt.innerHTML = mensagemCpfInvalido;
                erroCpfUsuarioAdt.style.display = "block";
                return false;
            } else {
                erroCpfUsuarioAdt.style.display = "none";
                return true;
            }
        }
    }

    const inputCnpjOng = document.querySelector("#cnpj")

    function validarCnpj() {
        if (!inputCnpjOng) return true;

        // Mensagens de retorno
        const mensagemCnpjObrigatorio = "O campo CNPJ é obrigatório.";
        const mensagemCnpjInvalido = "Por favor, insira um CNPJ válido.";

        // Pegando dados do doc HTML
        const cnpjOng = inputCnpjOng.value.trim();
        const errocnpjOng = document.getElementById("erroCnpj");

        // Regex para CNPJ no formato 00.000.000/0000-00
        const regexCnpj = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;

        if (inputCnpjOng) {
            if (cnpjOng === "") {
                errocnpjOng.innerHTML = mensagemCnpjObrigatorio;
                errocnpjOng.style.display = "block";
                return false;
            } else if (!regexCnpj.test(cnpjOng)) {
                errocnpjOng.innerHTML = mensagemCnpjInvalido;
                errocnpjOng.style.display = "block";
                return false;
            } else {
                errocnpjOng.style.display = "none";
                return true;
            }
        }
    }


    if (inputCpfUsuarioAdt) {
        inputCpfUsuarioAdt.addEventListener("input", function (e) {
            let value = e.target.value.replace(/\D/g, ""); // Remove tudo que não for número

            // Aplica a máscara
            if (value.length > 3) value = value.replace(/^(\d{3})(\d)/, "$1.$2");
            if (value.length > 6)
                value = value.replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3");
            if (value.length > 9)
                value = value.replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3-$4");

            e.target.value = value;
        });

    }

    // Validação gênero do usuário
    function validarGenero() {

        // Mensagem de retorno
        const mensagemGeneroObrigatorio = "Por favor, selecione seu gênero."

        const genero = document.getElementById("genero");
        if (!genero) return true;
        const erroGenero = document.getElementById("erroGenero");
        const valorGenero = genero.value;

        if (valorGenero === "") {
            erroGenero.innerHTML = mensagemGeneroObrigatorio;
            erroGenero.style.display = "block";
            return false;
        } else {
            erroGenero.style.display = "none";
            return true;
        }
    }

    // Validação da data de nascimento do usuário
    function validarDataNasc() {

        // Mensagens de retorno
        const mensagemDataNascObrigatoria = "Por favor, selecione sua data de nascimento.";
        const mensagemDataNascInvalida = "Você deve ter pelo menos 18 anos.";

        const dataNasc = document.getElementById("dataNasc");
        const erroDataNasc = document.getElementById("erroDataNasc");

        if (!dataNasc) return true;
        const valorDataNasc = dataNasc.value;

        if (dataNasc) {
            if (valorDataNasc === "") {
                erroDataNasc.innerHTML = mensagemDataNascObrigatoria;
                erroDataNasc.style.display = "block";
                return false;
            } else {
                // Converte a data selecionada para objeto Date
                const hoje = new Date();
                const nascimento = new Date(valorDataNasc);

                // Calcula idade
                let idade = hoje.getFullYear() - nascimento.getFullYear();
                const mes = hoje.getMonth() - nascimento.getMonth();

                // Ajusta caso ainda não tenha feito aniversário este ano
                if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
                    idade--;
                }

                if (idade < 18) {
                    erroDataNasc.innerHTML = mensagemDataNascInvalida;
                    erroDataNasc.style.display = "block";
                    return false;
                }

                // Caso seja válido
                erroDataNasc.style.display = "none";
                return true;
            }
        }
    }

    // Validação de data (não pode ser futura)
    function validarData() {

        // Mensagens de retorno
        const mensagemDataObrigatoria = "Por favor, selecione uma data.";
        const mensagemDataFutura = "A data não pode ser maior que o dia atual.";

        const inputData = document.getElementById("dataCriacao"); // id do input
        const erroData = document.getElementById("erroDataCriacao"); // id do elemento de erro

        if (!inputData) return true;
        const valorData = inputData.value;

        if (valorData === "") {
            erroData.innerHTML = mensagemDataObrigatoria;
            erroData.style.display = "block";
            return false;
        } else {
            const hoje = new Date();
            const dataSelecionada = new Date(valorData);

            // Remove hora, minuto, segundo e ms para comparar só datas
            hoje.setHours(0, 0, 0, 0);
            dataSelecionada.setHours(0, 0, 0, 0);

            if (dataSelecionada > hoje) {
                erroData.innerHTML = mensagemDataFutura;
                erroData.style.display = "block";
                return false;
            }

            erroData.style.display = "none";
            return true;
        }
    }
    // Validação das senhas do usuário / ONG
    const mensagemSenhaObrigatoria = "O campo senha é obrigatório."

    function validarSenhas() {

        // Mensagens de retorno
        const mensagemSenhaInvalida = "A senha deve ter no mínimo 8 caracteres, incluindo uma letra maiúscula, uma minúscula, um número e um caractere especial."
        const mensagemConfirmacaoSenha = "O campo de confirmação de senha é obrigatório."
        const mensagemSenhasDivergem = "As senhas não coincidem."

        // Dados coletados
        const inputSenhaUsuario = document.getElementById("senhaUsuarioAdt");
        const inputCnfSenhaUsuario = document.getElementById("confirmaSenhaUsuarioAdt");

        // Se nenhum dos campos de senha existe na página atual, não valida
        if (!inputSenhaUsuario || !inputCnfSenhaUsuario) return true;

        const senhaUsuario = inputSenhaUsuario.value.trim();
        const cnfSenhaUsuario = inputCnfSenhaUsuario.value.trim();
        const erroSenhaUsuario = document.getElementById("erroSenhaUsuarioAdt");
        const erroCnfSenhaUsuario = document.getElementById("erroConfirSenhaUsuarioAdt");

        const regexSenha = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,}$/;

        let valido = true;

        if (inputSenhaUsuario) {

            // Verifica se a senha está vazia
            if (senhaUsuario === "") {
                erroSenhaUsuario.innerHTML = mensagemSenhaObrigatoria;
                erroSenhaUsuario.style.display = "block";
                valido = false;
            } else if (!regexSenha.test(senhaUsuario)) {
                erroSenhaUsuario.innerHTML = mensagemSenhaInvalida;
                erroSenhaUsuario.style.display = "block";
                valido = false;
            } else {
                erroSenhaUsuario.style.display = "none";
            }

            // Verifica se a confirmação está vazia ou diferente da senha
            if (cnfSenhaUsuario === "") {
                erroCnfSenhaUsuario.innerHTML = mensagemConfirmacaoSenha;
                erroCnfSenhaUsuario.style.display = "block";
                valido = false;
            } else if (senhaUsuario !== cnfSenhaUsuario) {
                erroCnfSenhaUsuario.innerHTML = mensagemSenhasDivergem;
                erroCnfSenhaUsuario.style.display = "block";
                valido = false;
            } else {
                erroCnfSenhaUsuario.style.display = "none";
            }
            return valido;
        }

    }

    // Validação do campo de senha do Login de usuários
    function validarSenhaLogin() {
        const inputSenhaLoginUsuario = document.getElementById("senhaLoginUsuario");
        const erroSenhaLoginUsuario = document.getElementById("erroLoginUsuario");

        // Se o campo não existir na página, não faz nada
        if (!inputSenhaLoginUsuario || !erroSenhaLoginUsuario) return true;

        const senhaLoginUsuario = inputSenhaLoginUsuario.value.trim();
        const mensagemSenhaObrigatoria = "O campo senha é obrigatório.";

        let valido = true;

        // Verifica se a senha está vazia
        if (senhaLoginUsuario === "") {
            erroSenhaLoginUsuario.innerHTML = mensagemSenhaObrigatoria;
            erroSenhaLoginUsuario.style.display = "block";
            valido = false;
        } else {
            erroSenhaLoginUsuario.style.display = "none";
        }

        return valido;
    }

    // Validando endereços

    // Validação do CEP + Preenchimento de formulário automático
    const inputCep = document.getElementById("cep");
    const erroCep = document.getElementById("erroCep");

    function validarCep() {
        if (!inputCep) return true;

        // Dados do input de CEP
        const cep = inputCep.value.trim();

        const regexCep = /^\d{5}-\d{3}$/;

        if (inputCep) {
            if (cep === "") {
                erroCep.innerHTML = "O campo CEP é obrigatório.";
                erroCep.style.display = "block";
                return false;
            } else if (!regexCep.test(cep)) {
                erroCep.innerHTML =
                    "Por favor, insira um CEP válido (formato: XXXXX-XXX).";
                erroCep.style.display = "block";
                return false;
            } else {
                erroCep.style.display = "none";
                return true;
            }
        }
    }

    if (inputCep) {
        inputCep.addEventListener("input", function (e) {
            let value = e.target.value.replace(/\D/g, ""); // Remove tudo que não for número

            // Aplica a máscara de CEP: 00000-000
            if (value.length > 5) value = value.replace(/^(\d{5})(\d)/, "$1-$2");

            e.target.value = value;
        })

    }


    // Validação do estado
    function validarEstado() {
        const selectEstado = document.getElementById("estado");
        if (!selectEstado) return true;
        const estado = selectEstado.value.trim();
        const erroEstado = document.getElementById("erroEstado");

        if (selectEstado) {
            if (estado === "") {
                erroEstado.innerHTML = "O campo Estado é obrigatório.";
                erroEstado.style.display = "block";
                return false;
            }

            erroEstado.style.display = "none";
            return true;
        }

    }

    // Validação da Cidade
    function validarCidade() {

        // Dados do input Cidade
        const inputCidade = document.getElementById("cidade");
        if (!inputCidade) return true;
        const cidade = inputCidade.value.trim();
        const erroCidade = document.getElementById("erroCidade");
        const regexCidade = /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/;

        if (inputCidade) {
            if (cidade === "") {
                erroCidade.innerHTML = "O campo Cidade é obrigatório.";
                erroCidade.style.display = "block";
                return false;
            } else if (!regexCidade.test(cidade)) {
                erroCidade.innerHTML = "Por favor, insira uma Cidade válida";
                erroCidade.style.display = "block";
                return false;
            } else {
                erroCidade.style.display = "none";
                return true;
            }
        }
    }

    // Validação do Bairro
    function validarBairro() {

        // Dados bairro
        const inputBairro = document.getElementById("bairro");
        if (!inputBairro) return true;
        const bairro = inputBairro.value.trim();
        const erroBairro = document.getElementById("erroBairro");

        const regexBairro = /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/;

        if (inputBairro) {
            if (bairro === "") {
                erroBairro.innerHTML = "O campo Cidade é obrigatório.";
                erroBairro.style.display = "block";
                return false;
            } else if (!regexBairro.test(bairro)) {
                erroBairro.innerHTML = "Por favor, insira um Bairro válido";
                erroBairro.style.display = "block";
                return false;
            } else {
                erroBairro.style.display = "none";
                return true;
            }
        }
    }

    // Validação da rua
    function validarRua() {
        // Dados bairro
        const inputRua = document.getElementById("rua");
        if (!inputRua) return true;
        const rua = inputRua.value.trim();
        const erroRua = document.getElementById("erroRua");

        const regexRua = /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/;

        if (inputRua) {
            if (rua === "") {
                erroRua.innerHTML = "O campo Rua é obrigatório.";
                erroRua.style.display = "block";
                return false;
            } else if (!regexRua.test(rua)) {
                erroRua.innerHTML = "Por favor, insira uma rua válida";
                erroRua.style.display = "block";
                return false;
            } else {
                erroRua.style.display = "none";
                return true;
            }
        }
    }

    // Validação número da casa
    function validarNmr() {

        // Dados do input 
        const inputNmr = document.getElementById("nmr");
        if (!inputNmr) return true;
        const nmr = inputNmr.value.trim()
        const erroNmr = document.getElementById("erroNmr");

        const regexNmr = /^[0-9]+[a-zA-Z0-9/-]*$/;

        if (inputNmr) {
            if (nmr === "") {
                erroNmr.innerHTML = "O campo Número é obrigatório.";
                erroNmr.style.display = "block";
                return false;
            } else if (!regexNmr.test(nmr)) {
                erroNmr.innerHTML = "Por favor, insira um Número válido";
                erroNmr.style.display = "block";
                return false;
            } else {
                erroNmr.style.display = "none";
                return true;
            }
        }

    }


    if (inputCep) {
        inputCep.addEventListener("blur", async function () {
            const cep = this.value.replace(/\D/g, ""); // remove hífen e não números

            if (cep.length !== 8) {
                erroCep.textContent = "CEP inválido.";
                return;
            }

            try {
                const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
                const data = await response.json();

                if (data.erro) {
                    erroCep.textContent = "CEP não encontrado.";
                    return;
                }

                erroCep.textContent = "";

                document.getElementById("estado").value = data.uf || "";
                document.getElementById("cidade").value = data.localidade || "";
                document.getElementById("rua").value = data.logradouro || "";
                document.getElementById("bairro").value = data.bairro || "";
                document.getElementById("complemento").value = data.complemento || "";

            } catch (error) {
                erroCep.textContent = "Erro ao buscar o CEP.";
                console.error(error);
            }
        });
    }

    // --- Validação em tempo real ---
    const camposValidaveis = [
        { id: "nomeUsuarioAdt", func: validarNome },
        { id: "nomeOng", func: validarNome },
        { id: "emailOng", func: validarEmail },
        { id: "emailUsuarioAdt", func: validarEmail },
        { id: "telcelUsuarioAdt", func: validarTelCel },
        { id: "cpfUsuarioAdt", func: validarCpf },
        { id: "cnpj", func: validarCnpj },
        { id: "genero", func: validarGenero },
        { id: "dataNasc", func: validarDataNasc },
        { id: "dataCriacao", func: validarData },
        { id: "senhaUsuarioAdt", func: validarSenhas },
        { id: "senhaLoginUsuario", func: validarSenhaLogin },
        { id: "confirmaSenhaUsuarioAdt", func: validarSenhas },
        { id: "cep", func: validarCep },
        { id: "estado", func: validarEstado },
        { id: "cidade", func: validarCidade },
        { id: "bairro", func: validarBairro },
        { id: "rua", func: validarRua },
        { id: "nmr", func: validarNmr },
    ];

    // Adiciona ouvintes a cada campo existente
    camposValidaveis.forEach(campo => {
        const input = document.getElementById(campo.id);
        if (input) {
            // Verifica enquanto digita
            input.addEventListener("input", campo.func);

            // Verifica ao sair do campo
            input.addEventListener("blur", campo.func);

            // Verifica ao trocar seleção (para selects)
            input.addEventListener("change", campo.func);
        }
    });

    window.validarNome = validarNome;
    window.validarEmail = validarEmail;
    window.validarTelCel = validarTelCel;
    window.validarCpf = validarCpf;
    window.validarGenero = validarGenero;
    window.validarDataNasc = validarDataNasc;
    window.validarSenhas = validarSenhas;
    window.validarSenhaLogin = validarSenhaLogin;
    window.validarCep = validarCep;
    window.validarEstado = validarEstado;
    window.validarCidade = validarCidade;
    window.validarBairro = validarBairro;
    window.validarRua = validarRua;
    window.validarNmr = validarNmr;

});


const cadastroForm = document.getElementById("cadastroUsuario");
const verificacaoContainer = document.getElementById("verificacaoContainer");


// Removido: const verificarCodigoBtn = document.getElementById('verificarCodigoBtn');
// Removido: const codigoVerificacaoInput = document.getElementById('codigoVerificacao');
