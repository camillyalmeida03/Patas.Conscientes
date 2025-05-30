//Este arquivo é responsável por trazer as funcionalidades da página de configurações.

// Funcionalidade do aside
class AsideConfig {
    constructor() {
      this.ladoConfig = document.getElementById("ladoConfig");
      this.ladoPoliticas = document.getElementById("ladoPoliticas");

      this.configConta = document.getElementById("configConta");
      this.politicasConta = document.getElementById("politicasConta");
    }
  
    acessarPoliticas() {
      this.ladoPoliticas.style.display = "flex";
      this.ladoConfig.style.display = "none";

    }
  
    acessarConfig() {
      this.ladoPoliticas.style.display = "none";

      this.ladoConfig.style.display = "block";
    }
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    const configConta = document.getElementById("configConta");
    const politicasConta = document.getElementById("politicasConta");
  
    const newAsideConfig = new AsideConfig();
  
    configConta?.addEventListener("click", () => newAsideConfig.acessarConfig());
    politicasConta?.addEventListener("click", () => newAsideConfig.acessarPoliticas());
  });

//Seta de abrir leque de opções na aba tema
function abrir() {
  let menu = document.getElementById("menu");
  let seta = document.getElementById("setaConfig");

  if (menu.style.display === "none" || menu.style.display === "") {
    menu.style.display = "flex";
  } else {
    menu.style.display = "none";
  }

  if (
    seta.style.transform === "rotate(0deg)" ||
    seta.style.transform === ""
  ) {
    seta.style.transform = "rotate(90deg)";
  } else {
    seta.style.transform = "rotate(0deg)";
  }
}

// conexão com o localStorage
const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));


document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch(`http://localhost:8080/usuarios/${usuario.id}`);
    const data = await response.json();

    if (Array.isArray(data) && data.length === 1) {
      document.getElementById("nomeUsuarioconfig").innerHTML = data[0].nome;
      document.getElementById("emailuserconfig").innerHTML = `<span class="before">E-mail:</span> ${data[0].email}`;
      document.getElementById("telefoneconfig").innerHTML = `<span class="before">Telefone:</span> ${data[0].telefone}`;

    } else {
     console.log("Usuário não encontrado ou dados inválidos.");


    }
  } catch (error) {
  console.log("Erro ao buscar dados do usuário:", error);
  // alert("Você não está logado", error);
}

});
