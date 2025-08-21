//Este arquivo é responsável por gerar cada uma das páginas para cada ONG;
import { ongs } from "./valoresFicOng.js";
import { CriarElementos } from "../criarElementos.js";
import { InformacoesOng } from "./informacoesOng.js";
import { InformacoesPets } from "../Pets/informacoesPets.js";
import { CardsPets } from "../Pets/cardsPet.js"; // ajuste esse caminho

// 1. Pega ID da URL
const urlParams = new URLSearchParams(window.location.search);
const id = parseInt(urlParams.get("id"));

// 2. Busca ONG pelo ID
async function buscarOngPorId(id) {
  try {
    const res = await fetch(`http://localhost:4501/ongs/${id}`);
    if (!res.ok) throw new Error("Erro ao buscar ONG");
    const [ong] = await res.json();
    return ong;
  } catch (error) {
    console.error("Erro ao buscar ONG:", error);
    return null;
  }
}

// 3. Carrega pets da ONG
async function carregarPetsDaOng(id, nomeOng) {
  console.log("ID da ONG:", id);
  console.log("Nome da ONG:", nomeOng);

  try {
    const res = await fetch("http://localhost:4501/pets");
    const pets = await res.json();

    // TEMPORÁRIO: filtra por nome da ONG
    const petsDaOng = pets.filter((pet) => pet.nome_ong === nomeOng);

    console.log("Pets da ONG:", petsDaOng); // agora deve aparecer!

    const container = document.querySelector(".adotarSec");
    container.innerHTML = "";

    const cards = [];

    petsDaOng.forEach((pet) => {
      const especie = pet.especie || "Não informado";
      const porte = pet.porte_pet || "Não informado";

      const petInfo = new InformacoesPets(
        pet.id_pet,
        pet.id_ong_fk ?? null,
        pet.foto || "/public/public/img/fotos/default.jpg",
        pet.nome_pet,
        pet.sexo_pet,
        pet.peso,
        pet.idade,
        especie,
        porte,
        pet.raca,
        pet.sobre_pet,
        pet.nome_ong,
        "#"
      );

      const cardObj = new CardsPets(petInfo);
      const card = cardObj.card;

      if (!card) {
        console.warn("Card não gerado para pet:", petInfo.nome);
        return;
      }

      container.appendChild(card);

      // Agora adiciona os eventos interativos
      // cardObj.modalPet(pet);

      setTimeout(() => {
        if (cardObj.verMais) {
          cardObj.verMais.addEventListener("click", () => {
            if (!cardObj.fundoAba) {
              cardObj.modalPet(pet); // garante que o modal esteja criado
            }

            if (window.innerWidth <= 650) {
              if (!cardObj.informacoesExibidas) {
                cardObj.limparCardNormal();
                cardObj.mostrarMaisInformacoesPetCard();
              }
            } else {
              cardObj.mostrarFundoDaAba();
            }
          });
        }

        if (cardObj.verMenos) {
          cardObj.verMenos.addEventListener("click", () => {
            cardObj.limparCardMaisInfo();
            cardObj.limparCardNormal();
            cardObj.mostrarCardNormal();
          });
        }
      }, 0);

      if (cardObj.fecharAba) {
        cardObj.fecharAba.addEventListener("click", () => {
          cardObj.esconderFundoDaAba();
        });
      }

      cards.unshift(cardObj); // acumula os cards para usar no resize
    });

    // Fora do forEach: listener para resize
    window.addEventListener("resize", () => {
      if (window.innerWidth > 650) {
        cards.forEach((cardObj) => {
          if (cardObj.informacoesExibidas) {
            cardObj.limparCardMaisInfo();
            cardObj.limparCardNormal();
            cardObj.mostrarCardNormal();
          }
          cardObj.esconderFundoDaAba();
        });
      }
    });

    // Fora do forEach: listener para resize
    window.addEventListener("resize", () => {
      if (window.innerWidth > 650) {
        cards.forEach((cardObj) => {
          if (cardObj.informacoesExibidas) {
            cardObj.limparCardMaisInfo();
            cardObj.limparCardNormal();
            cardObj.mostrarCardNormal();
          }
          cardObj.esconderFundoDaAba();
        });
      }
    });

    document.getElementById(
      "petsDisponiveis"
    ).textContent = `${petsDaOng.length} pets disponíveis`;
  } catch (err) {
    console.error("Erro ao carregar pets:", err);
  }
}

// 3. Preenche os dados na tela
async function preencherPagina() {
  const ongSelecionada = await buscarOngPorId(id);

  if (!ongSelecionada) {
    document.querySelector(".adotarSec").innerHTML =
      "<p>ONG não encontrada.</p>";
    return;
  }

  document.getElementById(
    "titleOng"
  ).textContent = `${ongSelecionada.nome_ong} - Patas Conscientes`;
  document.getElementById("nomeOng").textContent = ongSelecionada.nome_ong;
  document.getElementById(
    "enderecoOng"
  ).textContent = `${ongSelecionada.rua}, ${ongSelecionada.numero}, ${ongSelecionada.bairro}, ${ongSelecionada.cidade} - ${ongSelecionada.sigla}`;
  document.getElementById("petsDisponiveis").textContent = "Carregando...";
  document.getElementById("descricaoOng").textContent =
    ongSelecionada.descricao || "Sem descrição.";

  // document.getElementById("fotoOng").style.backgroundImage = "url('/public/img/default-foto.jpg')";
  // document.getElementById("bannerOng").style.backgroundImage = "url('/public/img/default-banner.jpg')";
  document.getElementById("caminhoPerfilOng").textContent =
    ongSelecionada.nome_ong;

  // Atualiza imagem de perfil da ONG
  const fotoContainer = document.getElementById("fotoOng");
  if (ongSelecionada.foto) {
    fotoContainer.style.backgroundImage = `url(${ongSelecionada.foto})`;
  }

  // Atualiza banner da ONG
  const bannerContainer = document.getElementById("bannerOng");
  if (ongSelecionada.banner) {
    bannerContainer.style.backgroundImage = `url(${ongSelecionada.banner})`;
  }

  if (ongSelecionada.foto) {
    const fotoEl = document.getElementById("fotoOng");
    fotoEl.style.backgroundImage = `url(${ongSelecionada.foto})`;
    fotoEl.style.backgroundSize = "cover";
    fotoEl.style.backgroundPosition = "center";
  }

  if (ongSelecionada.banner) {
    const bannerEl = document.getElementById("bannerOng");
    bannerEl.style.backgroundImage = `url(${ongSelecionada.banner})`;
    bannerEl.style.backgroundSize = "cover";
    bannerEl.style.backgroundPosition = "center";
  }

  await carregarPetsDaOng(id, ongSelecionada.nome_ong);

  let adicionar = new AdicionarBotao();
  adicionar.botaoAdicionar();
}
preencherPagina();

// async function carregarPetsDaOng(id) {
//   try {
//     const res = await fetch("http://localhost:4501/pets");
//     const pets = await res.json();

//     const petsDaOng = pets.filter(pet => pet.id_ong_fk === id);
//     const container = document.querySelector(".adotarSec");

//     petsDaOng.forEach(pet => {
//       const petInfo = new InformacoesPet(
//         pet.id_pet,
//         pet.id_ong_fk,
//         pet.foto || "/public/public/img/fotos/default.jpg", // imagem fallback
//         pet.nome_pet,
//         pet.id_sexo_fk,
//         pet.peso,
//         pet.idade,
//         pet.id_especie_fk === 1 ? "Cachorro" : "Gato",
//         pet.id_porte_fk === 1 ? "Miniatura" : pet.id_porte_fk === 2 ? "Pequeno" : pet.id_porte_fk === 3 ? "Médio" : pet.id_porte_fk === 4 ? "Grande" : "Gigante",
//         pet.raca,
//         pet.sobre_pet,
//         "ONG atual", // ou ongSelecionada.nome_ong
//         "#" // ou link para a ONG
//       );

//       const card = new CardsPets(petInfo).card;
//       container.appendChild(card);
//     });

//     document.getElementById("petsDisponiveis").textContent = `${petsDaOng.length} pets disponíveis`;
//   } catch (err) {
//     console.error("Erro ao carregar pets:", err);
//   }
// }

// document.getElementById('inputBannerOng').addEventListener('change', async function () {
//   const formData = new FormData();
//   formData.append('bannerong', this.files[0]); // ⚠️ nome correto: bannerong

//   const uploadRes = await fetch(`http://localhost:4501/uploadbannerong/${id}`, {
//     method: 'POST',
//     body: formData
//   });

//   const resultado = await uploadRes.json();

//   if (uploadRes.ok) {
//     document.getElementById('bannerOng').style.backgroundImage = `url(${resultado.caminho})`;
//   } else {
//     alert('Erro ao enviar banner');
//   }
// });

// document.getElementById('fotoPerfilOng').addEventListener('change', async function () {
//   const formData = new FormData();
//   formData.append('fotoperfilong', this.files[0]);

//   const uploadRes = await fetch(`http://localhost:4501/uploadfotoperfil/${id}`, {
//     method: 'POST',
//     body: formData
//   });

//   const resultado = await uploadRes.json();

//   if (uploadRes.ok) {
//     // Atualiza visualmente
//     const fotoContainer = document.getElementById('fotoOng');
//     fotoContainer.style.backgroundImage = `url(${resultado.caminho})`;
//     fotoContainer.style.backgroundSize = 'cover';
//     fotoContainer.style.backgroundPosition = 'center';
//   } else {
//     alert('Erro ao enviar foto de perfil');
//   }
// });

window.addEventListener("DOMContentLoaded", function () {
  const id = new URLSearchParams(window.location.search).get("id");

  const inputBanner = document.getElementById("inputBannerOng");
  const inputFoto = document.getElementById("fotoPerfilOng");

  if (inputBanner) {
    inputBanner.addEventListener("change", async function () {
      const formData = new FormData();
      formData.append("bannerong", this.files[0]);

      const res = await fetch(`http://localhost:4501/uploadbannerong/${id}`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        document.getElementById(
          "bannerOng"
        ).style.backgroundImage = `url(${data.caminho})`;
      } else {
        alert("Erro ao enviar banner");
        console.error(data);
      }
    });
  }

  if (inputFoto) {
    inputFoto.addEventListener("change", async function () {
      const formData = new FormData();
      formData.append("fotoperfilong", this.files[0]);

      const res = await fetch(`http://localhost:4501/uploadfotoperfil/${id}`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        const foto = document.getElementById("fotoOng");
        foto.style.backgroundImage = `url(${data.caminho})`;
        foto.style.backgroundSize = "cover";
        foto.style.backgroundPosition = "center";
      } else {
        alert("Erro ao enviar foto de perfil");
        console.error(data);
      }
    });
  }
});

class Redes {
  constructor() {
    this.criarElemento = new CriarElementos();
  }

  redes() {
    this.infoCardOngPerfil = document.querySelector(".infoCardOngPerfil");

    const temRede = Object.values(ongSelecionada.redes).some((url) => url);

    if (temRede) {
      // Cria o bloco só se tiver pelo menos uma rede com URL
      this.redesDiv = this.criarElemento.createElement(
        "div",
        "redes",
        null,
        this.infoCardOngPerfil,
        null
      );

      this.linha = this.criarElemento.createElement(
        "div",
        "linha",
        null,
        this.redesDiv,
        null
      );

      this.pNossasRedes = this.criarElemento.createElement(
        "p",
        "redesOng",
        "Nossas redes: ",
        this.redesDiv,
        null
      );

      this.divbttRedes = this.criarElemento.createElement(
        "div",
        "bttRedes",
        null,
        this.redesDiv,
        null
      );

      // Agora sim, cria um <a> por rede válida
      Object.entries(ongSelecionada.redes).forEach(([tipo, url]) => {
        if (url) {
          this.redeA = this.criarElemento.createA(
            null,
            url,
            `${tipo} da ${ongSelecionada.nome}.`,
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
  constructor() {
    this.criarElemento = new CriarElementos();
  }

  botaoAdicionar() {
    this.infoCardOngPerfil = document.querySelector(".infoCardOngPerfil");

    this.adicionarBttOngAdm = this.criarElemento.createElement(
      "div",
      "adicionarBttOngAdm",
      null,
      this.infoCardOngPerfil,
      null
    );

    this.linha = this.criarElemento.createElement(
      "div",
      "linha",
      null,
      this.adicionarBttOngAdm,
      null
    );

    this.botaoAdd = this.criarElemento.createButton(
      "buttonRosa",
      "Adicionar",
      this.adicionarBttOngAdm,
      "Adicionar..."
    );

    this.botaoAdd.id = "abrirModalAdicionar";
  }
}
