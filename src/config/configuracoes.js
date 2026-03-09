//Este arquivo é responsável por trazer as funcionalidades da página de configurações.
import { MensagemFeedback } from "../../public/js/formularios/mensagemFeedback.js";

// Funcionalidade do aside
class AsideConfig {
  constructor() {
    this.secoes = {
      config: document.getElementById("ladoConfig"),
      politicas: document.getElementById("ladoPoliticas"),
      acess: document.getElementById("ladoAcess"),
      edicao: document.getElementById("editarPerfil"),
    };
  }

  mostrar(secao) {
    Object.values(this.secoes).forEach(el => {
      if (el) el.style.display = "none";
    });

    if (this.secoes[secao]) {
      this.secoes[secao].style.display =
        secao === "edicao" ? "block" : "flex";
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const aside = new AsideConfig();

  document.getElementById("configConta")
    ?.addEventListener("click", () => aside.mostrar("config"));

  document.getElementById("politicasConta")
    ?.addEventListener("click", () => aside.mostrar("politicas"));

  document.getElementById("buttonAcess")
    ?.addEventListener("click", () => aside.mostrar("acess"));

  document.getElementById("perfilEdicao")
    ?.addEventListener("click", () => aside.mostrar("edicao"));

});

// Função de abrir caixinha de menu - troca de tema
function abrir() {
  const menu = document.getElementById("menu");
  const seta = document.getElementById("setaConfig");

  if (menu) {
    menu.classList.toggle("ativo");
  }

  if (seta) {
    if (seta.style.transform === "rotate(90deg)") {
      seta.style.transform = "rotate(0deg)";
    } else {
      seta.style.transform = "rotate(90deg)";
    }
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const botao = document.getElementById("temasSeta");

  if (botao) {
    botao.addEventListener("click", abrir);
  }
});

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
  // Garante que usuario e endereco existam
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const token = localStorage.getItem("token");

  if (!usuario || !token) {
    window.location.href = "/src/views/login.html";
    return;
  }

  botaoUploadFoto(usuario.id)

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
      console.warn("Nenhum estado encontrado no objeto usuário:", usuario.estado);
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

  // Complemento
  const comp = document.getElementById("complemento");
  comp.value = endereco.complemento || "";
  verificacao.verificacao(comp, comp.value, botaoSalvarAlt);
});

document.addEventListener("DOMContentLoaded", () => {

  const mensagemSalva = sessionStorage.getItem("feedbackSucesso");

  if (mensagemSalva) {
    const msg = document.getElementById("mensagemFeedback");

    if (msg) {
      new MensagemFeedback(mensagemSalva, msg).feedbackSucess();
    }

    sessionStorage.removeItem("feedbackSucesso");
  }

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

        // salva feedback temporário
        sessionStorage.setItem(
          "feedbackSucesso",
          result.message || "Sucesso ao atualizar dados"
        );

        window.location.reload();

      } else {
        new MensagemFeedback(result.message || "Erro ao atualizar dados.", msg).feedbackError();
      }

    } catch (err) {
      new MensagemFeedback(result.message || "Erro de conexão com servidor.", msg).feedbackError();
      console.error(err);
    }
  });
});

// Upload da foto de perfil do usuário
function botaoUploadFoto(idUsuario) {

  const inputFoto = document.getElementById("fotoPerfilUsuario");

  if (inputFoto) {
    inputFoto.addEventListener("change", async (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const formData = new FormData();
      formData.append("foto", file);

      try {
        document.body.style.cursor = "wait";
        const res = await fetch(`http://localhost:6789/usuarios/foto/${idUsuario}`, {
          method: "PATCH",
          body: formData,
        });

        if (!res.ok) throw new Error("Erro no upload");
        const data = await res.json();

        const fotoEl = document.getElementById("fotoUsuarioconfig");
        if (fotoEl) fotoEl.style.backgroundImage = `url('${data.path}')`;

        new MensagemFeedback("Foto de perfil atualizada com sucesso!", document.body).feedbackSucess();

      } catch (err) {
        console.error(err);
        new MensagemFeedback("Erro ao atualizar foto.", document.body).feedbackError();
      } finally {
        document.body.style.cursor = "default";
      }
    });
  }
}

const botaoSair = document.getElementById("sair");

// Botão de sair
if (botaoSair) {
  botaoSair.addEventListener("click", () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    window.location.href = "/src/views/login.html";
  })

};