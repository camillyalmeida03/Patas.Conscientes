// js da página index.html

// Mudança automática de imagens

// Declaração da variavél position que indica a posição
let position = 1;
// Enquanto "radio1" estiver clicado ou com um check, faça o que está aqui em baixo...
document.getElementById("radio1").checked = true;

// A cada 5s se chama a função "nextImage"
setInterval(function () {
    nextImage();
}, 5000)

function nextImage() {

    // Adiciona 1 na posição da imagem atual...
    position++;

    // Aqui indica que vai até a position 3, e depois retorna para a position 1, ou seja, a primeira imagem 
    if (position > 3) {
        position = 1;
    }

    // E por adicionar 1 a posição atual a função permite com esta ação ir para a próxima imagem
    document.getElementById("radio" + position).checked = true;
}

window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }
gtag('js', new Date());

gtag('config', 'G-T7SLTC12HP');