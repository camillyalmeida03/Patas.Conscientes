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

botVlibras.addEventListener('click', function() {
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
    for (let i = 0; i < linha.length; i++){//loop para adicionar essa classe para adicionar a nova classe para cada elemento com a classe .linha
      linha[i].classList.add('linhaME');
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
    for (let i = 0; i < filtro.length; i++){//loop para adicionar essa classe para adicionar a nova classe para cada elemento com a classe .filtro
      filtro[i].classList.add('filtroME');
    }

    const limparFiltros = document.getElementById('limparFiltros');
    limparFiltros.style.color = 'white'

    const cardsAnimais = document.getElementsByClassName('cardsAnimais');
    for (let i = 0; i < cardsAnimais.length; i++){//loop para adicionar essa classe para adicionar a nova classe para cada elemento com a classe .cardsAnimais
      cardsAnimais[i].classList.add('cardsAnimaisME');
    }

    const femea = document.getElementsByClassName('femea');
    for (let i = 0; i < femea.length; i++){//loop para adicionar essa classe para adicionar a nova classe para cada elemento com a classe .femea
      femea[i].classList.add('femeaME');
    }

    const macho = document.getElementsByClassName('macho');
    for (let i = 0; i < macho.length; i++){//loop para adicionar essa classe para adicionar a nova classe para cada elemento com a classe .macho
      macho[i].classList.add('machoME');
    }

    const verMais = document.getElementsByClassName('verMais');
    for (let i = 0; i < verMais.length; i++){//loop para adicionar essa classe para adicionar a nova classe para cada elemento com a classe .verMais
      verMais[i].classList.add('verMaisME');
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
