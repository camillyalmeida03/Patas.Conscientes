// ongsServices.js
const { banco } = require("./database");

const GetAll = async () => {
    const querySelect = 'SELECT o.idong, o.nome, o.cnpj, o.telefone, o.descricao, o.foto, o.banner, e.idendereco, r.rua, e.numero, r.rua, e.numero, b.bairro, c.cidade, es.sigla, e.cep, e.complemento, o.comp_estatuto, o.comp_cnpj, o.email, o.senha, o.data_criacao, o.data_att, tu.tipo FROM ongs o ';

    const queryInnerJoin = 'INNER JOIN enderecos e ON e.idendereco = o.fk_idendereco INNER JOIN estados es ON es.idestado = e.fk_idestado INNER JOIN cidades c ON c.idcidade = e.fk_idcidade INNER JOIN bairros b ON b.idbairro = e.fk_idbairro INNER JOIN ruas r ON r.idrua = e.fk_idrua INNER JOIN tipos_usuario tu ON tu.idtipo = o.fk_idtipo '

    const queryOrderby = 'ORDER BY o.idong'

    const querytext = querySelect + queryInnerJoin + queryOrderby;

    const [rows] = await banco.query(querytext);
    return rows;
};

const GetById = async (id) => {
    const querySelect = 'SELECT o.idong, resp.fk_idusuario AS id_dono, o.fk_idresponsavel, o.nome, o.cnpj, o.telefone, o.descricao, o.foto, o.banner, e.idendereco, r.rua, e.numero, r.rua, e.numero, b.bairro, c.cidade, es.sigla, e.cep, e.complemento, o.comp_estatuto, o.comp_cnpj, o.email, o.senha, o.data_criacao, o.data_att, tu.tipo FROM ongs o ';
    const queryInnerJoin = 'LEFT JOIN responsaveis resp ON resp.idresponsavel = o.fk_idresponsavel INNER JOIN enderecos e ON e.idendereco = o.fk_idendereco INNER JOIN estados es ON es.idestado = e.fk_idestado INNER JOIN cidades c ON c.idcidade = e.fk_idcidade INNER JOIN bairros b ON b.idbairro = e.fk_idbairro INNER JOIN ruas r ON r.idrua = e.fk_idrua INNER JOIN tipos_usuario tu ON tu.idtipo = o.fk_idtipo '

    const queryWhere = 'WHERE o.idong = ?'

    const querytext = querySelect + queryInnerJoin + queryWhere;

    const [rows] = await banco.query(querytext, [id]);
    return rows;
};

const Post = async (nome, cnpj, telefone, descricao, fk_idendereco, comp_estatuto, comp_cnpj, email, senha, fk_idtipo) => {
    const querySelect = 'INSERT INTO ongs(nome, cnpj, telefone, descricao, fk_idendereco, comp_estatuto, comp_cnpj, email, senha, fk_idtipo) ';
    const queryValues = ' VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

    const querytext = querySelect + queryValues;

    const [result] = await banco.query(querytext, [nome, cnpj, telefone, descricao, fk_idendereco, comp_estatuto, comp_cnpj, email, senha, fk_idtipo]);
    return { id: result.insertId, nome, cnpj, telefone, descricao, fk_idendereco, comp_estatuto, comp_cnpj, email, senha, fk_idtipo };
};

const Put = async (id, nome, telefone, descricao, fk_idendereco, email, senha, foto, banner) => {
    const querySelect = 'UPDATE ongs SET nome = ?, telefone = ?,descricao = ?, fk_idendereco = ?, email = ?, senha = ?, foto = ?, banner = ?';
    const queryWhere = ' WHERE idong = ?';

    const querytext = querySelect + queryWhere;

    const [result] = await banco.query(querytext, [nome, telefone, descricao, fk_idendereco, email, senha, foto, banner, id]);
    return { id, nome, telefone, descricao, fk_idendereco, email, senha, foto, banner, linhasAfetadas: result.affectedRows };
};

const Erase = async (id) => {
    const querySelect = 'DELETE FROM ongs';
    const queryWhere = ' WHERE idong = ?';

    const querytext = querySelect + queryWhere;

    const [rows] = await banco.query(querytext, [id]);
    return rows;
};

const atualizarResponsavel = async (id, fk_idresponsavel) => {
    const queryText = 'UPDATE ongs SET fk_idresponsavel = ? WHERE idong = ?';
    const [result] = await banco.query(queryText, [fk_idresponsavel, id]);
    return { id, fk_idresponsavel, linhasAfetadas: result.affectedRows };
};


const UpdateFoto = async (id, caminhoFoto) => {
    const queryText = 'UPDATE ongs SET foto = ? WHERE idong = ?';
    const [result] = await banco.query(queryText, [caminhoFoto, id]);
    return result.affectedRows;
};

const UpdateBanner = async (id, caminhoBanner) => {
    const queryText = 'UPDATE ongs SET banner = ? WHERE idong = ?';
    const [result] = await banco.query(queryText, [caminhoBanner, id]);
    return result.affectedRows;
};

module.exports = { GetAll, GetById, Post, Put, Erase, atualizarResponsavel, UpdateFoto, UpdateBanner };