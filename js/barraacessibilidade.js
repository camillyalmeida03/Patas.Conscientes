window.addEventListener("load", paginacarregada); //a página espera o javascrip carregar antes de executar ele.

function paginacarregada() {
  // Função para mostrar/ocultar a barra de acessibilidade
  const icon = document.getElementById("accessibilityIcon");
  const bar = document.getElementById("accessibilityBar");

  icon.addEventListener("click", () => {
    bar.classList.toggle("show");
  });

  const ativaVlibras = document.getElementById("vlibraS");
  const botVlibras = document.getElementById("botaoVlibras");
  const acessLibras = document.getElementById("acessLibras");
  const pluginLibras = document.getElementById("pluginLibras");

  botVlibras.addEventListener("click", function () {
    if (ativaVlibras.style.display === "none") {
      ativaVlibras.style.display = "flex";
      acessLibras.style.display = "flex";
      pluginLibras.style.display = "flex"; // Mostra a DIV

      pathbtAcss.classList.add("pathbtAcssClick");
    } else {
      ativaVlibras.style.display = "none";
      acessLibras.style.display = "none";
      pluginLibras.style.display = "none"; // Esconde a DIV
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

  // Função para ler o conteúdo da página
  let isReading = false; // Variável para controlar se está lendo

  const toggleReading = () => {
    if (!isReading) {
      // Se não está lendo, iniciar a leitura
      const content = document.body.innerText; // Obtém o texto da página
      const speech = new SpeechSynthesisUtterance(content); // Cria uma instância para a leitura
      window.speechSynthesis.speak(speech); // Inicia a leitura
      isReading = true; // Define que está lendo
      document.getElementById("audioDesc").title = "Desativar Áudio Descrição"; // Atualiza o título do botão
    } else {
      // Se está lendo, parar a leitura
      window.speechSynthesis.cancel(); // Cancela qualquer fala em andamento
      isReading = false; // Define que parou de ler
      document.getElementById("audioDesc").title = "Ativar Áudio Descrição"; // Atualiza o título do botão de volta
    }
  };

  // Adiciona o evento de clique ao botão
  document.getElementById("audioDesc").addEventListener("click", toggleReading);

  // Adicionando os eventos aos botões
  document.getElementById("lupaAumentar").addEventListener("click", zoomIn);
  document.getElementById("lupaDiminuir").addEventListener("click", zoomOut);

  // Modo escuro e claro sendo controlados no arquivo tema.js
}
