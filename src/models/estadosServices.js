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
  // 1 - Verifica se já existe a sigla ou o nome do estado
  const queryCheck = "SELECT idestado FROM estados WHERE sigla = ? OR estado = ?";
  const [rows] = await banco.query(queryCheck, [sigla, estado]);

  if (rows.length > 0) {
    return {
      message: "Estado ou sigla já cadastrado!",
      id: rows[0].idestado,
      sigla,
      estado
    };
  }

  // 2 - Se não existe → insere normalmente
  const queryInsert = "INSERT INTO estados(sigla, estado) VALUES (?, ?)";
  const [result] = await banco.query(queryInsert, [sigla, estado]);

  return { id: result.insertId, sigla, estado };
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