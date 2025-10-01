// Este arquivo implementa o CRUD da tabela petsfavoritados, fornecendo funções assíncronas para listar, buscar por id, inserir, atualizar e excluir registros no banco de dados. 

const { banco } = require("./database"); // Chamando o banco

const GetAll = async () => {
    const querySelect = 'SELECT pf.idpetfavoritado, pf.fk_idusuario, pf.fk_idpet, pf.data_favoritado FROM petsfavoritados pf ';

    const queryInnerJoin = 'INNER JOIN usuarios u ON u.idusuario = pf.fk_idusuario INNER JOIN pets p ON p.idpet = pf.fk_idpet '

    const queryOrderby = 'ORDER BY pf.idpetfavoritado'

    const querytext = querySelect + queryInnerJoin + queryOrderby;

    const [rows] = await banco.query(querytext); //Manda a queryText pro banco
    return rows; // Retorna só os dados
};

const GetById = async (id) => {
    const querySelect = 'SELECT pf.idpetfavoritado, pf.fk_idusuario, pf.fk_idpet, pf.data_favoritado FROM petsfavoritados pf ';

    const queryInnerJoin = 'INNER JOIN usuarios u ON u.idusuario = pf.fk_idusuario INNER JOIN pets p ON p.idpet = pf.fk_idpet '

    const queryWhere = 'WHERE pf.idpetfavoritado = ?'

    const querytext = querySelect + queryInnerJoin + queryWhere;

    const [rows] = await banco.query(querytext, [id]); //Manda a queryText pro banco
    return rows; // Retorna só os dados
};

const Post = async (fk_idusuario, fk_idpet) => {
    // 1 - Verifica se já existe esse par (usuário + pet) favoritado
    const queryCheck = 'SELECT idpetfavoritado FROM petsfavoritados WHERE fk_idusuario = ? AND fk_idpet = ?';
    const [rows] = await banco.query(queryCheck, [fk_idusuario, fk_idpet]);

    if (rows.length > 0) {
        return {
            message: "Este pet já foi favoritado por este usuário!",
            id: rows[0].idpetfavoritado,
            fk_idusuario,
            fk_idpet
        };
    }

    // 2 - Se não existe → insere
    const queryInsert = 'INSERT INTO petsfavoritados(fk_idusuario, fk_idpet) VALUES (?, ?)';
    const [result] = await banco.query(queryInsert, [fk_idusuario, fk_idpet]);

    return { id: result.insertId, fk_idusuario, fk_idpet };
};

const Put = async (id, fk_idusuario, fk_idpet) => {
    const querySelect = 'UPDATE petsfavoritados SET fk_idusuario = ?, fk_idpet = ?';
    const queryWhere = ' WHERE idpetfavoritado = ?';

    querytext = querySelect + queryWhere;

    const [result] = await banco.query(querytext, [fk_idusuario, fk_idpet, id]); //Manda a queryText pro banco
    return { id, fk_idusuario, fk_idpet, linhasAfetadas: result.affectedRows }; // Retorna o registro alterado
};

const Erase = async (id) => {
    const querySelect = 'DELETE FROM petsfavoritados';
    const queryWhere = ' WHERE idpetfavoritado = ?';

    querytext = querySelect + queryWhere;

    const [rows] = await banco.query(querytext, [id]); //Manda a queryText pro banco
    return rows; // Retorna só os dados
};

module.exports = { GetAll, GetById, Post, Put, Erase };