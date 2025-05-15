//Este arquivo controla a mudança de tema

class ModoEscuroEClaro {
  constructor(checkboxSelector = ".definirTema") {
    this.checkboxSelector = checkboxSelector;
    this.checkboxes = document.querySelectorAll(this.checkboxSelector);

    // Botões de acessibilidade
    this.botaoModoEscuro = document.getElementById("modoEscuro");
    this.botaoModoClaro = document.getElementById("modoClaro");

    this.botaoModoEscuroConfig = document.getElementById("modoEscuroConfig");
    this.botaoModoClaroConfig = document.getElementById("modoClaroConfig");

    if (
      this.checkboxes.length > 0 ||
      this.botaoModoEscuro ||
      this.botaoModoClaro ||
      this.botaoModoEscuroConfig ||
      this.botaoModoClaroConfig
    ) {
      this.inicializar();
    } else {
      console.error("Nenhum controle de tema encontrado (checkbox ou botão).");
    }
  }

  modoEscuro() {
    document.body.classList.add("bodyME");

    const logo = document.getElementById("logoMenu");

    if (logo) {
      logo.src = "/img/icons/logobranca.svg";
    }
  }

  modoClaro() {
    document.body.classList.remove("bodyME");

    const logo = document.getElementById("logoMenu");

    if (logo) {
      logo.src = "/img/icons/logopreta.svg";
    }
  }

  sincronizarCheckboxes() {
    const savedTheme = localStorage.getItem("modoEscuro");

    this.checkboxes.forEach((checkbox) => {
      if (savedTheme === "ativado") {
        checkbox.checked = true;
        this.modoEscuro();
      } else {
        checkbox.checked = false;
        this.modoClaro();
      }
    });
  }

  aplicarEventos() {
    // Checkbox interativo
    this.checkboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", () => {
        if (checkbox.checked) {
          this.modoEscuro();
          localStorage.setItem("modoEscuro", "ativado");
        } else {
          this.modoClaro();
          localStorage.setItem("modoEscuro", "desativado");
        }
        this.sincronizarCheckboxes();
      });
    });

    // Botão: modo escuro
    if (this.botaoModoEscuro || this.botaoModoEscuroConfig) {
      this.botaoModoEscuro.addEventListener("click", () => {
        this.modoEscuro();
        localStorage.setItem("modoEscuro", "ativado");
        this.sincronizarCheckboxes();
      });

      this.botaoModoEscuroConfig.addEventListener("click", () => {
        this.modoEscuro();
        localStorage.setItem("modoEscuro", "ativado");
        this.sincronizarCheckboxes();
      });
    }

    // Botão: modo claro
    if (this.botaoModoClaro || this.botaoModoClaroConfig) {
      this.botaoModoClaro.addEventListener("click", () => {
        this.modoClaro();
        localStorage.setItem("modoEscuro", "desativado");
        this.sincronizarCheckboxes();
      });

      this.botaoModoClaroConfig.addEventListener("click", () => {
        this.modoClaro();
        localStorage.setItem("modoEscuro", "desativado");
        this.sincronizarCheckboxes();
      });
    }

    // Escuta mudanças no localStorage de outras abas
    window.addEventListener("storage", () => this.sincronizarCheckboxes());
  }

  observarDOM() {
    const observer = new MutationObserver(() => this.sincronizarCheckboxes());

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  }

  inicializar() {
    this.sincronizarCheckboxes();
    this.aplicarEventos();
    this.observarDOM();
  }
}

// Cria uma instância da classe e ativa tudo automaticamente
const tema = new ModoEscuroEClaro();
