const express = require('express');

const {banco} = require("./database")

const GetAll = async (request, response) => {
    try {
        const data = await banco.query("SELECT * FROM cidades");
        response.status(200).send(data[0]);
    } catch (error) {
        console.log("Erro ao conectar ao banco de dados: ", error.message);
        response.status(401).send({"message": "Falha ao executar a ação!"})
    } 
};

const GetById = async (request, response) => {
    try {
        const id = request.params.id;
        const data = await banco.query("SELECT * FROM cidades WHERE id=?", [id]);
        response.status(200).send(data[0]);
    } catch (error) {
        console.log("Erro ao conectar ao banco de dados: ", error.message);
        response.status(401).send({"message": "Falha ao executar a ação!"})
    }
};

const Erase = async (request, response) => {
    try {
        const id = request.params.id;
        const data = await banco.query("DELETE FROM cidades WHERE id=?", [id]);
        response.status(200).send(data[0]);
    } catch (error) {
        console.log("Erro ao conectar ao banco de dados: ", error.message);
        response.status(401).send({"message": "Falha ao executar a ação!"})
    }
};

const Create = async (request, response) => {
    try {
        const {nome, uf_id} = request.body;

        const data = await banco.query(
            'INSERT INTO cidades (nome, uf_id) VALUES (?, ?)',
            [nome, uf_id]
        );

        response.status(200).send({ message: 'cidade cadastrada com sucesso' });
    } catch (error) {
        console.log("Erro ao conectar ao banco de dados: ", error.message);
        response.status(500).send({ message: "Falha ao cadastrar a cidade!" });
    }
};

const Update = async (request, response) => {
    try {
        const id = request.params.id;
        const {nome, uf_id} = request.body;

        const data = await banco.query(
            'UPDATE cidades SET nome=?, uf_id=? WHERE id=?',
            [nome, uf_id, id]
        );

        response.status(200).send({ message: "cidade atualizada com sucesso!" });
    } catch (error) {
        console.log("Erro ao atualizar o usuário: ", error.message);
        response.status(401).send({ message: "Falha ao executar a ação!" });
    }
}

module.exports = {GetAll, GetById, Erase, Create, Update};