// Este arquivo implementa o CRUD da tabela racaspets, fornecendo funções assíncronas para listar, buscar por id, inserir, atualizar e excluir registros no banco de dados. 

const { banco } = require("./database"); // Chamando o banco

const GetAll = async () => {
    const querySelect = 'SELECT rp.idracapet, rp.raca, ep.especie FROM racaspet rp ';

    const queryInnerJoin = 'INNER JOIN especiespet ep ON rp.fk_idespeciepet = ep.idespeciepet '

    const queryOrderby = 'ORDER BY rp.idracapet'

    const querytext = querySelect + queryInnerJoin + queryOrderby;

    const [rows] = await banco.query(querytext); //Manda a queryText pro banco
    return rows; // Retorna só os dados
};

const GetById = async (id) => {
    const querySelect = 'SELECT rp.idracapet, rp.raca, ep.especie FROM racaspet rp ';

    const queryInnerJoin = 'INNER JOIN especiespet ep ON rp.fk_idespeciepet = ep.idespeciepet '

    const queryWhere = 'WHERE rp.idracapet = ?'

    const querytext = querySelect + queryInnerJoin + queryWhere;

    const [rows] = await banco.query(querytext, [id]); //Manda a queryText pro banco
    return rows; // Retorna só os dados
};

const Post = async (raca, fk_idespeciepet) => {
    // 1 - Verifica se já existe essa raça para a espécie informada
    const queryCheck = 'SELECT idracapet FROM racaspet WHERE raca = ? AND fk_idespeciepet = ?';
    const [rows] = await banco.query(queryCheck, [raca, fk_idespeciepet]);

    if (rows.length > 0) {
        return {
            message: "Esta raça já está cadastrada para essa espécie!",
            id: rows[0].idracapet,
            raca,
            fk_idespeciepet
        };
    }

    // 2 - Se não existe → insere
    const queryInsert = 'INSERT INTO racaspet(raca, fk_idespeciepet) VALUES (?, ?)';
    const [result] = await banco.query(queryInsert, [raca, fk_idespeciepet]);

    return { id: result.insertId, raca, fk_idespeciepet };
};


const Put = async (id, raca, fk_idespeciepet) => {
    const querySelect = 'UPDATE racaspet SET raca = ?, fk_idespeciepet = ?';
    const queryWhere = ' WHERE idracapet = ?';

    querytext = querySelect + queryWhere;

    const [result] = await banco.query(querytext, [raca, fk_idespeciepet, id]); //Manda a queryText pro banco
    return { id, raca, fk_idespeciepet, linhasAfetadas: result.affectedRows }; // Retorna o registro alterado
};

const Erase = async (id) => {
    const querySelect = 'DELETE FROM racaspet';
    const queryWhere = ' WHERE idracapet = ?';

    querytext = querySelect + queryWhere;

    const [rows] = await banco.query(querytext, [id]); //Manda a queryText pro banco
    return rows; // Retorna só os dados
};

module.exports = { GetAll, GetById, Post, Put, Erase };