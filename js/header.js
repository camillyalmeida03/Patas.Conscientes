document.addEventListener('DOMContentLoaded', function() {
    const institucional = document.getElementById('institucional');
    const caixaInst = document.querySelector('.caixaInst');
    const setinha = document.getElementById("setinha");
    const instA = document.getElementById("instA");


    // Função aparecer ulMenu ao clicar na setinha na expansão do menu hamburguer

    const ulMenu = document.getElementById('ulMenu');
    const setaInst = document.getElementById("setaInst");

    function mostrarulMenu(){
        if(ulMenu.style.display === 'none'){
            ulMenu.style.display = 'flex';
            setaInst.style.transform = 'rotate(90deg)'
            setaInst.style.fill = '#0E457D'
            setaInst.style.backgroundColor = 'rgb(201, 201, 201)'
        }else{
            ulMenu.style.display = 'none';
            setaInst.style.transform = 'rotate(0deg)'
            setaInst.style.fill = ''
            setaInst.style.backgroundColor = ''
        }
    }

    setaInst.addEventListener('click', mostrarulMenu);


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

// abrir configurações de perfil

let abrirConfigPerfil = document.getElementById('abrirConfigPerfil');
let suaconta = document.getElementById('suaconta');
let cadastrarPopup = document.getElementById('cadastrarPopup');
let sairDaConta = document.getElementById('sairDaConta');
let svgPerfil = document.getElementById('svgPerfil');

function configuracoesdePefil(){
    if(suaconta.style.display === "none"){
        suaconta.style.display = 'flex'
        svgPerfil.style.fill = 'var(--rosa)'
    }else{
        suaconta.style.display = 'none'
        svgPerfil.style.fill = ''
    }
}

abrirConfigPerfil.addEventListener('click', configuracoesdePefil);
