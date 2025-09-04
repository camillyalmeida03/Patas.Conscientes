// Este arquivo implementa o CRUD da tabela sexospet, fornecendo funções assíncronas para listar, buscar por id, inserir, atualizar e excluir registros no banco de dados. 

const { banco } = require("./database"); // Chamando o banco

const GetAll = async () => {
  const querytext = "SELECT * FROM sexospet"; 

  const [rows] = await banco.query(querytext); //Manda a queryText pro banco
  return rows; // Retorna só os dados
};

const GetById = async (id) => {
  const querySelect = 'SELECT * FROM sexospet';
  const queryWhere = ' WHERE idsexopet = ?';

  querytext = querySelect + queryWhere;

  const [rows] = await banco.query(querytext, [id]); //Manda a queryText pro banco
  return rows; // Retorna só os dados
};

const Post = async (sexopet) => {
  const querySelect = 'INSERT INTO sexospet(sexopet)';
  const queryValues = ' VALUES (?)';

  querytext = querySelect + queryValues;

  const [result] = await banco.query(querytext, [sexopet]); //Manda a queryText pro banco
  return { id: result.insertId, sexopet }; // Retorna o novo registro criado
};

const Put = async (id, sexopet) => {
  const querySelect = 'UPDATE sexospet SET sexopet = ?';
  const queryWhere = ' WHERE idsexopet = ?';

  querytext = querySelect + queryWhere;

  const [result] = await banco.query(querytext, [sexopet, id]); //Manda a queryText pro banco
  return { id, sexopet, linhasAfetadas: result.affectedRows }; // Retorna o registro alterado
};

const Erase = async (id) => {
  const querySelect = 'DELETE FROM sexospet';
  const queryWhere = ' WHERE idsexopet = ?';

  querytext = querySelect + queryWhere;

  const [rows] = await banco.query(querytext, [id]); //Manda a queryText pro banco
  return rows; // Retorna só os dados
};

module.exports = { GetAll, GetById, Post, Put, Erase };