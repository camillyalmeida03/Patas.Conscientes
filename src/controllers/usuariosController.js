
// Controller responsável por receber requisições HTTP e chamar o service da tabela usuarios para executar o CRUD.

const model = require("../models/usuariosServices");

const bcrypt = require("bcrypt");

const usuariosController = {
    GetAll: async (request, response) => {
        try {
            const data = await model.GetAll(); // chama service sem passar response
            response.status(200).json(data);
        } catch (error) {
            console.error("Erro ao conectar ao banco de dados:", error.message);
            response.status(500).json({ message: "Falha ao executar a ação!" });
        }
    },

    GetById: async (request, response) => {
        try {
            const { id } = request.params;
            const data = await model.GetById(id);
            response.status(200).json(data);
        } catch (error) {
            console.error("Erro ao conectar ao banco de dados:", error.message);
            response.status(500).json({ message: "Falha ao executar a ação!" });
        }
    },

    Post: async (request, response) => {
        try {
            const { nome, email, telefone, fk_idsexo, data_nasc, cpf, senha, foto, fk_idendereco, fk_idtipo } = request.body;

            const saltRounds = 10;
            const senhaHash = await bcrypt.hash(senha, saltRounds);

            const data = await model.Post(nome, email, telefone, fk_idsexo, data_nasc, cpf, senhaHash, foto, fk_idendereco, fk_idtipo); // chama service sem passar response
            response.status(201).json(data);
        } catch (error) {
            console.error("Erro ao conectar ao banco de dados:", error.message);
            response.status(500).json({ message: "Falha ao executar a ação!" });
        }
    },

    Put: async (request, response) => {
        try {
            const { nome, telefone, fk_idsexo, senha, foto, fk_idendereco, fk_idtipo } = request.body;
            const { id } = request.params;

            const saltRounds = 10;
            let senhaHash = null;
            if (senha) {
                senhaHash = await bcrypt.hash(senha, saltRounds);
            }


            const data = await model.Put(id, nome, telefone, fk_idsexo, senhaHash, foto, fk_idendereco, fk_idtipo); // chama service sem passar response
            response.status(200).json(data);
        } catch (error) {
            console.error("Erro ao conectar ao banco de dados:", error.message);
            response.status(500).json({ message: "Falha ao executar a ação!" });
        }
    },

    Erase: async (request, response) => {
        try {
            const { id } = request.params;
            const data = await model.Erase(id);
            response.status(200).json(data);
        } catch (error) {
            console.error("Erro ao conectar ao banco de dados:", error.message);
            response.status(500).json({ message: "Falha ao executar a ação!" });
        }
    }
}

module.exports = usuariosController;