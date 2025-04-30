window.addEventListener("load", paginacarregada);//a página espera o javascrip carregar antes de executar ele.

function paginacarregada() {

    // -------------------------------------------------------------- MODO ESCURO --------------------------------------------------------------

    const activateDarkMode = () => {
      // configurações gerais
      document.body.classList.add("bodyME");
  
      const linha = document.getElementsByClassName("linha");
      for (let i = 0; i < linha.length; i++) {
        //loop para adicionar essa classe para adicionar a nova classe para cada elemento com a classe .linha
        linha[i].classList.add("linhaME");
      }
  
      const caminho = document.getElementsByClassName("caminho");
      for (let i = 0; i < caminho.length; i++) {
        //loop para adicionar essa classe para adicionar a nova classe para cada elemento com a classe .caminho
        caminho[i].classList.add("caminhoME");
      }
  
      const linhaRow = document.getElementsByClassName("linhaRow");
      for (let i = 0; i < linhaRow.length; i++) {
        //loop para adicionar essa classe para adicionar a nova classe para cada elemento com a classe .linhaRow
        linhaRow[i].classList.add("linhaRowME");
      }
  
      const azul = document.getElementsByClassName("azul");
      for (let i = 0; i < azul.length; i++) {
        //loop para adicionar essa classe para adicionar a nova classe para cada elemento com a classe .azul
        azul[i].classList.add("azulME");
      }
  
      // notícias
      const newscontainer = document.getElementById("news-container");
      if (newscontainer) {
        newscontainer.classList.add("newscontainerME");
      }
  
      // Função para adicionar a classe 'newsitemME' a elementos com a classe 'news-item'
      // Adiciona a classe 'searchinputME' ao elemento com o id 'search-input' assim que a página carrega
      const searchInput = document.getElementById("search-input");
      if (searchInput) {
        searchInput.classList.add("searchinputME");
      }
  
      const lupa = document.getElementsByClassName("lupa");
      for (let i = 0; i < lupa.length; i++) {
        //loop para adicionar essa classe para adicionar a nova classe para cada elemento com a classe .lupa
        lupa[i].src = "/img/icons/lupa_pesquisa_branca.svg";
      }
  
      // Função para adicionar a classe 'newsitemME' a elementos com a classe 'news-item'
  
      const newsItems = document.getElementsByClassName("news-item");
      for (let i = 0; i < newsItems.length; i++) {
        newsItems[i].classList.add("newsitemME");
      }
  
      const addClassObserver = new MutationObserver((mutationsList) => {
        for (let mutation of mutationsList) {
          if (mutation.type === "childList") {
            mutation.addedNodes.forEach((node) => {
              // Verifica se o nó adicionado é um elemento e tem a classe 'news-item'
              if (node.nodeType === 1 && node.classList.contains("news-item")) {
                node.classList.add("newsitemME");
              }
            });
          }
        }
      });
  
      // Inicia o observador para adicionar a classe 'newsitemME'
      addClassObserver.observe(document.body, { childList: true, subtree: true });
  
      const searchinput = document.getElementById("search-input");
      if (searchinput) {
        searchinput.classList.add("searchinputME");
      }
  
      //menu
      const expandirMenu = document.getElementById("expandirMenu");
      //loop para adicionar essa classe para adicionar a nova classe para cada elemento com a classe .expandirMenu
      expandirMenu.classList.add("expandirMenuME");
  
      const logoMenu = document.getElementById("logoMenu");
      if (logoMenu) {
        logoMenu.src = "/img/icons/logobranca.svg"; // Substitua 'NOVO_URL_DA_IMAGEM' pelo URL desejado
      }
  
      // index.html
      const quadro = document.getElementsByClassName("quadro");
      for (let i = 0; i < quadro.length; i++) {
        //loop para adicionar essa classe para adicionar a nova classe para cada elemento com a classe .quadro
        quadro[i].classList.add("quadro");
      }
  
      const cardPerson = document.getElementsByClassName("cardPerson"); //index.html + institucional.hmtl
      for (let i = 0; i < cardPerson.length; i++) {
        //loop para adicionar essa classe para adicionar a nova classe para cada elemento com a classe .cardPerson
        cardPerson[i].classList.add("cardPersonME");
      }
  
      // adotar.html
      const filtro = document.getElementsByClassName("filtro");
      for (let i = 0; i < filtro.length; i++) {
        //loop para adicionar essa classe para adicionar a nova classe para cada elemento com a classe .filtro
        filtro[i].classList.add("filtroME");
      }
  
      const limparFiltros = document.getElementById("limparFiltros");
      if (limparFiltros) {
        limparFiltros.classList.add("limparFiltrosME");
      }
  
      const cardsAnimais = document.getElementsByClassName("cardsAnimais"); //adotar.html e favoritos.html
      for (let i = 0; i < cardsAnimais.length; i++) {
        //loop para adicionar essa classe para adicionar a nova classe para cada elemento com a classe .cardsAnimais
        cardsAnimais[i].classList.add("cardsAnimaisME");
      }
  
      const femea = document.getElementsByClassName("femea"); //adotar.html e favoritos.html
      for (let i = 0; i < femea.length; i++) {
        //loop para adicionar essa classe para adicionar a nova classe para cada elemento com a classe .femea
        femea[i].classList.add("femeaME");
      }
  
      const macho = document.getElementsByClassName("macho"); //adotar.html e favoritos.html
      for (let i = 0; i < macho.length; i++) {
        //loop para adicionar essa classe para adicionar a nova classe para cada elemento com a classe .macho
        macho[i].classList.add("machoME");
      }
  
      // Adiciona classes no modo escuro
      document.querySelectorAll(".bttcard:not(.bttcardME)").forEach((elem) => {
        elem.classList.add("bttcardME");
      });
  
      document.querySelectorAll(".verMais:not(.verMaisME)").forEach((elem) => {
        elem.classList.add("verMaisME");
      });
  
      document.querySelectorAll(".verMenos:not(.verMenosME)").forEach((elem) => {
        elem.classList.add("verMenosME");
      });
  
      document
        .querySelectorAll(".tituloInfoPet:not(.tituloInfoPetME)")
        .forEach((elem) => {
          elem.classList.add("tituloInfoPetME");
        });
  
      document
        .querySelectorAll(".maisInfoPet:not(.maisInfoPetME)")
        .forEach((elem) => {
          elem.classList.add("maisInfoPetME");
        });
  
      // Ativar o observer para elementos criados dinamicamente no modo escuro
      const observerDark = new MutationObserver(() => {
        document.querySelectorAll(".bttcard:not(.bttcardME)").forEach((elem) => {
          elem.classList.add("bttcardME");
        });
  
        document.querySelectorAll(".verMais:not(.verMaisME)").forEach((elem) => {
          elem.classList.add("verMaisME");
        });
  
        document
          .querySelectorAll(".verMenos:not(.verMenosME)")
          .forEach((elem) => {
            elem.classList.add("verMenosME");
          });
  
        document
          .querySelectorAll(".tituloInfoPet:not(.tituloInfoPetME)")
          .forEach((elem) => {
            elem.classList.add("tituloInfoPetME");
          });
  
        document
          .querySelectorAll(".maisInfoPet:not(.maisInfoPetME)")
          .forEach((elem) => {
            elem.classList.add("maisInfoPetME");
          });
      });
  
      // Ativa o observador no <body> para monitorar elementos adicionados dinamicamente
      observerDark.observe(document.body, {
        childList: true,
        subtree: true,
      });
  
      // Salvar no localStorage para persistir o estado
      localStorage.setItem("modoEscuro", "ativado");
  
      // formulários
      const fundoBranco = document.getElementsByClassName("fundoBranco");
      for (let i = 0; i < fundoBranco.length; i++) {
        //loop para adicionar essa classe para adicionar a nova classe para cada elemento com a classe .fundoBranco
        fundoBranco[i].classList.add("fundoPreto");
      }
  
      const formCadastro = document.getElementsByClassName("formCadastro");
      for (let i = 0; i < formCadastro.length; i++) {
        //loop para adicionar essa classe para adicionar a nova classe para cada elemento com a classe .formCadastro
        formCadastro[i].classList.add("formCadastroME");
      }
  
      const inputCadastro = document.getElementsByClassName("inputCadastro");
      for (let i = 0; i < inputCadastro.length; i++) {
        //loop para adicionar essa classe para adicionar a nova classe para cada elemento com a classe .inputCadastro
        inputCadastro[i].classList.add("inputCadastroME");
      }
  
      const mainForms = document.getElementsByClassName("mainForms");
      for (let i = 0; i < mainForms.length; i++) {
        //loop para adicionar essa classe para adicionar a nova classe para cada elemento com a classe .mainForms
        mainForms[i].classList.add("mainFormsME");
      }
  
      const arquivoButton = document.getElementsByClassName("arquivoButton");
      for (let i = 0; i < arquivoButton.length; i++) {
        //loop para adicionar essa classe para adicionar a nova classe para cada elemento com a classe .arquivoButton
        arquivoButton[i].classList.add("whiteText");
      }
  
      const inputArquivo = document.getElementsByClassName("inputArquivo");
      for (let i = 0; i < inputArquivo.length; i++) {
        //loop para adicionar essa classe para adicionar a nova classe para cada elemento com a classe .inputArquivo
        inputArquivo[i].classList.add("inputArquivoME");
      }
  
      const infoAdocao = document.getElementById("infoAdocao");
      if (infoAdocao) {
        infoAdocao.classList.add("infoAdocaoME");
      }
  
      const numPets = document.getElementById("numPets");
      if (numPets) {
        numPets.style.borderBottom = "1px white solid";
      }
  
      const botFiltros = document.getElementById("botFiltros");
      if (botFiltros) {
        botFiltros.classList.add("botFiltroME");
      }
  
      // configuracoes.html
      const titConfig = document.getElementsByClassName("titConfig");
      for (let i = 0; i < titConfig.length; i++) {
        //loop para adicionar essa classe para adicionar a nova classe para cada elemento com a classe .titConfig
        titConfig[i].classList.add("whiteText");
      }
  
      const buttonPerfil = document.getElementsByClassName("buttonPerfil");
      for (let i = 0; i < buttonPerfil.length; i++) {
        //loop para adicionar essa classe para adicionar a nova classe para cada elemento com a classe .buttonPerfil
        buttonPerfil[i].classList.add("whiteText");
      }

      const temas = document.getElementsByClassName("temas");
      for (let i = 0; i < temas.length; i++) {
        //loop para adicionar essa classe para adicionar a nova classe para cada elemento com a classe .buttonPerfil
        temas[i].classList.add("temasME");
      }

      const abrirOpcoes = document.getElementsByClassName("abrirOpcoes");
      for (let i = 0; i < abrirOpcoes.length; i++) {
        //loop para adicionar essa classe para adicionar a nova classe para cada elemento com a classe .buttonPerfil
        abrirOpcoes[i].classList.add("abrirOpcoesME");
      }
  
  
      const before = document.getElementsByClassName("before");
      for (let i = 0; i < before.length; i++) {
        //loop para adicionar essa classe para adicionar a nova classe para cada elemento com a classe .before
        before[i].classList.add("whiteText");
      }
  
      const buttonConfig = document.getElementsByClassName("buttonConfig");
      for (let i = 0; i < buttonConfig.length; i++) {
        //loop para adicionar essa classe para adicionar a nova classe para cada elemento com a classe .buttonConfig
        buttonConfig[i].classList.add("whiteText");
        buttonConfig[i].classList.add("buttonConfigME");

      }
  
      //favoritos.html ongs.html
      const cardOng = document.getElementsByClassName("cardOng");
      for (let i = 0; i < cardOng.length; i++) {
        //loop para adicionar essa classe para adicionar a nova classe para cada elemento com a classe .cardOng
        cardOng[i].classList.add("cardOngME");
      }
  
      //institucional.html
      const sectionInst = document.getElementsByClassName("sectionInst");
      for (let i = 0; i < sectionInst.length; i++) {
        //loop para adicionar essa classe para adicionar a nova classe para cada elemento com a classe .sectionInst
        sectionInst[i].classList.add("sectionInstME");
      }
  
      const mainInst = document.getElementsByClassName("mainInst");
      for (let i = 0; i < mainInst.length; i++) {
        //loop para adicionar essa classe para adicionar a nova classe para cada elemento com a classe .mainInst
        mainInst[i].classList.add("mainInstME");
      }
  
      //login
      const loginCard = document.getElementsByClassName("loginCard");
      for (let i = 0; i < loginCard.length; i++) {
        //loop para adicionar essa classe para adicionar a nova classe para cada elemento com a classe .loginCard
        loginCard[i].classList.add("loginCardME");
      }
  
      const linkFalso = document.getElementsByClassName("linkFalso");
      for (let i = 0; i < linkFalso.length; i++) {
        //loop para adicionar essa classe para adicionar a nova classe para cada elemento com a classe .linkFalso
        linkFalso[i].classList.add("linkFalsoME");
      }
  
      // conta popup
      const contaPopup = document.getElementsByClassName("contaPopup");
      for (let i = 0; i < contaPopup.length; i++) {
        //loop para adicionar essa classe para adicionar a nova classe para cada elemento com a classe .contaPopup
        contaPopup[i].classList.add("contaPopupME");
      }
    };
  
    // Função para ativar o modo claro
    const activateLightMode = () => {
      // configurações gerais
      document.body.classList.remove("bodyME");
  
      const linha = document.getElementsByClassName("linha");
      for (let i = 0; i < linha.length; i++) {
        linha[i].classList.remove("linhaME");
      }
  
      const caminho = document.getElementsByClassName("caminho");
      for (let i = 0; i < caminho.length; i++) {
        caminho[i].classList.remove("caminhoME");
      }
  
      const linhaRow = document.getElementsByClassName("linhaRow");
      for (let i = 0; i < linhaRow.length; i++) {
        linhaRow[i].classList.remove("linhaRowME");
      }
  
      const azul = document.getElementsByClassName("azul");
      for (let i = 0; i < azul.length; i++) {
        azul[i].classList.remove("azulME");
      }
  
      // menu (não foi mencionado, mas adicione conforme necessário)
  
      // index.html
      const quadro = document.getElementsByClassName("quadro");
      for (let i = 0; i < quadro.length; i++) {
        quadro[i].classList.remove("quadroME"); // Corrigido se necessário, ou mantenha vazio se não havia modificação.
      }
  
      const cardPerson = document.getElementsByClassName("cardPerson");
      for (let i = 0; i < cardPerson.length; i++) {
        cardPerson[i].classList.remove("cardPersonME");
      }
  
      // adotar.html
      const filtro = document.getElementsByClassName("filtro");
      for (let i = 0; i < filtro.length; i++) {
        filtro[i].classList.remove("filtroME");
      }
  
      const limparFiltros = document.getElementById("limparFiltros");
      if (limparFiltros) {
        limparFiltros.classList.remove("limparFiltrosME");
      }
      document.querySelectorAll(".bttcardME").forEach((elem) => {
        elem.classList.remove("bttcardME");
      });
  
      document.querySelectorAll(".verMaisME, .verMenosME").forEach((elem) => {
        elem.classList.remove("verMaisME", "verMenosME");
      });
  
      document.querySelectorAll(".tituloInfoPetME").forEach((elem) => {
        elem.classList.remove("tituloInfoPetME");
      });
  
      document.querySelectorAll(".maisInfoPetME").forEach((elem) => {
        elem.classList.remove("maisInfoPetME");
      });
  
      // Ativar o observer para elementos criados dinamicamente no modo claro
      const observerLight = new MutationObserver(() => {
        document.querySelectorAll(".bttcardME").forEach((elem) => {
          elem.classList.remove("bttcardME");
        });
  
        document.querySelectorAll(".verMaisME, .verMenosME").forEach((elem) => {
          elem.classList.remove("verMaisME", "verMenosME");
        });
  
        document.querySelectorAll(".tituloInfoPetME").forEach((elem) => {
          elem.classList.remove("tituloInfoPetME");
        });
  
        document.querySelectorAll(".maisInfoPetME").forEach((elem) => {
          elem.classList.remove("maisInfoPetME");
        });
      });
  
      // Ativa o observador no <body> para monitorar elementos adicionados dinamicamente
      observerLight.observe(document.body, {
        childList: true,
        subtree: true,
      });
  
      // Salvar no localStorage para persistir o estado
      localStorage.setItem("modoEscuro", "desativado");
      const cardsAnimais = document.getElementsByClassName("cardsAnimais");
      for (let i = 0; i < cardsAnimais.length; i++) {
        cardsAnimais[i].classList.remove("cardsAnimaisME");
      }
  
      const femea = document.getElementsByClassName("femea");
      for (let i = 0; i < femea.length; i++) {
        femea[i].classList.remove("femeaME");
      }
  
      const macho = document.getElementsByClassName("macho");
      for (let i = 0; i < macho.length; i++) {
        macho[i].classList.remove("machoME");
      }
  
      const verMais = document.getElementsByClassName("verMais");
      for (let i = 0; i < verMais.length; i++) {
        verMais[i].classList.remove("verMaisME");
      }
  
      // formulários
      const fundoBranco = document.getElementsByClassName("fundoBranco");
      for (let i = 0; i < fundoBranco.length; i++) {
        fundoBranco[i].classList.remove("fundoPreto");
      }
  
      const formCadastro = document.getElementsByClassName("formCadastro");
      for (let i = 0; i < formCadastro.length; i++) {
        formCadastro[i].classList.remove("formCadastroME");
      }
  
      const inputCadastro = document.getElementsByClassName("inputCadastro");
      for (let i = 0; i < inputCadastro.length; i++) {
        inputCadastro[i].classList.remove("inputCadastroME");
      }
  
      const mainForms = document.getElementsByClassName("mainForms");
      for (let i = 0; i < mainForms.length; i++) {
        mainForms[i].classList.remove("mainFormsME");
      }
  
      const arquivoButton = document.getElementsByClassName("arquivoButton");
      for (let i = 0; i < arquivoButton.length; i++) {
        arquivoButton[i].classList.remove("whiteText");
      }
  
      const inputArquivo = document.getElementsByClassName("inputArquivo");
      for (let i = 0; i < inputArquivo.length; i++) {
        inputArquivo[i].classList.remove("inputArquivoME");
      }
  
      const infoAdocao = document.getElementById("infoAdocao");
      if (infoAdocao) {
        infoAdocao.classList.remove("infoAdocaoME");
      }
  
      const numPets = document.getElementById("numPets");
      if (numPets) {
        numPets.style.borderBottom = ""; // Remove o estilo de borda
      }
  
      const botFiltros = document.getElementById("botFiltros");
      if (botFiltros) {
        botFiltros.classList.remove("botFiltroME");
      }
  
      // configuracoes.html
      const titConfig = document.getElementsByClassName("titConfig");
      for (let i = 0; i < titConfig.length; i++) {
        titConfig[i].classList.remove("whiteText");
      }
  
      const buttonPerfil = document.getElementsByClassName("buttonPerfil");
      for (let i = 0; i < buttonPerfil.length; i++) {
        buttonPerfil[i].classList.remove("whiteText");
      }

      const temas = document.getElementsByClassName("temas");
      for (let i = 0; i < temas.length; i++) {
        //loop para adicionar essa classe para adicionar a nova classe para cada elemento com a classe .buttonPerfil
        temas[i].classList.remove("temasME");
      }

      const abrirOpcoes = document.getElementsByClassName("abrirOpcoes");
      for (let i = 0; i < abrirOpcoes.length; i++) {
        //loop para adicionar essa classe para adicionar a nova classe para cada elemento com a classe .buttonPerfil
        abrirOpcoes[i].classList.remove("abrirOpcoesME");
      }
  

      const before = document.getElementsByClassName("before");
      for (let i = 0; i < before.length; i++) {
        before[i].classList.remove("whiteText");
      }
  
      const buttonConfig = document.getElementsByClassName("buttonConfig");
      for (let i = 0; i < buttonConfig.length; i++) {
        buttonConfig[i].classList.remove("whiteText");
        buttonConfig[i].classList.remove("buttonConfigME");
      }
  
      // favoritos.html, ongs.html
      const cardOng = document.getElementsByClassName("cardOng");
      for (let i = 0; i < cardOng.length; i++) {
        cardOng[i].classList.remove("cardOngME");
      }
  
      // institucional.html
      const sectionInst = document.getElementsByClassName("sectionInst");
      for (let i = 0; i < sectionInst.length; i++) {
        sectionInst[i].classList.remove("sectionInstME");
      }
  
      const mainInst = document.getElementsByClassName("mainInst");
      for (let i = 0; i < mainInst.length; i++) {
        mainInst[i].classList.remove("mainInstME");
      }
  
      // login
      const loginCard = document.getElementsByClassName("loginCard");
      for (let i = 0; i < loginCard.length; i++) {
        loginCard[i].classList.remove("loginCardME");
      }
  
      const linkFalso = document.getElementsByClassName("linkFalso");
      for (let i = 0; i < linkFalso.length; i++) {
        linkFalso[i].classList.remove("linkFalsoME");
      }
  
      // noticias
      const newscontainer = document.getElementById("news-container");
      if (newscontainer) {
        newscontainer.classList.remove("newscontainerME");
      }
  
      const lupa = document.getElementsByClassName("lupa");
      for (let i = 0; i < lupa.length; i++) {
        //loop para adicionar essa classe para adicionar a nova classe para cada elemento com a classe .lupa
        lupa[i].src = "/img/icons/lupa_pesquisa_cinza.svg";
      }
  
      function removeAllNewsitemME() {
        // Seleciona todos os elementos com a classe 'newsitemME'
        const elements = document.querySelectorAll(".newsitemME");
  
        // Remove a classe 'newsitemME' de cada elemento encontrado
        elements.forEach((element) => {
          element.classList.remove("newsitemME");
        });
      }
  
      // Chama a função para remover a classe de todos os elementos existentes
      removeAllNewsitemME();
  
      const searchinput = document.getElementById("search-input");
      if (searchinput) {
        searchinput.classList.remove("searchinputME");
      }
  
      // menu
      const expandirMenu = document.getElementById("expandirMenu");
      if (expandirMenu) {
        expandirMenu.classList.remove("expandirMenuME");
      }
  
      const logoMenu = document.getElementById("logoMenu");
      if (logoMenu) {
        logoMenu.src = "/img/icons/logopreta.svg"; // Substitua 'NOVO_URL_DA_IMAGEM' pelo URL desejado
      }
  
      // conta popup
  
      const contaPopup = document.getElementsByClassName("contaPopup");
      for (let i = 0; i < contaPopup.length; i++) {
        contaPopup[i].classList.remove("contaPopupME");
      }
    };
    const checkboxes = document.querySelectorAll('.definirTema'); // Obtém os checkboxes com a classe 'definirTema'
    if (checkboxes.length > 0) {
        checkboxes.forEach((checkbox) => {
            // Adiciona um event listener ao checkbox para mudanças manuais
            checkbox.addEventListener('change', function () {
                if (this.checked) {
                    // Se o checkbox estiver marcado, ativa o modo escuro
                    activateDarkMode();
                    localStorage.setItem('modoEscuro', 'ativado');
                } else {
                    // Se o checkbox não estiver marcado, ativa o modo claro
                    activateLightMode();
                    localStorage.setItem('modoEscuro', 'desativado');
                }
                // Atualiza o estado dos outros checkboxes
                sincronizarCheckboxes();
            });
        });
    
        // Função para sincronizar todos os checkboxes com o localStorage
        function sincronizarCheckboxes() {
            const savedTheme = localStorage.getItem('modoEscuro'); // Verifica o tema salvo no localStorage
            checkboxes.forEach((checkbox) => {
                if (savedTheme === 'ativado') {
                    // Se o tema salvo for escuro, marca o checkbox
                    checkbox.checked = true;
                    activateDarkMode(); // Ativa o modo escuro
                } else {
                    // Se o tema salvo for claro, desmarca o checkbox
                    checkbox.checked = false;
                    activateLightMode(); // Ativa o modo claro
                }
            });
        }
    
        // Chama a função ao carregar a página para aplicar o tema baseado no localStorage
        sincronizarCheckboxes();
    
        // Verifica mudanças no localStorage em tempo real (para garantir que outros scripts também alterem o tema)
        window.addEventListener('storage', sincronizarCheckboxes);
    } else {
        console.error("Nenhum checkbox com a classe 'definirTema' encontrado.");
    }
    
}    