import { MensagemFeedback } from "../../../public/js/formularios/mensagemFeedback.js";

document.addEventListener("DOMContentLoaded", function () {
    const formOng = document.getElementById("formOng");
    const feedbackPai = document.getElementById("mensagemcriacaodeconta");

    if (!formOng) return;

    formOng.addEventListener("submit", async (e) => {
        e.preventDefault();

        const camposValidos =
            validarNome() &&
            validarEmail() &&
            validarTelCel() &&
            validarCnpj() &&
            validarSenhas() &&
            validarDescricao() &&
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
            const endpointOng = "http://localhost:6789/ongs";


            const contentTypeJson = { "Content-Type": "application/json" };

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

            const nome = document.getElementById("nomeOng").value.trim();
            const email = document.getElementById("emailOng").value.trim();
            const telefone = document.getElementById("telcelUsuarioAdt").value.trim();
            const cnpj = document.getElementById("cnpj").value.trim();
            const senha = document.getElementById("senhaUsuarioAdt").value.trim();
            const descricao = document.getElementById("mensagem").value;

            const token = localStorage.getItem("token");

            if (!token) {
                new MensagemFeedback("Sessão expirada. Faça login novamente.", feedbackPai).feedbackError();
                return;
            }

            const dadosOng = {
                nome,
                email,
                telefone,
                cnpj,
                senha,
                fk_idendereco: novoEndereco.id,
                fk_idtipo: 4,
                foto: null,
                descricao,
                comp_estatuto: null,
                comp_cnpj: null
            };

            const responseOng = await fetch(endpointOng, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(dadosOng)
            });

            const dataOng = await responseOng.json();

            if (!responseOng.ok) {
                new MensagemFeedback(dataOng.message || "Erro ao criar ONG.", feedbackPai).feedbackError();
                return;
            }
            
            const idNovaOng = dataOng.id;

            const responseNovaOng = await fetch(`${endpointOng}/${idNovaOng}`);
            const dadosCompletosOng = await responseNovaOng.json();

            if (dadosCompletosOng && dadosCompletosOng.length > 0) {
                const ongBanco = dadosCompletosOng[0]; 
                
                const ongParaSalvar = {
                    id: ongBanco.idong,
                    nome: ongBanco.nome,
                    email: ongBanco.email,
                    telefone: ongBanco.telefone,
                    descricao: ongBanco.descricao,
                    id_responsavel: dataOng.id_vinculo_responsavel || null 
                };

                localStorage.setItem("ong", JSON.stringify(ongParaSalvar));

                let usuarioSalvo = JSON.parse(localStorage.getItem("usuario"));
                if (usuarioSalvo) {
                    usuarioSalvo.responsavelOng = true;
                    localStorage.setItem("usuario", JSON.stringify(usuarioSalvo));
                }
            }

            new MensagemFeedback("ONG cadastrada com sucesso!", feedbackPai).feedbackSucess();
            
            setTimeout(() => {
                window.location.href = `/src/views/ongPage.html?id=${idNovaOng}`;
                formOng.reset();
            }, 2000);

        } catch (error) {
            console.error("Erro ao enviar dados:", error);
            new MensagemFeedback("Erro de conexão ao enviar dados.", feedbackPai).feedbackError();
        }
    });

        const modalPrecisaLogin = document.getElementById("modalCadOng");
    const modalJaTemOng = document.getElementById("modalCadOngPOngs");

    const usuarioLogado = JSON.parse(localStorage.getItem("usuario"));
    const token = localStorage.getItem("token");

    if (!token || !usuarioLogado) {
        if (modalPrecisaLogin) {
            modalPrecisaLogin.classList.remove("escondido");
        }
        return; 
    }

    if (usuarioLogado.responsavelOng === true) {
        if (modalJaTemOng) {
            modalJaTemOng.classList.remove("escondido");
        }
        return;
    }
});
