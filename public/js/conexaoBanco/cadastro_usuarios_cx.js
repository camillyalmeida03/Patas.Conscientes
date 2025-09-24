// Este arquivo é responsável por enviar os dados de cadastro do usuário pro banco de dados

document.addEventListener("DOMContentLoaded", function () {
    // Seleciona o formulário de cadastro do usuário
    const formUsuario = document.getElementById("formUsuario");

    // Se o formulário existir
    if (formUsuario) {

        // Cria um evento de clique no botão
        formUsuario.addEventListener("submit", async (e) => {
            e.preventDefault();

            const nome = document.getElementById("nomeUsuarioAdt").value.trim();
            const email = document.getElementById("emailUsuarioAdt").value.trim();
            const telefone = document.getElementById("telcelUsuarioAdt").value.trim();
            const cpf = document.getElementById("cpfUsuarioAdt").value.trim();
            const genero = document.getElementById("genero").value;
            const dataNasc = document.getElementById("dataNasc").value;
            const senha = document.getElementById("senhaUsuarioAdt").value.trim();

            const cep = document.getElementById("cep").value.trim();
            const estado = document.getElementById("estado").value;
            const cidade = document.getElementById("cidade").value.trim();
            const rua = document.getElementById("rua").value.trim();
            const bairro = document.getElementById("bairro").value.trim();
            const nmr = document.getElementById("nmr").value.trim();
            const complemento = document.getElementById("complemento").value.trim();

            const form = e.target;
            const endpointUsuario = 'http://localhost:3600/usuarios';

        })
    }


})