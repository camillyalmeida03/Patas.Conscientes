// Este arquivo implementa o CRUD da tabela estados, fornecendo funções assíncronas para listar, buscar por id, inserir, atualizar e excluir registros no banco de dados. 

const { banco } = require("./database"); // Chamando o banco

const GetAll = async () => {
  const querytext = "SELECT * FROM estados"; 

  const [rows] = await banco.query(querytext); //Manda a queryText pro banco
  return rows; // Retorna só os dados
};

const GetById = async (id) => {
  const querySelect = 'SELECT * FROM estados';
  const queryWhere = ' WHERE idestado = ?';

  querytext = querySelect + queryWhere;

  const [rows] = await banco.query(querytext, [id]); //Manda a queryText pro banco
  return rows; // Retorna só os dados
};

const Post = async (sigla, estado) => {
  const querySelect = 'INSERT INTO estados(sigla, estado)';
  const queryValues = ' VALUES (?, ?)';

  querytext = querySelect + queryValues;

  const [result] = await banco.query(querytext, [sigla, estado]); //Manda a queryText pro banco
  return { id: result.insertId, sigla, estado }; // Retorna o novo registro criado
};

const Put = async (id, sigla, estado) => {
  const querySelect = 'UPDATE estados SET sigla = ?, estado = ?';
  const queryWhere = ' WHERE idestado = ?';

  querytext = querySelect + queryWhere;

  const [result] = await banco.query(querytext, [sigla, estado, id]); //Manda a queryText pro banco
  return { id, sigla, estado, linhasAfetadas: result.affectedRows }; // Retorna o registro alterado
};

const Erase = async (id) => {
  const querySelect = 'DELETE FROM estados';
  const queryWhere = ' WHERE idestado = ?';

  querytext = querySelect + queryWhere;

  const [rows] = await banco.query(querytext, [id]); //Manda a queryText pro banco
  return rows; // Retorna só os dados
};

module.exports = { GetAll, GetById, Post, Put, Erase };