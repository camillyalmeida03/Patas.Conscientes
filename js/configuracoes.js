//Este arquivo é responsável por trazer as funcionalidades da página de configurações.

// Funcionalidade do aside
class AsideConfig {
    constructor() {
      this.ladoConfig = document.getElementById("ladoConfig");
      this.ladoPoliticas = document.getElementById("ladoPoliticas");

      this.configConta = document.getElementById("configConta");
      this.politicasConta = document.getElementById("politicasConta");
    }
  
    acessarPoliticas() {
      this.ladoPoliticas.style.display = "flex";
      this.ladoConfig.style.display = "none";

    }
  
    acessarConfig() {
      this.ladoPoliticas.style.display = "none";

      this.ladoConfig.style.display = "block";
    }
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    const configConta = document.getElementById("configConta");
    const politicasConta = document.getElementById("politicasConta");
  
    const newAsideConfig = new AsideConfig();
  
    configConta?.addEventListener("click", () => newAsideConfig.acessarConfig());
    politicasConta?.addEventListener("click", () => newAsideConfig.acessarPoliticas());
  });

//Seta de abrir leque de opções na aba tema
function abrir() {
  let menu = document.getElementById("menu");
  let seta = document.getElementById("setaConfig");

  if (menu.style.display === "none" || menu.style.display === "") {
    menu.style.display = "flex";
  } else {
    menu.style.display = "none";
  }

  if (
    seta.style.transform === "rotate(0deg)" ||
    seta.style.transform === ""
  ) {
    seta.style.transform = "rotate(90deg)";
  } else {
    seta.style.transform = "rotate(0deg)";
  }
}

function alterarnoomeuser(){
  const form = document.getElementById("formNomeUsuario");

  if (form.style.display === "none" || form.style.display === "") {
    form.style.display = "block";
  } else {
    form.style.display = "none";
  }
}

function alteraremail() {
  const form = document.getElementById("formEmailUsuario");

  if (form.style.display === "none" || form.style.display === "") {
    form.style.display = "block";
  } else {
    form.style.display = "none";
  }
}

function alterarsenha() {
  const form = document.getElementById("formSenhaUsuario");

  if (form.style.display === "none" || form.style.display === "") {
    form.style.display = "block";
  } else {
    form.style.display = "none";
  }
}

function alterartelefone() {
  const form = document.getElementById("formTelefoneUsuario");

  if (form.style.display === "none" || form.style.display === "") {
    form.style.display = "block";
  } else {
    form.style.display = "none";
  }
}

// conexão com o banco para carregar dados do usuario


//virificar tipo de usuario logado

    document.addEventListener("DOMContentLoaded", async () => {
    try {
        if (typeof usuario === 'undefined' || !usuario.id) {
            console.error("Variável 'usuario' ou 'usuario.id' não encontrada.");
            return; // Para a execução se não houver ID
        }

        const response = await fetch(`http://localhost:4501/usuarios/verificar-tipo/${usuario.id}`);
        const data = await response.json();

        // Pega os elementos da página
        const divcpfoucnpj = document.getElementById("cpfConta");
        const divnomeoudata = document.getElementById("dataNascimento");


        // --- LÓGICA CORRIGIDA ---

        // Primeiro, verifica se a API retornou dados válidos
        if (data && data.length > 0) {
            const userData = data[0]; // Fica mais fácil de ler



            // Caso 1: O usuário ainda NÃO escolheu um tipo
            if (userData.tipo === null) {
              divcpfoucnpj.innerHTML = `<p id="cpfoucnpj"><span class="before">CPF/CNPJ:</span> Não definido</p>`;
              // Caso 2: O usuário é do tipo 'adotante'
            } else if (userData.tipo === 'adotante') {
              const response = await fetch(`http://localhost:4501/usuarios/configadotante/${usuario.id}`);
              const data = await response.json();
              const userData = data[0]; // Fica mais fácil de ler
              divcpfoucnpj.innerHTML = `<p id="cpfoucnpj"><span class="before">CPF:</span> ${userData.cpf}</p>`;
              divnomeoudata.innerHTML = `<p id="dataNasc"><span class="before">Data de nascimento:</span> ${userData.data_nascimento}</p>`;
              
              // Caso 3: O usuário é do tipo 'ong'
            } else if (userData.tipo === 'ong') {
              const response = await fetch(`http://localhost:4501/usuarios/configong/${usuario.id}`);
              const data = await response.json();
              const userData = data[0]; // Fica mais fácil de ler
              divcpfoucnpj.innerHTML = `<p id="cpf/cnpj"><span class="before">cnpj:</span> ${userData.cnpj}</p>`
              divnomeoudata.innerHTML = `<p id="dataNasc"><span class="before">Nome da ong:</span>${userData.nome_ong}</p>`;

            }

        } else {
            console.error("Nenhum dado de usuário foi retornado pela API.");
            // Você pode querer mostrar uma mensagem de erro para o usuário aqui
        }

    } catch (err) {
        console.error("Erro ao buscar ou processar dados do usuário:", err);
    }
});

// fim do verificar tipo de usuario logado


document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch(`http://localhost:4501/usuarios/${usuario.id}`);
    const data = await response.json();

    if (Array.isArray(data) && data.length === 1) {
      document.getElementById("nomeUsuarioconfig").innerHTML = data[0].nome;
      document.getElementById("emailuserconfig").innerHTML = `<span class="before">E-mail:</span> ${data[0].email}`;
      document.getElementById("telefoneconfig").innerHTML = `<span class="before">Telefone:</span> ${data[0].telefone}`;
      document.getElementById("fotoUsuarioconfig").style.backgroundImage = `url('${data[0].foto}')`;

    } else {
     console.log("Usuário não encontrado ou dados inválidos.");


    }
  } catch (error) {
  console.log("Erro ao buscar dados do usuário:", error);
  // alert("Você não está logado", error);
}

});

// atualizar telefone do usuario

  document.getElementById("formTelefoneUsuario").addEventListener("submit", async function (e) {
    e.preventDefault(); // Evita o envio tradicional do formulário

    const telefone = document.getElementById("telefoneUsuario").value;

    try {
      const response = await fetch(`http://localhost:4501/usuarios/atualizar-telefone/${usuario.id}`, {
        method: "PUT", // Ou "POST", conforme configurado no seu backend
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ telefone })
      });

      if (response.ok) {
        alert("Telefone atualizado com sucesso!");
        // Você pode atualizar a interface aqui se quiser
      } else {
        const errorData = await response.json();
        alert("Erro ao atualizar o telefone: " + (errorData.message || response.statusText));
      }
    } catch (error) {
      alert("Erro na requisição: " + error.message);
    }
  });

// atualizar email do usuario

 // Substitua pelo ID real do usuário (pode ser armazenado em uma variável global ou vindo do backend via template)

  document.getElementById("formEmailUsuario").addEventListener("submit", async function (e) {
    e.preventDefault();

    const email = document.getElementById("emailUsuario").value;

    try {
      const response = await fetch(`http://localhost:4501/usuarios/atualizar-email/${usuario.id}`, {
        method: "PUT", // Ou POST, se for o seu caso
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email })
      });

      if (response.ok) {
        alert("E-mail atualizado com sucesso!");
        // Atualize a interface se necessário
      } else {
        const errorData = await response.json();
        alert("Erro ao atualizar o e-mail: " + (errorData.message || response.statusText));
      }
    } catch (error) {
      alert("Erro na requisição: " + error.message);
    }
  });

// atualizar nome do usuario

document.getElementById("formNomeUsuario").addEventListener("submit", async function (e) {
    e.preventDefault();

    const nome = document.getElementById("nomeUsuario").value;

    try {
      const response = await fetch(`http://localhost:4501/usuarios/atualizar-nome/${usuario.id}`, {
        method: "PUT", // Ou POST, conforme o backend
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ nome })
      });

      if (response.ok) {
        alert("Nome de usuário atualizado com sucesso!");
      } else {
        const errorData = await response.json();
        alert("Erro ao atualizar o nome: " + (errorData.message || response.statusText));
      }
    } catch (error) {
      alert("Erro na requisição: " + error.message);
    }
  });


// atualizar foto do usuario

 const inputFoto = document.getElementById("fotoPerfil");

  inputFoto.addEventListener("change", async function () {
    const file = inputFoto.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("foto", file);

    try {
      const response = await fetch(`http://localhost:4501/usuarios/atualizar-foto/${usuario.id}`, {
        method: "PUT", // ou POST, conforme seu backend
        body: formData
      });

      if (response.ok) {
        alert("Foto de perfil atualizada com sucesso!");
        // Atualizar imagem exibida (opcional)
      } else {
        const errorData = await response.json();
        alert("Erro ao atualizar a foto: " + (errorData.message || response.statusText));
      }
    } catch (error) {
      alert("Erro na requisição: " + error.message);
    }
  });
