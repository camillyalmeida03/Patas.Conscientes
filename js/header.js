document.addEventListener('DOMContentLoaded', function() {
    const institucional = document.getElementById('institucional');
    const caixaInst = document.querySelector('.caixaInst');

    function mostrarCaixa() {
        caixaInst.style.display = 'flex'; // Mudei para 'flex' para manter a estrutura
    }

    function esconderCaixa() {
        caixaInst.style.display = 'none';
    }

    institucional.addEventListener('mouseenter', mostrarCaixa);
    caixaInst.addEventListener('mouseenter', mostrarCaixa);

    institucional.addEventListener('mouseleave', () => {
        if (!caixaInst.matches(':hover')) {
            esconderCaixa();
        }
    });

    caixaInst.addEventListener('mouseleave', esconderCaixa);
});
