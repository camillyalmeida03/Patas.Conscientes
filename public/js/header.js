document.addEventListener('DOMContentLoaded', function() {
    const institucional = document.getElementById('institucional');
    const caixaInst = document.querySelector('.caixaInst');
    const setinha = document.getElementById("setinha");
    const instA = document.getElementById("instA");

    const setaInst = document.getElementById("setaInst");
    const ulMenu = document.getElementById("ulMenu");
    
    function mostrarulMenu() {
        if (ulMenu.style.display === 'none') {
            ulMenu.style.display = 'flex';
            setaInst.style.transform = 'rotate(90deg)';
            setaInst.style.fill = '#0E457D';
            setaInst.style.backgroundColor = 'rgb(201, 201, 201)';
        } else {
            ulMenu.style.display = 'none';
            setaInst.style.transform = 'rotate(0deg)';
            setaInst.style.fill = ''; // Resetando a cor de preenchimento
            setaInst.style.backgroundColor = ''; // Resetando a cor de fundo
        }
    }
    
    setaInst.addEventListener('click', mostrarulMenu);
    
    let mouseOverCaixa = false;
    
    // Função para mostrar a caixa e alterar estilos
    function mostrarCaixa() {
        caixaInst.style.display = 'flex'; // Mostra a caixa
        instA.style.color = '#FE4E77';
        setinha.style.transform = 'rotate(90deg)';
        setinha.style.fill = '#FE4E77';
        mouseOverCaixa = true; // Indica que o mouse está sobre a caixa ou institucional
    }
    
    // Função para esconder a caixa se o mouse não estiver em institucional ou caixaInst
    function esconderCaixa() {
        if (!mouseOverCaixa) { // Somente esconde se o mouse não estiver em nenhum dos dois
            caixaInst.style.display = 'none';
            instA.style.color = 'white';
            setinha.style.transform = 'rotate(0deg)';
            setinha.style.fill = 'white';
        }
    }
    
    // Eventos para mostrar e esconder a caixa
    institucional.addEventListener('mouseenter', mostrarCaixa);
    institucional.addEventListener('mouseleave', () => {
        mouseOverCaixa = false; // Indica que o mouse saiu de institucional
        esconderCaixa();
    });
    
    caixaInst.addEventListener('mouseenter', () => {
        mouseOverCaixa = true; // Indica que o mouse entrou em caixaInst
        mostrarCaixa();
    });
    
    caixaInst.addEventListener('mouseleave', () => {
        mouseOverCaixa = false; // Indica que o mouse saiu de caixaInst
        esconderCaixa();
    });    

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
let entrarnaconta = document.getElementById('entrarnaconta');
let svgPerfil = document.getElementById('svgPerfil');

function configuracoesdePefil(){
    if (suaconta.style.display === "none" || suaconta.style.display === "") { // Considera também se display não foi setado
        suaconta.style.display = 'flex';
        // Só tenta mudar o 'fill' se svgPerfil existir (usuário não logado)
        if (svgPerfil) {
            svgPerfil.style.fill = 'var(--rosa)';
        } else {
            // Opcional: Lógica para quando o usuário está logado
            // Por exemplo, você poderia querer mudar o estilo do botão #abrirConfigPerfil
            // ou da div #fotoUsuario
            // Ex: document.getElementById('fotoUsuario').style.borderColor = 'var(--rosa)';
            // Ex: abrirConfigPerfil.classList.add('config-aberta');
        }
    } else {
        suaconta.style.display = 'none';
        // Só tenta mudar o 'fill' se svgPerfil existir
        if (svgPerfil) {
            svgPerfil.style.fill = ''; // Volta para a cor original (ou a definida no CSS)
        } else {
            // Opcional: Lógica para quando o usuário está logado ao fechar
            // Ex: document.getElementById('fotoUsuario').style.borderColor = 'transparent';
            // Ex: abrirConfigPerfil.classList.remove('config-aberta');
        }
    }
}

function irparaologin() {
    window.location.href = "/login.html";
}
if (abrirConfigPerfil) {
    abrirConfigPerfil.addEventListener('click', configuracoesdePefil);
} else {
    console.error("Botão 'abrirConfigPerfil' não encontrado. Verifique o ID no HTML.");
}