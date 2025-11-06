
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

    PutEndereco: async (request, response) => {
    try {
        const { id } = request.params;
        const dados = request.body;

        const resultado = await model.PutEndereco(
            id,
            dados.nome,
            dados.fk_idsexo,
            dados.estado,
            dados.cidade,
            dados.bairro,
            dados.rua,
            dados.numero,
            dados.cep,
            dados.complemento
        );

        if (!resultado.success) {
            return response.status(400).json({ message: resultado.message });
        }

        return response.status(200).json({ message: resultado.message });

    } catch (error) {
        console.error("Erro ao atualizar endereço:", error.message);
        response.status(500).json({ message: "Erro interno ao atualizar endereço!" });
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