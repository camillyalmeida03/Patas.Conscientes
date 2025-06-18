const express = require("express");

const { banco } = require("./database");

const GetAll = async (request, response) => {
  try {
    const querySelect =
      "SELECT bairros.id_bairro, bairros.bairro, bairros.id_cidade_fk, cidades.cidade FROM bairros INNER JOIN cidades ON (cidades.id_cidade = bairros.id_cidade_fk) ";

    const queryOrderBy = "ORDER BY bairros.bairro";

    const queryText = querySelect + queryOrderBy;

    const [data] = await banco.query(queryText);

    response.status(200).send(data);
  } catch (error) {
    console.error("Erro ao listar bairros:", error.message);
    response.status(500).send({ message: "Falha ao listar os bairros." });
  }
};

const GetById = async (request, response) => {
  try {
    const id = request.params.id;

    const querySelect =
      "SELECT bairros.id_bairro, bairros.bairro, bairros.id_cidade_fk, cidades.cidade FROM bairros INNER JOIN cidades ON (cidades.id_cidade = bairros.id_cidade_fk)  ";

    const queryWhere = "WHERE bairros.id_bairro = ? ";

    const queryOrderBy = "ORDER BY bairros.bairro";

    const queryText = querySelect + queryWhere + queryOrderBy;

    const [data] = await banco.query(queryText, [id]);

    response.status(200).send(data[0]);
  } catch (error) {
    console.error("Erro ao buscar bairro por ID:", error.message);
    response.status(500).send({ message: "Falha ao buscar o bairro." });
  }
};

const Erase = async (request, response) => {
  try {
    const id = request.params.id;

    const queryDeleteFrom = "DELETE FROM bairros ";

    const queryWhere = "WHERE id_bairro=?";

    const queryText = queryDeleteFrom + queryWhere;

    const data = await banco.query(queryText, [id]);

    response.status(200).send(data[0]);
  } catch (error) {
    console.error("Erro ao excluir bairro:", error.message);
    response.status(500).send({ message: "Falha ao excluir o bairro." });
  }
};

const Create = async (request, response) => {
  try {
    const { bairro, id_cidade_fk } = request.body;

    const queryInsert = "INSERT INTO bairros ";
    const queryParams = "(bairro, id_cidade_fk) ";
    const queryValues = "VALUES (?, ?)";

    const queryText = queryInsert + queryParams + queryValues;

    const data = await banco.query(queryText, [bairro, id_cidade_fk]);

    response.status(201).send(data[0]);
  } catch (error) {
    console.log("Erro ao conectar ao banco de dados: ", error.message);

    response.status(500).send({ message: "Falha ao cadastrar o bairro!" });
  }
};

const Update = async (request, response) => {
  try {
    const id = request.params.id;
    const { bairro, id_cidade_fk } = request.body;

    const queryUpdate = "UPDATE bairros ";

    const querySet = "SET bairro=?, id_cidade_fk=? ";

    const queryWhere = "WHERE id_bairro=?";

    const queryText = queryUpdate + querySet + queryWhere;

    const data = await banco.query(queryText, [bairro, id_cidade_fk, id]);

    response.status(201).send(data[0]);
  } catch (error) {
    console.error("Erro ao atualizar bairro:", error.message);
    response.status(500).send({ message: "Falha ao atualizar o bairro." });
  }
};

module.exports = { GetAll, GetById, Erase, Create, Update };
