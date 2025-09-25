// Este arquivo é responsável por enviar os dados de cadastro do usuário pro banco de dados

document.addEventListener("DOMContentLoaded", function () {
    // Seleciona o formulário de cadastro do usuário
    const formUsuario = document.getElementById("cadastroUsuario");

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

            const form = e.target;
            const endpointUsuario = 'http://localhost:3600/usuarios';



            const contentTypeJson = { "Content-Type": "application/json" };

            const dadosUsuario = {
                nome: nome,
                email: email,
                telefone: telefone,
                fk_idsexo: genero,
                data_nasc: dataNasc,
                cpf: cpf,
                senha: senha
            }

            try {
                const feedback = document.getElementById("mensagemcriacaodeconta");

                const responseUsuario = await fetch(endpointUsuario, {
                    method: "POST",
                    headers: contentTypeJson,
                    body: JSON.stringify
                        ({
                            ...dadosUsuario,
                            fk_idendereco: novoEndereco.id_endereco
                        })
                })

                if (!responseUsuario.ok) {
                    const texto = await responseUsuario.text();
                    throw new Error(`Erro ${responseUsuario.status}: ${texto}`)
                }

                const data = await responseUsuario.json();

                if (feedback) {
                    feedback.textContent = data.message || "Cadastro realizado com sucesso!";
                }

            } catch (error) {
                console.error("Erro ao enviar dados:", error);

                if (feedback) {
                    feedback.textContent = "Erro ao enviar dados. Tente novamente.";
                }

            }
        })
    }

})