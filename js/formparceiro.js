window.addEventListener("load", paginacarregada);

function paginacarregada(){

let formParceiro1 = document.getElementById("formParceiro1");
let formParceiro2 = document.getElementById("formParceiro2");
let continuarFormParc = document.getElementById("continuarFormParc");
let cadastrarFormParceiro = document.getElementById("cadastrarFormParceiro");

continuarFormParc.addEventListener("click", function(){
    event.preventDefault();
    
    formParceiro1.style.display = 'none';
    formParceiro2.style.display = 'flex';
})

cadastrarFormParceiro.addEventListener("click", function(){
    event.preventDefault();
    
    formParceiro1.style.display = 'flex';
    formParceiro2.style.display = 'none';
})
}

function atualizarContagem() {
    contagem.innerHTML = mensagem.value.length;
  }
