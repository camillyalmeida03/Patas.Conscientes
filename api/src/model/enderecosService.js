const express = require('express');

const {banco} = require("./database")

const GetAll = async (request, response) => {
    try {
        const data = await banco.query("SELECT * FROM enderecos");
        response.status(200).send(data[0]);
    } catch (error) {
        console.log("Erro ao conectar ao banco de dados: ", error.message);
        response.status(401).send({"message": "Falha ao executar a ação!"})
    } 
};

const GetById = async (request, response) => {
    try {
        const id = request.params.id;
        const data = await banco.query("SELECT * FROM enderecos WHERE id=?", [id]);
        response.status(200).send(data[0]);
    } catch (error) {
        console.log("Erro ao conectar ao banco de dados: ", error.message);
        response.status(401).send({"message": "Falha ao executar a ação!"})
    }
};

const Erase = async (request, response) => {
    try {
        const id = request.params.id;
        const data = await banco.query("DELETE FROM enderecos WHERE id=?", [id]);
        response.status(200).send(data[0]);
    } catch (error) {
        console.log("Erro ao conectar ao banco de dados: ", error.message);
        response.status(401).send({"message": "Falha ao executar a ação!"})
    }
};

const Create = async (request, response) => {
    try {
        const { id_cidade, id_bairro, id_rua, numero, cep, complemento } = request.body;

        const data = await banco.query(
            'INSERT INTO enderecos (id_cidade, id_bairro, id_rua, numero, cep, complemento) VALUES (?, ?, ?, ?, ?, ?)',
            [id_cidade, id_bairro, id_rua, numero, cep, complemento]
        );

        response.status(200).send({ message: 'Endereço cadastrado com sucesso' });
    } catch (error) {
        console.log("Erro ao conectar ao banco de dados: ", error.message);
        response.status(500).send({ message: "Falha ao cadastrar o endereço!" });
    }
};

const Update = async (request, response) => {
    try {
        const id = request.params.id;
        const {id_cidade, id_bairro, id_rua, numero, cep, complemento} = request.body;

        const data = await banco.query(
            'UPDATE enderecos SET id_cidade=?, id_bairro=?, id_rua=?, numero=?, cep=?, complemento=? WHERE id=?',
            [id_cidade, id_bairro, id_rua, numero, cep, complemento, id]
        );

        response.status(200).send({ message: "Usuário atualizado com sucesso!" });
    } catch (error) {
        console.log("Erro ao atualizar o usuário: ", error.message);
        response.status(401).send({ message: "Falha ao executar a ação!" });
    }
}


module.exports = {GetAll, GetById, Erase, Create, Update};