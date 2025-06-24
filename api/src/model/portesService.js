const express = require("express");

const { banco } = require("./database");

const GetAll = async (request, response) => {
  try {
    const querytext = "SELECT * FROM portes_pets ";

    const data = await banco.query(querytext);

    response.status(201).send(data[0]);
  } catch (error) {
    console.error("Erro ao conectar ao banco de dados:", error.message);

    response.status(401).send({ message: "Falha ao encontrar portes dos pets!" });
  }
};

const GetById = async (request, response) => {
  try {
    const id = request.params.id;

    const querySelect = "SELECT * FROM portes_pets ";

    const queryWhere = "WHERE id_porte_pet=? ";

    const querytext = querySelect + queryWhere;

    const data = await banco.query(querytext, [id]);

    response.status(201).send(data[0]);
  } catch (error) {
    console.error("Erro ao conectar ao banco de dados:", error.message);

    response.status(401).send({
      message: "Falha ao executar encontrar porte do pet pelo id!",
    });
  }
};

const Erase = async (request, response) => {
  try {
    const id = request.params.id;

    const queryDeleteFrom = "DELETE FROM portes_pets ";

    const queryWhere = "WHERE id_porte_pet=?";

    const queryText = queryDeleteFrom + queryWhere;

    const data = await banco.query(queryText, [id]);

    response.status(200).send(data[0]);
  } catch (error) {
    console.log("Erro ao conectar ao banco de dados: ", error.message);

    response.status(401).send({ message: "Falha ao excluir porte do pet pelo id" });
  }
};

const Create = async (request, response) => {
  try {
    const { porte_pet } = request.body;

    const queryInsert = "INSERT INTO portes_pets ";
    const queryParams = "(porte_pet) ";
    const queryValues = "VALUES (?)";

    const queryText = queryInsert + queryParams + queryValues;

    const data = await banco.query(queryText, [porte_pet]);

    response.status(201).send(data[0]);
  } catch (error) {
    console.log("Erro ao conectar ao banco de dados: ", error.message);
    response.status(500).send({ message: "Falha ao cadastrar porte!" });
  }
};

const Update = async (request, response) => {
  try {
    const id = request.params.id;
    const { porte_pet } = request.body;

    const queryUpdate = "UPDATE portes_pets ";

    const querySet = "SET porte_pet=? ";

    const queryWhere = "WHERE id_porte_pet=?";

    const queryText = queryUpdate + querySet + queryWhere;

    const data = await banco.query(queryText, [porte_pet, id]);

    response.status(201).send(data[0]);
  } catch (error) {
    console.log("Erro ao atualizar porte: ", error.message);
    response
      .status(401)
      .send({ message: "Falha ao atualizar dados do porte!" });
  }
};

module.exports = { GetAll, GetById, Erase, Create, Update };
