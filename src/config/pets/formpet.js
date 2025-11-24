// formpet.js
document.addEventListener("DOMContentLoaded", () => {
  const idOng = new URLSearchParams(window.location.search).get("id");
  const formPet = document.getElementById("formInfoPet");

  if (formPet) {
    formPet.addEventListener("submit", async (e) => {
      e.preventDefault();

      const form = e.target;

      const body = {
        nome: form.nome_pet.value,
        fk_idespecie: form.especie.value, 
        fk_idraca: form.raca.value,       
        fk_idsexopet: form.sexo.value,    
        fk_idporte: form.porte.value,     
        peso: form.peso.value,
        idade: form.idade.value,
        descricao: form.sobre.value,      
        fk_idong: parseInt(idOng) || 1,  
        

        fk_idresponsavel: 1, 
        fk_idstatus: 1 
      };

      try {

        const res = await fetch("http://localhost:6789/pets", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });

        if (!res.ok) {
          const erro = await res.json();
          return alert("Erro ao salvar pet: " + (erro.message || JSON.stringify(erro)));
        }

        const dataRes = await res.json();

        const id_pet = dataRes.id_pet || dataRes.id; 

        const inputFoto = document.getElementById("fotopetatt");
        
        if (inputFoto && inputFoto.files && inputFoto.files[0]) {
          const arquivoFoto = inputFoto.files[0];
          const formData = new FormData();
          formData.append("fotopet", arquivoFoto);

          const upload = await fetch(
            `http://localhost:6789/uploadfotopet/${id_pet}`,
            {
              method: "POST",
              body: formData,
            }
          );

          if (!upload.ok) {
            const erroFoto = await upload.json();
            alert("Pet salvo, mas a foto falhou: " + erroFoto.message);
          }
        }

        alert("Pet cadastrado com sucesso!");
      } catch (err) {
        console.error(err);
        alert("Erro inesperado: " + err.message);
      }
    });
  }
});