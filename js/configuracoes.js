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


    function abrir() {
        let menu = document.getElementById("menu");
        let seta = document.getElementById("setaConfig");
    
        if (menu.style.display === "flex" || menu.style.display === "") {
            menu.style.display = "none";
        } else {
            menu.style.display = "flex";
        }

        if (seta.style.transform === "rotate(0deg)" || seta.style.transform === "") {
            seta.style.transform = "rotate(-180deg)";
        } else {
            seta.style.transform = "rotate(0deg)";
        }


    }
    
    
