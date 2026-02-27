// Este arquivo implementa o CRUD da tabela enderecos, fornecendo funções assíncronas para listar, buscar por id, inserir, atualizar e excluir registros no banco de dados. 

const { banco } = require("./database"); // Chamando o banco

const GetAll = async () => {
    const querySelect = 'SELECT e.idendereco, r.rua, e.numero, b.bairro, c.cidade, uf.sigla, e.cep, e.complemento FROM enderecos e ';

    const queryInnerJoin = 'INNER JOIN estados uf ON uf.idestado = e.fk_idestado INNER JOIN cidades c ON c.idcidade = e.fk_idcidade INNER JOIN bairros b ON b.idbairro = e.fk_idbairro INNER JOIN ruas r ON r.idrua = e.fk_idrua '

    const queryOrderby = 'ORDER BY e.idendereco'

    const querytext = querySelect + queryInnerJoin + queryOrderby;

    const [rows] = await banco.query(querytext); //Manda a queryText pro banco
    return rows; // Retorna só os dados
};

const GetById = async (id) => {
    const querySelect = 'SELECT e.idendereco, r.rua, e.numero, b.bairro, c.cidade, uf.sigla, e.cep, e.complemento FROM enderecos e ';

    const queryInnerJoin = 'INNER JOIN estados uf ON uf.idestado = e.fk_idestado INNER JOIN cidades c ON c.idcidade = e.fk_idcidade INNER JOIN bairros b ON b.idbairro = e.fk_idbairro INNER JOIN ruas r ON r.idrua = e.fk_idrua ' 

    const queryWhere = 'WHERE e.idendereco = ?'

    const querytext = querySelect + queryInnerJoin + queryWhere;

    const [rows] = await banco.query(querytext, [id]); //Manda a queryText pro banco
    return rows; // Retorna só os dados
};

const Post = async (fk_idcidade, fk_idbairro, fk_idrua, fk_idestado, numero, cep, complemento) => {
  // 1 - Verifica se já existe o mesmo endereço
  const queryCheck = `
    SELECT idendereco 
    FROM enderecos 
    WHERE fk_idcidade = ? 
      AND fk_idbairro = ? 
      AND fk_idrua = ? 
      AND fk_idestado = ? 
      AND numero = ? 
      AND cep = ? 
      AND complemento = ?
  `;

  const [rows] = await banco.query(queryCheck, [
    fk_idcidade, fk_idbairro, fk_idrua, fk_idestado, numero, cep, complemento
  ]);

  if (rows.length > 0) {
    // já existe → retorna o existente
    return {
      message: "Endereço já cadastrado!",
      id: rows[0].idendereco,
      fk_idcidade, fk_idbairro, fk_idrua, fk_idestado, numero, cep, complemento
    };
  }

  // 2 - Se não existe → insere normalmente
  const queryInsert = `
    INSERT INTO enderecos(fk_idcidade, fk_idbairro, fk_idrua, fk_idestado, numero, cep, complemento) 
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  const [result] = await banco.query(queryInsert, [
    fk_idcidade, fk_idbairro, fk_idrua, fk_idestado, numero, cep, complemento
  ]);

  return { id: result.insertId, fk_idcidade, fk_idbairro, fk_idrua, fk_idestado, numero, cep, complemento };
};

const Put = async (id, fk_idcidade, fk_idbairro, fk_idrua, fk_idestado, numero, cep, complemento) => {
    const querySelect = 'UPDATE enderecos SET fk_idcidade = ?, fk_idbairro = ?, fk_idrua = ?, fk_idestado = ?, numero = ?, cep = ?, complemento = ?';
    const queryWhere = ' WHERE idendereco = ?';

    querytext = querySelect + queryWhere;

    const [result] = await banco.query(querytext, [fk_idcidade, fk_idbairro, fk_idrua, fk_idestado, numero, cep, complemento, id]); //Manda a queryText pro banco
    return { id, fk_idcidade, fk_idbairro, fk_idrua, fk_idestado, numero, cep, complemento, linhasAfetadas: result.affectedRows }; // Retorna o registro alterado
};

const Erase = async (id) => {
    const querySelect = 'DELETE FROM enderecos';
    const queryWhere = ' WHERE idendereco = ?';

    querytext = querySelect + queryWhere;

    const [rows] = await banco.query(querytext, [id]); //Manda a queryText pro banco
    return rows; // Retorna só os dados
};

module.exports = { GetAll, GetById, Post, Put, Erase };