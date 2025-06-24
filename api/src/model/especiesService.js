const express = require("express");

const { banco } = require("./database");

const GetAll = async (request, response) => {
  try {
    const querytext = "SELECT * FROM especies_pets ";

    const data = await banco.query(querytext);

    response.status(201).send(data[0]);
  } catch (error) {
    console.error("Erro ao conectar ao banco de dados:", error.message);

    response.status(401).send({ message: "Falha ao encontrar espécies!" });
  }
};

const GetById = async (request, response) => {
  try {
    const id = request.params.id;

    const querySelect = "SELECT * FROM especies_pets ";

    const queryWhere = "WHERE id_especie_pet=? ";

    const querytext = querySelect + queryWhere;

    const data = await banco.query(querytext, [id]);

    response.status(201).send(data[0]);
  } catch (error) {
    console.error("Erro ao conectar ao banco de dados:", error.message);

    response.status(401).send({
      message: "Falha ao executar encontrar espécie pelo id!",
    });
  }
};

const Erase = async (request, response) => {
  try {
    const id = request.params.id;

    const queryDeleteFrom = "DELETE FROM especies_pets ";

    const queryWhere = "WHERE id_especie_pet=?";

    const queryText = queryDeleteFrom + queryWhere;

    const data = await banco.query(queryText, [id]);

    response.status(200).send(data[0]);
  } catch (error) {
    console.log("Erro ao conectar ao banco de dados: ", error.message);

    response.status(401).send({ message: "Falha ao excluir espécie pelo id" });
  }
};

const Create = async (request, response) => {
  try {
    const { especie } = request.body;

    const queryInsert = "INSERT INTO especies_pets ";
    const queryParams = "(especie) ";
    const queryValues = "VALUES (?)";

    const queryText = queryInsert + queryParams + queryValues;

    const data = await banco.query(queryText, [especie]);

    response.status(201).send(data[0]);
  } catch (error) {
    console.log("Erro ao conectar ao banco de dados: ", error.message);
    response.status(500).send({ message: "Falha ao cadastrar espécie!" });
  }
};

const Update = async (request, response) => {
  try {
    const id = request.params.id;
    const { especie } = request.body;

    const queryUpdate = "UPDATE especies_pets ";

    const querySet = "SET especie=? ";

    const queryWhere = "WHERE id_especie_pet=?";

    const queryText = queryUpdate + querySet + queryWhere;

    const data = await banco.query(queryText, [especie, id]);

    response.status(201).send(data[0]);
  } catch (error) {
    console.log("Erro ao atualizar a cidade: ", error.message);
    response
      .status(401)
      .send({ message: "Falha ao atualizar dados da espécie!" });
  }
};

module.exports = { GetAll, GetById, Erase, Create, Update };
