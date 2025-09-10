// Este arquivo implementa o CRUD da tabela ongsfavoritadas, fornecendo funções assíncronas para listar, buscar por id, inserir, atualizar e excluir registros no banco de dados. 

const { banco } = require("./database"); // Chamando o banco

const GetAll = async () => {
    const querySelect = 'SELECT of.idongfavoritada, of.fk_idusuario, of.fk_idong, of.data_favoritada FROM ongsfavoritadas of ';

    const queryInnerJoin = 'INNER JOIN usuarios u ON u.idusuario = of.fk_idusuario INNER JOIN ongs o ON o.idong = of.fk_idong '

    const queryOrderby = 'ORDER BY of.idongfavoritada'

    const querytext = querySelect + queryInnerJoin + queryOrderby;

    const [rows] = await banco.query(querytext); //Manda a queryText pro banco
    return rows; // Retorna só os dados
};

const GetById = async (id) => {
    const querySelect = 'SELECT of.idongfavoritada, of.fk_idusuario, of.fk_idong, of.data_favoritada FROM ongsfavoritadas of ';

    const queryInnerJoin = 'INNER JOIN usuarios u ON u.idusuario = of.fk_idusuario INNER JOIN ongs o ON o.idong = of.fk_idong '

    const queryWhere = 'WHERE of.idongfavoritada = ?'

    const querytext = querySelect + queryInnerJoin + queryWhere;

    const [rows] = await banco.query(querytext, [id]); //Manda a queryText pro banco
    return rows; // Retorna só os dados
};

const Post = async (fk_idusuario, fk_idong) => {
    const querySelect = 'INSERT INTO ongsfavoritadas(fk_idusuario, fk_idong) ';
    const queryValues = ' VALUES (?, ?)';

    querytext = querySelect + queryValues;

    const [result] = await banco.query(querytext, [fk_idusuario, fk_idong]); //Manda a queryText pro banco
    return { id: result.insertId, fk_idusuario, fk_idong }; // Retorna o novo registro criado
};

const Put = async (id, fk_idusuario, fk_idong) => {
    const querySelect = 'UPDATE ongsfavoritadas SET fk_idusuario = ?, fk_idong = ?';
    const queryWhere = ' WHERE idongfavoritada = ?';

    querytext = querySelect + queryWhere;

    const [result] = await banco.query(querytext, [fk_idusuario, fk_idong, id]); //Manda a queryText pro banco
    return { id, fk_idusuario, fk_idong, linhasAfetadas: result.affectedRows }; // Retorna o registro alterado
};

const Erase = async (id) => {
    const querySelect = 'DELETE FROM ongsfavoritadas';
    const queryWhere = ' WHERE idongfavoritada = ?';

    querytext = querySelect + queryWhere;

    const [rows] = await banco.query(querytext, [id]); //Manda a queryText pro banco
    return rows; // Retorna só os dados
};

module.exports = { GetAll, GetById, Post, Put, Erase };