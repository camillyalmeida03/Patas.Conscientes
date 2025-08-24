
// Este arquivo implementa o CRUD da tabela bairros, fornecendo funções assíncronas para listar, buscar por id, inserir, atualizar e excluir registros no banco de dados. 

const { banco } = require("./database"); // Chamando o banco

const GetAll = async () => {
  const querytext = "SELECT * FROM bairros"; 

  const [rows] = await banco.query(querytext); //Manda a queryText pro banco
  return rows; // Retorna só os dados
};

const GetById = async (id) => {
  const querySelect = 'SELECT * FROM bairros';
  const queryWhere = ' WHERE idbairro = ?';

  querytext = querySelect + queryWhere;

  const [rows] = await banco.query(querytext, [id]); //Manda a queryText pro banco
  return rows; // Retorna só os dados
};

const Post = async (bairro, fk_idcidade) => {
  const querySelect = 'INSERT INTO bairros(bairro, fk_idcidade)';
  const queryValues = ' VALUES (?, ?)';

  querytext = querySelect + queryValues;

  const [result] = await banco.query(querytext, [bairro, fk_idcidade]); //Manda a queryText pro banco
  return { id: result.insertId, bairro, fk_idcidade }; // Retorna o novo registro criado
};

const Put = async (id, bairro, fk_idcidade) => {
  const querySelect = 'UPDATE bairros SET bairro = ?, fk_idcidade = ?';
  const queryWhere = ' WHERE idbairro = ?';

  querytext = querySelect + queryWhere;

  const [result] = await banco.query(querytext, [bairro, fk_idcidade, id]); //Manda a queryText pro banco
  return { id, bairro, fk_idcidade, linhasAfetadas: result.affectedRows }; // Retorna o registro alterado
};

const Erase = async (id) => {
  const querySelect = 'DELETE FROM bairros';
  const queryWhere = ' WHERE idbairro = ?';

  querytext = querySelect + queryWhere;

  const [rows] = await banco.query(querytext, [id]); //Manda a queryText pro banco
  return rows; // Retorna só os dados
};

module.exports = { GetAll, GetById, Post, Put, Erase };