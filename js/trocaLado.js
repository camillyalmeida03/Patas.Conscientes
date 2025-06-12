// Este arquivo é responsável por fazer a troca de lados em algumas páginas

class TrocaLado{
    constructor(){
    }

    lado1(lado2, lado1){
        lado2.style.display ==="none";
        lado1.style.display ==="flex";
    }

    lado2(lado2, lado1){
        lado1.style.display ==="none";
        lado2.style.display ==="flex";
    }
}

let petsLadoFavoritos = document.getElementById("petsLadoFavoritos");
let ongLadoFavoritos = document.getElementById("ongLadoFavoritos");

let trocaLadoFavoritos = new TrocaLado();