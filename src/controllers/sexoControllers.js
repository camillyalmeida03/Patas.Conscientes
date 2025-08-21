const model = require("../models/sexoServices")

const sexoController = {

    GetAll : async (request, response) => {
        try {
            const data = await model.GetAll();
            response.status(200).json(data);
        } catch (error) {
            console.error("Erro ao conectar ao banco de dados:", error.message);
            response.status(401).send({"message": "Falha ao executar a ação!"})
        } 
    }
}

module.exports = sexoController;