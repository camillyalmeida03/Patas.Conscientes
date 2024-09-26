// window.addEventListener("load", paginacarregada);//a página espera o javascrip carregar antes de executar ele.

// function paginacarregada(){

//     let fecharFiltros = document.getElementById("fecharFiltros");

//     fecharFiltros.addEventListener("click", function(){
//         .style.display = 'none';
//         .style.display = 'flex';
//     })

//     }

//Função para limpar os radio buttons e deixar todos desmarcados
function limparRadioButtons() {
    var radios = document.getElementsByName('filter1');
    for (var i = 0; i < radios.length; i++) {
        radios[i].checked = false;
    }

    var radios = document.getElementsByName('filter2');
    for (var i = 0; i < radios.length; i++) {
        radios[i].checked = false;
    }

    var radios = document.getElementsByName('filter3');
    for (var i = 0; i < radios.length; i++) {
        radios[i].checked = false;
    }

        var todasOngs = ["ong1F", "ong2F", "ong3F", "ong4F", "ong5F"];
        for (var i = 0; i < todasOngs.length; i++) {
            document.getElementById(todasOngs[i]).checked = false;
        }

        var sexos = ["femeaF", "machoF"];
        for (var i = 0; i < todasOngs.length; i++) {
            document.getElementById(sexos[i]).checked = false;
        }
    }


