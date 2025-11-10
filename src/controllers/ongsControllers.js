
// Controller responsável por receber requisições HTTP e chamar o service da tabela ongs para executar o CRUD.

const model = require("../models/ongsServices");

const bcrypt = require("bcrypt");

const ongsController = {
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
            const { nome, cnpj, telefone, descricao, fk_idendereco, comp_estatuto, comp_cnpj, email, senha, fk_idtipo } = request.body;

            const saltRounds = 10;
            const senhaHash = await bcrypt.hash(senha, saltRounds);
            const cnpjHash = await bcrypt.hash(cnpj, saltRounds);

            const data = await model.Post(nome, cnpjHash, telefone, descricao, fk_idendereco, comp_estatuto, comp_cnpj, email, senhaHash, fk_idtipo); // chama service sem passar response
            response.status(201).json(data);
        } catch (error) {
            console.error("Erro ao conectar ao banco de dados:", error.message);
            response.status(500).json({ message: "Falha ao executar a ação!" });
        }
    },

    Put: async (request, response) => {
        try {
            const { nome, telefone, descricao, fk_idendereco, email, senha, foto, banner } = request.body;
            const { id } = request.params;

            const saltRounds = 10;
            const senhaHash = await bcrypt.hash(senha, saltRounds);

            const data = await model.Put(id, nome, telefone, descricao, fk_idendereco, email, senhaHash, foto, banner); // chama service sem passar response
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

module.exports = ongsController;