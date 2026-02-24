 //Este arquivo é responsável por trazer as funcionalidades da página de configurações.
import { MensagemFeedback } from "../../public/js/formularios/mensagemFeedback.js";

// Funcionalidade do aside
class AsideConfig {
  constructor() {
    this.ladoConfig = document.getElementById("ladoConfig");
    this.ladoPoliticas = document.getElementById("ladoPoliticas");
    this.editarPerfil = document.getElementById("editarPerfil")

    this.configConta = document.getElementById("configConta");
    this.politicasConta = document.getElementById("politicasConta");
    this.perfilEdicao = document.getElementById("perfilEdicao");
  }

  acessarPoliticas() {
    this.ladoPoliticas.style.display = "flex";
    this.ladoConfig.style.display = "none";
    this.editarPerfil.style.display = "none"
  }

  acessarConfig() {
    this.ladoPoliticas.style.display = "none";
    this.ladoConfig.style.display = "flex";
    this.editarPerfil.style.display = "none"
  }

  acessarEdicao() {
    this.ladoPoliticas.style.display = "none";
    this.ladoConfig.style.display = "none";
    this.editarPerfil.style.display = "block"
  }
}

// Eventos de clique nos botões do Aside
document.addEventListener("DOMContentLoaded", () => {
  const configConta = document.getElementById("configConta");
  const politicasConta = document.getElementById("politicasConta");
  const perfilEdicao = document.getElementById("perfilEdicao");

  const newAsideConfig = new AsideConfig();

  configConta?.addEventListener("click", () => newAsideConfig.acessarConfig());
  politicasConta?.addEventListener("click", () => newAsideConfig.acessarPoliticas());
  perfilEdicao?.addEventListener("click", () => newAsideConfig.acessarEdicao());

});


// Seta de abrir leque de opções na aba tema
function abrir() {
  let menu = document.getElementById("menu");
  let seta = document.getElementById("setaConfig");

  if(menu){
    menu.classList.toggle(".ativo")
  }

  if (seta.style.transform === "rotate(0deg)" || seta.style.transform === "") {
    seta.style.transform = "rotate(90deg)";
  } else {
    seta.style.transform = "rotate(0deg)";
  }
}

abrir()

// Verificação de alterações
class VerificaAlt {
  constructor() {
    this.feedback = null; // mantido
    this.campos = []; // novo: lista de campos monitorados
  }

  verificacao(inputEl, valorOriginal, botao) {
    if (!inputEl) return;

    // guarda o campo e o valor original
    this.campos.push({ inputEl, valorOriginal });

    const handler = () => {
      if (!botao) return;

      // verifica se existe pelo menos um campo alterado
      const algumAlterado = this.campos.some(
        ({ inputEl, valorOriginal }) => inputEl.value !== valorOriginal
      );

      if (algumAlterado) {
        botao.classList.add("botaoSalvarHabilitado");
      } else {
        botao.classList.remove("botaoSalvarHabilitado");
      }
    };

    // listeners mantidos
    inputEl.addEventListener("input", handler);
    inputEl.addEventListener("change", handler);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // Garante que usuario e endereco existam (você já tinha isso)
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const token = localStorage.getItem("token");

  if (!usuario || !token) {
    // console.error("Usuário não autenticado.");
    window.location.href = "/src/views/login.html";
    return;
  }

  const endereco = usuario.endereco || {};
  if (!endereco.estado) endereco.estado = {};
  const botaoSalvarAlt = document.querySelector("#botaoSalvarAlteracoes");
  const verificacao = new VerificaAlt();

  // Nome
  const nome = document.getElementById("nomeUsuarioAdt");
  if (nome) {
    nome.value = usuario.nome || "";
    verificacao.verificacao(nome, nome.value, botaoSalvarAlt);
  }

  // Gênero
  const generoSelect = document.getElementById("genero");
  if (generoSelect) {
    const sexo = usuario.sexo;
    const valorGenero =
      typeof sexo === "object" ? sexo.id?.toString() :
        sexo === "Feminino" ? "1" :
          sexo === "Masculino" ? "2" :
            sexo === "Prefiro não dizer" ? "3" : "";

    generoSelect.value = valorGenero;

    verificacao.verificacao(generoSelect, generoSelect.value, botaoSalvarAlt);
  }

  // Estado
  const estadoSelect = document.getElementById("estado");

  if (estadoSelect) {
    // A sigla do estado agora está em usuario.estado.sigla
    const valorEstado = usuario?.estado?.sigla?.toUpperCase() || "";

    if (valorEstado) {
      estadoSelect.value = valorEstado;
    } else {
      console.warn("⚠️ Nenhum estado encontrado no objeto usuário:", usuario.estado);
    }

    // Atualiza validação visual ou lógica do campo
    verificacao.verificacao(estadoSelect, estadoSelect.value, botaoSalvarAlt);
  }

  // Cidade
  const cidade = document.getElementById("cidade");
  cidade.value = endereco.cidade || "";
  verificacao.verificacao(cidade, cidade.value, botaoSalvarAlt);

  // CEP
  const cep = document.getElementById("cep");
  cep.value = endereco.cep || "";
  verificacao.verificacao(cep, cep.value, botaoSalvarAlt);

  // Rua
  const rua = document.getElementById("rua");
  rua.value = endereco.rua || "";
  verificacao.verificacao(rua, rua.value, botaoSalvarAlt);

  // Bairro
  const bairro = document.getElementById("bairro");
  bairro.value = endereco.bairro || "";
  verificacao.verificacao(bairro, bairro.value, botaoSalvarAlt);

  // Número
  const nmr = document.getElementById("nmr");
  nmr.value = endereco.numero || "";
  verificacao.verificacao(nmr, nmr.value, botaoSalvarAlt);
});

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".editarPerfil");
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const token = localStorage.getItem("token");
  const botaoSalvar = document.getElementById("botaoSalvarAlteracoes");
  const msg = document.getElementById("mensagemFeedback");

  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // se o botão não estiver habilitado, não envia
    if (!botaoSalvar.classList.contains("botaoSalvarHabilitado")) {
      new MensagemFeedback(result.message || "Nenhuma atualização feita.", msg).feedbackError();
      return;
    }

    // pega os valores dos inputs
    const dados = {
      nome: document.getElementById("nomeUsuarioAdt").value,
      fk_idsexo: document.getElementById("genero").value,
      estado: document.getElementById("estado").value,
      cidade: document.getElementById("cidade").value,
      bairro: document.getElementById("bairro").value,
      rua: document.getElementById("rua").value,
      numero: document.getElementById("nmr").value,
      cep: document.getElementById("cep").value,
      complemento: document.getElementById("complemento")?.value || ""
    };

    try {
      const idUsuario = usuario.id || usuario.idusuario;
      const resp = await fetch(`http://localhost:6789/usuarios/usuario/endereco/${usuario.id}`, {

        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(dados)
      });


      const result = await resp.json();

      if (resp.ok) {
        new MensagemFeedback(result.message || "Sucesso ao atualizar dados", msg).feedbackSucess();

        // Atualiza localStorage pra manter sincronizado
        const novoUsuario = { ...usuario };

        novoUsuario.nome = dados.nome;
        novoUsuario.sexo.id = dados.fk_idsexo;
        novoUsuario.estado.sigla = dados.estado;

        novoUsuario.endereco = {
          rua: dados.rua,
          numero: dados.numero,
          bairro: dados.bairro,
          cidade: dados.cidade,
          cep: dados.cep,
          complemento: dados.complemento
        };

        localStorage.setItem("usuario", JSON.stringify(novoUsuario));

        // desabilita o botão de novo
        botaoSalvar.classList.remove("botaoSalvarHabilitado");

      } else {
        new MensagemFeedback(result.message || "Erro ao atualizar dados.", msg).feedbackError();
      }

    } catch (err) {
      new MensagemFeedback(result.message || "Erro de conexão com servidor.", msg).feedbackError();
      console.error(err);
    }
  });
});

const botaoSair = document.getElementById("sair");

// Botão de sair
if (botaoSair) {
  botaoSair.addEventListener("click", () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    window.location.href = "/src/views/login.html";
  })

};