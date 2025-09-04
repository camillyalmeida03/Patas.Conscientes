// Este arquivo implementa o CRUD da tabela funcionarios, fornecendo funções assíncronas para listar, buscar por id, inserir, atualizar e excluir registros no banco de dados. 

const { banco } = require("./database"); // Chamando o banco

const GetAll = async () => {
    const querySelect = 'SELECT f.idfuncionario, u.nome, u.email, o.nome AS ong_associado, r.idresponsavel FROM funcionarios f ';

    const queryInnerJoin = 'INNER JOIN usuarios u ON f.fk_idusuario = u.idusuario INNER JOIN ongs o ON o.idong = f.fk_idong INNER JOIN responsaveis r ON r.idresponsavel = f.fk_idresponsavel '

    const queryOrderby = 'ORDER BY f.idfuncionario'

    const querytext = querySelect + queryInnerJoin + queryOrderby;

    const [rows] = await banco.query(querytext); //Manda a queryText pro banco
    return rows; // Retorna só os dados
};

const GetById = async (id) => {
    const querySelect = 'SELECT f.idfuncionario, u.nome, u.email, o.nome AS ong_associado, r.idresponsavel FROM funcionarios f ';

    const queryInnerJoin = 'INNER JOIN usuarios u ON f.fk_idusuario = u.idusuario INNER JOIN ongs o ON o.idong = f.fk_idong INNER JOIN responsaveis r ON r.idresponsavel = f.fk_idresponsavel '

    const queryWhere = 'WHERE f.idfuncionario = ?'

    const querytext = querySelect + queryInnerJoin + queryWhere;

    const [rows] = await banco.query(querytext, [id]); //Manda a queryText pro banco
    return rows; // Retorna só os dados
};

const Post = async (fk_idusuario, fk_idong, fk_idresponsavel) => {
    const querySelect = 'INSERT INTO funcionarios(fk_idusuario, fk_idong, fk_idresponsavel) ';
    const queryValues = ' VALUES (?, ?)';

    querytext = querySelect + queryValues;

    const [result] = await banco.query(querytext, [fk_idusuario, fk_idong, fk_idresponsavel]); //Manda a queryText pro banco
    return { id: result.insertId, fk_idusuario, fk_idong, fk_idresponsavel }; // Retorna o novo registro criado
};

const Put = async (id, fk_idusuario, fk_idong, fk_idresponsavel) => {
    const querySelect = 'UPDATE funcionarios SET fk_idusuario = ?, fk_idong = ?, fk_idresponsavel =?';
    const queryWhere = ' WHERE idfuncionario = ?';

    querytext = querySelect + queryWhere;

    const [result] = await banco.query(querytext, [fk_idusuario, fk_idong, fk_idresponsavel, id]); //Manda a queryText pro banco
    return { id, fk_idusuario, fk_idong, fk_idresponsavel, linhasAfetadas: result.affectedRows }; // Retorna o registro alterado
};

const Erase = async (id) => {
    const querySelect = 'DELETE FROM funcionarios';
    const queryWhere = ' WHERE idfuncionarios = ?';

    querytext = querySelect + queryWhere;

    const [rows] = await banco.query(querytext, [id]); //Manda a queryText pro banco
    return rows; // Retorna só os dados
};

module.exports = { GetAll, GetById, Post, Put, Erase };