const express = require('express');
const { checkConnection } = require("./src/model/database");
const rotasUsuarios = require("./src/routers/usuariosRouters");
const cors = require('cors');
const axios = require('axios'); // <-- Adicionado aqui
const app = express();
const path = require('path');
const dotenv = require("dotenv");

dotenv.config();
const Port = process.env.APP_PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static('../uploads'));
app.use(express.static(path.join(__dirname, '..')));

// Rota de teste principal
app.get("/", (request, response) => {
    response.send({ "message": "Servidor rodando!" });
});

// ✅ API de CEP
app.get('/api/cep/:cep', async (req, res) => {
    const cep = req.params.cep.replace(/\D/g, '');

    try {
        const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

        if (response.data.erro) {
            return res.status(404).json({ erro: 'CEP não encontrado' });
        }

        const { logradouro, bairro, localidade, uf } = response.data;
        res.json({
            logradouro,
            bairro,
            cidade: localidade,
            estado: uf
        });
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao buscar o CEP' });
    }
});

// Suas rotas de usuário
app.use("/usuarios", rotasUsuarios);

// Inicia o servidor
app.listen(Port, () => {
    console.log(`Servidor rodando na porta: ${Port}`);
});
