window.addEventListener("load", paginacarregada);//a página espera o javascrip carregar antes de executar ele.

function paginacarregada() {

  // Função para mostrar/ocultar a barra de acessibilidade
  const icon = document.getElementById('accessibilityIcon');
  const bar = document.getElementById('accessibilityBar');

  icon.addEventListener('click', () => {
    bar.classList.toggle('show');
  });

  const ativaVlibras = document.getElementById('vlibraS');
  const botVlibras = document.getElementById('botaoVlibras');
  const acessLibras = document.getElementById('acessLibras');
  const pluginLibras = document.getElementById('pluginLibras');

  botVlibras.addEventListener('click', function () {
    if (ativaVlibras.style.display === 'none') {
      ativaVlibras.style.display = 'flex';
      acessLibras.style.display = 'flex';
      pluginLibras.style.display = 'flex'; // Mostra a DIV

      pathbtAcss.classList.add('pathbtAcssClick');

    } else {
      ativaVlibras.style.display = 'none';
      acessLibras.style.display = 'none';
      pluginLibras.style.display = 'none';  // Esconde a DIV
    }
  });

  let fontSize = 16;
  // Função para aumentar o zoom
  const zoomIn = () => {
    fontSize += 1; // Aumenta 1px no tamanho da fonte
    document.body.style.fontSize = `${fontSize}px`;
  };

  // Função para diminuir o zoom
  const zoomOut = () => {
    fontSize -= 1; // Diminui 1px no tamanho da fonte
    if (fontSize < 10) fontSize = 10; // Define o tamanho mínimo da fonte
    document.body.style.fontSize = `${fontSize}px`;
  };

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

    // notícias
    const newscontainer = document.getElementById('news-container');
    if (newscontainer) {
      newscontainer.classList.add('newscontainerME');
    }

    // Função para adicionar a classe 'newsitemME' a elementos com a classe 'news-item'
    // Adiciona a classe 'searchinputME' ao elemento com o id 'search-input' assim que a página carrega
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
      searchInput.classList.add('searchinputME');
    }

    // Função para adicionar a classe 'newsitemME' a elementos com a classe 'news-item'
    function addNewsitemME() {
      const newsItems = document.getElementsByClassName('news-item');
      for (let i = 0; i < newsItems.length; i++) {
        newsItems[i].classList.add('newsitemME');
      }
    }

    // Configura o observer para monitorar o DOM por alterações
    const observer = new MutationObserver((mutationsList) => {
      for (let mutation of mutationsList) {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((node) => {
            // Verifica se o nó adicionado é um elemento e tem a classe 'news-item'
            if (node.nodeType === 1 && node.classList.contains('news-item')) {
              node.classList.add('newsitemME');
            }
          });
        }
      }
    });

    // Inicia o observer observando o body (ou outro contêiner específico)
    observer.observe(document.body, { childList: true, subtree: true });

    // Chama a função uma vez ao carregar a página, caso já existam elementos 'news-item'
    addNewsitemME();


    const searchinput = document.getElementById('search-input');
    if (searchinput) {
      searchinput.classList.add('searchinputME')
    }

    //menu
    const expandirMenu = document.getElementById('expandirMenu');
    //loop para adicionar essa classe para adicionar a nova classe para cada elemento com a classe .expandirMenu
    expandirMenu.classList.add('expandirMenuME');

    const logoMenu = document.getElementById('logoMenu');
    if (logoMenu) {
      logoMenu.src = '/img/icons/logobranca.svg'; // Substitua 'NOVO_URL_DA_IMAGEM' pelo URL desejado
    }


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

    // conta popup
    const contaPopup = document.getElementsByClassName('contaPopup');
    for (let i = 0; i < contaPopup.length; i++) { //loop para adicionar essa classe para adicionar a nova classe para cada elemento com a classe .contaPopup
      contaPopup[i].classList.add('contaPopupME');
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

    // noticias
    const newscontainer = document.getElementById('news-container');
    if (newscontainer) {
      newscontainer.classList.remove('newscontainerME');
    }

    // Configura o observer para monitorar o DOM por alterações
    const observer = new MutationObserver((mutationsList) => {
      for (let mutation of mutationsList) {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((node) => {
            // Verifica se o nó adicionado é um elemento e tem a classe 'news-item'
            if (node.nodeType === 1 && node.classList.contains('news-item')) {
              node.classList.remove('newsitemME');
            }
          });
        }
      }
    });

    // Inicia o observer observando o body (ou outro contêiner específico)
    observer.observe(document.body, { childList: true, subtree: true });

    const searchinput = document.getElementById('search-input');
    if (searchinput) {
      searchinput.classList.remove('searchinputME')
    }

    // menu
    const expandirMenu = document.getElementById('expandirMenu');
    if (expandirMenu) {
      expandirMenu.classList.remove('expandirMenuME');
    }

    const logoMenu = document.getElementById('logoMenu');
    if (logoMenu) {
      logoMenu.src = '/img/icons/logopreta.svg'; // Substitua 'NOVO_URL_DA_IMAGEM' pelo URL desejado
    }

    // conta popup

    const contaPopup = document.getElementsByClassName('contaPopup');
    for (let i = 0; i < contaPopup.length; i++) {
      contaPopup[i].classList.remove('contaPopupME');
    }

  };

  // Função para ler o conteúdo da página
  let isReading = false; // Variável para controlar se está lendo

  const toggleReading = () => {
    if (!isReading) {
      // Se não está lendo, iniciar a leitura
      const content = document.body.innerText; // Obtém o texto da página
      const speech = new SpeechSynthesisUtterance(content); // Cria uma instância para a leitura
      window.speechSynthesis.speak(speech); // Inicia a leitura
      isReading = true; // Define que está lendo
      document.getElementById('audioDesc').title = 'Desativar Áudio Descrição'; // Atualiza o título do botão
    } else {
      // Se está lendo, parar a leitura
      window.speechSynthesis.cancel(); // Cancela qualquer fala em andamento
      isReading = false; // Define que parou de ler
      document.getElementById('audioDesc').title = 'Ativar Áudio Descrição'; // Atualiza o título do botão de volta
    }
  };



  // Adiciona o evento de clique ao botão
  document.getElementById('audioDesc').addEventListener('click', toggleReading);

  // Adicionando os eventos aos botões
  document.getElementById('lupaAumentar').addEventListener('click', zoomIn);
  document.getElementById('lupaDiminuir').addEventListener('click', zoomOut);

  // Adicionar o evento de clique aos botões
  document.getElementById('modoEscuro').addEventListener('click', () => {
    activateDarkMode();
    localStorage.setItem('modoEscuro', 'ativado'); // Salva o estado
  });

  document.getElementById('modoClaro').addEventListener('click', () => {
    activateLightMode();
    localStorage.setItem('modoEscuro', 'desativado'); // Salva o estado
  });

  // Verificar o estado do localStorage no carregamento da página
  if (localStorage.getItem('modoEscuro') === 'ativado') {
    activateDarkMode();
  } else {
    activateLightMode();
  }


}