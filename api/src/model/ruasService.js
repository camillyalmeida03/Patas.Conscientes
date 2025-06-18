const express = require("express");

const { banco } = require("./database");

const GetAll = async (request, response) => {
  try {
    const querySelect =
      "SELECT ruas.id_rua, ruas.rua, ruas.id_bairro_fk, bairros.bairro FROM ruas INNER JOIN bairros ON (ruas.id_bairro_fk = bairros.id_bairro) ";

    const queryOrderBy = "ORDER BY ruas.rua";

    const querytext = querySelect + queryOrderBy;

    const data = await banco.query(querytext);

    response.status(201).send(data[0]);
  } catch (error) {
    console.error("Erro ao conectar ao banco de dados:", error.message);

    response.status(401).send({ message: "Falha ao encontrar ruas!" });
  }
};

const GetById = async (request, response) => {
  try {
    const id = request.params.id;

    const querySelect =
      "SELECT ruas.id_rua, ruas.rua, ruas.id_bairro_fk, bairros.bairro FROM ruas INNER JOIN bairros ON (ruas.id_bairro_fk = bairros.id_bairro) ";

    const queryWhere = "WHERE ruas.id_rua = ? ";

    querytext = querySelect + queryWhere;

    const data = await banco.query(querytext, [id]);

    response.status(201).send(data[0]);
  } catch (error) {
    console.error("Erro ao conectar ao banco de dados:", error.message);

    response.status(401).send({ message: "Falha ao executar encontrar rua pelo ID!" });
  }
};

const Erase = async (request, response) => {
  try {
    const id = request.params.id;

    const queryDeleteFrom = "DELETE FROM ruas ";

    const queryWhere = "WHERE id_rua=?";

    const queryText = queryDeleteFrom + queryWhere;

    const data = await banco.query(queryText, [id]);

    response.status(200).send(data[0]);
  } catch (error) {
    console.log("Erro ao conectar ao banco de dados: ", error.message);

    response.status(401).send({ message: "Falha ao excluir rua pelo ID!" });
  }
};

const Create = async (request, response) => {
  try {
    const { rua, id_bairro_fk } = request.body;

    const queryInsert = "INSERT INTO ruas ";
    const queryParams = "(rua, id_bairro_fk) ";
    const queryValues = "VALUES (?, ?)";
     
    const queryText = queryInsert + queryParams + queryValues;

    const data = await banco.query(queryText, [rua, id_bairro_fk]);

    response.status(201).send(data[0]);
  } catch (error) {
    console.log("Erro ao conectar ao banco de dados: ", error.message);
    response.status(500).send({ message: "Falha ao cadastrar rua!" });
  }
};

const Update = async (request, response) => {
  try {
    const id = request.params.id;
    const { rua, id_bairro_fk } = request.body;

    const queryUpdate = "UPDATE ruas ";

    const querySet = "SET rua=?, id_bairro_fk=? ";

    const queryWhere = "WHERE id_rua=?";

    const queryText = queryUpdate + querySet + queryWhere;

    const data = await banco.query(queryText, [rua, id_bairro_fk, id]);

    response.status(201).send(data[0]);
  } catch (error) {
    console.log("Erro ao atualizar a cidade: ", error.message);
    response.status(401).send({ message: "Falha ao atualizar dados da rua!" });
  }
};

module.exports = { GetAll, GetById, Erase, Create, Update };
