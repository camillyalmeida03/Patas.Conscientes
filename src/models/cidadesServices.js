// Este arquivo implementa o CRUD da tabela cidades, fornecendo funções assíncronas para listar, buscar por id, inserir, atualizar e excluir registros no banco de dados. 

const { banco } = require("./database"); // Chamando o banco

const GetAll = async () => {
  const querytext = "SELECT * FROM cidades"; 

  const [rows] = await banco.query(querytext); //Manda a queryText pro banco
  return rows; // Retorna só os dados
};

const GetById = async (id) => {
  const querySelect = 'SELECT * FROM cidades';
  const queryWhere = ' WHERE idcidade = ?';

  querytext = querySelect + queryWhere;

  const [rows] = await banco.query(querytext, [id]); //Manda a queryText pro banco
  return rows; // Retorna só os dados
};

const Post = async (cidade, fk_idestado) => {
  // 1 - Verifica se a cidade já existe nesse estado
  const queryCheck = "SELECT idcidade FROM cidades WHERE cidade = ? AND fk_idestado = ?";
  const [rows] = await banco.query(queryCheck, [cidade, fk_idestado]);

  if (rows.length > 0) {
    // já existe → retorna o existente
    return {
      message: "Cidade já cadastrada!",
      id: rows[0].idcidade,
      cidade,
      fk_idestado
    };
  }

  // 2 - Se não existe → insere normalmente
  const queryInsert = "INSERT INTO cidades(cidade, fk_idestado) VALUES (?, ?)";
  const [result] = await banco.query(queryInsert, [cidade, fk_idestado]);

  return { id: result.insertId, cidade, fk_idestado };
};


const Put = async (id, cidade, fk_idestado) => {
  const querySelect = 'UPDATE cidades SET cidade = ?, fk_idestado = ?';
  const queryWhere = ' WHERE idcidade = ?';

  querytext = querySelect + queryWhere;

  const [result] = await banco.query(querytext, [cidade, fk_idestado, id]); //Manda a queryText pro banco
  return { id, cidade, fk_idestado, linhasAfetadas: result.affectedRows }; // Retorna o registro alterado
};

const Erase = async (id) => {
  const querySelect = 'DELETE FROM cidades';
  const queryWhere = ' WHERE idcidade = ?';

  querytext = querySelect + queryWhere;

  const [rows] = await banco.query(querytext, [id]); //Manda a queryText pro banco
  return rows; // Retorna só os dados
};

module.exports = { GetAll, GetById, Post, Put, Erase };