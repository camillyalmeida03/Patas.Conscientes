const express = require('express');

const {banco} = require("./database")

const bcrypt = require("bcrypt");

const GetAll = async (request, response) => {
    try {
        const data = await banco.query("SELECT * FROM ongs");
        response.status(200).send(data[0]);
    } catch (error) {
        console.log("Erro ao conectar ao banco de dados: ", error.message);
        response.status(401).send({"message": "Falha ao executar a ação!"})
    } 
};

const GetById = async (request, response) => {
    try {
        const id = request.params.id;
        const data = await banco.query("SELECT * FROM ongs WHERE id=?", [id]);
        response.status(200).send(data[0]);
    } catch (error) {
        console.log("Erro ao conectar ao banco de dados: ", error.message);
        response.status(401).send({"message": "Falha ao executar a ação!"})
    }
};

const Erase = async (request, response) => {
    try {
        const id = request.params.id;
        const data = await banco.query("DELETE FROM ongs WHERE id=?", [id]);
        response.status(200).send(data[0]);
    } catch (error) {
        console.log("Erro ao conectar ao banco de dados: ", error.message);
        response.status(401).send({"message": "Falha ao executar a ação!"})
    }
};

const AtualizarNomeOng = async (request, response) => {
    try {
        const id = request.params.id;
        const { nome_ong } = request.body;

        await banco.query('UPDATE ongs SET nome_ong = ? WHERE usuario_id = ?', [nome_ong, id]);

        response.status(200).send({ message: "Nome da ONG atualizado com sucesso!" });
    } catch (error) {
        console.log("Erro ao atualizar nome da ONG:", error.message);
        response.status(500).send({ message: "Erro ao atualizar nome da ONG" });
    }
};

const AtualizarCnpj = async (request, response) => {
    try {
        const id = request.params.id;
        const { cnpj } = request.body;

        await banco.query('UPDATE ongs SET cnpj = ? WHERE usuario_id = ?', [cnpj, id]);

        response.status(200).send({ message: "CNPJ atualizado com sucesso!" });
    } catch (error) {
        console.log("Erro ao atualizar CNPJ:", error.message);
        response.status(500).send({ message: "Erro ao atualizar CNPJ" });
    }
};





module.exports = {GetAll, GetById, Erase, AtualizarNomeOng, AtualizarCnpj};