// Controller responsável por receber requisições HTTP e chamar o service da tabela sexospet para executar o CRUD.

const model = require("../models/sexospetServices");

const sexopetController = {
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
            const { sexopet } = request.body;
            const data = await model.Post(sexopet); // chama service sem passar response
            response.status(201).json(data);
        } catch (error) {
            console.error("Erro ao conectar ao banco de dados:", error.message);
            response.status(500).json({ message: "Falha ao executar a ação!" });
        }
    },

    Put: async (request, response) => {
        try {
            const { sexopet } = request.body;
            const { id } = request.params;

            const data = await model.Put(id, sexopet); // chama service sem passar response
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

module.exports = sexopetController;