// Este arquivo implementa o CRUD da tabela pets, fornecendo funções assíncronas para listar, buscar por id, inserir, atualizar e excluir registros no banco de dados. 

const { banco } = require("./database"); // Chamando o banco

const GetAll = async () => {
    const querySelect = 'SELECT p.idpet, p.nome, sp.sexopet, ep.especie, pp.porte, o.nome AS nome_ong, p.peso, p.idade, p.vacinado, p.descricao, p.fotos, p.data_post, p.data_att, s.status FROM pets p ';

    const queryInnerJoin = 'INNER JOIN sexospet sp ON sp.idsexopet = p.fk_idsexopet INNER JOIN especiespet ep ON ep.idespeciepet = p.fk_idespecie INNER JOIN racaspet rp ON rp.idracapet = p.fk_idraca INNER JOIN portespet pp ON pp.idportepet = p.fk_idporte INNER JOIN responsaveis r ON r.idresponsavel = p.fk_idresponsavel INNER JOIN ongs o ON o.idong = p.fk_idong INNER JOIN status s ON s.idstatus = p.fk_idstatus '

    const queryOrderby = 'ORDER BY p.idpet'

    const querytext = querySelect + queryInnerJoin + queryOrderby;

    const [rows] = await banco.query(querytext); //Manda a queryText pro banco
    return rows; // Retorna só os dados
};

const GetById = async (id) => {
    const querySelect = 'SELECT p.idpet, p.nome, sp.sexopet, ep.especie, pp.porte, o.nome AS nome_ong, p.peso, p.idade, p.vacinado, p.descricao, p.fotos, p.data_post, p.data_att, s.status FROM pets p ';

    const queryInnerJoin = 'INNER JOIN sexospet sp ON sp.idsexopet = p.fk_idsexopet INNER JOIN especiespet ep ON ep.idespeciepet = p.fk_idespecie INNER JOIN racaspet rp ON rp.idracapet = p.fk_idraca INNER JOIN portespet pp ON pp.idportepet = p.fk_idporte INNER JOIN responsaveis r ON r.idresponsavel = p.fk_idresponsavel INNER JOIN ongs o ON o.idong = p.fk_idong INNER JOIN status s ON s.idstatus = p.fk_idstatus '

    const queryWhere = 'WHERE p.idpet = ?'

    const querytext = querySelect + queryInnerJoin + queryWhere;

    const [rows] = await banco.query(querytext, [id]); //Manda a queryText pro banco
    return rows; // Retorna só os dados
};

const Post = async (nome, fk_idsexopet, fk_idespecie, fk_idraca, fk_idporte, fk_idresponsavel, fk_idong, peso, idade, descricao, fotos, fk_idstatus) => {
    const querySelect = 'INSERT INTO pets(nome, fk_idsexopet, fk_idespecie, fk_idraca, fk_idporte, fk_idresponsavel, fk_idong, peso, idade, descricao, fotos, fk_idstatus) ';
    const queryValues = ' VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

    querytext = querySelect + queryValues;

    const [result] = await banco.query(querytext, [nome, fk_idsexopet, fk_idespecie, fk_idraca, fk_idporte, fk_idresponsavel, fk_idong, peso, idade, descricao, fotos, fk_idstatus]); //Manda a queryText pro banco
    return { id: result.insertId, nome, fk_idsexopet, fk_idespecie, fk_idraca, fk_idporte, fk_idresponsavel, fk_idong, peso, idade, descricao, fotos, fk_idstatus }; // Retorna o novo registro criado
};

const Put = async (id, nome, fk_idsexopet, fk_idespecie, fk_idraca, fk_idporte, fk_idresponsavel, fk_idong, peso, idade, descricao, fotos, fk_idstatus) => {
    const querySelect = 'UPDATE pets SET nome = ?, fk_idsexopet = ?, fk_idespecie = ?, fk_idraca = ?, fk_idporte = ?, fk_idresponsavel = ?, fk_idong = ?, peso = ?, idade = ?, descricao = ?, fotos = ?, fk_idstatus = ?';
    const queryWhere = ' WHERE idpet = ?';

    querytext = querySelect + queryWhere;

    const [result] = await banco.query(querytext, [nome, fk_idsexopet, fk_idespecie, fk_idraca, fk_idporte, fk_idresponsavel, fk_idong, peso, idade, descricao, fotos, fk_idstatus, id]); //Manda a queryText pro banco
    return { id, nome, fk_idsexopet, fk_idespecie, fk_idraca, fk_idporte, fk_idresponsavel, fk_idong, peso, idade, descricao, fotos, fk_idstatus, linhasAfetadas: result.affectedRows }; // Retorna o registro alterado
};

const Erase = async (id) => {
    const querySelect = 'DELETE FROM pets';
    const queryWhere = ' WHERE idpet = ?';

    querytext = querySelect + queryWhere;

    const [rows] = await banco.query(querytext, [id]); //Manda a queryText pro banco
    return rows; // Retorna só os dados
};

module.exports = { GetAll, GetById, Post, Put, Erase };