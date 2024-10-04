document.addEventListener('DOMContentLoaded', function() {
    const institucional = document.getElementById('institucional');
    const caixaInst = document.querySelector('.caixaInst');
    const setinha = document.getElementById("setinha");
    const instA = document.getElementById("instA");

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
});
