window.addEventListener("load", paginacarregada);//a página espera o javascrip carregar antes de executar ele.

function paginacarregada(){


        let contaConfig = document.getElementById("contaConfig");
        let politicasSite = document.getElementById("politicasSite");
        let politicasSiteH3 = document.getElementById("politicasSiteH3");
        let contaH3 = document.getElementById("contaH3");

        let configConta = document.getElementById("configConta");
        let politicasdoSite = document.getElementById("politicasdoSite");

        politicasSite.addEventListener("click", function(){
            configConta.style.display = 'none';
            politicasdoSite.style.display = 'flex';
        })

        contaConfig.addEventListener("click", function(){
            politicasdoSite.style.display = 'none';
            configConta.style.display = 'block' ;
        })

        contaH3.addEventListener("click", function(){
            politicasdoSite.style.display = 'none';
            configConta.style.display = 'block' ;
        })

        politicasSiteH3.addEventListener("click", function(){
            configConta.style.display = 'none';
            politicasdoSite.style.display = 'flex';
        })

    }

    //Seta de abrir leque de opções na aba tema 

    // document.getElementById("setaOpções").addEventListener("click", function() {
    //     let menu = document.getElementById("menu");
        
    //     // Alterna entre exibir e esconder o menu
    //     if (menu.style.display === "block") {
    //         menu.style.display = "none";
    //     } else {
    //         menu.style.display = "block";
    //     }
    // });

    // document.addEventListener("click", function(event) {
    //     let menu = document.getElementById("menu");
    //     let button = document.getElementById("abrirOpções");
    
    //     // Se o clique NÃO foi no botão e nem no menu, ele fecha
    //     if (event.target !== menu && event.target !== button) {
    //         menu.style.display = "none";
    //     }
    // });


    function abrir() {
        let menu = document.getElementById("menu");
    
        if (menu.style.display === "flex" || menu.style.display === "") {
            menu.style.display = "none";
        } else {
            menu.style.display = "flex";
        }

        

    }
    
    
