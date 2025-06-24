const express = require("express");

const { banco } = require("./database");

const GetAll = async (request, response) => {
  try {
    const querytext = "SELECT * FROM sexos_pets ";

    const data = await banco.query(querytext);

    response.status(201).send(data[0]);
  } catch (error) {
    console.error("Erro ao conectar ao banco de dados:", error.message);

    response.status(401).send({ message: "Falha ao encontrar sexos dos pets!" });
  }
};

const GetById = async (request, response) => {
  try {
    const id = request.params.id;

    const querySelect = "SELECT * FROM sexos_pets ";

    const queryWhere = "WHERE id_sexo_pet=? ";

    const querytext = querySelect + queryWhere;

    const data = await banco.query(querytext, [id]);

    response.status(201).send(data[0]);
  } catch (error) {
    console.error("Erro ao conectar ao banco de dados:", error.message);

    response.status(401).send({
      message: "Falha ao executar encontrar sexo do pet pelo id!",
    });
  }
};

const Erase = async (request, response) => {
  try {
    const id = request.params.id;

    const queryDeleteFrom = "DELETE FROM sexos_pets ";

    const queryWhere = "WHERE id_sexo_pet=?";

    const queryText = queryDeleteFrom + queryWhere;

    const data = await banco.query(queryText, [id]);

    response.status(200).send(data[0]);
  } catch (error) {
    console.log("Erro ao conectar ao banco de dados: ", error.message);

    response.status(401).send({ message: "Falha ao excluir sexo do pet pelo id" });
  }
};

const Create = async (request, response) => {
  try {
    const { sexo_pet } = request.body;

    const queryInsert = "INSERT INTO sexos_pets ";
    const queryParams = "(sexo_pet) ";
    const queryValues = "VALUES (?)";

    const queryText = queryInsert + queryParams + queryValues;

    const data = await banco.query(queryText, [sexo_pet]);

    response.status(201).send(data[0]);
  } catch (error) {
    console.log("Erro ao conectar ao banco de dados: ", error.message);
    response.status(500).send({ message: "Falha ao cadastrar sexo!" });
  }
};

const Update = async (request, response) => {
  try {
    const id = request.params.id;
    const { sexo_pet } = request.body;

    const queryUpdate = "UPDATE sexos_pets ";

    const querySet = "SET sexo_pet=? ";

    const queryWhere = "WHERE id_sexo_pet=?";

    const queryText = queryUpdate + querySet + queryWhere;

    const data = await banco.query(queryText, [sexo_pet, id]);

    response.status(201).send(data[0]);
  } catch (error) {
    console.log("Erro ao atualizar sexo: ", error.message);
    response
      .status(401)
      .send({ message: "Falha ao atualizar dados do sexo!" });
  }
};

module.exports = { GetAll, GetById, Erase, Create, Update };
