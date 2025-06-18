const express = require("express");

const { banco } = require("./database");

const GetAll = async (request, response) => {
  try {
    const querySelect =
      "SELECT e.id_endereco, r.rua, e.numero, e.complemento, b.bairro , e.cep, c.cidade , uf.sigla FROM enderecos e INNER JOIN uf ON (e.id_uf_fk = uf.id_uf) INNER JOIN ruas r ON (e.id_rua_fk = r.id_rua) INNER JOIN bairros b ON (e.id_bairro_fk = b.id_bairro) INNER JOIN cidades c ON (e.id_cidade_fk = c.id_cidade) ";

    const queryOrderBy = "ORDER BY id_endereco";

    const querytext = querySelect + queryOrderBy;

    const data = await banco.query(querytext);

    response.status(201).send(data[0]);
  } catch (error) {
    console.error("Erro ao conectar ao banco de dados:", error.message);

    response.status(401).send({ message: "Falha ao encontrar endereços!" });
  }
};

const GetById = async (request, response) => {
  try {
    const id = request.params.id;
    const querySelect =
      "SELECT e.id_endereco, r.rua, e.numero, e.complemento, b.bairro , e.cep, c.cidade , uf.sigla FROM enderecos e INNER JOIN uf ON (e.id_uf_fk = uf.id_uf) INNER JOIN ruas r ON (e.id_rua_fk = r.id_rua) INNER JOIN bairros b ON (e.id_bairro_fk = b.id_bairro) INNER JOIN cidades c ON (e.id_cidade_fk = c.id_cidade) ";

    const queryOrderBy = "ORDER BY id_endereco ";

    const queryWhere = "WHERE e.id_endereco=?"

    const querytext = querySelect + queryWhere + queryOrderBy;

    const data = await banco.query(querytext, [id]);

    response.status(201).send(data[0]);
  } catch (error) {
    console.log("Erro ao conectar ao banco de dados: ", error.message);
    response.status(401).send({ message: "Falha ao encontrar endereço pelo id!" });
  }
};

const Erase = async (request, response) => {
  try {
    const id = request.params.id;

    const queryDeleteFrom = "DELETE FROM enderecos ";

    const queryWhere = "WHERE id_endereco=?";

    const queryText = queryDeleteFrom + queryWhere;

    const data = await banco.query(queryText, [id]);

    response.status(200).send(data[0]);
  } catch (error) {
    console.log("Erro ao conectar ao banco de dados: ", error.message);

    response.status(401).send({ message: "Falha ao excluir endereço pelo ID!" });
  }
};

const Create = async (request, response) => {
  try {
    const { id_uf_fk, id_cidade_fk, id_bairro_fk, id_rua_fk, numero, cep, complemento } = request.body;

    const queryInsert = "INSERT INTO enderecos ";
    const queryParams = "(id_uf_fk, id_cidade_fk, id_bairro_fk, id_rua_fk, numero, cep, complemento) ";
    const queryValues = "VALUES (?, ?, ?, ?, ?, ?, ?)";
     
    const queryText = queryInsert + queryParams + queryValues;

    const data = await banco.query(queryText, [id_uf_fk, id_cidade_fk, id_bairro_fk, id_rua_fk, numero, cep, complemento]);

    response.status(201).send(data[0]);
  } catch (error) {
    console.log("Erro ao conectar ao banco de dados: ", error.message);
    response.status(500).send({ message: "Falha ao cadastrar endereço!" });
  }
};

const Update = async (request, response) => {
  try {
    const id = request.params.id;
    const { id_uf_fk, id_cidade_fk, id_bairro_fk, id_rua_fk, numero, cep, complemento } = request.body;

    const queryUpdate = "UPDATE enderecos ";

    const querySet = "SET id_uf_fk=?, id_cidade_fk=?, id_bairro_fk=?, id_rua_fk=?, numero=?, cep=?, complemento=? ";

    const queryWhere = "WHERE id_endereco=?";

    const queryText = queryUpdate + querySet + queryWhere;

    const data = await banco.query(queryText, [id_uf_fk, id_cidade_fk, id_bairro_fk, id_rua_fk, numero, cep, complemento, id]);

    response.status(201).send(data[0]);
  } catch (error) {
    console.log("Erro ao atualizar a cidade: ", error.message);
    response.status(401).send({ message: "Falha ao atualizar dados do endereço!" });
  }
};

module.exports = { GetAll, GetById, Erase, Create, Update };
