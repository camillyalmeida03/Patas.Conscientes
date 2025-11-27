// petsControllers.js
const model = require("../models/petsServices");

const petsController = {
    GetAll: async (request, response) => {
        try {
            const data = await model.GetAll();
            response.status(200).json(data);
        } catch (error) {
            console.error(error);
            response.status(500).json({ message: "Erro ao listar pets." });
        }
    },

    GetById: async (request, response) => {
        try {
            const { id } = request.params;
            const data = await model.GetById(id);
            response.status(200).json(data);
        } catch (error) {
            console.error(error);
            response.status(500).json({ message: "Erro ao buscar pet." });
        }
    },

    Post: async (request, response) => {
        try {
            const { nome, fk_idsexopet, fk_idespecie, fk_idraca, fk_idporte, fk_idong, peso, idade, descricao, fk_idstatus } = request.body;

            // Se o upload funcionou, o link da imagem está aqui
            // Se não enviou foto, define como null ou uma string vazia
            let fotos = request.file ? request.file.path : null;

            // Se for null, você pode definir uma imagem padrão aqui se quiser, ou deixar o front tratar
            if (!fotos) fotos = null;

            const data = await model.Post(nome, fk_idsexopet, fk_idespecie, fk_idraca, fk_idporte, fk_idong, peso, idade, descricao, fotos, fk_idstatus);
            response.status(201).json(data);
        } catch (error) {
            console.error(error);
            response.status(500).json({ message: "Erro ao cadastrar pet." });
        }
    },

    PostPeloNomeDaRaca: async (request, response) => {
        try {

            const {
                nome, fk_idsexopet, fk_idespecie, nomeRaca, fk_idporte,
                fk_idong, peso, idade, descricao, fk_idstatus
            } = request.body;

            let fotoUrl = request.file ? request.file.path : null;

            if (!nomeRaca) {
                console.log("Erro: nomeRaca está faltando");
                return response.status(400).json({ message: "O campo 'nomeRaca' é obrigatório." });
            }

            const data = await model.PostPeloNomeDaRaca(
                nome, fk_idsexopet, fk_idespecie, nomeRaca, fk_idporte,
                fk_idong, peso, idade, descricao, fotoUrl, fk_idstatus
            );

            console.log("Sucesso no Model:", data);
            response.status(201).json(data);

        } catch (error) {
            console.error("ERRO NO CONTROLLER:", error);
            response.status(500).json({ message: "Falha ao executar a ação!", details: error.message });
        }
    },

    // Novo método para lidar com o upload da foto vindo do fetch secundário
    // UploadFoto: async (request, response) => {
    //     try {
    //         const { id } = request.params;
    //         // ATENÇÃO: Isso pressupõe que você tem o middleware Multer configurado nas rotas para salvar o arquivo na pasta 'public/img/fotos/'
    //         // e que o arquivo vem no campo 'fotopet'.

    //         if (!request.file) {
    //             return response.status(400).json({ message: "Nenhum arquivo enviado." });
    //         }

    //         // Caminho relativo para salvar no banco
    //         const caminhoFoto = `/public/img/fotos/${request.file.filename}`;

    //         await model.UpdateFoto(id, caminhoFoto);

    //         response.status(200).json({ message: "Foto atualizada com sucesso!", path: caminhoFoto });
    //     } catch (error) {
    //         console.error(error);
    //         response.status(500).json({ message: "Erro ao salvar foto." });
    //     }
    // },

    Put: async (request, response) => {
        try {
            const { nome, fk_idsexopet, fk_idespecie, fk_idraca, fk_idporte, fk_idong, peso, idade, descricao, fotos, fk_idstatus } = request.body;
            const { id } = request.params;
            const data = await model.Put(id, nome, fk_idsexopet, fk_idespecie, fk_idraca, fk_idporte, fk_idong, peso, idade, descricao, fotos, fk_idstatus);
            response.status(200).json(data);
        } catch (error) {
            console.error(error);
            response.status(500).json({ message: "Erro ao atualizar." });
        }
    },

    Erase: async (request, response) => {
        try {
            const { id } = request.params;
            const data = await model.Erase(id);
            response.status(200).json(data);
        } catch (error) {
            console.error(error);
            response.status(500).json({ message: "Erro ao deletar." });
        }
    }
}

module.exports = petsController;