const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));


document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch(`http://localhost:4501/usuarios/${usuario.id}`);
    const data = await response.json();

    if (Array.isArray(data) && data.length === 1) {
      // console.log("Usuário encontrado:", data[0]);
      //header
      document.getElementById("fotoUsuario").style.backgroundImage = `url('${data[0].foto}')`;
      document.getElementById("menuperfilefavoritos").innerHTML = `  <div id="menuperfilefavoritos" class="imglinksHeader">
    <a href="favoritos.html" title="Link que direciona para a página de favoritos do site"><svg
        xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" fill="#ffffff">
        <path
          d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z" />
      </svg></a>
    <button onclick="configuracoesdePefil()" title="Abrir configurações de perfil" id="abrirConfigPerfil" ><div  id="fotoUsuario" style="height: 2.5rem; width: 2.5rem;"></div></button>
  </div>`;
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