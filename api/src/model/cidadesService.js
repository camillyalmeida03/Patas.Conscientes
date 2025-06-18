const express = require("express");

const { banco } = require("./database");

const GetAll = async (request, response) => {
  try {
    const querySelect =
      "SELECT cidades.id_cidade, cidades.cidade, cidades.id_uf_fk, cidades.cidade, uf.sigla FROM cidades INNER JOIN uf ON (cidades.id_uf_fk = uf.id_uf) ";

    const queryOrderBy = "ORDER BY cidades.cidade";

    const querytext = querySelect + queryOrderBy;

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
      "SELECT cidades.id_cidade, cidades.cidade, cidades.id_uf_fk, cidades.cidade, uf.sigla FROM cidades INNER JOIN uf ON (cidades.id_uf_fk = uf.id_uf) ";

    const queryWhere = "WHERE cidades.id_cidade = ? ";

    const queryOrderBy = "ORDER BY cidades.cidade";

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

    const queryWhere = "WHERE id_cidade=?";

    const queryText = queryDeleteFrom + queryWhere;

    const data = await banco.query(queryText, [id]);

    response.status(200).send(data[0]);
  } catch (error) {
    console.log("Erro ao conectar ao banco de dados: ", error.message);

    response.status(401).send({ message: "Falha ao excluir cidade pelo ID!" });
  }
};

const Create = async (request, response) => {
  try {
    const { cidade, id_uf_fk } = request.body;

    const queryInsert = "INSERT INTO cidades ";
    const queryParams = "(cidade, id_uf_fk) ";
    const queryValues = "VALUES (?, ?)";
     
    const queryText = queryInsert + queryParams + queryValues;

    const data = await banco.query(queryText, [cidade, id_uf_fk]);

    response.status(201).send(data[0]);
  } catch (error) {
    console.log("Erro ao conectar ao banco de dados: ", error.message);
    response.status(500).send({ message: "Falha ao cadastrar cidade!" });
  }
};

const Update = async (request, response) => {
  try {
    const id = request.params.id;
    const { cidade, id_uf_fk } = request.body;

    const queryUpdate = "UPDATE cidades ";

    const querySet = "SET cidade=?, id_uf_fk=? ";

    const queryWhere = "WHERE id_cidade=?";

    const queryText = queryUpdate + querySet + queryWhere;

    const data = await banco.query(queryText, [cidade, id_uf_fk, id]);

    response.status(201).send(data[0]);
  } catch (error) {
    console.log("Erro ao atualizar a cidade: ", error.message);
    response.status(401).send({ message: "Falha ao atualizar dados da cidade!" });
  }
};

module.exports = { GetAll, GetById, Erase, Create, Update };
