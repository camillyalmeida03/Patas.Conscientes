const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));


document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch(`http://localhost:8080/usuarios/${usuario.id}`);
    const data = await response.json();

    if (Array.isArray(data) && data.length === 1) {
      // console.log("Usuário encontrado:", data[0]);
      //header
      // fim do header
      // menu perfil
      document.getElementById("fotoUsuario").style.backgroundImage = `url('${data[0].foto}')`;
      document.getElementById("nomeUsuario").innerHTML = data[0].nome;
      document.getElementById("emaildouser").innerHTML = data[0].email;
      document.getElementById("sairouentrar").innerHTML = `<button title="Sair da conta" id="sairDaConta" class="vermelho buttonPerfil" onclick="logout()">Sair da conta</button>`;
      // fim do menu perfil
    } else {
     console.log("Usuário não encontrado ou dados inválidos.");


    }
  } catch (error) {
  console.log("Erro ao buscar dados do usuário:", error);
  // alert("Você não está logado", error);
}

});

function logout() {
  localStorage.removeItem("usuarioLogado");
  window.location.href = "/login.html";
}