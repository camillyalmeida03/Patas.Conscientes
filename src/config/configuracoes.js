//Este arquivo é responsável por trazer as funcionalidades da página de configurações.
import { MensagemFeedback } from "../../public/js/formularios/mensagemFeedback.js";

// Classe responsável por controlar as seções do aside da página de configurações
class AsideConfig {
  constructor() {
    // Objeto que armazena as referências das seções do aside
    this.secoes = {
      config: document.getElementById("ladoConfig"),
      politicas: document.getElementById("ladoPoliticas"),
      acess: document.getElementById("ladoAcess"),
      edicao: document.getElementById("editarPerfil"),
    };
  }

  // Método para mostrar apenas a seção selecionada
  mostrar(secao) {

    // Primeiro esconde todas as seções
    Object.values(this.secoes).forEach(el => {
      if (el) el.style.display = "none";
    });

    // Depois exibe apenas a seção escolhida
    if (this.secoes[secao]) {
      this.secoes[secao].style.display =
        // A seção de edição usa display block, as outras usam flex
        secao === "edicao" ? "block" : "flex";
    }
  }
}

// Classe responsável por verificar alterações nos campos de edição de perfil
class VerificaAlt {
  constructor() {
    this.feedback = null;

    // Array que guarda os campos monitorados e seus valores originais
    this.campos = [];
  }

  // Método que verifica se algum campo foi alterado
  verificacao(inputEl, valorOriginal, botao) {
    if (!inputEl) return;

    // Armazena o campo junto com o valor original para comparação futura
    this.campos.push({ inputEl, valorOriginal });

    const handler = () => {
      if (!botao) return;

      // Verifica se pelo menos um campo foi alterado
      const algumAlterado = this.campos.some(
        ({ inputEl, valorOriginal }) => inputEl.value !== valorOriginal
      );

      // Se algum campo mudou, habilita visualmente o botão de salvar
      if (algumAlterado) {
        botao.classList.add("botaoSalvarHabilitado");
      } else {
        // Se nenhum campo mudou, remove o destaque do botão
        botao.classList.remove("botaoSalvarHabilitado");
      }
    };

    // Escuta alterações no campo enquanto o usuário digita
    inputEl.addEventListener("input", handler);

    // Escuta alterações quando o valor do campo muda (ex: selects)
    inputEl.addEventListener("change", handler);
  }
}

// Função responsável por realizar o upload da foto de perfil do usuário
function botaoUploadFoto(idUsuario) {

  // Seleciona o input responsável por enviar a foto
  const inputFoto = document.getElementById("fotoPerfilUsuario");

  if (inputFoto) {

    // Escuta quando o usuário seleciona uma nova foto no input
    inputFoto.addEventListener("change", async (e) => {

      // Pega o primeiro arquivo selecionado
      const file = e.target.files[0];

      // Se nenhum arquivo foi selecionado, interrompe a execução
      if (!file) return;

      // Cria um objeto FormData para enviar a imagem ao backend
      const formData = new FormData();

      // Adiciona a foto dentro do FormData com a chave "foto"
      formData.append("foto", file);

      try {

        // Altera o cursor para "aguarde" enquanto a requisição acontece
        document.body.style.cursor = "wait";

        // Envia a foto para o backend para atualizar a foto do usuário
        const res = await fetch(`http://localhost:6789/usuarios/foto/${idUsuario}`, {
          method: "PATCH",
          body: formData
        });

        // Caso a resposta não seja OK, dispara um erro
        if (!res.ok) throw new Error("Erro no upload");

        // Converte a resposta do backend para JSON
        const data = await res.json();

        // Recupera os dados do usuário que estão salvos no localStorage
        const usuario = JSON.parse(localStorage.getItem("usuario"));

        // Atualiza o campo foto dentro do objeto usuário
        usuario.foto = `http://localhost:6789/${data.path}`;

        // Salva novamente o usuário atualizado no localStorage
        localStorage.setItem("usuario", JSON.stringify(usuario));

        // Seleciona o elemento que exibe a foto do usuário na tela
        const fotoEl = document.getElementById("fotoUsuarioconfig");

        // Se o elemento existir, atualiza a imagem de fundo com a nova foto
        if (fotoEl) {
          fotoEl.style.backgroundImage = `url('http://localhost:6789/${data.path}')`;
        }

        // Exibe uma mensagem de sucesso para o usuário
        new MensagemFeedback(
          "Foto de perfil atualizada com sucesso!",
          document.body
        ).feedbackSucess();

      } catch (err) {

        // Caso ocorra algum erro, mostra no console
        console.error(err);

        // Exibe uma mensagem de erro para o usuário
        new MensagemFeedback(
          "Erro ao atualizar foto.",
          document.body
        ).feedbackError();

      } finally {

        // Independentemente do resultado, retorna o cursor ao normal
        document.body.style.cursor = "default";

      }
    });
  }
}

// Seleciona o botão de sair da página
const botaoSair = document.getElementById("sair");

// Verifica se o botão existe na página
if (botaoSair) {

  // Adiciona um evento de clique no botão
  botaoSair.addEventListener("click", () => {

    // Remove o token de autenticação armazenado no navegador
    localStorage.removeItem("token");

    // Remove também os dados do usuário salvos no localStorage
    localStorage.removeItem("usuario");

    // Redireciona o usuário para a página de login
    window.location.href = "/src/views/login.html";
  });

}

document.addEventListener("DOMContentLoaded", () => {
  // Criando uma instância da classe que controla o aside da página
  const aside = new AsideConfig();

  // Adicionando eventos de clique para cada item do aside

  // Evento do botão de conta
  document.getElementById("configConta")
    ?.addEventListener("click", () => aside.mostrar("config"));

  // Evento do botão de Políticas do Site
  document.getElementById("politicasConta")
    ?.addEventListener("click", () => aside.mostrar("politicas"));

  // Evento do botão de Acessibilidade
  document.getElementById("buttonAcess")
    ?.addEventListener("click", () => aside.mostrar("acess"));

  // Evento do botão de Edição de perfil
  document.getElementById("perfilEdicao")
    ?.addEventListener("click", () => aside.mostrar("edicao"));


  // Configurações da seção de editar perfil

  // Recupera os dados do usuário que foram salvos no localStorage
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  const fotoPerfil = document.getElementById("fotoPerfil");

  if (usuario && usuario.foto && fotoPerfil) {
    fotoPerfil.src = usuario.foto;
  }
  // Verifica se existe usuário e se ele possui uma foto salva
  if (usuario?.foto) {

    // Seleciona o elemento onde a foto de perfil é exibida
    const fotoEl = document.getElementById("fotoUsuarioconfig");

    // Caso o elemento exista, define a imagem de fundo com a foto salva
    if (fotoEl) {
      fotoEl.style.backgroundImage = `url('${usuario.foto}')`;
    }
  }

  // Recupera o token de autenticação salvo no navegador
  const token = localStorage.getItem("token");

  // Verifica se o usuário ou o token não existem
  // Caso não existam, redireciona para a página de login
  if (!usuario || !token) {
    window.location.href = "/src/views/login.html";
    return;
  }

  // Inicializa a funcionalidade de upload da foto de perfil,
  // passando o id do usuário para identificar quem está alterando a foto
  botaoUploadFoto(usuario.id)

  // Garante que o objeto de endereço exista
  // Se não existir, cria um objeto vazio
  const endereco = usuario.endereco || {};

  // Verifica se o estado dentro do endereço existe
  // Caso não exista, cria um objeto vazio para evitar erros
  if (!endereco.estado) endereco.estado = {};

  // Seleciona o botão responsável por salvar as alterações do perfil
  const botaoSalvarAlt = document.querySelector("#botaoSalvarAlteracoes");

  // Cria uma instância da classe que verifica se os campos do formulário foram alterados
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

  // Recupera uma mensagem de feedback salva temporariamente na sessionStorage
  const mensagemSalva = sessionStorage.getItem("feedbackSucesso");

  // Se existir uma mensagem salva, exibe o feedback na tela
  if (mensagemSalva) {
    const msg = document.getElementById("mensagemFeedback");

    if (msg) {
      // Exibe a mensagem de sucesso utilizando a classe de feedback
      new MensagemFeedback(mensagemSalva, msg).feedbackSucess();
    }

    // Remove a mensagem do sessionStorage para não aparecer novamente
    sessionStorage.removeItem("feedbackSucesso");
  }

  // Seleciona o formulário de edição de perfil
  const form = document.querySelector(".editarPerfil");

  // Seleciona o botão responsável por salvar alterações
  const botaoSalvar = document.getElementById("botaoSalvarAlteracoes");

  // Seleciona o elemento onde as mensagens de feedback serão exibidas
  const msg = document.getElementById("mensagemFeedback");

  // Se o formulário não existir na página, interrompe o código
  if (!form) return;

  // Escuta o envio do formulário
  form.addEventListener("submit", async (e) => {
    e.preventDefault(); // impede o recarregamento padrão da página

    // Verifica se o botão de salvar está habilitado
    // Caso não esteja, significa que nenhum campo foi alterado
    if (!botaoSalvar.classList.contains("botaoSalvarHabilitado")) {
      new MensagemFeedback("Nenhuma atualização feita.", msg).feedbackError();
      return;
    }

    // Coleta os valores preenchidos nos inputs do formulário
    const dados = {
      nome: document.getElementById("nomeUsuarioAdt").value,
      fk_idsexo: document.getElementById("genero").value,
      estado: document.getElementById("estado").value,
      cidade: document.getElementById("cidade").value,
      bairro: document.getElementById("bairro").value,
      rua: document.getElementById("rua").value,
      numero: document.getElementById("nmr").value,
      cep: document.getElementById("cep").value,

      // Usa optional chaining caso o campo não exista
      complemento: document.getElementById("complemento")?.value || ""
    };

    try {

      // Obtém o id do usuário
      const idUsuario = usuario.id || usuario.idusuario;

      // Envia os dados atualizados para o backend
      const resp = await fetch(`http://localhost:6789/usuarios/usuario/endereco/${usuario.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` // envia token para autenticação
        },
        body: JSON.stringify(dados)
      });

      // Converte a resposta da API para JSON
      const result = await resp.json();

      if (resp.ok) {

        // Atualiza os dados do usuário no localStorage
        // para manter sincronizado com o backend
        const novoUsuario = { ...usuario };

        novoUsuario.nome = dados.nome;
        novoUsuario.sexo.id = dados.fk_idsexo;
        novoUsuario.estado.sigla = dados.estado;

        // Atualiza os dados do endereço
        novoUsuario.endereco = {
          rua: dados.rua,
          numero: dados.numero,
          bairro: dados.bairro,
          cidade: dados.cidade,
          cep: dados.cep,
          complemento: dados.complemento
        };

        // Salva o usuário atualizado no localStorage
        localStorage.setItem("usuario", JSON.stringify(novoUsuario));

        // Remove o estado de botão habilitado
        botaoSalvar.classList.remove("botaoSalvarHabilitado");

        // Salva temporariamente a mensagem de sucesso
        // para ser exibida após o reload da página
        sessionStorage.setItem(
          "feedbackSucesso",
          result.message || "Sucesso ao atualizar dados"
        );

        // Recarrega a página para atualizar os dados exibidos
        window.location.reload();

      } else {
        // Caso a API retorne erro
        new MensagemFeedback(result.message || "Erro ao atualizar dados.", msg).feedbackError();
      }

    } catch (err) {
      // Caso ocorra erro de conexão com o servidor
      new MensagemFeedback("Erro de conexão com servidor.", msg).feedbackError();
      console.error(err);
    }
  });
});
