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

  // Método estático para converter os dados do Banco (API) para o objeto do Site
  static fromAPI(data) {
    return new InformacoesPets(
        data.idpet,            
        data.fk_idong,         
        data.fotos || "/public/img/fotos/cat1.jpg",      
        data.nome,            
        data.sexopet,         
        data.peso,            
        data.idade,            
        data.especie,          
        data.porte,           
        data.raca,            
        data.descricao,        
        data.nome_ong,         
        "ongs.html"            
    );
  }
}