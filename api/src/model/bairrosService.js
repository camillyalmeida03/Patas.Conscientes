const express = require('express');

const {banco} = require("./database")

const GetAll = async (request, response) => {
    try {
        const data = await banco.query("SELECT * FROM bairros");
        response.status(200).send(data[0]);
    } catch (error) {
        console.log("Erro ao conectar ao banco de dados: ", error.message);
        response.status(401).send({"message": "Falha ao executar a ação!"})
    } 
};

const GetById = async (request, response) => {
    try {
        const id = request.params.id;
        const data = await banco.query("SELECT * FROM bairros WHERE id=?", [id]);
        response.status(200).send(data[0]);
    } catch (error) {
        console.log("Erro ao conectar ao banco de dados: ", error.message);
        response.status(401).send({"message": "Falha ao executar a ação!"})
    }
};

const Erase = async (request, response) => {
    try {
        const id = request.params.id;
        const data = await banco.query("DELETE FROM bairros WHERE id=?", [id]);
        response.status(200).send(data[0]);
    } catch (error) {
        console.log("Erro ao conectar ao banco de dados: ", error.message);
        response.status(401).send({"message": "Falha ao executar a ação!"})
    }
};

const Create = async (request, response) => {
    try {
        const {nome, cidade_id} = request.body;

        const data = await banco.query(
            'INSERT INTO bairros (nome, cidade_id) VALUES (?, ?)',
            [nome, cidade_id]
        );

        response.status(200).send({ message: 'bairro cadastrado com sucesso' });
    } catch (error) {
        console.log("Erro ao conectar ao banco de dados: ", error.message);
        response.status(500).send({ message: "Falha ao cadastrar o bairro!" });
    }
};

const Update = async (request, response) => {
    try {
        const id = request.params.id;
        const {nome, cidade_id} = request.body;

        const data = await banco.query(
            'UPDATE bairros SET nome=?, bairro_id=? WHERE id=?',
            [nome, cidade_id, id]
        );

        response.status(200).send({ message: "bairro atualizad com sucesso!" });
    } catch (error) {
        console.log("Erro ao atualizar o usuário: ", error.message);
        response.status(401).send({ message: "Falha ao executar a ação!" });
    }
}

module.exports = {GetAll, GetById, Erase, Create, Update};