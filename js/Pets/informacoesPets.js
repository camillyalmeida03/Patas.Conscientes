// Este arquivo é responsável por puxar as informações fictícias (por enquanto) dos Pets.

export class InformacoesPets {
  constructor(
    id,
    idOng,
    foto,
    nome,
    sexo,
    peso,
    idade,
    especie,
    porte,
    raca,
    sobre,
    ongNome,
    ongLink
  ) {
    this.id = id;
    this.idOng = idOng;
    this.foto = foto;
    this.nome = nome;
    this.sexo = sexo;
    this.peso = peso;
    this.idade = idade;
    this.especie = especie;
    this.raca = raca;
    this.sobre = sobre;
    this.porte = porte;
    this.ongNome = ongNome;
    this.ongLink = ongLink;
  }

    // Método que monta a classe a partir dos dados da API
    static fromAPI(data) {

    return new InformacoesPets(
        data.id_pet,
        data.id_ong_fk,
        data.foto || "",
        data.nome_pet,
        data.id_sexo_fk,
        data.peso,
        data.idade,
        data.especie,
        data.porte_pet,
        data.raca,
        data.sobre_pet,
        data.nome_ong
    );
  }
}


