//Este arquivo é responsável por trazer as funcionalidades da página de configurações.

window.addEventListener("load", paginacarregada); //a página espera o javascrip carregar antes de executar ele.

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
