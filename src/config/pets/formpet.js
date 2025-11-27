document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const idOng = params.get("id") || 1; 

  console.log("Script formpet.js carregado. ID da ONG:", idOng);

  const formPet = document.getElementById("formInfoPet");

  if (formPet) {
    formPet.addEventListener("submit", async (e) => {
      e.preventDefault(); 
      console.log("Submit interceptado pelo JS");

      const form = e.target;

      if (!form.nome_pet.value || !form.raca.value) {
        alert("Preencha o nome e a raça!");
        return;
      }

const formData = new FormData();
      // Adiciona os campos de texto manualmente no FormData
      formData.append("nome", form.nome_pet.value);
      formData.append("fk_idespecie", parseInt(form.especie.value));
      formData.append("nomeRaca", form.raca.value);
      formData.append("fk_idsexopet", parseInt(form.sexo.value));
      formData.append("fk_idporte", parseInt(form.porte.value));
      formData.append("peso", parseFloat(form.peso.value) || 0);
      formData.append("idade", parseInt(form.idade.value) || 0);
      formData.append("descricao", form.sobre.value);
      formData.append("fk_idong", parseInt(idOng));
      formData.append("fk_idstatus", 1);

      // Adiciona o arquivo se existir
      const inputFoto = document.getElementById("fotopetatt");
      if (inputFoto && inputFoto.files[0]) {
          formData.append("fotopet", inputFoto.files[0]);
      }

      try {
        const res = await fetch("http://localhost:6789/pets/pornome", {
          method: "POST",
          body: formData, // Envia o FormData direto, não JSON
        });

        if (!res.ok) {
          const erro = await res.json();
          throw new Error(erro.message || "Erro ao criar pet");
        }

        alert("Pet cadastrado com sucesso!");
        window.location.href = `ongPage.html?id=${idOng}`;

      } catch (err) {
        console.error(err);
        alert("Erro: " + err.message);
      }
    });
  } else {
      console.error("Formulário formInfoPet não encontrado no HTML");
  }
});