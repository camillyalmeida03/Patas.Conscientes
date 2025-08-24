// Este arquivo implementa o CRUD da tabela ruas, fornecendo funções assíncronas para listar, buscar por id, inserir, atualizar e excluir registros no banco de dados. 

const { banco } = require("./database"); // Chamando o banco

const GetAll = async () => {
  const querytext = "SELECT * FROM ruas"; 

  const [rows] = await banco.query(querytext); //Manda a queryText pro banco
  return rows; // Retorna só os dados
};

const GetById = async (id) => {
  const querySelect = 'SELECT * FROM ruas';
  const queryWhere = ' WHERE idrua = ?';

  querytext = querySelect + queryWhere;

  const [rows] = await banco.query(querytext, [id]); //Manda a queryText pro banco
  return rows; // Retorna só os dados
};

const Post = async (rua, fk_idbairro) => {
  const querySelect = 'INSERT INTO ruas(rua, fk_idbairro)';
  const queryValues = ' VALUES (?, ?)';

  querytext = querySelect + queryValues;

  const [result] = await banco.query(querytext, [rua, fk_idbairro]); //Manda a queryText pro banco
  return { id: result.insertId, rua, fk_idbairro }; // Retorna o novo registro criado
};

const Put = async (id, rua, fk_idbairro) => {
  const querySelect = 'UPDATE ruas SET rua = ?, fk_idbairro = ?';
  const queryWhere = ' WHERE idrua = ?';

  querytext = querySelect + queryWhere;

  const [result] = await banco.query(querytext, [rua, fk_idbairro, id]); //Manda a queryText pro banco
  return { id, rua, fk_idbairro, linhasAfetadas: result.affectedRows }; // Retorna o registro alterado
};

const Erase = async (id) => {
  const querySelect = 'DELETE FROM ruas';
  const queryWhere = ' WHERE idrua = ?';

  querytext = querySelect + queryWhere;

  const [rows] = await banco.query(querytext, [id]); //Manda a queryText pro banco
  return rows; // Retorna só os dados
};

module.exports = { GetAll, GetById, Post, Put, Erase };