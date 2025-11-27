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

  static fromAPI(data) {
    let caminhoFoto = data.fotos;

    if (!caminhoFoto || caminhoFoto.length < 5) {
      caminhoFoto = "https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg"; 
    }
    else if (!caminhoFoto.startsWith("http")) {
      if (!caminhoFoto.includes(".")) {
        caminhoFoto = "https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg";
      } else {
        caminhoFoto = `/public/img/fotos/${caminhoFoto}`;
      }
    }

    return new InformacoesPets(
      data.idpet,
      data.fk_idong,
      caminhoFoto,
      data.nome,
      data.sexopet,
      data.peso,
      data.idade,
      data.especie,
      data.porte,
      data.raca,
      data.descricao,
      data.nome_ong,
      `ongPage.html?id=${data.fk_idong}`
    );
  }
}