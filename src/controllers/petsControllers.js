
// Controller responsável por receber requisições HTTP e chamar o service da tabela pets para executar o CRUD.

const model = require("../models/petsServices");

const petsController = {
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
            const { nome, fk_idsexopet, fk_idespecie, fk_idraca, fk_idporte, fk_idresponsavel, fk_idong, peso, idade, descricao, fotos, fk_idstatus } = request.body;
            
            const data = await model.Post(nome, fk_idsexopet, fk_idespecie, fk_idraca, fk_idporte, fk_idresponsavel, fk_idong, peso, idade, descricao, fotos, fk_idstatus); // chama service sem passar response
            response.status(201).json(data);
        } catch (error) {
            console.error("Erro ao conectar ao banco de dados:", error.message);
            response.status(500).json({ message: "Falha ao executar a ação!" });
        }
    },

    Put: async (request, response) => {
        try {
            const { nome, fk_idsexopet, fk_idespecie, fk_idraca, fk_idporte, fk_idresponsavel, fk_idong, peso, idade, descricao, fotos, fk_idstatus } = request.body;
            const { id } = request.params;

            const data = await model.Put(id, nome, fk_idsexopet, fk_idespecie, fk_idraca, fk_idporte, fk_idresponsavel, fk_idong, peso, idade, descricao, fotos, fk_idstatus); // chama service sem passar response
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

module.exports = petsController;