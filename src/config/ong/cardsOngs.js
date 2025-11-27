import { CriarElementos } from "../../../public/js/criarElementos.js"; 
import { InformacoesOng } from "./informacoesOng.js"; 

export class CardsOngs {
  constructor(InformacoesOng = null) {
    this.criarElemento = new CriarElementos();

    if (InformacoesOng) {
      this.InfoOng = InformacoesOng;
      this.gerarCard(InformacoesOng); 
    }
  }

  gerarCard(InfoOng) {
    const gridOng = document.querySelector(".gridOng");
    if (!gridOng) return console.log("gridOng não encontrada");

    const cardOng = this.criarElemento.createA(
      "cardOng",
      `ongPage.html?id=${InfoOng.id}`, 
      `Ir para a página de ${InfoOng.nome}`,
      null,
      gridOng
    );

    const imgFav = this.criarElemento.createElement(
      "div",
      ["imgFav", "favoritado"],
      null,
      cardOng
    );

    const img = this.criarElemento.createImg(
      [],
      InfoOng.foto,
      `Foto de ${InfoOng.nome}`,
      "lazy",
      imgFav
    );

    img.onerror = () => {
      img.src = "/public/img/user_ong/banners/Banner_misto_rosa_ONG.svg";
    };

    const descOng = this.criarElemento.createElement(
      "div",
      "descOng",
      null,
      cardOng
    );
    this.criarElemento.createElement("h2", [], InfoOng.nome, descOng);
    
    const textoDescricao = InfoOng.descricao.length > 80 
        ? InfoOng.descricao.substring(0, 80) + "..." 
        : InfoOng.descricao || "Sem descrição.";
        
    this.criarElemento.createElement("p", [], textoDescricao, descOng);
    this.criarElemento.createElement("p", "cidadeOng", InfoOng.cidade, descOng);

    return cardOng;
  }
}

async function carregarOngsDoBanco() {
  const gridOng = document.querySelector(".gridOng");
  if (gridOng) gridOng.innerHTML = ""; 

  try {
    const response = await fetch("http://localhost:6789/ongs"); 
    
    if (!response.ok) throw new Error("Falha ao buscar ONGs: " + response.statusText);

    const ongsDoBanco = await response.json();

    if (ongsDoBanco.length === 0) {
        if (gridOng) gridOng.innerHTML = "<p>Nenhuma ONG cadastrada.</p>";
        return;
    }

    ongsDoBanco.forEach((ong) => {
      const ongInfo = InformacoesOng.fromAPI(ong); 
      new CardsOngs(ongInfo);
    });

  } catch (error) {
    console.error("Erro ao carregar ONGs:", error);
    if (gridOng) gridOng.innerHTML = "<p>Erro ao conectar com o servidor. Verifique se o backend está rodando.</p>";
  }
}

document.addEventListener("DOMContentLoaded", carregarOngsDoBanco);