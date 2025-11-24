// import { InformacoesPets } from "../pets/informacoesPets.js"; 
// import { CardsPets } from "../../../public/js/Pets/cardsPet.js";
import { CriarElementos } from "../../../public/js/criarElementos.js";

class Redes {
  constructor(ong) { 
    this.criarElemento = new CriarElementos();
    this.ongSelecionada = ong; 
  }

  redes() {
    this.infoCardOngPerfil = document.querySelector(".infoCardOngPerfil");
    
    const temRede = Object.values(this.ongSelecionada.redes || {}).some((url) => url); 

    if (temRede) {
      Object.entries(this.ongSelecionada.redes).forEach(([tipo, url]) => {
        if (url) {
          this.redeA = this.criarElemento.createA(
            null,
            url,
            `${tipo} da ${this.ongSelecionada.nome}.`,
            null,
            this.divbttRedes
          );

          this.imgA = this.criarElemento.createImg(
            null,
            `img/icons/${tipo}-icon.svg`,
            `Ícone do ${tipo}`,
            "lazy",
            this.redeA
          );

          this.redeA.append(` ${tipo}`);
        }
      });
    } else {
      console.log("Esta ONG não tem redes sociais cadastradas.");
    }
  }
}

class AdicionarBotao {
  constructor(isResponsavel) {
    this.criarElemento = new CriarElementos();
    this.isResponsavel = isResponsavel;
  }

  botaoAdicionar() {
    // SÓ CRIA O BOTÃO SE A PESSOA FOR RESPONSÁVEL
    if (!this.isResponsavel) {
    }

    this.bttAdicionar = document.querySelector(".bttAdicionar");

    this.botaoAdd = this.criarElemento.createElement(
      "button",
      "buttonRosa",
      "Adicionar",
      this.bttAdicionar,
      null
    );
    this.botaoAdd.id = "abrirModalAdicionar";
  }
}

const urlParams = new URLSearchParams(window.location.search);
const idUrl = parseInt(urlParams.get("id"));

async function buscarOngPorId(id) {
  try {
    const res = await fetch(`http://localhost:6789/ongs/${id}`);
    if (!res.ok) throw new Error("Erro ao buscar ONG");
    
    const dados = await res.json();
    
    return Array.isArray(dados) ? dados[0] : dados; 
  } catch (error) {
    console.error("Erro ao buscar ONG:", error);
    return null;
  }
}

async function preencherPagina() {
  
  if (!idUrl) {
      console.log("Nenhum ID fornecido na URL");
      return;
  }

  const ong = await buscarOngPorId(idUrl);

  if (!ong) {
    document.getElementById("nomeOng").textContent = "ONG não encontrada";
    return;
  }

  const usuarioLogado = JSON.parse(localStorage.getItem('usuario'));
  const ongSalva = JSON.parse(localStorage.getItem('ong')); 
  
  const idResponsavelOng = ong.fk_idresponsavel; 

  const isResponsavel = usuarioLogado && 
                        usuarioLogado.idusuario === idResponsavelOng;

  const redesOng = new Redes(ong); 
  redesOng.redes();
  
  const botaoAdd = new AdicionarBotao(isResponsavel);
  botaoAdd.botaoAdicionar();
  
  controlarBotoesDeUpload(isResponsavel);

  const enderecoCompleto = `${ong.rua || ""}, ${ong.numero || ""} - ${ong.bairro || ""}, ${ong.cidade || ""} - ${ong.sigla || ""}`;
  
  document.getElementById("titleOng").textContent = `${ong.nome} - Patas Conscientes`;
  document.getElementById("nomeOng").textContent = ong.nome;
  document.getElementById("enderecoOng").textContent = enderecoCompleto;
  document.getElementById("descricaoOng").textContent = ong.descricao || "Sem descrição.";
  document.getElementById("caminhoPerfilOng").textContent = ong.nome;

  const fotoUrl = ong.foto || "/public/img/user_ong/user/gato_user_ONG.svg";
  const bannerUrl = ong.banner || "/public/img/user_ong/banners/Banner_misto_rosa_ONG.svg";

  const fotoEl = document.getElementById("fotoOng");
  if(fotoEl) {
      fotoEl.style.backgroundImage = `url('${fotoUrl}')`;
      fotoEl.style.backgroundSize = "cover";
      fotoEl.style.backgroundPosition = "center";
  }

  const bannerEl = document.getElementById("bannerOng");
  if(bannerEl) {
      bannerEl.style.backgroundImage = `url('${bannerUrl}')`;
      bannerEl.style.backgroundSize = "cover";
      bannerEl.style.backgroundPosition = "center";
  }

  // carregarPetsDaOng(idUrl, ong.nome);
}

function controlarBotoesDeUpload(isResponsavel) {
    const elementosUpload = document.querySelectorAll(".uploadButton, .inputArquivo");

    elementosUpload.forEach(el => {
        if (isResponsavel) {
            el.classList.remove("escondido-responsavel");
        } else {
            el.classList.add("escondido-responsavel");
        }
    });
}

document.addEventListener("DOMContentLoaded", preencherPagina);

// document.addEventListener("DOMContentLoaded", () => {
//     const botaoAdicionar = document.getElementById("abrirModalAdicionar"); 
//     const botaoAdicionarPet = document.getElementById("botaoAdicionarPet");
//     const fecharModais = document.querySelectorAll(".fechar-modal");

//     const modalEscolha = document.getElementById("fundoAdicionarModal");
//     const modalAdicionarPet = document.getElementById("fundoAdicionarPet");

//     if (botaoAdicionar) {
//         botaoAdicionar.addEventListener("click", () => {
//             if (modalEscolha) {
//                 modalEscolha.classList.remove("escondido");
//             }
//         });
//     }

//     fecharModais.forEach(btn => {
//         btn.addEventListener("click", () => {
//             if (modalEscolha) {
//                 modalEscolha.classList.add("escondido");
//             }
//             if (modalAdicionarPet) {
//                 modalAdicionarPet.classList.add("escondido");
//             }
//         });
//     });

//     if (botaoAdicionarPet) {
//         botaoAdicionarPet.addEventListener("click", () => {
//             if (modalEscolha) {
//                 modalEscolha.classList.add("escondido");
//             }
//             if (modalAdicionarPet) {
//                 modalAdicionarPet.classList.remove("escondido"); 
//             }
//         });
//     }
// });

// async function carregarPetsDaOng(idOng, nomeOng) {
//     try {
//         const res = await fetch("http://localhost:6789/pets"); 
//         if(!res.ok) return;
        
//         const todosPets = await res.json();
        
//         const petsDaOng = todosPets.filter(p => p.fk_idong === idOng || p.id_ong_fk === idOng);

//         const container = document.querySelector(".adotarSec");
//         if(container) container.innerHTML = "";

//         if(petsDaOng.length === 0) {
//             document.getElementById("petsDisponiveis").textContent = "Nenhum pet disponível no momento";
//             return;
//         }

//         document.getElementById("petsDisponiveis").textContent = `${petsDaOng.length} pets disponíveis`;

//         petsDaOng.forEach(pet => {
//              // Se tiver a classe CardsPets importada corretamente:
//              /* const petObj = new InformacoesPets(...);
//              const card = new CardsPets(petObj).card;
//              container.appendChild(card);
//              */
//         });

//     } catch (e) {
//         console.error("Erro ao carregar pets:", e);
//     }
// }

document.addEventListener("DOMContentLoaded", preencherPagina);