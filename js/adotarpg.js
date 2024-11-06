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

    const radios = document.querySelectorAll('input[type="radio"]');

        radios.forEach(radio => {
            radio.addEventListener('click', function() {
                if (this.checked) {
                    const wasChecked = this.dataset.checked === "true";
                    if (wasChecked) {
                        this.checked = false;
                        this.dataset.checked = "false";
                    } else {
                        radios.forEach(r => r.dataset.checked = "false");
                        this.dataset.checked = "true";
                    }
                }
            });
        });

        let verMais = document.querySelectorAll(".verMais");

        for (let g = 0; g < verMais.length; g++) {
            verMais[g].addEventListener("click", girarcartao);
        }
        
        function girarcartao() {
            // Capturar o pai imediato do elemento de botão que foi clicado
            let pai = this.parentNode;
        
            // Executar o código a seguir em loop, enquanto a condição não for alcançada
            // Enquanto o elemento pai não tiver o nome de classe -cardsAnimais-
            while (!pai.classList.contains("cardsAnimais")) {
                // Verifica se o pai contém a classe específica, independente de outras classes
                pai = pai.parentNode;
            
                // Opcional: verifica se `pai` ainda é um elemento válido para evitar loops infinitos
                if (!pai) break;
            }
        
            // Se a propriedade css transform estiver vazia ou for rotateY(0deg)
            if (pai.style.transform == "" || pai.style.transform == "rotateY(0deg)") {
                // Aplica o giro de 180 graus negativos
                pai.style.transform = "rotateY(-180deg)";
            } else if (pai.style.transform == "rotateY(-180deg)") {
                // Retorna o giro para 0 graus
                pai.style.transform = "rotateY(0deg)";
            }
        }
        




