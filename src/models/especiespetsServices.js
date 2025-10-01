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
  // 1 - Verifica se a espécie já existe
  const queryCheck = "SELECT idespeciepet FROM especiespet WHERE especie = ?";
  const [rows] = await banco.query(queryCheck, [especie]);

  if (rows.length > 0) {
    // Já existe → retorna o registro existente
    return {
      message: "Espécie já cadastrada!",
      id: rows[0].idespeciepet,
      especie
    };
  }

  // 2 - Se não existe → insere normalmente
  const queryInsert = "INSERT INTO especiespet(especie) VALUES (?)";
  const [result] = await banco.query(queryInsert, [especie]);

  return { id: result.insertId, especie };
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