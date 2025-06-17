const express = require("express");

const { banco } = require("./database");

const GetAll = async (request, response) => {
  try {
    const querySelect =
      "SELECT cidades.id, cidades.nome, cidades.uf_id, uf.nome, uf.sigla FROM cidades INNER JOIN uf ON (cidades.uf_id = uf.id)";

    const queryOrderBy = "ORDER BY cidades.nome";

    querytext = querySelect + queryOrderBy;

    const data = await banco.query(querytext);

    response.status(201).send(data[0]);
  } catch (error) {
    console.error("Erro ao conectar ao banco de dados:", error.message);

    response.status(401).send({ message: "Falha ao encontrar cidades!" });
  }
};

const GetById = async (request, response) => {
  try {
    const id = request.params.id;

    const querySelect =
      "SELECT cidades.id, cidades.nome, cidades.uf_id, uf.nome, uf.sigla FROM cidades INNER JOIN uf ON (cidades.uf_id = uf.id) ";

    const queryWhere = "WHERE cidades.id = ? ";

    const queryOrderBy = "ORDER BY cidades.nome";

    querytext = querySelect + queryWhere + queryOrderBy;

    const data = await banco.query(querytext, [id]);

    response.status(201).send(data[0]);
  } catch (error) {
    console.error("Erro ao conectar ao banco de dados:", error.message);

    response.status(401).send({ message: "Falha ao executar encontrar cidade pelo ID!" });
  }
};

const Erase = async (request, response) => {
  try {
    const id = request.params.id;

    const queryDeleteFrom = "DELETE FROM cidades ";

    const queryWhere = "WHERE id=?";

    queryText = queryDeleteFrom + queryWhere;

    const data = await banco.query(queryText, [id]);

    response.status(200).send(data[0]);
  } catch (error) {
    console.log("Erro ao conectar ao banco de dados: ", error.message);

    response.status(401).send({ message: "Falha ao excluir cidade pelo ID!" });
  }
};

const Create = async (request, response) => {
  try {
    const { nome, uf_id } = request.body;

    const queryInsert = "INSERT INTO cidades ";
    const queryParams = "(nome, uf_id) ";
    const queryValues = "VALUES (?, ?)";
     
    const queryText = queryInsert + queryParams + queryValues;

    const data = await banco.query(queryText, [nome, uf_id]);

    response.status(201).send(data[0]);
  } catch (error) {
    console.log("Erro ao conectar ao banco de dados: ", error.message);
    response.status(500).send({ message: "Falha ao cadastrar ao cidade!" });
  }
};

const Update = async (request, response) => {
  try {
    const id = request.params.id;
    const { nome, uf_id } = request.body;

    const queryUpdate = "UPDATE cidades ";

    const querySet = "SET nome=?, uf_id=? ";

    const queryWhere = "WHERE id=?";

    const queryText = queryUpdate + querySet + queryWhere;

    const data = await banco.query(queryText, [nome, uf_id, id]);

    response.status(201).send(data[0]);
  } catch (error) {
    console.log("Erro ao atualizar o usuário: ", error.message);
    response.status(401).send({ message: "Falha ao atualizar dados da cidade!" });
  }
};

module.exports = { GetAll, GetById, Erase, Create, Update };
