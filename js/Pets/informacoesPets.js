// Este arquivo é responsável por puxar as informações fictícias (por enquanto) dos Pets.

export class InformacoesPet {
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
}