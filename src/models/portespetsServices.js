// Este arquivo implementa o CRUD da tabela portespet, fornecendo funções assíncronas para listar, buscar por id, inserir, atualizar e excluir registros no banco de dados. 

const { banco } = require("./database"); // Chamando o banco

const GetAll = async () => {
  const querytext = "SELECT * FROM portespet"; 

  const [rows] = await banco.query(querytext); //Manda a queryText pro banco
  return rows; // Retorna só os dados
};

const GetById = async (id) => {
  const querySelect = 'SELECT * FROM portespet';
  const queryWhere = ' WHERE idportepet = ?';

  querytext = querySelect + queryWhere;

  const [rows] = await banco.query(querytext, [id]); //Manda a queryText pro banco
  return rows; // Retorna só os dados
};

const Post = async (porte) => {
  const querySelect = 'INSERT INTO portespet(porte)';
  const queryValues = ' VALUES (?)';

  querytext = querySelect + queryValues;

  const [result] = await banco.query(querytext, [porte]); //Manda a queryText pro banco
  return { id: result.insertId, porte }; // Retorna o novo registro criado
};

const Put = async (id, porte) => {
  const querySelect = 'UPDATE portespet SET porte = ?';
  const queryWhere = ' WHERE idportepet = ?';

  querytext = querySelect + queryWhere;

  const [result] = await banco.query(querytext, [porte, id]); //Manda a queryText pro banco
  return { id, porte, linhasAfetadas: result.affectedRows }; // Retorna o registro alterado
};

const Erase = async (id) => {
  const querySelect = 'DELETE FROM portespet';
  const queryWhere = ' WHERE idportepet = ?';

  querytext = querySelect + queryWhere;

  const [rows] = await banco.query(querytext, [id]); //Manda a queryText pro banco
  return rows; // Retorna só os dados
};

module.exports = { GetAll, GetById, Post, Put, Erase };