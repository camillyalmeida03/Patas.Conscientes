// Este arquivo implementa o CRUD da tabela especiespets, fornecendo funções assíncronas para listar, buscar por id, inserir, atualizar e excluir registros no banco de dados. 

const { banco } = require("./database"); // Chamando o banco

const GetAll = async () => {
  const querytext = "SELECT * FROM especiespet"; 

  const [rows] = await banco.query(querytext); //Manda a queryText pro banco
  return rows; // Retorna só os dados
};

const GetById = async (id) => {
  const querySelect = 'SELECT * FROM especiespet';
  const queryWhere = ' WHERE idespeciepet = ?';

  querytext = querySelect + queryWhere;

  const [rows] = await banco.query(querytext, [id]); //Manda a queryText pro banco
  return rows; // Retorna só os dados
};

const Post = async (especie) => {
  const querySelect = 'INSERT INTO especiespet(especie)';
  const queryValues = ' VALUES (?)';

  querytext = querySelect + queryValues;

  const [result] = await banco.query(querytext, [especie]); //Manda a queryText pro banco
  return { id: result.insertId, especie }; // Retorna o novo registro criado
};

const Put = async (id, especie) => {
  const querySelect = 'UPDATE especiespet SET especie = ?';
  const queryWhere = ' WHERE idespeciepet = ?';

  querytext = querySelect + queryWhere;

  const [result] = await banco.query(querytext, [especie, id]); //Manda a queryText pro banco
  return { id, especie, linhasAfetadas: result.affectedRows }; // Retorna o registro alterado
};

const Erase = async (id) => {
  const querySelect = 'DELETE FROM especiespet';
  const queryWhere = ' WHERE idespeciepet = ?';

  querytext = querySelect + queryWhere;

  const [rows] = await banco.query(querytext, [id]); //Manda a queryText pro banco
  return rows; // Retorna só os dados
};

module.exports = { GetAll, GetById, Post, Put, Erase };