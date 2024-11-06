window.addEventListener("load", paginacarregada);

function paginacarregada() {
    const divs = document.querySelectorAll(".nomIconAdotar, .imgFav");

    divs.forEach(div => {
        const adicionarFav = div.querySelector(".adicionarFav");
        const apagarFav = div.querySelector(".apagarFav");

        if (adicionarFav && apagarFav) {
            // Evento para adicionar
            adicionarFav.addEventListener('click', function() {
                adicionarFav.style.display = 'none';
                apagarFav.style.display = 'flex';

                const imgRemovido = document.querySelector('body > img[src="/img/feedback/white_card_removido_fav.svg"]');
                if (imgRemovido) {
                    imgRemovido.remove();
                }

                // Criação do elemento de imagem
                const imgAdd = document.createElement('img');
                imgAdd.src = '/img/feedback/white_card_add_fav.svg'; // Defina a URL da imagem
                imgAdd.style.position = 'fixed';
                imgAdd.style.top = '5rem';
                imgAdd.style.right = '0';
                imgAdd.style.zIndex = '4000';
                imgAdd.style.height = '20rem';

                // Adiciona a imagem ao body
                document.body.appendChild(imgAdd);

                // Remove a imagem após 3 segundos
                setTimeout(() => {
                    imgAdd.remove();
                }, 3000);
            });

            // Evento para apagar
            apagarFav.addEventListener('click', function() {
                apagarFav.style.display = 'none';
                adicionarFav.style.display = 'flex';

                // Remove a imagem criada anteriormente
                const imgAdd = document.querySelector('body > img[src="/img/feedback/white_card_add_fav.svg"]');
                if (imgAdd) {
                    imgAdd.remove();
                }

                // Criação do elemento de imagem
                const imgRemovido = document.createElement('img');
                imgRemovido.src = '/img/feedback/white_card_removido_fav.svg'; // Defina a URL da imagem
                imgRemovido.style.position = 'fixed';
                imgRemovido.style.top = '0rem';
                imgRemovido.style.right = '0';
                imgRemovido.style.zIndex = '4000';
                imgRemovido.style.height = '20rem';

                // Adiciona a imagem ao body
                document.body.appendChild(imgRemovido);

                // Remove a imagem após 3 segundos
                setTimeout(() => {
                    imgRemovido.remove();
                }, 3000);
            });
        }
    });
}
