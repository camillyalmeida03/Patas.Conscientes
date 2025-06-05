const express = require('express');

const {banco} = require("./database")

const bcrypt = require("bcrypt");

const GetAll = async (request, response) => {
    try {
        const query = `
            SELECT 
                o.usuario_id AS ong_id,
                o.nome_ong, 
                o.cnpj, 
                u.nome AS nome_responsavel,
                u.email,
                u.telefone,
                u.celular,
                u.foto,
                u.tipo AS tipo_usuario, 
                u.criado_em AS data_cadastro_usuario
            FROM 
                ongs o
            INNER JOIN 
                usuarios u ON o.usuario_id = u.id
            WHERE
                u.tipo = 'ong';
        `;
        const [ongs] = await banco.query(query); // mysql2/promise retorna [rows, fields]

        response.status(200).send(ongs);

    } catch (error) {
        console.error("Erro ao buscar todas as ONGs:", error.message);
        response.status(500).send({ message: "Falha ao buscar ONGs. Tente novamente mais tarde." });
    } 
};


const GetById = async (request, response) => {
    try {
        const ongUsuarioId = request.params.id; // Este ID da rota agora é o usuario_id

        if (!ongUsuarioId) {
            return response.status(400).send({ message: "ID da ONG (usuário) não fornecido." });
        }

        const query = `
            SELECT 
                o.usuario_id AS ong_id, 
                o.nome_ong, 
                o.cnpj,
                u.nome AS nome_responsavel,
                u.email,
                u.telefone,
                u.celular,
                u.foto,
                u.tipo AS tipo_usuario,
                u.criado_em AS data_cadastro_usuario
            FROM 
                ongs o
            INNER JOIN 
                usuarios u ON o.usuario_id = u.id
            WHERE 
                o.usuario_id = ? 
                AND u.tipo = 'ong';
        `;
        const [ongs] = await banco.query(query, [ongUsuarioId]);

        if (ongs.length > 0) {
            response.status(200).send(ongs[0]); // Retorna o primeiro (e único) resultado
        } else {
            response.status(404).send({ message: "ONG não encontrada." });
        }

    } catch (error) {
        console.error("Erro ao buscar ONG por ID (usuário):", error.message);
        response.status(500).send({ message: "Falha ao buscar a ONG. Tente novamente mais tarde." });
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