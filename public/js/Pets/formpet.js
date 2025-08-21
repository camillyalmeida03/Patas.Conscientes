document.addEventListener("DOMContentLoaded", () => {
  const idOng = new URLSearchParams(window.location.search).get("id");
  const formPet = document.getElementById("formInfoPet");

  if (formPet) {
    formPet.addEventListener("submit", async (e) => {
      e.preventDefault();

      const form = e.target;

      // 1. Montar objeto JSON para cadastrar o pet
      const body = {
        id_especie_fk: form.especie.value,
        raca: form.raca.value,
        nome_pet: form.nome_pet.value,
        id_sexo_fk: form.sexo.value,
        id_porte_fk: form.porte.value,
        peso: form.peso.value,
        idade: form.idade.value,
        sobre_pet: form.sobre.value,
        id_ong_fk: parseInt(idOng),
      };

      try {
        // 2. Enviar cadastro do pet (sem imagem ainda)
        const res = await fetch("http://localhost:4501/pets", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });

        if (!res.ok) {
          const erro = await res.json();
          return alert("Erro ao salvar pet: " + erro.message);
        }

        const { id_pet } = await res.json();

        // 3. Verifica se o usuário escolheu uma imagem
        const inputFoto = document.getElementById("fotopetatt");
        const arquivoFoto = inputFoto.files[0];

        if (arquivoFoto) {
          const formData = new FormData();
          formData.append("fotopet", arquivoFoto);

          // 4. Envia a imagem usando o id do pet
          const upload = await fetch(
            `http://localhost:4501/uploadfotopet/${id_pet}`,
            {
              method: "POST",
              body: formData,
            }
          );

          if (!upload.ok) {
            const erro = await upload.json();
            return alert("Erro ao enviar foto: " + erro.message);
          }
        }

        // 5. Tudo certo!
        alert("Pet cadastrado com sucesso!");
        location.reload();
      } catch (err) {
        console.error(err);
        alert("Erro inesperado.");
      }
    });
  }
});
