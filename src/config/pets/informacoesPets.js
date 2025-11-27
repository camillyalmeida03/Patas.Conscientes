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
    // Se data.fotos já for uma URL completa, usa ela. 
    // Se for só nome de arquivo, concatena com o caminho da sua pasta de uploads
    let caminhoFoto = data.fotos;
    
    // Exemplo: Se o banco traz só "foto1.jpg", adicione o caminho da pasta
    if (data.fotos && !data.fotos.includes("/")) {
        caminhoFoto = `http://localhost:6789/uploads/${data.fotos}`; // Ajuste conforme sua rota de imagens estáticas
    }

    return new InformacoesPets(
        data.idpet,            
        data.fk_idong,         
        caminhoFoto || null, // Foto padrão se vier null    
        data.nome,            
        data.sexopet,         
        data.peso,            
        data.idade,            
        data.especie,          
        data.porte,           
        data.raca,            
        data.descricao,        
        data.nome_ong,         
        `ongPage.html?id=${data.fk_idong}` // Link dinâmico para a ONG correta           
    );
}
}