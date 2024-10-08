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

    function abrirFiltros(){
        const botFiltros = document.getElementById("botFiltros");
        const filtro = document.getElementById("filtro");

        filtro.style.display = 'flex';
    }

    function fecharFiltros(){
        const filtro = document.getElementById("filtro");
        const fecharFiltros = document.getElementById("fecharFiltros");

        filtro.style.display = 'none';

    }

    document.querySelectorAll('.adotarMiniCard').forEach(adotarMiniCard => {
        adotarMiniCard.addEventListener('click', function (e) {
            e.stopPropagation(); // Impede o clique de propagar para o documento
    
            const expandircardPet = this.querySelector('.expandircardPet');
    
            // Verifique se expandircardPet existe
            if (!expandircardPet) {
                console.error('Elemento .expandircardPet não encontrado dentro de adotarMiniCard');
                return; // Saia da função se o elemento não existir
            }
    
            const adotarMiniCardRect = this.getBoundingClientRect();
            const expandircardPetRect = expandircardPet.getBoundingClientRect();
    
            expandircardPet.style.display = 'flex';
    
            const spaceTop = adotarMiniCardRect.top;
            const spaceBottom = window.innerHeight - adotarMiniCardRect.bottom;
            const spaceLeft = adotarMiniCardRect.left;
            const spaceRight = window.innerWidth - adotarMiniCardRect.right;
    
            if (spaceRight >= expandircardPetRect.width) {
                expandircardPet.style.left = `${adotarMiniCardRect.right}px`;
                expandircardPet.style.top = `${adotarMiniCardRect.top}px`;
            } else if (spaceLeft >= expandircardPetRect.width) {
                expandircardPet.style.left = `${adotarMiniCardRect.left - expandircardPetRect.width}px`;
                expandircardPet.style.top = `${adotarMiniCardRect.top}px`;
            } else if (spaceBottom >= expandircardPetRect.height) {
                expandircardPet.style.top = `${adotarMiniCardRect.bottom}px`;
                expandircardPet.style.left = `${adotarMiniCardRect.left}px`;
            } else if (spaceTop >= expandircardPetRect.height) {
                expandircardPet.style.top = `${adotarMiniCardRect.top - expandircardPetRect.height}px`;
                expandircardPet.style.left = `${adotarMiniCardRect.left}px`;
            }
        });
    });
    
    document.addEventListener('click', (e) => {
        document.querySelectorAll('.expandircardPet').forEach(expandircardPet => {
            if (expandircardPet.style.display === 'flex' && !expandircardPet.parentElement.contains(e.target)) {
                expandircardPet.style.display = 'none';
            }
        });
    });
    



