window.addEventListener("load", paginacarregada);//a página espera o javascrip carregar antes de executar ele.

function paginacarregada() {

    // -------------------------------------------------------------- MODO ESCURO --------------------------------------------------------------

    const activateDarkMode = () => {

        // configurações gerais
        document.body.classList.add('bodyME');

        const linha = document.getElementsByClassName('linha');
        for (let i = 0; i < linha.length; i++) {//loop para adicionar essa classe para adicionar a nova classe para cada elemento com a classe .linha
            linha[i].classList.add('linhaME');
        }

        const caminho = document.getElementsByClassName('caminho');
        for (let i = 0; i < caminho.length; i++) {//loop para adicionar essa classe para adicionar a nova classe para cada elemento com a classe .caminho
            caminho[i].classList.add('caminhoME');
        }

        const linhaRow = document.getElementsByClassName('linhaRow');
        for (let i = 0; i < linhaRow.length; i++) { //loop para adicionar essa classe para adicionar a nova classe para cada elemento com a classe .linhaRow
            linhaRow[i].classList.add('linhaRowME');
        }

        const azul = document.getElementsByClassName('azul');
        for (let i = 0; i < azul.length; i++) { //loop para adicionar essa classe para adicionar a nova classe para cada elemento com a classe .azul
            azul[i].classList.add('azulME');
        }

        //menu


        // index.html
        const quadro = document.getElementsByClassName('quadro');
        for (let i = 0; i < quadro.length; i++) { //loop para adicionar essa classe para adicionar a nova classe para cada elemento com a classe .quadro
            quadro[i].classList.add('quadro');
        }

        const cardPerson = document.getElementsByClassName('cardPerson'); //index.html + institucional.hmtl
        for (let i = 0; i < cardPerson.length; i++) { //loop para adicionar essa classe para adicionar a nova classe para cada elemento com a classe .cardPerson
            cardPerson[i].classList.add('cardPersonME');
        }

        // adotar.html
        const filtro = document.getElementsByClassName('filtro');
        for (let i = 0; i < filtro.length; i++) {//loop para adicionar essa classe para adicionar a nova classe para cada elemento com a classe .filtro
            filtro[i].classList.add('filtroME');
        }

        const cardsAnimais = document.getElementsByClassName('cardsAnimais'); //adotar.html e favoritos.html 
        for (let i = 0; i < cardsAnimais.length; i++) {//loop para adicionar essa classe para adicionar a nova classe para cada elemento com a classe .cardsAnimais
            cardsAnimais[i].classList.add('cardsAnimaisME');
        }

        const femea = document.getElementsByClassName('femea'); //adotar.html e favoritos.html 
        for (let i = 0; i < femea.length; i++) {//loop para adicionar essa classe para adicionar a nova classe para cada elemento com a classe .femea
            femea[i].classList.add('femeaME');
        }

        const macho = document.getElementsByClassName('macho'); //adotar.html e favoritos.html 
        for (let i = 0; i < macho.length; i++) {//loop para adicionar essa classe para adicionar a nova classe para cada elemento com a classe .macho
            macho[i].classList.add('machoME');
        }

        const verMais = document.getElementsByClassName('verMais'); //adotar.html e favoritos.html 
        for (let i = 0; i < verMais.length; i++) {//loop para adicionar essa classe para adicionar a nova classe para cada elemento com a classe .verMais
            verMais[i].classList.add('verMaisME');
        }


        // formulários
        const fundoBranco = document.getElementsByClassName('fundoBranco');
        for (let i = 0; i < fundoBranco.length; i++) { //loop para adicionar essa classe para adicionar a nova classe para cada elemento com a classe .fundoBranco
            fundoBranco[i].classList.add('fundoPreto');
        }

        const formCadastro = document.getElementsByClassName('formCadastro');
        for (let i = 0; i < formCadastro.length; i++) { //loop para adicionar essa classe para adicionar a nova classe para cada elemento com a classe .formCadastro
            formCadastro[i].classList.add('formCadastroME');
        }

        const inputCadastro = document.getElementsByClassName('inputCadastro');
        for (let i = 0; i < inputCadastro.length; i++) { //loop para adicionar essa classe para adicionar a nova classe para cada elemento com a classe .inputCadastro
            inputCadastro[i].classList.add('inputCadastroME');
        }

        const mainForms = document.getElementsByClassName('mainForms');
        for (let i = 0; i < mainForms.length; i++) { //loop para adicionar essa classe para adicionar a nova classe para cada elemento com a classe .mainForms
            mainForms[i].classList.add('mainFormsME');
        }

        const arquivoButton = document.getElementsByClassName('arquivoButton');
        for (let i = 0; i < arquivoButton.length; i++) { //loop para adicionar essa classe para adicionar a nova classe para cada elemento com a classe .arquivoButton
            arquivoButton[i].classList.add('whiteText');
        }

        const inputArquivo = document.getElementsByClassName('inputArquivo');
        for (let i = 0; i < inputArquivo.length; i++) { //loop para adicionar essa classe para adicionar a nova classe para cada elemento com a classe .inputArquivo
            inputArquivo[i].classList.add('inputArquivoME');
        }

        // const infoAdocao = document.getElementById('infoAdocao');
        // infoAdocao.className('infoAdocaoME');

        // const numPets = document.getElementById('numPets');
        // numPets.style.borderBottom = '1px white solid';



        // configuracoes.html
        const titConfig = document.getElementsByClassName('titConfig');
        for (let i = 0; i < titConfig.length; i++) { //loop para adicionar essa classe para adicionar a nova classe para cada elemento com a classe .titConfig
            titConfig[i].classList.add('whiteText');
        }

        const buttonPerfil = document.getElementsByClassName('buttonPerfil');
        for (let i = 0; i < buttonPerfil.length; i++) { //loop para adicionar essa classe para adicionar a nova classe para cada elemento com a classe .buttonPerfil
            buttonPerfil[i].classList.add('whiteText');
        }

        const before = document.getElementsByClassName('before');
        for (let i = 0; i < before.length; i++) { //loop para adicionar essa classe para adicionar a nova classe para cada elemento com a classe .before
            before[i].classList.add('whiteText');
        }

        const buttonConfig = document.getElementsByClassName('buttonConfig');
        for (let i = 0; i < buttonConfig.length; i++) { //loop para adicionar essa classe para adicionar a nova classe para cada elemento com a classe .buttonConfig
            buttonConfig[i].classList.add('whiteText');
        }

        //favoritos.html ongs.html
        const cardOng = document.getElementsByClassName('cardOng');
        for (let i = 0; i < cardOng.length; i++) { //loop para adicionar essa classe para adicionar a nova classe para cada elemento com a classe .cardOng
            cardOng[i].classList.add('cardOngME');
        }


        //institucional.html
        const sectionInst = document.getElementsByClassName('sectionInst');
        for (let i = 0; i < sectionInst.length; i++) { //loop para adicionar essa classe para adicionar a nova classe para cada elemento com a classe .sectionInst 
            sectionInst[i].classList.add('sectionInstME');
        }

        const mainInst = document.getElementsByClassName('mainInst');
        for (let i = 0; i < mainInst.length; i++) { //loop para adicionar essa classe para adicionar a nova classe para cada elemento com a classe .mainInst
            mainInst[i].classList.add('mainInstME');
        }


        //login
        const loginCard = document.getElementsByClassName('loginCard');
        for (let i = 0; i < loginCard.length; i++) { //loop para adicionar essa classe para adicionar a nova classe para cada elemento com a classe .loginCard
            loginCard[i].classList.add('loginCardME');
        }

        const linkFalso = document.getElementsByClassName('linkFalso');
        for (let i = 0; i < linkFalso.length; i++) { //loop para adicionar essa classe para adicionar a nova classe para cada elemento com a classe .linkFalso
            linkFalso[i].classList.add('linkFalsoME');
        }

        //menu
        const expandirMenu = document.getElementById('expandirMenu');
        for (let i = 0; i < expandirMenu.length; i++) { //loop para adicionar essa classe para adicionar a nova classe para cada elemento com a classe .expandirMenu
            expandirMenu[i].classList.add('expandirMenuME');
        }
    };

    // Função para ativar o modo claro
    const activateLightMode = () => {

        // configurações gerais
        document.body.classList.remove('bodyME');

        const linha = document.getElementsByClassName('linha');
        for (let i = 0; i < linha.length; i++) {
            linha[i].classList.remove('linhaME');
        }

        const caminho = document.getElementsByClassName('caminho');
        for (let i = 0; i < caminho.length; i++) {
            caminho[i].classList.remove('caminhoME');
        }

        const linhaRow = document.getElementsByClassName('linhaRow');
        for (let i = 0; i < linhaRow.length; i++) {
            linhaRow[i].classList.remove('linhaRowME');
        }

        const azul = document.getElementsByClassName('azul');
        for (let i = 0; i < azul.length; i++) {
            azul[i].classList.remove('azulME');
        }

        // menu (não foi mencionado, mas adicione conforme necessário)

        // index.html
        const quadro = document.getElementsByClassName('quadro');
        for (let i = 0; i < quadro.length; i++) {
            quadro[i].classList.remove('quadroME'); // Corrigido se necessário, ou mantenha vazio se não havia modificação.
        }

        const cardPerson = document.getElementsByClassName('cardPerson');
        for (let i = 0; i < cardPerson.length; i++) {
            cardPerson[i].classList.remove('cardPersonME');
        }

        // adotar.html
        const filtro = document.getElementsByClassName('filtro');
        for (let i = 0; i < filtro.length; i++) {
            filtro[i].classList.remove('filtroME');
        }

        const cardsAnimais = document.getElementsByClassName('cardsAnimais');
        for (let i = 0; i < cardsAnimais.length; i++) {
            cardsAnimais[i].classList.remove('cardsAnimaisME');
        }

        const femea = document.getElementsByClassName('femea');
        for (let i = 0; i < femea.length; i++) {
            femea[i].classList.remove('femeaME');
        }

        const macho = document.getElementsByClassName('macho');
        for (let i = 0; i < macho.length; i++) {
            macho[i].classList.remove('machoME');
        }

        const verMais = document.getElementsByClassName('verMais');
        for (let i = 0; i < verMais.length; i++) {
            verMais[i].classList.remove('verMaisME');
        }

        // formulários
        const fundoBranco = document.getElementsByClassName('fundoBranco');
        for (let i = 0; i < fundoBranco.length; i++) {
            fundoBranco[i].classList.remove('fundoPreto');
        }

        const formCadastro = document.getElementsByClassName('formCadastro');
        for (let i = 0; i < formCadastro.length; i++) {
            formCadastro[i].classList.remove('formCadastroME');
        }

        const inputCadastro = document.getElementsByClassName('inputCadastro');
        for (let i = 0; i < inputCadastro.length; i++) {
            inputCadastro[i].classList.remove('inputCadastroME');
        }

        const mainForms = document.getElementsByClassName('mainForms');
        for (let i = 0; i < mainForms.length; i++) {
            mainForms[i].classList.remove('mainFormsME');
        }

        const arquivoButton = document.getElementsByClassName('arquivoButton');
        for (let i = 0; i < arquivoButton.length; i++) {
            arquivoButton[i].classList.remove('whiteText');
        }

        const inputArquivo = document.getElementsByClassName('inputArquivo');
        for (let i = 0; i < inputArquivo.length; i++) {
            inputArquivo[i].classList.remove('inputArquivoME');
        }

        // configuracoes.html
        const titConfig = document.getElementsByClassName('titConfig');
        for (let i = 0; i < titConfig.length; i++) {
            titConfig[i].classList.remove('whiteText');
        }

        const buttonPerfil = document.getElementsByClassName('buttonPerfil');
        for (let i = 0; i < buttonPerfil.length; i++) {
            buttonPerfil[i].classList.remove('whiteText');
        }

        const before = document.getElementsByClassName('before');
        for (let i = 0; i < before.length; i++) {
            before[i].classList.remove('whiteText');
        }

        const buttonConfig = document.getElementsByClassName('buttonConfig');
        for (let i = 0; i < buttonConfig.length; i++) {
            buttonConfig[i].classList.remove('whiteText');
        }

        // favoritos.html, ongs.html
        const cardOng = document.getElementsByClassName('cardOng');
        for (let i = 0; i < cardOng.length; i++) {
            cardOng[i].classList.remove('cardOngME');
        }

        // institucional.html
        const sectionInst = document.getElementsByClassName('sectionInst');
        for (let i = 0; i < sectionInst.length; i++) {
            sectionInst[i].classList.remove('sectionInstME');
        }

        const mainInst = document.getElementsByClassName('mainInst');
        for (let i = 0; i < mainInst.length; i++) {
            mainInst[i].classList.remove('mainInstME');
        }

        // login
        const loginCard = document.getElementsByClassName('loginCard');
        for (let i = 0; i < loginCard.length; i++) {
            loginCard[i].classList.remove('loginCardME');
        }

        const linkFalso = document.getElementsByClassName('linkFalso');
        for (let i = 0; i < linkFalso.length; i++) {
            linkFalso[i].classList.remove('linkFalsoME');
        }

        // menu
        const expandirMenu = document.getElementsByClassName('expandirMenu');
        for (let i = 0; i < expandirMenu.length; i++) {
            expandirMenu[i].classList.remove('expandirMenuME');
        }

    };

    const checkbox = document.getElementById('definirTema');
    if (checkbox) {
        // Adiciona um event listener ao checkbox
        checkbox.addEventListener('change', function() {
            if (this.checked) {
                activateDarkMode(); // Chama a função de modo escuro
                localStorage.setItem('theme', 'dark'); // Guarda a preferência
            } else {
                activateLightMode(); // Chama a função de modo claro
                localStorage.setItem('theme', 'light'); // Guarda a preferência
            }
        });

        // Verifica o localStorage ao carregar a página
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            activateDarkMode();
            checkbox.checked = true;
        } else {
            activateLightMode();
            checkbox.checked = false;
        }
    } else {
        console.error("Checkbox com id 'definirTema' não encontrado.");
    }
    

}