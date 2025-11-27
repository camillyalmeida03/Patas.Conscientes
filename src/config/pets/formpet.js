document.addEventListener("DOMContentLoaded", () => {
  // 1. Tenta pegar o ID da URL atual
  const params = new URLSearchParams(window.location.search);
  // Se não tiver ID na URL, assume 1 (ou trate o erro redirecionando)
  const idOng = params.get("id") || 1; 

  console.log("Script formpet.js carregado. ID da ONG:", idOng);

  const formPet = document.getElementById("formInfoPet");

  if (formPet) {
    formPet.addEventListener("submit", async (e) => {
      e.preventDefault(); 
      console.log("Submit interceptado pelo JS");

      const form = e.target;

      // Validação básica
      if (!form.nome_pet.value || !form.raca.value) {
        alert("Preencha o nome e a raça!");
        return;
      }

      const body = {
        nome: form.nome_pet.value,
        fk_idespecie: parseInt(form.especie.value), 
        nomeRaca: form.raca.value, 
        fk_idsexopet: parseInt(form.sexo.value),    
        fk_idporte: parseInt(form.porte.value),     
        peso: parseFloat(form.peso.value) || 0,
        idade: parseInt(form.idade.value) || 0,
        descricao: form.sobre.value,      
        fk_idong: parseInt(idOng), // Usa o ID capturado no início
        fotos: null, 
        fk_idstatus: 1 
      };

      try {
        const res = await fetch("http://localhost:6789/pets/pornome", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });

        if (!res.ok) {
          const erro = await res.json();
          throw new Error(erro.message || "Erro ao criar pet");
        }

        const dataRes = await res.json();
        const id_pet = dataRes.id || dataRes.insertId; 

        // Upload da foto
        const inputFoto = document.getElementById("fotopetatt");
        if (inputFoto && inputFoto.files && inputFoto.files[0]) {
          const arquivoFoto = inputFoto.files[0];
          const formData = new FormData();
          formData.append("fotopet", arquivoFoto);

          await fetch(`http://localhost:6789/uploadfotopet/${id_pet}`, {
              method: "POST",
              body: formData,
          });
        }

        alert("Pet cadastrado com sucesso!");

        // 3. Força o reload mantendo o ID da ONG na URL
        // Isso garante que você volte para ongPage.html?id=31 e não perca a navegação
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