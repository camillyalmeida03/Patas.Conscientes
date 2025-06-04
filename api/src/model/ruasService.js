const express = require('express');

const {banco} = require("./database")

const GetAll = async (request, response) => {
    try {
        const data = await banco.query("SELECT * FROM ruas");
        response.status(200).send(data[0]);
    } catch (error) {
        console.log("Erro ao conectar ao banco de dados: ", error.message);
        response.status(401).send({"message": "Falha ao executar a ação!"})
    } 
};

const GetById = async (request, response) => {
    try {
        const id = request.params.id;
        const data = await banco.query("SELECT * FROM ruas WHERE id=?", [id]);
        response.status(200).send(data[0]);
    } catch (error) {
        console.log("Erro ao conectar ao banco de dados: ", error.message);
        response.status(401).send({"message": "Falha ao executar a ação!"})
    }
};

const Erase = async (request, response) => {
    try {
        const id = request.params.id;
        const data = await banco.query("DELETE FROM ruas WHERE id=?", [id]);
        response.status(200).send(data[0]);
    } catch (error) {
        console.log("Erro ao conectar ao banco de dados: ", error.message);
        response.status(401).send({"message": "Falha ao executar a ação!"})
    }
};

const Create = async (request, response) => {
    try {
        const {nome, bairro_id} = request.body;

        const data = await banco.query(
            'INSERT INTO ruas (nome, bairro_id) VALUES (?, ?)',
            [nome, bairro_id]
        );

        response.status(200).send({ message: 'rua cadastrada com sucesso' });
    } catch (error) {
        console.log("Erro ao conectar ao banco de dados: ", error.message);
        response.status(500).send({ message: "Falha ao cadastrar a rua!" });
    }
};

const Update = async (request, response) => {
    try {
        const id = request.params.id;
        const {id_cidade, id_bairro, id_rua, numero, cep, complemento} = request.body;

        const data = await banco.query(
            'UPDATE ruas SET nome=?, bairro_id=? WHERE id=?',
            [id_cidade, id_bairro, id_rua, numero, cep, complemento, id]
        );

        response.status(200).send({ message: "rua atualizada com sucesso!" });
    } catch (error) {
        console.log("Erro ao atualizar o usuário: ", error.message);
        response.status(401).send({ message: "Falha ao executar a ação!" });
    }
}

module.exports = {GetAll, GetById, Erase, Create, Update};