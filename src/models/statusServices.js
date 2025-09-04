// Este arquivo implementa o CRUD da tabela status, fornecendo funções assíncronas para listar, buscar por id, inserir, atualizar e excluir registros no banco de dados. 

const { banco } = require("./database"); // Chamando o banco

const GetAll = async () => {
  const querytext = "SELECT * FROM status"; 

  const [rows] = await banco.query(querytext); //Manda a queryText pro banco
  return rows; // Retorna só os dados
};

const GetById = async (id) => {
  const querySelect = 'SELECT * FROM status';
  const queryWhere = ' WHERE idstatus = ?';

  querytext = querySelect + queryWhere;

  const [rows] = await banco.query(querytext, [id]); //Manda a queryText pro banco
  return rows; // Retorna só os dados
};

const Post = async (status) => {
  const querySelect = 'INSERT INTO status(status)';
  const queryValues = ' VALUES (?)';

  querytext = querySelect + queryValues;

  const [result] = await banco.query(querytext, [status]); //Manda a queryText pro banco
  return { id: result.insertId, status }; // Retorna o novo registro criado
};

const Put = async (id, status) => {
  const querySelect = 'UPDATE status SET status = ?';
  const queryWhere = ' WHERE idstatus = ?';

  querytext = querySelect + queryWhere;

  const [result] = await banco.query(querytext, [status, id]); //Manda a queryText pro banco
  return { id, status, linhasAfetadas: result.affectedRows }; // Retorna o registro alterado
};

const Erase = async (id) => {
  const querySelect = 'DELETE FROM status';
  const queryWhere = ' WHERE idstatus = ?';

  querytext = querySelect + queryWhere;

  const [rows] = await banco.query(querytext, [id]); //Manda a queryText pro banco
  return rows; // Retorna só os dados
};

module.exports = { GetAll, GetById, Post, Put, Erase };