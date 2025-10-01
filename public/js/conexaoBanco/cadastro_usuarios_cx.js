document.addEventListener("DOMContentLoaded", function () {
    const formUsuario = document.getElementById("cadastroUsuario");
    const feedback = document.getElementById("mensagemcriacaodeconta");

    if (!formUsuario) return;

    formUsuario.addEventListener("submit", async (e) => {
        e.preventDefault();

        try {
            // ------------------- DADOS DO ENDEREÇO -------------------
            const cep = document.getElementById("cep").value.trim();
            const estado = document.getElementById("estado").value;
            const cidade = document.getElementById("cidade").value.trim();
            const bairro = document.getElementById("bairro").value.trim();
            const rua = document.getElementById("rua").value.trim();
            const nmr = document.getElementById("nmr").value.trim();
            const complemento = document.getElementById("complemento").value.trim();

            const endpointEstado = "http://localhost:3600/estados";
            const endpointCidade = "http://localhost:3600/cidades";
            const endpointBairro = "http://localhost:3600/bairros";
            const endpointRua = "http://localhost:3600/ruas";
            const endpointEndereco = "http://localhost:3600/enderecos";
            const endpointUsuario = 'http://localhost:3600/usuarios';
            const contentTypeJson = { "Content-Type": "application/json" };

            // POST estado
            const idEstado = (await fetch(endpointEstado, {
                method: "POST",
                headers: contentTypeJson,
                body: JSON.stringify({ sigla: estado })
            }).then(res => res.json())).id;

            // POST cidade
            const idCidade = (await fetch(endpointCidade, {
                method: "POST",
                headers: contentTypeJson,
                body: JSON.stringify({ fk_idestado: idEstado, cidade })
            }).then(res => res.json())).id;

            // POST bairro
            const idBairro = (await fetch(endpointBairro, {
                method: "POST",
                headers: contentTypeJson,
                body: JSON.stringify({ fk_idcidade: idCidade, bairro })
            }).then(res => res.json())).id;

            // POST rua
            const idRua = (await fetch(endpointRua, {
                method: "POST",
                headers: contentTypeJson,
                body: JSON.stringify({ fk_idbairro: idBairro, rua })
            }).then(res => res.json())).id;

            // POST endereço completo
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

            console.log("Endereço salvo:", novoEndereco);

            // ------------------- DADOS DO USUÁRIO -------------------
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
                fk_idtipo: 1, // tipo padrão
                foto: null   // ou string vazia
            };

            const responseUsuario = await fetch(endpointUsuario, {
                method: "POST",
                headers: contentTypeJson,
                body: JSON.stringify(dadosUsuario)
            });

            if (!responseUsuario.ok) {
                const texto = await responseUsuario.text();
                throw new Error(`Erro ${responseUsuario.status}: ${texto}`);
            }

            const data = await responseUsuario.json();
            if (feedback) feedback.textContent = data.message || "Cadastro realizado com sucesso!";

        } catch (error) {
            console.error("Erro ao enviar dados:", error);
            if (feedback) feedback.textContent = "Erro ao enviar dados. Tente novamente.";
        }
    });
});
