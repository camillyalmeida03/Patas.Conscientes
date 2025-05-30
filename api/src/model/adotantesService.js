const express = require('express');

const {banco} = require("./database")

const bcrypt = require("bcrypt");

const GetAll = async (request, response) => {
    try {
        const data = await banco.query("SELECT * FROM adotante");
        response.status(200).send(data[0]);
    } catch (error) {
        console.log("Erro ao conectar ao banco de dados: ", error.message);
        response.status(401).send({"message": "Falha ao executar a ação!"})
    } 
};

const GetById = async (request, response) => {
    try {
        const id = request.params.id;
        const data = await banco.query("SELECT * FROM adotante WHERE id=?", [id]);
        response.status(200).send(data[0]);
    } catch (error) {
        console.log("Erro ao conectar ao banco de dados: ", error.message);
        response.status(401).send({"message": "Falha ao executar a ação!"})
    }
};

const Erase = async (request, response) => {
    try {
        const id = request.params.id;
        const data = await banco.query("DELETE FROM adotante WHERE id=?", [id]);
        response.status(200).send(data[0]);
    } catch (error) {
        console.log("Erro ao conectar ao banco de dados: ", error.message);
        response.status(401).send({"message": "Falha ao executar a ação!"})
    }
};

const AtualizarSexo = async (request, response) => {
    try {
        const id = request.params.id;
        const { sexo } = request.body;

        await banco.query('UPDATE adotante SET sexo = ? WHERE usuario_id = ?', [sexo, id]);

        response.status(200).send({ message: "Sexo atualizado com sucesso!" });
    } catch (error) {
        console.log("Erro ao atualizar sexo:", error.message);
        response.status(500).send({ message: "Erro ao atualizar sexo" });
    }
};

const AtualizarDataNascimento = async (request, response) => {
    try {
        const id = request.params.id;
        const { data_nascimento } = request.body;

        await banco.query('UPDATE adotante SET data_nascimento = ? WHERE usuario_id = ?', [data_nascimento, id]);

        response.status(200).send({ message: "Data de nascimento atualizada com sucesso!" });
    } catch (error) {
        console.log("Erro ao atualizar data de nascimento:", error.message);
        response.status(500).send({ message: "Erro ao atualizar data de nascimento" });
    }
};

const AtualizarCpf = async (request, response) => {
    try {
        const id = request.params.id;
        const { cpf } = request.body;

        await banco.query('UPDATE adotante SET cpf = ? WHERE usuario_id = ?', [cpf, id]);

        response.status(200).send({ message: "CPF atualizado com sucesso!" });
    } catch (error) {
        console.log("Erro ao atualizar CPF:", error.message);
        response.status(500).send({ message: "Erro ao atualizar CPF" });
    }
};




module.exports = {GetAll, GetById, Erase, AtualizarSexo, AtualizarDataNascimento, AtualizarCpf}