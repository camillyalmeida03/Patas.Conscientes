import { InformacoesOng } from "./informacoesOng.js";
import { CardsOngs } from "./cardsOngs.js"; // ou o caminho correto

async function buscarOngsDoBanco() {
  try {
    const resposta = await fetch("http://localhost:4501/ongs"); // URL da sua API
    const dados = await resposta.json();

    // Transforma cada objeto em uma instância da classe InformacoesOng
    const listaOngs = dados.map(ong => new InformacoesOng(
      ong.id,
      ong.foto,
      ong.banner,
      ong.nome,
      ong.endereco,
      ong.redes,
      ong.pets,
      ong.descricao,
      ong.cidade,
      ong.qntdanimais
    ));

    // Cria os cards usando as instâncias
    listaOngs.forEach(ong => {
      new CardsOngs(ong); // Cria e exibe o card de cada ONG
    });

  } catch (erro) {
    console.error("Erro ao buscar ONGs:", erro);
  }
}

buscarOngsDoBanco(); // Chama a função assim que a página carregar

