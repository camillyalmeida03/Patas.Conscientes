// petsServices.js
const { banco } = require("./database");

const GetAll = async () => {
    // CORREÇÃO AQUI: Adicionado 'p.fk_idong' no início do SELECT
    const querySelect = 'SELECT p.fk_idong, p.idpet, p.nome, sp.sexopet, ep.especie, rp.raca, pp.porte, o.nome AS nome_ong, p.peso, p.idade, p.vacinado, p.descricao, p.fotos, p.data_post, p.data_att, s.status FROM pets p ';
    
    const queryInnerJoin = 'INNER JOIN sexospet sp ON sp.idsexopet = p.fk_idsexopet INNER JOIN especiespet ep ON ep.idespeciepet = p.fk_idespecie INNER JOIN racaspet rp ON rp.idracapet = p.fk_idraca INNER JOIN portespet pp ON pp.idportepet = p.fk_idporte INNER JOIN ongs o ON o.idong = p.fk_idong INNER JOIN status s ON s.idstatus = p.fk_idstatus ';
    const queryOrderby = 'ORDER BY p.idpet';
    const querytext = querySelect + queryInnerJoin + queryOrderby;
    
    const [rows] = await banco.query(querytext);
    return rows;
};

const GetById = async (id) => {
    // CORREÇÃO AQUI TAMBÉM: Adicionado 'p.fk_idong'
    const querySelect = 'SELECT p.fk_idong, p.idpet, p.nome, sp.sexopet, ep.especie, rp.raca, pp.porte, o.nome AS nome_ong, p.peso, p.idade, p.vacinado, p.descricao, p.fotos, p.data_post, p.data_att, s.status FROM pets p ';
    
    const queryInnerJoin = 'INNER JOIN sexospet sp ON sp.idsexopet = p.fk_idsexopet INNER JOIN especiespet ep ON ep.idespeciepet = p.fk_idespecie INNER JOIN racaspet rp ON rp.idracapet = p.fk_idraca INNER JOIN portespet pp ON pp.idportepet = p.fk_idporte INNER JOIN ongs o ON o.idong = p.fk_idong INNER JOIN status s ON s.idstatus = p.fk_idstatus ';
    const queryWhere = 'WHERE p.idpet = ?';
    const querytext = querySelect + queryInnerJoin + queryWhere;
    
    const [rows] = await banco.query(querytext, [id]);
    return rows;
};

const Post = async (nome, fk_idsexopet, fk_idespecie, fk_idraca, fk_idporte, fk_idong, peso, idade, descricao, fotos, fk_idstatus) => {
    const querySelect = 'INSERT INTO pets(nome, fk_idsexopet, fk_idespecie, fk_idraca, fk_idporte, fk_idong, peso, idade, descricao, fotos, fk_idstatus)';
    const queryValues = ' VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    const querytext = querySelect + queryValues;

    const [result] = await banco.query(querytext, [nome, fk_idsexopet, fk_idespecie, fk_idraca, fk_idporte, fk_idong, peso, idade, descricao, fotos, fk_idstatus]);
    return { id: result.insertId, nome, fk_idsexopet, fk_idespecie, fk_idraca, fk_idporte, fk_idong, peso, idade, descricao, fotos, fk_idstatus };
};

const Put = async (id, nome, fk_idsexopet, fk_idespecie, fk_idraca, fk_idporte, fk_idong, peso, idade, descricao, fotos, fk_idstatus) => {
    const querySelect = 'UPDATE pets SET nome = ?, fk_idsexopet = ?, fk_idespecie = ?, fk_idraca = ?, fk_idporte = ?, fk_idong = ?, peso = ?, idade = ?, descricao = ?, fotos = ?, fk_idstatus = ?';
    const queryWhere = ' WHERE idpet = ?';
    const querytext = querySelect + queryWhere;

    const [result] = await banco.query(querytext, [nome, fk_idsexopet, fk_idespecie, fk_idraca, fk_idporte, fk_idong, peso, idade, descricao, fotos, fk_idstatus, id]);
    return { id, nome, linhasAfetadas: result.affectedRows };
};

const UpdateFoto = async (id, caminhoFoto) => {
    const queryText = 'UPDATE pets SET fotos = ? WHERE idpet = ?';
    const [result] = await banco.query(queryText, [caminhoFoto, id]);
    return result.affectedRows;
};

const Erase = async (id) => {
    const querySelect = 'DELETE FROM pets';
    const queryWhere = ' WHERE idpet = ?';
    const querytext = querySelect + queryWhere;
    const [rows] = await banco.query(querytext, [id]);
    return rows;
};

const GetRacaIdByName = async (nomeRaca) => {
    const queryText = 'SELECT idracapet FROM racaspet WHERE raca LIKE ?';
    const [rows] = await banco.query(queryText, [nomeRaca]);
    return rows.length > 0 ? rows[0].idracapet : null;
};

const PostPeloNomeDaRaca = async (nome, fk_idsexopet, fk_idespecie, nomeRaca, fk_idporte, fk_idong, peso, idade, descricao, fotos, fk_idstatus) => {
    
    let fk_idraca = await GetRacaIdByName(nomeRaca);

    if (!fk_idraca) {
        const queryRaca = 'INSERT INTO racaspet(raca, fk_idespeciepet) VALUES (?, ?)';
        const [resultRaca] = await banco.query(queryRaca, [nomeRaca, fk_idespecie]);
        fk_idraca = resultRaca.insertId;
    }

    return await Post(nome, fk_idsexopet, fk_idespecie, fk_idraca, fk_idporte, fk_idong, peso, idade, descricao, fotos, fk_idstatus);
};

module.exports = { GetAll, GetById, Post, Put, Erase, PostPeloNomeDaRaca, UpdateFoto };