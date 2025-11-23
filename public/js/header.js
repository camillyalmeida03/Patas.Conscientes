import { CriarElementos } from "./criarElementos.js";

document.addEventListener("DOMContentLoaded", function () {
  const institucional = document.getElementById("institucional");
  const caixaInst = document.querySelector(".caixaInst");
  const setinha = document.getElementById("setinha");
  const instA = document.getElementById("instA");

  const setaInst = document.getElementById("setaInst");
  const ulMenu = document.getElementById("ulMenu");

  function mostrarulMenu() {
    if (ulMenu.style.display === "none") {
      ulMenu.style.display = "flex";
      setaInst.style.transform = "rotate(90deg)";
      setaInst.style.fill = "#0E457D";
      setaInst.style.backgroundColor = "rgb(201, 201, 201)";
    } else {
      ulMenu.style.display = "none";
      setaInst.style.transform = "rotate(0deg)";
      setaInst.style.fill = ""; // Resetando a cor de preenchimento
      setaInst.style.backgroundColor = ""; // Resetando a cor de fundo
    }
  }

  setaInst.addEventListener("click", mostrarulMenu);

  let mouseOverCaixa = false;

  // Função para mostrar a caixa e alterar estilos
  function mostrarCaixa() {
    caixaInst.style.display = "flex"; // Mostra a caixa
    instA.style.color = "#FE4E77";
    setinha.style.transform = "rotate(90deg)";
    setinha.style.fill = "#FE4E77";
    mouseOverCaixa = true; // Indica que o mouse está sobre a caixa ou institucional
  }

  // Função para esconder a caixa se o mouse não estiver em institucional ou caixaInst
  function esconderCaixa() {
    if (!mouseOverCaixa) {
      // Somente esconde se o mouse não estiver em nenhum dos dois
      caixaInst.style.display = "none";
      instA.style.color = "white";
      setinha.style.transform = "rotate(0deg)";
      setinha.style.fill = "white";
    }
  }

  // Eventos para mostrar e esconder a caixa
  institucional.addEventListener("mouseenter", mostrarCaixa);
  institucional.addEventListener("mouseleave", () => {
    mouseOverCaixa = false; // Indica que o mouse saiu de institucional
    esconderCaixa();
  });

  caixaInst.addEventListener("mouseenter", () => {
    mouseOverCaixa = true; // Indica que o mouse entrou em caixaInst
    mostrarCaixa();
  });

  caixaInst.addEventListener("mouseleave", () => {
    mouseOverCaixa = false; // Indica que o mouse saiu de caixaInst
    esconderCaixa();
  });

  let hamburguer = document.getElementById("hamburguer");
  hamburguer.addEventListener("click", interagirmenu);

  let expandirMenu = document.getElementById("expandirMenu");

  let fecharMenu = document.getElementById("fecharMenu");
  fecharMenu.addEventListener("click", interagirmenu);

  function interagirmenu() {
    if (expandirMenu.style.right == "-100%" || expandirMenu.style.right == "") {
      expandirMenu.style.right = "0";
    } else if (expandirMenu.style.right == "0px") {
      expandirMenu.style.right = "-100%";
    }
  }
});

// Pegando dados do localStorage
const usuarioData = localStorage.getItem("usuario");
const ongData = localStorage.getItem("ong");
console.log(ongData)
// Convertendo para objeto (ou null)
const usuario = usuarioData ? JSON.parse(usuarioData) : null;
const ong = ongData ? JSON.parse(ongData) : null;

// Flags booleanas
const isUsuario = !!usuario; // true se existir usuário
const isOng = !!ong; // true se existir ong

// Tipo de login
let tipo = "naoLogado";

if (isUsuario) {
  tipo = "usuario";
} else if (isOng) {
  tipo = "ong";
}

export { tipo };

export class ContaPopup {
  constructor(tipo = "naoLogado") {
    this.tipo = tipo; // 'naoLogado', 'usuario', 'ong'
    this.criar = new CriarElementos();
    this.popup = null;
    this.listenerAtivo = false;
  }

  criarPopupConta(parent = document.querySelector("header")) {
    // se já existir, retorna para não duplicar
    if (this.popup) return this.popup;

    // container principal
    const contaPopup = this.criar.createElement(
      "div",
      ["contaPopup"],
      "",
      parent,
      "suaconta"
    );
    contaPopup.style.display = "flex";

    // título principal
    this.criar.createElement("h5", ["titConfig"], "Conta", contaPopup);

    // bloco do usuário
    const usuarioPerfil = this.criar.createElement(
      "div",
      [],
      "",
      contaPopup,
      "usuarioPerfil"
    );
    const altFotoUsuario = this.criar.createElement(
      "div",
      [],
      "",
      usuarioPerfil,
      "altFotoUsuario"
    );
    this.criar.createElement(
      "div",
      ["fotoDefaultUsuario"],
      "",
      altFotoUsuario,
      "fotoUsuario"
    );

    const infoUsuario = this.criar.createElement("div", [], "", usuarioPerfil);

    // nome e e-mail dinâmicos
    if (this.tipo === "usuario") {
      this.criar.createElement(
        "p",
        [],
        usuario.nome,
        infoUsuario,
        "nomeUsuario"
      );
      this.criar.createElement(
        "p",
        [],
        usuario.email,
        infoUsuario,
        "emaildouser"
      );
    } else if (this.tipo === "ong") {
      this.criar.createElement(
        "p",
        [],
        ong.nome, // nome REAL da ONG
        infoUsuario,
        "nomeUsuario"
      );

      this.criar.createElement(
        "p",
        [],
        ong.email, // email REAL da ONG
        infoUsuario,
        "emaildouser"
      );
    } else {
      this.criar.createElement(
        "p",
        [],
        "Bem-vindo!",
        infoUsuario,
        "nomeUsuario"
      );
      this.criar.createElement(
        "p",
        [],
        "Acesse sua conta ou crie uma para continuar",
        infoUsuario,
        "emaildouser"
      );
    }

    // linha divisória
    this.criar.createElement("div", ["linha"], "", contaPopup);

    // configurações (só aparecem se estiver logado)
    if (this.tipo !== "naoLogado") {
      this.criar.createElement(
        "h5",
        ["titConfig"],
        "Configurações",
        contaPopup
      );

      const configPopup = this.criar.createElement(
        "div",
        [],
        "",
        contaPopup,
        "configPopup"
      );

      // link "Minha conta" (ou "Painel ONG")
      if (this.tipo === "usuario") {
        // Link principal da conta
        this.criar.createA(
          [],
          "./configuracoes.html",
          "Configurações da minha conta",
          "Minha conta",
          configPopup
        );

        if (usuario && usuario.responsavelOng === true && ong) {
          this.criar.createElement("div", ["linha"], "", configPopup);

          // Link para a página da ONG (que servirá como painel administrativo se ele for o dono)
          this.criar.createA(
            [],
            `./ong.html?id=${ong.id}`, // Usa o ID da ONG vinculada ao usuário
            "Acessar página de administração da ONG",
            "Painel da ONG",
            configPopup
          );
        }
      } else if (this.tipo === "ong") {
        this.criar.createA(
          [],
          "./configuracoes.html",
          "Painel administrativo da ONG",
          "Painel da ONG",
          configPopup
        );
      }

      // linha divisória
      this.criar.createElement("div", ["linha"], "", contaPopup);

      // === BLOCO FINAL (Tema + Botões) ===
      const configFinal = this.criar.createElement(
        "div",
        ["configFinal"],
        "",
        contaPopup
      );

      // tema
      const tema = this.criar.createElement("div", ["tema"], "", configFinal);
      this.criar.createElement("p", [], "Tema", tema);

      const label = this.criar.createElement("label", ["ui-switch"], "", tema);
      label.setAttribute("aria-label", "Alternar tema");

      const input = this.criar.createElement("input", [], "", label);
      input.type = "checkbox";
      input.classList.add("definirTema");

      const slid = this.criar.createElement("div", ["slid"], "", label);
      this.criar.createElement("div", ["circle"], "", slid);

      // botão de ação final
      const sairouentrar = this.criar.createElement(
        "div",
        ["botoesLogin"],
        "",
        configFinal,
        "sairouentrar"
      );

      // botão SAIR
      const botaoSair = this.criar.createButton(
        ["vermelho", "buttonPerfil"],
        "Sair",
        sairouentrar,
        "Sair da conta"
      );
      botaoSair.id = "botaoSair";
      botaoSair.addEventListener("click", () => {
        localStorage.removeItem("usuario");
        localStorage.removeItem("ong");
        window.location.reload();
      });
    } else {
      // === BLOCO FINAL PARA NÃO LOGADO ===
      const configFinal = this.criar.createElement(
        "div",
        ["configFinal"],
        "",
        contaPopup
      );

      // tema
      const tema = this.criar.createElement("div", ["tema"], "", configFinal);
      this.criar.createElement("p", [], "Tema", tema);

      const label = this.criar.createElement("label", ["ui-switch"], "", tema);
      label.setAttribute("aria-label", "Alternar tema");

      const input = this.criar.createElement("input", [], "", label);
      input.type = "checkbox";
      input.classList.add("definirTema");

      const slid = this.criar.createElement("div", ["slid"], "", label);
      this.criar.createElement("div", ["circle"], "", slid);

      // botão ENTRAR e CRIAR CONTA
      const sairouentrar = this.criar.createElement(
        "div",
        ["botoesLogin"],
        "",
        configFinal,
        "sairouentrar"
      );

      const botaoEntrar = this.criar.createButton(
        ["verde", "buttonPerfil"],
        "Entrar",
        sairouentrar,
        "Entrar na conta"
      );

      botaoEntrar.id = "botaoEntrar";
      botaoEntrar.addEventListener("click", () => {
        window.location.href = "../views/login.html";
      });

      const botaoCriar = this.criar.createButton(
        ["branco", "buttonPerfil"],
        "Criar conta",
        sairouentrar,
        "Criar uma nova conta"
      );
      botaoCriar.id = "botaoCriar";
      botaoCriar.addEventListener("click", () => {
        window.location.href = "../views/cadastroadotante.html";
      });

      if (document.title === "Início - Patas Conscientes") {
        botaoEntrar.addEventListener("click", () => {
          window.location.href = "src/views/login.html";
        });
      }

      if (document.title === "Início - Patas Conscientes") {
        botaoCriar.addEventListener("click", () => {
          window.location.href = "src/views/cadastroadotante.html";
        });
      }
    }

    this.popup = contaPopup;

    // fecha ao clicar fora
    window.addEventListener("click", (e) => {
      if (
        this.popup &&
        !this.popup.contains(e.target) &&
        e.target.id !== "abrirConfigPerfil"
      ) {
        this.popup.style.display = "none";
      }
    });

    // reinicializa controle de tema (checkboxes recém-criados)
    if (window.tema instanceof ModoEscuroEClaro) {
      tema.sincronizarCheckboxes();
    } else {
      window.tema = new ModoEscuroEClaro();
    }
    return contaPopup;
  }

  abrirPopup() {
    const header = document.querySelector("header");

    // se não existe, cria e mostra
    if (!this.popup) {
      this.criarPopupConta(header);
      return;
    }

    // se já existe, alterna o display
    if (this.popup.style.display === "flex") {
      this.popup.style.display = "none";
    } else {
      this.popup.style.display = "flex";
    }
  }

  fecharPopup() {
    this.popup.classList.remove("ativo");
  }
}

// ativa popup no header
document.addEventListener("DOMContentLoaded", () => {
  const abrirConfigPerfil = document.getElementById("abrirConfigPerfil");

  const conta = new ContaPopup(tipo);

  if (abrirConfigPerfil) {
    abrirConfigPerfil.addEventListener("click", (e) => {
      e.stopPropagation(); // pra não fechar no mesmo clique
      conta.abrirPopup();
    });
  }
});

window.addEventListener("resize", () => {
  const contaPopup = document.getElementById("suaconta"); // garante que sempre pegue o elemento atual

  if (window.innerWidth > 950 && contaPopup) {
    contaPopup.style.display = "none";
  }
});

function criar_header() {
  const header = document.getElementById("headerIndex");
  const headerIndex = document.querySelector(".headerIndex");

  header.innerHTML = `
<a href="/index.html" title="Link que direciona para a página Inicial"><img src="/public/img/icons/logobranca.svg"
        alt="Logo do site Patas Conscientes" class="logobranca"></a>

    <nav>
      <div class="linksNav">
        <div id="institucional">
          <a href="institucional.html" title="Link que direciona para a página Institucional do site"
            id="instA">Institucional</a>
          <svg id="setinha" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="#ffff">
            <path d="m485.91-480-184-184L376-738.09 634.09-480 376-221.91 301.91-296l184-184Z" />
          </svg>
        </div>
        <a href="ongs.html" title="Link que direciona para a página de ONG's parceiras do site">ONG's</a>
        <a href="noticias.html" title="Link que direciona para a página de Notícias do site">Notícias</a>
      </div>

      <div class="btnsNav">
        <a href="adotar.html" title="Link que direciona para a página de adoção do site">Adote-me</a>
        <a href="parceiro.html"
          title="Link que direciona para a página de cadastro para se tornar parceiro do site do site">Torne-se
          parceiro</a>
      </div>

      <div class="caixaInst">
        <p><a href="institucional.html#topico1"
            title="Link que direciona para a página Institucional do site diretamente no tópico 'Sobre nós'">Sobre
            nós</a></p>
        <p><a href="institucional.html#topico2"
            title="Link que direciona para a página Institucional do site diretamente no tópico 'Como posso adotar?'">Como
            posso adotar</a></p>
        <p><a href="institucional.html#topico3"
            title="Link que direciona para a página Institucional do site diretamente no tópico 'Como posso ajudar?'">Como
            posso ajudar</a></p>
        <p><a href="institucional.html#topico4"
            title="Link que direciona para a página Institucional do site diretamente no tópico 'Integrantes'">Integrantes</a>
        </p>
      </div>
    </nav>

    <!-- menu hamburguer -->

    <button id="hamburguer" title="Menu hamburguer"><svg xmlns="http://www.w3.org/2000/svg" height="40px"
        viewBox="0 -960 960 960" fill="#ffffffff">
        <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
      </svg></button>

    <div id="expandirMenu">

      <div id="topoMenu">

        <a href="/index.html"><img id="logoMenu" src="/public/img/icons/logopreta.svg" alt="Logo do Patas Conscientes"></a>

        <button title="Fechar menu" id="fecharMenu"><svg xmlns="http://www.w3.org/2000/svg" height="24px"
            viewBox="0 -960 960 960" width="24px">
            <path
              d="m287-216-69-71 192-193-192-195 69-71 194 195 192-195 69 71-192 195 192 193-69 71-192-195-194 195Z" />
          </svg></button>

      </div>

      <div class="linksMenu">

        <div id="comboInst">
          <a href="institucional.html" title="Link que direciona para a página Institucional do site">Institucional</a>

          <svg id="setaInst" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="#ffff">
            <path d="m485.91-480-184-184L376-738.09 634.09-480 376-221.91 301.91-296l184-184Z" />
          </svg>
        </div>

        <ul id="ulMenu">
          <li><a href="institucional.html#topico1"
              title="Link que direciona para a página Institucional do site diretamente no tópico 'Sobre nós'">Sobre
              nós</a></li>
          <li><a href="institucional.html#topico2"
              title="Link que direciona para a página Institucional do site diretamente no tópico 'Como posso adotar?'">Como
              posso adotar</a></li>
          <li><a href="institucional.html#topico3"
              title="Link que direciona para a página Institucional do site diretamente no tópico 'Como posso ajudar?'">Como
              posso ajudar</a></li>
          <li><a href="institucional.html#topico4"
              title="Link que direciona para a página Institucional do site diretamente no tópico 'Integrantes'">Integrantes</a>
          </li>
        </ul>

        <div class="linha"></div>

        <a href="ongs.html" class="marcAzul"
          title="Link que direciona para a página de ONG's parceiras do site">ONG's</a>

        <div class="linha"></div>

        <a href="noticias.html" title="Link que direciona para a página de Notícias do site">Notícias</a>

        <div class="linha"></div>

        <a href="adotar.html" title="Link que direciona para a página de adoção do site">Adote-me</a>

        <div class="linha"></div>

        <a href="parceiro.html"
          title="Link que direciona para a página de cadastro para se tornar parceiro do site do site">Torne-se
          parceiro</a>

        <div class="linha"></div>

        <!-- <a href="favoritos.html" title="Link que direciona para a página de favoritos do site">Favoritos</a> -->

        <div class="linha"></div>

        <a href="configuracoes.html" title="Abrir configurações de perfil">Configurações</a>

        <div class="linha"></div>
      </div>

      <div class="tema">
        <p>Tema</p>

        <label class="ui-switch" aria-label="Alternar tema">
          <input type="checkbox" class="definirTema" />
          <div class="slid">
            <div class="circle"></div>
          </div>
        </label>
      </div>
    </div>

    </div>

    <div id="menuperfilefavoritos" class="imglinksHeader">
      <!-- <a href="favoritos.html" title="Link que direciona para a página de favoritos do site"><svg
          xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" fill="#ffffff">
          <path
            d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z" />
        </svg></a> -->
      <button title="Abrir configurações de perfil" id="abrirConfigPerfil"><svg id="svgPerfil"
          xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" fill="#ffffff">
          <path
            d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z" />
        </svg></a></button>
    </div>    `;

  if (headerIndex) {
    headerIndex.innerHTML = `
    <a href="/index.html" title="Link que direciona para a página Inicial"><img src="/public/img/icons/logobranca.svg"
            alt="Logo do site Patas Conscientes" class="logobranca"></a>
    
        <nav>
          <div class="linksNav">
            <div id="institucional">
              <a href="/src/views/institucional.html" title="Link que direciona para a página Institucional do site"
                id="instA">Institucional</a>
              <svg id="setinha" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="#ffff">
                <path d="m485.91-480-184-184L376-738.09 634.09-480 376-221.91 301.91-296l184-184Z" />
              </svg>
            </div>
            <a href="/src/views/ongs.html" title="Link que direciona para a página de ONG's parceiras do site">ONG's</a>
            <a href="/src/views/noticias.html" title="Link que direciona para a página de Notícias do site">Notícias</a>
          </div>
    
          <div class="btnsNav">
            <a href="/src/views/adotar.html" title="Link que direciona para a página de adoção do site">Adote-me</a>
            <a href="/src/views/parceiro.html"
              title="Link que direciona para a página de cadastro para se tornar parceiro do site do site">Torne-se
              parceiro</a>
          </div>
    
          <div class="caixaInst">
            <p><a href="/src/views/institucional.html#topico1"
                title="Link que direciona para a página Institucional do site diretamente no tópico 'Sobre nós'">Sobre
                nós</a></p>
            <p><a href="/src/views/institucional.html#topico2"
                title="Link que direciona para a página Institucional do site diretamente no tópico 'Como posso adotar?'">Como
                posso adotar</a></p>
            <p><a href="/src/views/institucional.html#topico3"
                title="Link que direciona para a página Institucional do site diretamente no tópico 'Como posso ajudar?'">Como
                posso ajudar</a></p>
            <p><a href="/src/views/institucional.html#topico4"
                title="Link que direciona para a página Institucional do site diretamente no tópico 'Integrantes'">Integrantes</a>
            </p>
          </div>
        </nav>
    
        <!-- menu hamburguer -->
    
        <button id="hamburguer" title="Menu hamburguer"><svg xmlns="http://www.w3.org/2000/svg" height="40px"
            viewBox="0 -960 960 960" fill="#ffffffff">
            <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
          </svg></button>
    
        <div id="expandirMenu">
    
          <div id="topoMenu">
    
            <a href="/index.html"><img id="logoMenu" src="/public/img/icons/logopreta.svg" alt="Logo do Patas Conscientes"></a>
    
            <button title="Fechar menu" id="fecharMenu"><svg xmlns="http://www.w3.org/2000/svg" height="24px"
                viewBox="0 -960 960 960" width="24px">
                <path
                  d="m287-216-69-71 192-193-192-195 69-71 194 195 192-195 69 71-192 195 192 193-69 71-192-195-194 195Z" />
              </svg></button>
    
          </div>
    
          <div class="linksMenu">
    
            <div id="comboInst">
              <a href="/src/views/institucional.html" title="Link que direciona para a página Institucional do site">Institucional</a>
    
              <svg id="setaInst" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="#ffff">
                <path d="m485.91-480-184-184L376-738.09 634.09-480 376-221.91 301.91-296l184-184Z" />
              </svg>
            </div>
    
            <ul id="ulMenu">
              <li><a href="/src/views/institucional.html#topico1"
                  title="Link que direciona para a página Institucional do site diretamente no tópico 'Sobre nós'">Sobre
                  nós</a></li>
              <li><a href="/src/views/institucional.html#topico2"
                  title="Link que direciona para a página Institucional do site diretamente no tópico 'Como posso adotar?'">Como
                  posso adotar</a></li>
              <li><a href="/src/views/institucional.html#topico3"
                  title="Link que direciona para a página Institucional do site diretamente no tópico 'Como posso ajudar?'">Como
                  posso ajudar</a></li>
              <li><a href="/src/views/institucional.html#topico4"
                  title="Link que direciona para a página Institucional do site diretamente no tópico 'Integrantes'">Integrantes</a>
              </li>
            </ul>
    
            <div class="linha"></div>
    
            <a href="/src/views/ongs.html" class="marcAzul"
              title="Link que direciona para a página de ONG's parceiras do site">ONG's</a>
    
            <div class="linha"></div>
    
            <a href="/src/views/noticias.html" title="Link que direciona para a página de Notícias do site">Notícias</a>
    
            <div class="linha"></div>
    
            <a href="/src/views/adotar.html" title="Link que direciona para a página de adoção do site">Adote-me</a>
    
            <div class="linha"></div>
    
            <a href="/src/views/parceiro.html"
              title="Link que direciona para a página de cadastro para se tornar parceiro do site do site">Torne-se
              parceiro</a>
    
            <div class="linha"></div>
    
            <!-- <a href="/src/views/favoritos.html" title="Link que direciona para a página de favoritos do site">Favoritos</a> -->
    
            <div class="linha"></div>
    
            <a href="/src/views/configuracoes.html" title="Abrir configurações de perfil">Configurações</a>
    
            <div class="linha"></div>
          </div>
    
          <div class="tema">
            <p>Tema</p>
    
            <label class="ui-switch" aria-label="Alternar tema">
              <input type="checkbox" class="definirTema" />
              <div class="slid">
                <div class="circle"></div>
              </div>
            </label>
          </div>
        </div>
    
        </div>
    
        <div id="menuperfilefavoritos" class="imglinksHeader">
          <!-- <a href="/src/views/favoritos.html" title="Link que direciona para a página de favoritos do site"><svg
              xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" fill="#ffffff">
              <path
                d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z" />
            </svg></a> -->
          <button title="Abrir configurações de perfil" id="abrirConfigPerfil"><svg id="svgPerfil"
              xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" fill="#ffffff">
              <path
                d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z" />
            </svg></a></button>
        </div>    `;
  }
}

criar_header();
