// Este arquivo implementa o CRUD da tabela sexo, fornecendo funções assíncronas para listar, buscar por id, inserir, atualizar e excluir registros no banco de dados. 

const { banco } = require("./database"); // Chamando o banco

const GetAll = async () => {
  const querytext = "SELECT * FROM sexo"; 

  const [rows] = await banco.query(querytext); //Manda a queryText pro banco
  return rows; // Retorna só os dados
};

const GetById = async (id) => {
  const querySelect = 'SELECT * FROM sexo';
  const queryWhere = ' WHERE idsexo = ?';

  querytext = querySelect + queryWhere;

  const [rows] = await banco.query(querytext, [id]); //Manda a queryText pro banco
  return rows; // Retorna só os dados
};

const Post = async (sexo) => {
  const querySelect = 'INSERT INTO sexo(sexo)';
  const queryValues = ' VALUES (?)';

  querytext = querySelect + queryValues;

  const [result] = await banco.query(querytext, [sexo]); //Manda a queryText pro banco
  return { id: result.insertId, sexo }; // Retorna o novo registro criado
};

const Put = async (id, sexo) => {
  const querySelect = 'UPDATE sexo SET sexo = ?';
  const queryWhere = ' WHERE idsexo = ?';

  querytext = querySelect + queryWhere;

  const [result] = await banco.query(querytext, [sexo, id]); //Manda a queryText pro banco
  return { id, sexo, linhasAfetadas: result.affectedRows }; // Retorna o registro alterado
};

const Erase = async (id) => {
  const querySelect = 'DELETE FROM sexo';
  const queryWhere = ' WHERE idsexo = ?';

  querytext = querySelect + queryWhere;

  const [rows] = await banco.query(querytext, [id]); //Manda a queryText pro banco
  return rows; // Retorna só os dados
};

module.exports = { GetAll, GetById, Post, Put, Erase };