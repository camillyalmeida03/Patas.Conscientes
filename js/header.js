document.addEventListener('DOMContentLoaded', function() {
    const institucional = document.getElementById('institucional');
    const caixaInst = document.querySelector('.caixaInst');
    const setinha = document.getElementById("setinha");
    const instA = document.getElementById("instA");

    const ulMenu = document.getElementById('ulMenu');
    const instMenu = document.getElementById('instMenu');

    function mostrarCaixa() {
        caixaInst.style.display = 'flex'; // Mudei para 'flex' para manter a estrutura
        instA.style.color = '#FE4E77';
        setinha.style.rotate = '90deg';
        setinha.style.fill =  '#FE4E77';
    }

    function esconderCaixa() {
        caixaInst.style.display = 'none';
        instA.style.color = 'white';
        setinha.style.rotate = '0deg';
        setinha.style.fill =  'white';
    }

    institucional.addEventListener('mouseenter', mostrarCaixa);
    caixaInst.addEventListener('mouseenter', mostrarCaixa);
    caixaInst.addEventListener('mouseleave', esconderCaixa);


    let hamburguer = document.getElementById("hamburguer");
    hamburguer.addEventListener("click", interagirmenu);

    let expandirMenu = document.getElementById("expandirMenu");

    let fecharMenu = document.getElementById("fecharMenu");
    fecharMenu.addEventListener("click", interagirmenu);

    function interagirmenu(){

        if(expandirMenu.style.right == "-100%" || expandirMenu.style.right == ""){
            expandirMenu.style.right = "0";
        }
        else
        if(expandirMenu.style.right == "0px"){
            expandirMenu.style.right = "-100%";
        }
    }
});


