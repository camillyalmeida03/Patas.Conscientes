export class InformacoesOng {
  constructor(id, foto, banner, nome, endereco, redes, pets, descricao, cidade, qntdanimais) {
    this.id = id;
    this.foto = foto;
    this.banner = banner;
    this.nome = nome;
    this.endereco = endereco;
    this.redes = redes;
    this.pets = pets;
    this.descricao = descricao;
    this.cidade = cidade;
    this.qntdanimais = qntdanimais;
  }

  //  monta a classe a partir dos dados da API
  static fromAPI(data) {
    const enderecoFormatado = `${data.rua}, ${data.numero}, ${data.bairro}, ${data.cidade} - ${data.sigla}`;

    return new InformacoesOng(
      data.usuario_id,
      data.foto || "/img/default-foto.jpg",
      data.banner || "/img/default-banner.jpg",
      data.nome_ong,
      enderecoFormatado,
      data.redes || {},       // ou adapte se vier em outro formato
      data.pets || [],
      data.descricao,
      data.cidade,
      data.qntdanimais || 0
    );
  }
}
