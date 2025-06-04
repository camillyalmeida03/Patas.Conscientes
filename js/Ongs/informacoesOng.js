//Este arquivo é responsável por puxar as informações das ONGs;

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
}
