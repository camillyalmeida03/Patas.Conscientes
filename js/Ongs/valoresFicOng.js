// Este arquivo é responsável por receber os valores fictícios das ONGs enquanto não há banco de dados.

import { InformacoesOng } from "./informacoesOng.js";

export const ongs = [
  new InformacoesOng(
    1,
    "img/fotos/ong2.jpg",          // foto
    "img/fotos/ong2.jpg",        // banner (valor genérico)
    "Lar dos Peludos Matão",       // nome
    "Rua Exemplo, 123 - Matão",    // endereco (genérico)
    { instagram: "", facebook: "" }, // redes (vazio por enquanto)
    [],                            // pets (ainda vazio)
    "Espaço dedicado ao cuidado de animais de rua, oferecendo abrigo e cuidados médicos.", // descricao
    "Matão",                       // cidade
    45                             // qntdanimais
  ),
  new InformacoesOng(
    2,
    "img/fotos/ong3.jpg",
    "img/fotos/ong3.jpg",
    "Vida Animal Matão",
    "Av. Central, 456 - Matão",
    { instagram: "instagram", facebook: "" },
    [],
    "Organização comprometida com o resgate e a adoção de animais em situações vulneráveis.",
    "Matão",
    25
  ),
  new InformacoesOng(
    3,
    "img/fotos/ong4.jpg",
    "img/fotos/ong4.jpg",
    "Cãopanheiros Taquaritinga",
    "Rua da Esperança, 789 - Taquaritinga",
    { instagram: "", facebook: "" },
    [],
    "Focada em garantir que cada pet encontre um lar amoroso, seguro e responsável.",
    "Taquaritinga",
    40
  ),
  new InformacoesOng(
    4,
    "img/fotos/ong5.jpg",
    "img/fotos/ong5.jpg",
    "Amor em Patas Taquaritinga",
    "Rua dos Animais, 101 - Taquaritinga",
    { instagram: "", facebook: "" },
    [],
    "ONG dedicada ao resgate de animais, gatos e cachorros, com ênfase na adoção consciente.",
    "Taquaritinga",
    50
  ),
  new InformacoesOng(
    5,
    "img/fotos/ong6.jpg",
    "img/fotos/ong6.jpg",
    "Anjos de Quatro Patas",
    "Av. Felicidade, 202 - Taquaritinga",
    { instagram: "", facebook: "" },
    [],
    "Organização voltada para o acolhimento de cães e gatos até que encontrem um novo lar.",
    "Taquaritinga",
    35
  ),
  new InformacoesOng(
    6,
    "img/fotos/ong1.jpg",
    "img/fotos/ong1.jpg",
    "Patas Amigas Matão",
    "Rua do Amor, 303 - Matão",
    { instagram: "", facebook: "" },
    [],
    "A ONG resgata cães e gatos abandonados, focando em adoções responsáveis.",
    "Matão",
    30
  )
];
