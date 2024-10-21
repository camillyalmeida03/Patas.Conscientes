window.addEventListener("load", paginacarregada);//a página espera o javascrip carregar antes de executar ele.

function paginacarregada() {
    const divs = document.querySelectorAll(".nomIconAdotar");

    divs.forEach(div => {
        const adicionarFav = div.querySelector(".adicionarFav");
        const apagarFav = div.querySelector(".apagarFav");

        if (adicionarFav && apagarFav) {
            // Evento para adicionar
            adicionarFav.addEventListener('click', function() {
                adicionarFav.style.display = 'none';
                apagarFav.style.display = 'flex';
            });

            // Evento para apagar
            apagarFav.addEventListener('click', function() {
                apagarFav.style.display = 'none';
                adicionarFav.style.display = 'flex';
            });
        }
    });
}