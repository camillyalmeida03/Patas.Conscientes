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
    // infoAdocao.classList.add('infoAdocaoME')

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
  };

  // Função para ativar o modo claro
  const activateLightMode = () => {
    document.body.style.backgroundColor = '';
    document.body.style.color = '';
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
  document.getElementById('modoEscuro').addEventListener('click', activateDarkMode);
  document.getElementById('modoClaro').addEventListener('click', activateLightMode);
  document.getElementById('audioDesc').addEventListener('click', readPage);

}