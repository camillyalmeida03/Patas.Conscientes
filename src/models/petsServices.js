// petsServices.js
const { banco } = require("./database");

const GetAll = async () => {
    const querySelect = 'SELECT p.idpet, p.nome, sp.sexopet, ep.especie, rp.raca, pp.porte, o.nome AS nome_ong, p.peso, p.idade, p.vacinado, p.descricao, p.fotos, p.data_post, p.data_att, s.status FROM pets p ';
    const queryInnerJoin = 'INNER JOIN sexospet sp ON sp.idsexopet = p.fk_idsexopet INNER JOIN especiespet ep ON ep.idespeciepet = p.fk_idespecie INNER JOIN racaspet rp ON rp.idracapet = p.fk_idraca INNER JOIN portespet pp ON pp.idportepet = p.fk_idporte INNER JOIN ongs o ON o.idong = p.fk_idong INNER JOIN status s ON s.idstatus = p.fk_idstatus ';
    const queryOrderby = 'ORDER BY p.idpet';
    const querytext = querySelect + queryInnerJoin + queryOrderby;
    const [rows] = await banco.query(querytext);
    return rows;
};

const GetById = async (id) => {
    const querySelect = 'SELECT p.idpet, p.nome, sp.sexopet, ep.especie, rp.raca, pp.porte, o.nome AS nome_ong, p.peso, p.idade, p.vacinado, p.descricao, p.fotos, p.data_post, p.data_att, s.status FROM pets p ';
    const queryInnerJoin = 'INNER JOIN sexospet sp ON sp.idsexopet = p.fk_idsexopet INNER JOIN especiespet ep ON ep.idespeciepet = p.fk_idespecie INNER JOIN racaspet rp ON rp.idracapet = p.fk_idraca INNER JOIN portespet pp ON pp.idportepet = p.fk_idporte INNER JOIN ongs o ON o.idong = p.fk_idong INNER JOIN status s ON s.idstatus = p.fk_idstatus ';
    const queryWhere = 'WHERE p.idpet = ?';
    const querytext = querySelect + queryInnerJoin + queryWhere;
    const [rows] = await banco.query(querytext, [id]);
    return rows;
};

// CORREÇÃO: Removido fk_idresponsavel e corrigido a sintaxe SQL
const Post = async (nome, fk_idsexopet, fk_idespecie, fk_idraca, fk_idporte, fk_idong, peso, idade, descricao, fotos, fk_idstatus) => {
    // 11 colunas
    const querySelect = 'INSERT INTO pets(nome, fk_idsexopet, fk_idespecie, fk_idraca, fk_idporte, fk_idong, peso, idade, descricao, fotos, fk_idstatus)';
    // 11 placeholders
    const queryValues = ' VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    const querytext = querySelect + queryValues;

    // 11 parâmetros
    const [result] = await banco.query(querytext, [nome, fk_idsexopet, fk_idespecie, fk_idraca, fk_idporte, fk_idong, peso, idade, descricao, fotos, fk_idstatus]);
    return { id: result.insertId, nome, fk_idsexopet, fk_idespecie, fk_idraca, fk_idporte, fk_idong, peso, idade, descricao, fotos, fk_idstatus };
};

// CORREÇÃO: Removido fk_idresponsavel e corrigido a sintaxe SQL
const Put = async (id, nome, fk_idsexopet, fk_idespecie, fk_idraca, fk_idporte, fk_idong, peso, idade, descricao, fotos, fk_idstatus) => {
    // A query estava com um '= ?' a mais no final
    const querySelect = 'UPDATE pets SET nome = ?, fk_idsexopet = ?, fk_idespecie = ?, fk_idraca = ?, fk_idporte = ?, fk_idong = ?, peso = ?, idade = ?, descricao = ?, fotos = ?, fk_idstatus = ?';
    const queryWhere = ' WHERE idpet = ?';
    const querytext = querySelect + queryWhere;

    // 11 parâmetros + id
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

// Lógica para inserir Raça com Espécie e depois o Pet (sem fk_idresponsavel)
const PostPeloNomeDaRaca = async (nome, fk_idsexopet, fk_idespecie, nomeRaca, fk_idporte, fk_idong, peso, idade, descricao, fotos, fk_idstatus) => {
    
    let fk_idraca = await GetRacaIdByName(nomeRaca);

    if (!fk_idraca) {
        // Se a raça não existe, cria.
        const queryRaca = 'INSERT INTO racaspet(raca, fk_idespeciepet) VALUES (?, ?)';
        const [resultRaca] = await banco.query(queryRaca, [nomeRaca, fk_idespecie]);
        fk_idraca = resultRaca.insertId;
    }

    // Chama o Post padrão (sem fk_idresponsavel)
    return await Post(nome, fk_idsexopet, fk_idespecie, fk_idraca, fk_idporte, fk_idong, peso, idade, descricao, fotos, fk_idstatus);
};

module.exports = { GetAll, GetById, Post, Put, Erase, PostPeloNomeDaRaca, UpdateFoto };