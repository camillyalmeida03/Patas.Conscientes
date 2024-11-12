document.addEventListener('DOMContentLoaded', function() {
    const institucional = document.getElementById('institucional');
    const caixaInst = document.querySelector('.caixaInst');
    const setinha = document.getElementById("setinha");
    const instA = document.getElementById("instA");

    let mouseOverCaixa = false;

    // Função para mostrar a caixa e alterar estilos
    function mostrarCaixa() {
        caixaInst.style.display = 'flex';
        instA.style.color = '#FE4E77';
        setinha.style.transform = 'rotate(90deg)';
        setinha.style.fill = '#FE4E77';
        mouseOverCaixa = true;
    }

    // Função para verificar se deve esconder a caixa
    function esconderCaixa() {
        if (!mouseOverCaixa) {  // Somente esconde se o mouse não estiver em institucional nem em caixaInst
            caixaInst.style.display = 'none';
            instA.style.color = 'white';
            setinha.style.transform = 'rotate(0deg)';
            setinha.style.fill = 'white';
        }
    }

    // Eventos de mouse
    institucional.addEventListener('mouseenter', mostrarCaixa);
    institucional.addEventListener('mouseleave', () => {
        mouseOverCaixa = false;
        esconderCaixa();
    });

    caixaInst.addEventListener('mouseenter', () => {
        mouseOverCaixa = true;
        mostrarCaixa();
    });
    
    caixaInst.addEventListener('mouseleave', () => {
        mouseOverCaixa = false;
        esconderCaixa();
    });
});
