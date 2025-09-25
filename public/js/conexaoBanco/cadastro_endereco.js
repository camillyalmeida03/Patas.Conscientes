document.addEventListener("DOMContentLoaded", function () {
    function envioEndereco(formulario) {
        if (formulario) {

            formulario.addEventListener("submit", async (e) => {
                e.preventDefault();

                const cep = document.getElementById("cep").value.trim();
                const estado = document.getElementById("estado").value;
                const cidade = document.getElementById("cidade").value.trim();
                const rua = document.getElementById("rua").value.trim();
                const bairro = document.getElementById("bairro").value.trim();
                const nmr = document.getElementById("nmr").value.trim();
                const complemento = document.getElementById("complemento").value.trim();

                const endpointEndereco = 'http://localhost:3600/enderecos';

                const endpointEstado = "http://localhost:3600/estados"
                const endpointCidade = "http://localhost:3600/cidades"
                const endpointBairro = "http://localhost:3600/bairros"
                const endpointRua = "http://localhost:3600/ruas"

                const dadosEndereco = {
                    cep: cep,
                    fk_idestado: estado,
                    fk_idcidade: cidade,
                    fk_idbairro: bairro,
                    fk_idrua: rua,
                    numero: nmr,
                    complemento: complemento
                }

                try {
                    const responseEndereco = await fetch(endpointEndereco, {
                        method: "POST",
                        headers: contentTypeJson,
                        body: JSON.stringify(dadosEndereco)
                    })

                    if (!responseEndereco.ok) {
                        const texto = await responseEndereco.text();
                        console.log("Erro ao enviar dados do endereço.")
                        throw new Error(`Erro ${responseEndereco.status}: ${texto}`)
                    }

                    const novoEndereco = await responseEndereco.json();
                } catch (error) {
                    console.error("Erro ao enviar dados:", error);

                    if (feedback) {
                        feedback.textContent = "Erro ao enviar dados. Tente novamente.";
                    }
                }
            }
            )
        }
    }
})

