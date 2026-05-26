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
    ongLink,
    status,
    dataPost,
    dataAtt
  ) {
    this.id = id;
    this.idOng = idOng;
    this.foto = foto;
    this.nome = nome;
    this.sexoPet = sexo;
    this.peso = peso;
    this.idade = idade;
    this.especie = especie;
    this.raca = raca;
    this.sobre = sobre;
    this.porte = porte;
    this.ongNome = ongNome;
    this.ongLink = ongLink;
    this.status = status;
    this.dataPost = dataPost;
    this.dataAtt = dataAtt;
    this.cidade = "";
  }

  static fromAPI(data) {
    let caminhoFoto = data.fotos;
    const idOng = data.fk_idong || data.id_ong || data.ong_id || data.idong || "";

    if (!caminhoFoto || caminhoFoto.length < 5) {
      caminhoFoto =
        "https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg";
    } else if (!caminhoFoto.startsWith("http")) {
      if (!caminhoFoto.includes(".")) {
        caminhoFoto =
          "https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg";
      } else {
        caminhoFoto = `/public/img/fotos/${caminhoFoto}`;
      }
    }

    const pet = new InformacoesPets(
      data.idpet,                           // id
      idOng,                                // idOng
      caminhoFoto,                          // foto
      data.nome,                            // nome
      data.sexopet,                         // sexo
      data.peso,                            // peso
      data.idade,                           // idade
      data.especie,                         // especie
      data.porte,                           // porte
      data.raca,                            // raca
      data.descricao,                       // sobre
      data.nome_ong,                        // ongNome
      idOng ? `ongPage.html?id=${idOng}` : "ongs.html", // ongLink
      data.status,                          // status
      data.data_post,                       // dataPost
      data.data_att                         // dataAtt
    );

    pet.cidade = data.cidade || "";

    return pet;
  }
}
