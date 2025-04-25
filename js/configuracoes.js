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
        this.politicasConta.style.backgroundColor = "var(--cinza215)";
      this.ladoConfig.style.display = "none";
      this.configConta.style.backgroundColor = "transparent";

    }
  
    acessarConfig() {
      this.ladoPoliticas.style.display = "none";
      this.politicasConta.style.backgroundColor = "transparent";

      this.ladoConfig.style.display = "block";
      this.configConta.style.backgroundColor = "var(--cinza215)";
    }
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    const configConta = document.getElementById("configConta");
    const politicasConta = document.getElementById("politicasConta");
  
    const newAsideConfig = new AsideConfig();
  
    configConta?.addEventListener("click", () => newAsideConfig.acessarConfig());
    politicasConta?.addEventListener("click", () => newAsideConfig.acessarPoliticas());
  });
  
function paginacarregada() {
  // let contaConfig = document.getElementById("botao1");
  // let politicasSite = document.getElementById("botao2");
  // let politicasSiteH3 = document.getElementById("politicasSiteH3");
  // let contaH3 = document.getElementById("contaH3");
  // let configConta = document.getElementById("configConta");
  // let politicasdoSite = document.querySelector(".politicasdoSite");
  // politicasSite.addEventListener("click", function(){
  //     configConta.style.display = 'none';
  //     politicasdoSite.style.display = 'flex';
  // })
  // contaConfig.addEventListener("click", function(){
  //     politicasdoSite.style.display = 'none';
  //     configConta.style.display = 'block' ;
  // })
  // contaH3.addEventListener("click", function(){
  //     politicasdoSite.style.display = 'none';
  //     configConta.style.display = 'block' ;
  // })
  // politicasSiteH3.addEventListener("click", function(){
  //     configConta.style.display = 'none';
  //     politicasdoSite.style.display = 'flex';
  // })
}

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
