const express = require("express");
const { banco } = require("./database");

const GetAll = async (request, response) => {
  try {
    const querytext = "SELECT * FROM sexo";

    const data = await banco.query(querytext);

    response.status(201).send(data[0]);
  } catch (error) {
    console.error("Erro ao conectar ao banco de dados:", error.message);

    response.status(401).send({ message: "Falha ao encontrar os dados da tabela sexo!" });
  }
};

module.exports = { GetAll };