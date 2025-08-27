// Este arquivo implementa o CRUD da tabela tipos_usuario, fornecendo funções assíncronas para listar, buscar por id, inserir, atualizar e excluir registros no banco de dados. 

const { banco } = require("./database"); // Chamando o banco

const GetAll = async () => {
  const querytext = "SELECT * FROM tipos_usuario"; 

  const [rows] = await banco.query(querytext); //Manda a queryText pro banco
  return rows; // Retorna só os dados
};

const GetById = async (id) => {
  const querySelect = 'SELECT * FROM tipos_usuario ';
  const queryWhere = ' WHERE idtipo = ?';

  querytext = querySelect + queryWhere;

  const [rows] = await banco.query(querytext, [id]); //Manda a queryText pro banco
  return rows; // Retorna só os dados
};

const Post = async (tipo, descricao) => {
  const querySelect = 'INSERT INTO tipos_usuario(tipo, descricao)';
  const queryValues = ' VALUES (?, ?)';

  querytext = querySelect + queryValues;

  const [result] = await banco.query(querytext, [tipo, descricao]); //Manda a queryText pro banco
  return { id: result.insertId, tipo, descricao }; // Retorna o novo registro criado
};

const Put = async (id, tipo, descricao) => {
  const querySelect = 'UPDATE tipos_usuario SET tipo = ?, descricao = ?';
  const queryWhere = ' WHERE idtipo = ?';

  querytext = querySelect + queryWhere;

  const [result] = await banco.query(querytext, [tipo, descricao, id]); //Manda a queryText pro banco
  return { id, tipo, descricao, linhasAfetadas: result.affectedRows }; // Retorna o registro alterado
};

const Erase = async (id) => {
  const querySelect = 'DELETE FROM tipos_usuario';
  const queryWhere = ' WHERE idtipo = ?';

  querytext = querySelect + queryWhere;

  const [rows] = await banco.query(querytext, [id]); //Manda a queryText pro banco
  return rows; // Retorna só os dados
};

module.exports = { GetAll, GetById, Post, Put, Erase };