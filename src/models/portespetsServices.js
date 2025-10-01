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
  // 1 - Verifica se já existe um porte com esse nome
  const queryCheck = 'SELECT idportepet FROM portespet WHERE porte = ?';
  const [rows] = await banco.query(queryCheck, [porte]);

  if (rows.length > 0) {
    return {
      message: "Este porte já está cadastrado!",
      id: rows[0].idportepet,
      porte
    };
  }

  // 2 - Se não existe → insere
  const queryInsert = 'INSERT INTO portespet(porte) VALUES (?)';
  const [result] = await banco.query(queryInsert, [porte]);

  return { id: result.insertId, porte };
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