const express = require("express");

const { banco } = require("./database");

const GetAll = async (request, response) => {
  try {
    const querytext =
      "SELECT * FROM uf ";

    const data = await banco.query(querytext);

    response.status(201).send(data[0]);
  } catch (error) {
    console.error("Erro ao conectar ao banco de dados:", error.message);

    response.status(401).send({ message: "Falha ao encontrar estados!" });
  }
};

const GetById = async (request, response) => {
  try {
    const id = request.params.id;

    const querySelect =
      "SELECT * from uf ";

    const queryWhere = "WHERE id_uf=? ";

    querytext = querySelect + queryWhere;

    const data = await banco.query(querytext, [id]);

    response.status(201).send(data[0]);
  } catch (error) {
    console.error("Erro ao conectar ao banco de dados:", error.message);

    response.status(401).send({ message: "Falha ao encontrar estado pelo ID!" });
  }
};

const Erase = async (request, response) => {
  try {
    const id = request.params.id;

    const queryDeleteFrom = "DELETE FROM uf ";

    const queryWhere = "WHERE id_uf=?";

    const queryText = queryDeleteFrom + queryWhere;

    const data = await banco.query(queryText, [id]);

    response.status(200).send(data[0]);
  } catch (error) {
    console.log("Erro ao conectar ao banco de dados: ", error.message);

    response.status(401).send({ message: "Falha ao excluir uf pelo ID!" });
  }
};

const Create = async (request, response) => {
  try {
    const { estado, sigla } = request.body;

    const queryInsert = "INSERT INTO uf ";
    const queryParams = "(estado, sigla) ";
    const queryValues = "VALUES (?, ?)";
     
    const queryText = queryInsert + queryParams + queryValues;

    const data = await banco.query(queryText, [estado, sigla]);

    response.status(201).send(data[0]);
  } catch (error) {
    console.log("Erro ao conectar ao banco de dados: ", error.message);
    response.status(500).send({ message: "Falha ao cadastrar estado!" });
  }
};

const Update = async (request, response) => {
  try {
    const id = request.params.id;
    const { estado, sigla } = request.body;

    const queryUpdate = "UPDATE uf ";

    const querySet = "SET estado=?, sigla=? ";

    const queryWhere = "WHERE id_uf=?";

    const queryText = queryUpdate + querySet + queryWhere;

    const data = await banco.query(queryText, [estado, sigla, id]);

    response.status(201).send(data[0]);
  } catch (error) {
    console.log("Erro ao atualizar a cidade: ", error.message);
    response.status(401).send({ message: "Falha ao atualizar dados do uf!" });
  }
};

module.exports = { GetAll, GetById, Erase, Create, Update };
