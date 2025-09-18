// Este arquivo é responsável por enviar os dados de cadastro do usuário pro banco de dados

document.addEventListener("DOMContentLoaded", function () {
    // Seleciona o formulário de cadastro do usuário
    const formUsuario = document.getElementById("formUsuario");

    formUsuario.addEventListener("submit", async (e) => {
        e.preventDefault();

        const form = e.target;
        const endpointUsuario = 'http://localhost:3600/usuarios';
        const endpointEndereco = 'http://localhost:3600/enderecos';
        const endpointUF = '';
        const endpointCidade = '';
        const endpointBairro = '';
        const endpointRua = '';


        const bodyUsuario = {
            nome: form.nome.value,
            email: form.email.value,
            telefone: form.telefone.value,
            cpf: form.cpf.value,
            fk_idsexo: form.fk_idsexo.value,
            data_nasc: form.data_nasc.value,
            senha: form.senha.value,

        }

        const bodyUf = {
            sigla
        }
    })
})