import { MensagemFeedback } from "../../public/js/formularios/mensagemFeedback.js"; 

document.addEventListener("DOMContentLoaded", function () {
    const formUsuario = document.getElementById("formOng");
    const feedbackPai = document.getElementById("mensagemcriacaodeconta");

    if (!formUsuario) return;

    formUsuario.addEventListener("submit", async (e) => {
        e.preventDefault();

        const camposValidos =
            validarNome() &&
            validarEmail() &&
            validarTelCel() &&
            validarCnpj () &&
            validarData() &&
            validarSenhas() &&
            validarCep() &&
            validarEstado() &&
            validarCidade() &&
            validarBairro() &&
            validarRua() &&
            validarNmr();

        if (!camposValidos) {
            new MensagemFeedback("Por favor, corrija os erros antes de enviar o formulário.", feedbackPai).feedbackError();
            return;
        }

        try {
            const cep = document.getElementById("cep").value.trim();
            const estado = document.getElementById("estado").value;
            const cidade = document.getElementById("cidade").value.trim();
            const bairro = document.getElementById("bairro").value.trim();
            const rua = document.getElementById("rua").value.trim();
            const nmr = document.getElementById("nmr").value.trim();
            const complemento = document.getElementById("complemento").value.trim();

            const endpointEstado = "http://localhost:6789/estados";
            const endpointCidade = "http://localhost:6789/cidades";
            const endpointBairro = "http://localhost:6789/bairros";
            const endpointRua = "http://localhost:6789/ruas";
            const endpointEndereco = "http://localhost:6789/enderecos";
            const endpointUsuario = "http://localhost:6789/usuarios";
            const contentTypeJson = { "Content-Type": "application/json" };

            // ------------------- CRIAÇÕES EM CADEIA -------------------
            const idEstado = (await fetch(endpointEstado, {
                method: "POST",
                headers: contentTypeJson,
                body: JSON.stringify({ sigla: estado })
            }).then(res => res.json())).id;

            const idCidade = (await fetch(endpointCidade, {
                method: "POST",
                headers: contentTypeJson,
                body: JSON.stringify({ fk_idestado: idEstado, cidade })
            }).then(res => res.json())).id;

            const idBairro = (await fetch(endpointBairro, {
                method: "POST",
                headers: contentTypeJson,
                body: JSON.stringify({ fk_idcidade: idCidade, bairro })
            }).then(res => res.json())).id;

            const idRua = (await fetch(endpointRua, {
                method: "POST",
                headers: contentTypeJson,
                body: JSON.stringify({ fk_idbairro: idBairro, rua })
            }).then(res => res.json())).id;

            const novoEndereco = await fetch(endpointEndereco, {
                method: "POST",
                headers: contentTypeJson,
                body: JSON.stringify({
                    cep,
                    fk_idestado: idEstado,
                    fk_idcidade: idCidade,
                    fk_idbairro: idBairro,
                    fk_idrua: idRua,
                    numero: nmr,
                    complemento
                })
            }).then(res => res.json());

            // ------------------- USUÁRIO -------------------
            const nome = document.getElementById("nomeUsuarioAdt").value.trim();
            const email = document.getElementById("emailUsuarioAdt").value.trim();
            const telefone = document.getElementById("telcelUsuarioAdt").value.trim();
            const cpf = document.getElementById("cpfUsuarioAdt").value.trim();
            const genero = document.getElementById("genero").value;
            const dataNasc = document.getElementById("dataNasc").value;
            const senha = document.getElementById("senhaUsuarioAdt").value.trim();

            const dadosUsuario = {
                nome,
                email,
                telefone,
                fk_idsexo: genero,
                data_nasc: dataNasc,
                cpf,
                senha,
                fk_idendereco: novoEndereco.id,
                fk_idtipo: 3,
                foto: null
            };

            const responseUsuario = await fetch(endpointUsuario, {
                method: "POST",
                headers: contentTypeJson,
                body: JSON.stringify(dadosUsuario)
            });

            const data = await responseUsuario.json();

            if (!responseUsuario.ok || data.success === false) {
                new MensagemFeedback(data.message || "Erro ao enviar dados.", feedbackPai).feedbackError();
                return;
            }

            if (data.success) {
                new MensagemFeedback("Cadastro realizado com sucesso!", feedbackPai).feedbackSucess();
                formUsuario.reset();
                setTimeout(() => {
                    window.location.href = "/src/views/configuracoes.html";
                }, 2000);
            }

        } catch (error) {
            console.error("Erro ao enviar dados:", error);
            new MensagemFeedback("Erro ao enviar dados. Tente novamente.", feedbackPai).feedbackError();
        }
    });
});
