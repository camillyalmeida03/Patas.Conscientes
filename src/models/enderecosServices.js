// Este arquivo implementa o CRUD da tabela enderecos, fornecendo funções assíncronas para listar, buscar por id, inserir, atualizar e excluir registros no banco de dados. 

const { banco } = require("./database"); // Chamando o banco

const GetAll = async () => {
    const querySelect = 'SELECT e.idendereco, r.rua, e.numero, b.bairro, c.cidade, uf.sigla, e.cep, e.complemento FROM enderecos e ';

    const queryInnerJoin = 'INNER JOIN estados uf ON uf.idestado = e.fk_idestado INNER JOIN cidades c ON c.idcidade = e.fk_idcidade INNER JOIN bairros b ON b.idbairro = e.fk_idbairro INNER JOIN ruas r ON r.idrua = e.fk_idrua '

    const queryOrderby = 'ORDER BY e.idendereco'

    const querytext = querySelect + queryInnerJoin + queryOrderby;

    const [rows] = await banco.query(querytext); //Manda a queryText pro banco
    return rows; // Retorna só os dados
};

const GetById = async (id) => {
    const querySelect = 'SELECT e.idendereco, r.rua, e.numero, b.bairro, c.cidade, uf.sigla, e.cep, e.complemento FROM enderecos e ';

    const queryInnerJoin = 'INNER JOIN estados uf ON uf.idestado = e.fk_idestado INNER JOIN cidades c ON c.idcidade = e.fk_idcidade INNER JOIN bairros b ON b.idbairro = e.fk_idbairro INNER JOIN ruas r ON r.idrua = e.fk_idrua ' 

    const queryWhere = 'WHERE e.idendereco = ?'

    const querytext = querySelect + queryInnerJoin + queryWhere;

    const [rows] = await banco.query(querytext, [id]); //Manda a queryText pro banco
    return rows; // Retorna só os dados
};

const Post = async (fk_idcidade, fk_idbairro, fk_idrua, fk_idestado, numero, cep, complemento) => {
    const querySelect = 'INSERT INTO enderecos(fk_idcidade, fk_idbairro, fk_idrua, fk_idestado, numero, cep, complemento) ';
    const queryValues = ' VALUES (?, ?, ?, ?, ?, ?, ?)';

    querytext = querySelect + queryValues;

    const [result] = await banco.query(querytext, [fk_idcidade, fk_idbairro, fk_idrua, fk_idestado, numero, cep, complemento]); //Manda a queryText pro banco
    return { id: result.insertId, fk_idcidade, fk_idbairro, fk_idrua, fk_idestado, numero, cep, complemento }; // Retorna o novo registro criado
};

const Put = async (id, fk_idcidade, fk_idbairro, fk_idrua, fk_idestado, numero, cep, complemento) => {
    const querySelect = 'UPDATE enderecos SET fk_idcidade = ?, fk_idbairro = ?, fk_idrua = ?, fk_idestado = ?, numero = ?, cep = ?, complemento = ?';
    const queryWhere = ' WHERE idendereco = ?';

    querytext = querySelect + queryWhere;

    const [result] = await banco.query(querytext, [fk_idcidade, fk_idbairro, fk_idrua, fk_idestado, numero, cep, complemento, id]); //Manda a queryText pro banco
    return { id, fk_idcidade, fk_idbairro, fk_idrua, fk_idestado, numero, cep, complemento, linhasAfetadas: result.affectedRows }; // Retorna o registro alterado
};

const Erase = async (id) => {
    const querySelect = 'DELETE FROM enderecos';
    const queryWhere = ' WHERE idendereco = ?';

    querytext = querySelect + queryWhere;

    const [rows] = await banco.query(querytext, [id]); //Manda a queryText pro banco
    return rows; // Retorna só os dados
};

module.exports = { GetAll, GetById, Post, Put, Erase };