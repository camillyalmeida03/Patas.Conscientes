const BREADCRUMB_CLASSES = {
  "adotar.html": "breadcrumb-adotar-tradutor",
  "cadastroong.html": "breadcrumb-cadastroong-tradutor",
  "cadastroadotante.html": "breadcrumb-cadastroadotante-tradutor",
  "configuracoes.html": "breadcrumb-configuracoes-tradutor",
  "favoritos.html": "breadcrumb-favoritos-tradutor",
  "formularioparceiro.html": "breadcrumb-formularioparceiro-tradutor",
  "formularioparceiro2.html": "breadcrumb-formularioparceiro2-tradutor",
  "institucional.html": "breadcrumb-institucional-tradutor",
  "login.html": "breadcrumb-login-tradutor",
  "noticias.html": "breadcrumb-noticias-tradutor",
  "ongs.html": "breadcrumb-ongs-tradutor",
  "parceiro.html": "breadcrumb-parceiro-tradutor",
  "planos.html": "breadcrumb-planos-tradutor",
};

function escapeHtml(text) {
  return String(text)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function getPageFileName() {
  const pathParts = window.location.pathname.split("/").filter(Boolean);
  return pathParts[pathParts.length - 1] || "";
}

function buildBreadcrumbLink(label, href, id) {
  const safeLabel = escapeHtml(label);
  const safeHref = escapeHtml(href);

  if (id) {
    return `<a href="${safeHref}" class="link" id="${id}">${safeLabel}</a>`;
  }

  return `<a href="${safeHref}" class="link breadcrumb-home-tradutor" title="Link que direciona para a página Inicial">${safeLabel}</a>`;
}

function renderBreadcrumb(ongName = "") {
  const container = document.querySelector(".caminho");

  if (!container) {
    return;
  }

  const pageFileName = getPageFileName();

  if (pageFileName === "institucional.html") {
    let breadcrumb = container.querySelector(".breadcrumb-texto");

    if (!breadcrumb) {
      breadcrumb = document.createElement("p");
      breadcrumb.className = "breadcrumb-texto";
      container.prepend(breadcrumb);
    }

    breadcrumb.innerHTML = `${buildBreadcrumbLink("Início", "/index.html")} | <span class="breadcrumb-institucional-tradutor"></span>`;
    if (typeof window.traduzir === "function") {
      window.traduzir();
    }
    return;
  }

  if (pageFileName === "ongPage.html") {
    const label = String(ongName || window.__breadcrumbOngName || "ONG").trim();
    container.innerHTML = `<p>${buildBreadcrumbLink("Início", "/index.html")} | <a href="${escapeHtml(window.location.href)}" class="link" id="caminhoPerfilOng">${escapeHtml(label)}</a></p>`;
    if (typeof window.traduzir === "function") {
      window.traduzir();
    }
    return;
  }

  const labelClass = BREADCRUMB_CLASSES[pageFileName];

  if (!labelClass) {
    return;
  }

  container.innerHTML = `<p>${buildBreadcrumbLink("Início", "/index.html")} | <span class="${labelClass}"></span></p>`;

  if (typeof window.traduzir === "function") {
    window.traduzir();
  }
}

function initBreadcrumbs() {
  renderBreadcrumb();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initBreadcrumbs, { once: true });
} else {
  initBreadcrumbs();
}

window.renderBreadcrumb = renderBreadcrumb;

export { renderBreadcrumb, initBreadcrumbs };
