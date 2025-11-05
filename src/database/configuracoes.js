//Este arquivo é responsável por trazer as funcionalidades da página de configurações.

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

  if (menu.style.display === "none" || menu.style.display === "") {
    menu.style.display = "flex";
  } else {
    menu.style.display = "none";
  }

  if (seta.style.transform === "rotate(0deg)" || seta.style.transform === "") {
    seta.style.transform = "rotate(90deg)";
  } else {
    seta.style.transform = "rotate(0deg)";
  }
}

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
  console.log(JSON.parse(localStorage.getItem("usuario")));

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
  }

  // Estado
  const estadoSelect = document.getElementById("estado");

  if (estadoSelect) {
    // tenta pegar o estado de dentro do endereco OU fora dele
    const estado = usuario.endereco?.estado || usuario.estado;

    const valorEstado =
      typeof estado === "object" ? estado.sigla?.toUpperCase() :
        typeof estado === "string" ? estado.toUpperCase() :
          usuario.estado_sigla?.toUpperCase() || "";

    if (valorEstado) {
      estadoSelect.value = valorEstado;
      // console.log("✅ Estado preenchido com:", valorEstado);
    } else {
      console.warn("⚠️ Nenhum estado encontrado no objeto usuário:", estado);
    }

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

const botaoSair = document.getElementById("sair");

// Função para enviar os dados para o backend
async function enviarAlteracoes() {
  const usuarioId = usuario.id; // ID do usuário logado
  const token = localStorage.getItem("token");

  const dados = {
    nome: nome.value,
    fk_idsexo: generoSelect.value,
    cep: cep.value,
    estado: estadoSelect.value,
    cidade: cidade.value,
    rua: rua.value,
    bairro: bairro.value,
    numero: nmr.value,
    complemento: document.getElementById("complemento")?.value || null
  };

  try {
    const resposta = await fetch("/rota/alterar-usuario", { // ajuste para a rota correta
      method: "PUT", // ou PATCH, dependendo do backend
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(dados)
    });

    const resultado = await resposta.json();

    if (resposta.ok) {
      // Atualiza o localStorage com os novos dados
      localStorage.setItem("usuario", JSON.stringify(resultado.usuario));
      alert("Usuário atualizado com sucesso!");
    } else {
      alert("Erro ao atualizar: " + resultado.message);
    }
  } catch (erro) {
    console.error("Erro na requisição:", erro);
    alert("Erro na atualização do usuário.");
  }
}

// Ativa o envio ao clicar no botão
if (botaoSalvarAlt) {
  botaoSalvarAlt.addEventListener("click", (e) => {
    e.preventDefault();
    enviarAlteracoes();
  });
}

// Botão de sair
if (botaoSair) {
  botaoSair.addEventListener("click", () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    window.location.href = "/src/views/login.html";
  })

};