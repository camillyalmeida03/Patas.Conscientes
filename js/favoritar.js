//Este arquivo é responsável por favoritar/desfavoritar ONGs e Pets

// Importando informações de outros arquivos
import { CriarElementos } from "./criarElementos.js";

export class Favoritar {
    constructor(InformacoesPet = null){
        this.infoPet =  InformacoesPet;

        this.criarElemento = new CriarElementos();
    }

    // criarBotoes(){
    //     console.log("Conexão acontecendo")

        
    // this.adicionarFavorito = this.criarElemento.createButton(
    //   ["favoritar", "adicionarFav"],
    //   null,
    //   this.conjFavoritarCompartilhar,
    //   " Favoritar " + this.InfoPet.nome
    // );

    // this.apagarFavorito = this.criarElemento.createButton(
    //   ["favoritar", "apagarFav"],
    //   null,
    //   this.conjFavoritarCompartilhar,
    //   "DesFavoritar " + this.InfoPet.nome
    // );
    // }
}


//     const divs = document.querySelectorAll(".nomIconAdotar, .imgFav");

//     divs.forEach(div => {
//         const adicionarFav = div.querySelector(".adicionarFav");
//         const apagarFav = div.querySelector(".apagarFav");

//         if (adicionarFav && apagarFav) {
//             // Evento para adicionar
//             adicionarFav.addEventListener('click', function() {
//                 adicionarFav.style.display = 'none';
//                 apagarFav.style.display = 'flex';

//                 // Remove qualquer imagem de feedback existente
//                 removeFeedbackImage();

//                 // Criação do elemento de imagem para "adicionado"
//                 const imgAdd = document.createElement('img');
//                 imgAdd.src = '/img/feedback/fav_adicionado.svg';
//                 imgAdd.style.position = 'fixed';
//                 imgAdd.style.top = '5rem';
//                 imgAdd.style.right = '2rem';
//                 imgAdd.style.zIndex = '4000';
//                 imgAdd.style.height = '6rem';

//                 // Adiciona a imagem ao body
//                 document.body.appendChild(imgAdd);

//                 // Remove a imagem após 3 segundos
//                 setTimeout(() => {
//                     imgAdd.remove();
//                 }, 3000);
//             });

//             // Evento para apagar
//             apagarFav.addEventListener('click', function() {
//                 apagarFav.style.display = 'none';
//                 adicionarFav.style.display = 'flex';

//                 // Remove qualquer imagem de feedback existente
//                 removeFeedbackImage();

//                 // Criação do elemento de imagem para "removido"
//                 const imgRemovido = document.createElement('img');
//                 imgRemovido.src = '/img/feedback/fav_removido.svg';
//                 imgRemovido.style.position = 'fixed';
//                 imgRemovido.style.top = '5rem';
//                 imgRemovido.style.right = '2rem';
//                 imgRemovido.style.zIndex = '4000';
//                 imgRemovido.style.height = '6rem';

//                 // Adiciona a imagem ao body
//                 document.body.appendChild(imgRemovido);

//                 // Remove a imagem após 3 segundos
//                 setTimeout(() => {
//                     imgRemovido.remove();
//                 }, 3000);
//             });
//         }
//     });

// // Função para remover qualquer imagem de feedback existente
// function removeFeedbackImage() {
//     const imgFeedback = document.querySelector('body > img[src="/img/feedback/fav_adicionado.svg"], body > img[src="/img/feedback/fav_removido.svg"]');
//     if (imgFeedback) {
//         imgFeedback.remove();
//     }
// }
