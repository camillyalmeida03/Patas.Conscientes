const mysql = require('mysql2/promise');
const dotenv = require("dotenv");
dotenv.config();

const db_name = process.env.DB_NAME;
const db_user = process.env.DB_USER;
const db_password = process.env.DB_PASS;
const db_host = process.env.DB_HOST;
const db_port = process.env.DB_PORT;

console.log("DB_NAME: ", db_name);

const stringconnection = `mysql://${db_user}:${db_password}@${db_host}:${db_port}/${db_name}`;

const banco = mysql.createPool(stringconnection);

const checkConnection = async () => {
    try {
        const checkConnection = mysql.createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME,
            port: process.env.DB_PORT,
            ssl: {
                rejectUnauthorized: false // Isso é essencial para o Aiven aceitar a conexão
            }
        });
        await connection.ping(); //testa se o banco está respondendo
        await connection.end(); //fecha a conexão
        return true;
    } catch (error) {
        console.log("Erro ao conectar ao banco de dados: ", error.message);
        return false;
    }
};


module.exports = { checkConnection, banco };