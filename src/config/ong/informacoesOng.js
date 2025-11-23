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

  // Método estático que converte os dados vindos da API 
  static fromAPI(data) {
    const enderecoFormatado = `${data.rua || "Rua"}, ${data.numero || "S/N"}, ${data.bairro || ""}, ${data.cidade || ""} - ${data.sigla || ""}`;

    return new InformacoesOng(
      data.idong, 
      data.foto || "/public/img/user_ong/banners/Banner_misto_rosa_ONG.svg", 
      data.banner || "/public/img/user_ong/banners/Banner_misto_rosa_ONG.svg",
      data.nome, 
      enderecoFormatado,
      data.redes || {}, 
      data.pets || [],
      data.descricao || "Sem descrição disponível.",
      data.cidade || "Cidade não informada",
      data.qntdanimais || 0 
    );
  }
}