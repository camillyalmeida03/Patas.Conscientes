// Este arquivo implementa o CRUD da tabela redessociais, fornecendo funções assíncronas para listar, buscar por id, inserir, atualizar e excluir registros no banco de dados. 

const { banco } = require("./database"); // Chamando o banco

const GetAll = async () => {
    const querySelect = 'SELECT rs.idredesocial, o.nome AS ong, rs.plataforma, rs.link FROM redessociais rs ';

    const queryInnerJoin = 'INNER JOIN ongs o ON o.idong = rs.fk_idong '

    const queryOrderby = 'ORDER BY rs.idredesocial'

    const querytext = querySelect + queryInnerJoin + queryOrderby;

    const [rows] = await banco.query(querytext); //Manda a queryText pro banco
    return rows; // Retorna só os dados
};

const GetById = async (id) => {
    const querySelect = 'SELECT rs.idredesocial, o.nome AS ong, rs.plataforma, rs.link FROM redessociais rs ';

    const queryInnerJoin = 'INNER JOIN ongs o ON o.idong = rs.fk_idong '

    const queryWhere = 'WHERE o.idong = ?'

    const querytext = querySelect + queryInnerJoin + queryWhere;

    const [rows] = await banco.query(querytext, [id]); //Manda a queryText pro banco
    return rows; // Retorna só os dados
};

const Post = async (fk_idong, plataforma, link) => {
    const querySelect = 'INSERT INTO redessociais(fk_idong, plataforma, link) ';
    const queryValues = ' VALUES (?, ?, ?)';

    querytext = querySelect + queryValues;

    const [result] = await banco.query(querytext, [fk_idong, plataforma, link]); //Manda a queryText pro banco
    return { id: result.insertId, fk_idong, plataforma, link }; // Retorna o novo registro criado
};

const Put = async (id, fk_idong, plataforma, link) => {
    const querySelect = 'UPDATE redessociais SET fk_idong = ?, plataforma = ?, link = ?';
    const queryWhere = ' WHERE idredesocial = ?';

    querytext = querySelect + queryWhere;

    const [result] = await banco.query(querytext, [fk_idong, plataforma, link, id]); //Manda a queryText pro banco
    return { id, fk_idong, plataforma, link, linhasAfetadas: result.affectedRows }; // Retorna o registro alterado
};

const Erase = async (id) => {
    const querySelect = 'DELETE FROM redessociais';
    const queryWhere = ' WHERE idredesocial = ?';

    querytext = querySelect + queryWhere;

    const [rows] = await banco.query(querytext, [id]); //Manda a queryText pro banco
    return rows; // Retorna só os dados
};

module.exports = { GetAll, GetById, Post, Put, Erase };