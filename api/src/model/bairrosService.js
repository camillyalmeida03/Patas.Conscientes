const express = require("express");

const { banco } = require("./database");

const GetAll = async (request, response) => {
  try {
    const querySelect =
      "SELECT bairros.id, bairros.nome, bairros.cidade_id, cidades.id, cidades.nome FROM bairros INNER JOIN cidades ON (cidades.id = bairros.cidade_id) ";

    const queryOrderBy = "ORDER BY bairros.nome";

    const queryText = querySelect + queryOrderBy;

    const [rows] = await banco.query(queryText);

    response.status(200).send(rows);
  } catch (error) {
    console.error("Erro ao listar bairros:", error.message);
    response.status(500).send({ message: "Falha ao listar os bairros." });
  }
};

const GetById = async (request, response) => {
  try {
    const id = request.params.id;

    const querySelect =
      "SELECT bairros.id, bairros.nome, bairros.cidade_id, cidades.id, cidades.nome FROM bairros INNER JOIN cidades ON (cidades.id = bairros.cidade_id) ";

    const queryWhere = "WHERE bairros.id = ? ";

    const queryOrderBy = "ORDER BY bairros.nome";

    const queryText = querySelect + queryWhere + queryOrderBy;

    const [rows] = await banco.query(queryText, [id]);

    // Se não obter nenhum resultado
    if (rows.length === 0) {
      return response.status(404).send({ message: "Bairro não encontrado." });
    }

    response.status(200).send(rows[0]);
  } catch (error) {
    console.error("Erro ao buscar bairro por ID:", error.message);
    response.status(500).send({ message: "Falha ao buscar o bairro." });
  }
};

const Erase = async (request, response) => {
  try {
    const id = request.params.id;

    const queryDeleteFrom = "DELETE FROM bairros ";

    const queryWhere = "WHERE id=?";

    const queryText = queryDeleteFrom + queryWhere;

    const [result] = await banco.query(queryText, [id]);

    if (result.affectedRows === 0) {
      return response
        .status(404)
        .send({ message: "Bairro não encontrado para exclusão." });
    }

    response.status(200).send({ message: "Bairro excluído com sucesso!" });
  } catch (error) {
    console.error("Erro ao excluir bairro:", error.message);
    response.status(500).send({ message: "Falha ao excluir o bairro." });
  }
};

const Create = async (request, response) => {
  try {
    const { nome, cidade_id } = request.body;

    const queryInsert = "INSERT INTO bairros ";
    const queryParams = "(nome, cidade_id) ";
    const queryValues = "VALUES (?, ?)";

    const queryText = queryInsert + queryParams + queryValues;

    const result = await banco.query(queryText, [nome, cidade_id]);

    const insertId = result[0].insertId;

    const querySelect =
      "SELECT bairros.id, bairros.nome, bairros.cidade_id, cidades.id, cidades.nome FROM bairros INNER JOIN cidades ON (cidades.id = bairros.cidade_id) ";

    const queryWhere = "WHERE bairros.id = ? ";

    const queryBasic = querySelect + queryWhere;

    const [data] = await banco.query(queryBasic, [insertId]);

    response.status(201).send(data);
  } catch (error) {
    console.log("Erro ao conectar ao banco de dados: ", error.message);

    response.status(500).send({ message: "Falha ao cadastrar o bairro!" });
  }
};

const Update = async (request, response) => {
  try {
    const id = request.params.id;
    const { nome, cidade_id } = request.body;

    const queryUpdate = "UPDATE bairros ";

    const querySet = "SET nome=?, cidade_id=? ";

    const queryWhere = "WHERE id=?";

    const queryText = queryUpdate + querySet + queryWhere;

    const data = await banco.query(queryText, [nome, cidade_id, id]);

    response.status(201).send(data[0]);
  } catch (error) {
    console.error("Erro ao atualizar bairro:", error.message);
    response.status(500).send({ message: "Falha ao atualizar o bairro." });
  }
};

module.exports = { GetAll, GetById, Erase, Create, Update };
