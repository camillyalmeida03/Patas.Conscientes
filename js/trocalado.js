window.addEventListener("load", paginacarregada);//a página espera o javascrip carregar antes de executar ele.

function paginacarregada(){


        let botao1 = document.getElementById("botao1");
        let botao2 = document.getElementById("botao2");
        let botao3 = document.getElementById("botao3");

        let lado1 = document.getElementById("lado1");
        let lado2 = document.getElementById("lado2");

        botao1.style.color = '#0E457D'

        botao2.addEventListener("click", function(){
            lado1.style.display = 'none';
            lado2.style.display = 'grid';
            botao2.style.color = '#0E457D'
            botao1.style.color = ''
            botao3.style.color = ''


        })

        botao1.addEventListener("click", function(){
            lado2.style.display = 'none';
            lado1.style.display = 'grid' ;
            botao1.style.color = '#0E457D'
            botao2.style.color = ''
            botao3.style.color = ''

        })

        botao3.addEventListener("click", function(){
            lado2.style.display = 'none';
            lado1.style.display = 'grid' ;
            botao3.style.color = '#0E457D'
            botao1.style.color = ''
            botao2.style.color = ''

        })

    }
