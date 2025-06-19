const express = require("express");

const { banco } = require("./database");

//SELECT re.id_responsavel, re.nome_responsavel, re.cpf_responsavel, re.email_responsavel, re.id_ong_fk, o.nome_ong FROM responsaveis re INNER JOIN ongs o ON (re.id_ong_fk = o.usuario_id) ORDER BY re.id_responsavel;

const GetAll = async (request, response) => {
  try {
    const querySelect =
      "SELECT re.id_responsavel, re.nome_responsavel, re.cpf_responsavel, re.email_responsavel, re.id_ong_fk, o.nome_ong FROM responsaveis re INNER JOIN ongs o ON (re.id_ong_fk = o.usuario_id) ";

    const queryOrderBy = "ORDER BY re.id_responsavel";

    const queryText = querySelect + queryOrderBy;

    const [data] = await banco.query(queryText);

    response.status(200).send(data);
  } catch (error) {
    console.error("Erro ao listar bairros:", error.message);
    response.status(500).send({ message: "Falha ao listar os responsáveis." });
  }
};

const GetById = async (request, response) => {
  try {
    const id = request.params.id;

    const querySelect =
      "SELECT re.id_responsavel, re.nome_responsavel, re.cpf_responsavel, re.email_responsavel, re.id_ong_fk, o.nome_ong FROM responsaveis re INNER JOIN ongs o ON (re.id_ong_fk = o.usuario_id)  ";

    const queryWhere = "WHERE re.id_responsavel = ? ";

    const queryOrderBy = "ORDER BY re.id_responsavel";

    const queryText = querySelect + queryWhere + queryOrderBy;

    const [data] = await banco.query(queryText, [id]);

    response.status(200).send(data[0]);
  } catch (error) {
    console.error("Erro ao buscar bairro por ID:", error.message);
    response.status(500).send({ message: "Falha ao buscar o responsável." });
  }
};

const Erase = async (request, response) => {
  try {
    const id = request.params.id;

    const queryDeleteFrom = "DELETE FROM responsaveis ";

    const queryWhere = "WHERE id_responsavel=?";

    const queryText = queryDeleteFrom + queryWhere;

    const data = await banco.query(queryText, [id]);

    response.status(200).send(data[0]);
  } catch (error) {
    console.error("Erro ao excluir bairro:", error.message);
    response.status(500).send({ message: "Falha ao excluir o responsavel." });
  }
};

const Create = async (request, response) => {
  try {
    const { nome_responsavel, id_ong_fk, cpf_responsavel, email_responsavel } = request.body;

    const queryInsert = "INSERT INTO responsaveis ";
    const queryParams = "(nome_responsavel, id_ong_fk, cpf_responsavel, email_responsavel) ";
    const queryValues = "VALUES (?, ?, ?, ?)";

    const queryText = queryInsert + queryParams + queryValues;

    const data = await banco.query(queryText, [nome_responsavel, id_ong_fk, cpf_responsavel, email_responsavel]);

    response.status(201).send(data[0]);
  } catch (error) {
    console.log("Erro ao conectar ao banco de dados: ", error.message);

    response.status(500).send({ message: "Falha ao cadastrar o responsável!" });
  }
};

const Update = async (request, response) => {
  try {
    const id = request.params.id;
    const { nome_responsavel, id_ong_fk, cpf_responsavel, email_responsavel } = request.body;

    const queryUpdate = "UPDATE responsaveis ";

    const querySet = "SET nome_responsavel=?, id_ong_fk=?, cpf_responsavel=?, email_responsavel=? ";

    const queryWhere = "WHERE id_responsavel=?";

    const queryText = queryUpdate + querySet + queryWhere;

    const data = await banco.query(queryText, [nome_responsavel, id_ong_fk, cpf_responsavel, email_responsavel, id]);

    response.status(201).send(data[0]);
  } catch (error) {
    console.error("Erro ao atualizar bairro:", error.message);
    response.status(500).send({ message: "Falha ao atualizar o responsável." });
  }
};

module.exports = { GetAll, GetById, Erase, Create, Update };
