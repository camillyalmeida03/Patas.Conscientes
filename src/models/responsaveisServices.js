// Este arquivo implementa o CRUD da tabela responsaveis, fornecendo funções assíncronas para listar, buscar por id, inserir, atualizar e excluir registros no banco de dados. 

const { banco } = require("./database"); // Chamando o banco

const GetAll = async () => {
    const querySelect = 'SELECT r.idresponsavel, r.fk_idusuario, u.nome, u.email, r.fk_idong, o.nome AS ong_associado FROM responsaveis r ';

    const queryInnerJoin = 'INNER JOIN usuarios u ON u.idusuario = r.fk_idusuario INNER JOIN ongs o ON o.idong = r.fk_idong '

    const queryOrderby = 'ORDER BY r.idresponsavel'

    const querytext = querySelect + queryInnerJoin + queryOrderby;

    const [rows] = await banco.query(querytext); //Manda a queryText pro banco
    return rows; // Retorna só os dados
};

const GetById = async (id) => {
    const querySelect = 'SELECT r.idresponsavel, r.fk_idusuario, u.nome, u.email, r.fk_idong, o.nome AS ong_associado FROM responsaveis r ';

    const queryInnerJoin = 'INNER JOIN usuarios u ON u.idusuario = r.fk_idusuario INNER JOIN ongs o ON o.idong = r.fk_idong '

    const queryWhere = 'WHERE r.idresponsavel = ?'

    const querytext = querySelect + queryInnerJoin + queryWhere;

    const [rows] = await banco.query(querytext, [id]); //Manda a queryText pro banco
    return rows; // Retorna só os dados
};

const Post = async (fk_idusuario, fk_idong) => {
    const querySelect = 'INSERT INTO responsaveis(fk_idusuario, fk_idong) ';
    const queryValues = ' VALUES (?, ?)';

    querytext = querySelect + queryValues;

    const [result] = await banco.query(querytext, [fk_idusuario, fk_idong]); //Manda a queryText pro banco
    return { id: result.insertId, fk_idusuario, fk_idong }; // Retorna o novo registro criado
};

const Put = async (id, fk_idusuario, fk_idong) => {
    const querySelect = 'UPDATE responsaveis SET fk_idusuario = ?, fk_idong = ?';
    const queryWhere = ' WHERE idresponsavel = ?';

    querytext = querySelect + queryWhere;

    const [result] = await banco.query(querytext, [fk_idusuario, fk_idong, id]); //Manda a queryText pro banco
    return { id, fk_idusuario, fk_idong, linhasAfetadas: result.affectedRows }; // Retorna o registro alterado
};

const Erase = async (id) => {
    const querySelect = 'DELETE FROM responsaveis';
    const queryWhere = ' WHERE idresponsavel = ?';

    querytext = querySelect + queryWhere;

    const [rows] = await banco.query(querytext, [id]); //Manda a queryText pro banco
    return rows; // Retorna só os dados
};

module.exports = { GetAll, GetById, Post, Put, Erase };