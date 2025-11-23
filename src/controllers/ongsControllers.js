
// Controller responsável por receber requisições HTTP e chamar o service da tabela ongs para executar o CRUD.

const model = require("../models/ongsServices");
const responsaveisModel = require("../models/loginResponsaveisServices");
const jwt = require("jsonwebtoken");
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

    Post: async (req, res) => {
        try {
            const { nome, cnpj, telefone, descricao, fk_idendereco, comp_estatuto, comp_cnpj, email, senha, fk_idtipo } = req.body;
            const idUsuarioLogado = req.usuario?.id; // vem do middleware de autenticação

            if (!idUsuarioLogado) {
                return res.status(401).json({ message: "Usuário não autenticado." });
            }

            const saltRounds = 10;
            const senhaHash = await bcrypt.hash(senha, saltRounds);
            const cnpjHash = await bcrypt.hash(cnpj, saltRounds);

            // Cria a ONG
            const ong = await model.Post(
                nome, cnpjHash, telefone, descricao, fk_idendereco,
                comp_estatuto, comp_cnpj, email, senhaHash, fk_idtipo
            );

            return res.status(201).json({
                message: "ONG e responsável criados com sucesso.",
                id: ong.id, 
                id_usuario_responsavel: idUsuarioLogado 
            });

        } catch (error) {
            console.error("Erro ao criar ONG:", error.message);
            res.status(500).json({ message: "Falha ao executar a ação!" });
        }
    },

    Put: async (request, response) => {
        try {
            const { id } = request.params;
            const { nome, fk_idresponsavel } = request.body; // pegue o que precisa

            // Verificação explícita: Se o body tem a chave fk_idresponsavel (mesmo que null), 
            // assumimos que é uma tentativa de vínculo.
            if (request.body.hasOwnProperty('fk_idresponsavel')) {

                if (!fk_idresponsavel) {
                    return response.status(400).json({ message: "ID do responsável inválido ou nulo recebido pelo servidor." });
                }

                const data = await model.atualizarResponsavel(id, fk_idresponsavel);
                return response.status(200).json(data);
            }

            // ... resto do código (atualização normal de perfil) ...
            let senhaHash = null;
            if (senha) {
                const saltRounds = 10;
                senhaHash = await bcrypt.hash(senha, saltRounds);
            }

            // Chama o put normal (obs: certifique-se que o model.Put aceita senhaHash null se for o caso, ou mantenha a lógica antiga para updates completos)
            const data = await model.Put(id, nome, telefone, descricao, fk_idendereco, email, senhaHash, foto, banner);
            response.status(200).json(data);
        } catch (error) {
            console.error("Erro no Controller Put:", error.message);
            response.status(500).json({ message: "Falha ao executar a ação!" });
        }
    },

    AtualizarResponsavel: async (req, res) => {
        try {
            const { idOng, fk_idresponsavel } = req.body;

            if (!idOng || !fk_idresponsavel) {
                return res.status(400).json({ message: "idOng e fk_idresponsavel são obrigatórios" });
            }

            const resultado = await ongsService.Put(idOng, { fk_idresponsavel });

            res.status(200).json({
                message: "Responsável da ONG atualizado com sucesso!",
                resultado
            });
        } catch (error) {
            console.error("Erro ao atualizar responsável:", error);
            res.status(500).json({ message: "Erro ao atualizar responsável da ONG" });
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