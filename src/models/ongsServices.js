// Este arquivo implementa o CRUD da tabela ongs, fornecendo funções assíncronas para listar, buscar por id, inserir, atualizar e excluir registros no banco de dados. 

const { banco } = require("./database"); // Chamando o banco

const GetAll = async () => {
    const querySelect = 'SELECT o.idong, o.nome, o.cnpj, o.telefone, o.descricao, o.foto, o.banner, e.idendereco, r.rua, e.numero, r.rua, e.numero, b.bairro, c.cidade, es.sigla, e.cep, e.complemento, o.comp_estatuto, o.comp_cnpj, o.email, o.senha, o.data_criacao, o.data_att, tu.tipo FROM ongs o ';

    const queryInnerJoin = 'INNER JOIN enderecos e ON e.idendereco = o.fk_idendereco INNER JOIN estados es ON es.idestado = e.fk_idestado INNER JOIN cidades c ON c.idcidade = e.fk_idcidade INNER JOIN bairros b ON b.idbairro = e.fk_idbairro INNER JOIN ruas r ON r.idrua = e.fk_idrua INNER JOIN tipos_usuario tu ON tu.idtipo = o.fk_idtipo '

    const queryOrderby = 'ORDER BY o.idong'

    const querytext = querySelect + queryInnerJoin + queryOrderby;

    const [rows] = await banco.query(querytext); //Manda a queryText pro banco
    return rows; // Retorna só os dados
};

const GetById = async (id) => {
    const querySelect = 'SELECT o.idong, o.nome, o.cnpj, o.telefone, o.descricao, o.foto, o.banner, e.idendereco, r.rua, e.numero, r.rua, e.numero, b.bairro, c.cidade, es.sigla, e.cep, e.complemento, o.comp_estatuto, o.comp_cnpj, o.email, o.senha, o.data_criacao, o.data_att, tu.tipo FROM ongs o ';

    const queryInnerJoin = 'INNER JOIN enderecos e ON e.idendereco = o.fk_idendereco INNER JOIN estados es ON es.idestado = e.fk_idestado INNER JOIN cidades c ON c.idcidade = e.fk_idcidade INNER JOIN bairros b ON b.idbairro = e.fk_idbairro INNER JOIN ruas r ON r.idrua = e.fk_idrua INNER JOIN tipos_usuario tu ON tu.idtipo = o.fk_idtipo '

    const queryWhere = 'WHERE o.idong = ?'

    const querytext = querySelect + queryInnerJoin + queryWhere;

    const [rows] = await banco.query(querytext, [id]); //Manda a queryText pro banco
    return rows; // Retorna só os dados
};

const Post = async (nome, cnpj, telefone, descricao, fk_idendereco, comp_estatuto, comp_cnpj, email, senha, fk_idtipo) => {
    const querySelect = 'INSERT INTO ongs(nome, cnpj, telefone, descricao, fk_idendereco, comp_estatuto, comp_cnpj, email, senha, fk_idtipo) ';
    const queryValues = ' VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

    querytext = querySelect + queryValues;

    const [result] = await banco.query(querytext, [nome, cnpj, telefone, descricao, fk_idendereco, comp_estatuto, comp_cnpj, email, senha, fk_idtipo]); //Manda a queryText pro banco
    return { id: result.insertId, nome, cnpj, telefone, descricao, fk_idendereco, comp_estatuto, comp_cnpj, email, senha, fk_idtipo }; // Retorna o novo registro criado
};

const Put = async (id, nome, telefone, descricao, fk_idendereco, email, senha, foto, banner) => {
    const querySelect = 'UPDATE ongs SET nome = ?, telefone = ?,descricao = ?, fk_idendereco = ?, email = ?, senha = ?, foto = ?, banner = ?';
    const queryWhere = ' WHERE idong = ?';

    querytext = querySelect + queryWhere;

    const [result] = await banco.query(querytext, [nome, telefone, descricao, fk_idendereco, email, senha, foto, banner, id]); //Manda a queryText pro banco
    return { id, nome, telefone, descricao, fk_idendereco, email, senha, foto, banner, linhasAfetadas: result.affectedRows }; // Retorna o registro alterado
};

const Erase = async (id) => {
    const querySelect = 'DELETE FROM ongs';
    const queryWhere = ' WHERE idong = ?';

    querytext = querySelect + queryWhere;

    const [rows] = await banco.query(querytext, [id]); //Manda a queryText pro banco
    return rows; // Retorna só os dados
};

// No final do arquivo ongsServices.js, ANTES do module.exports:

const atualizarResponsavel = async (id, fk_idresponsavel) => {
    // Atualiza APENAS a chave estrangeira
    const queryText = 'UPDATE ongs SET fk_idresponsavel = ? WHERE idong = ?';
    const [result] = await banco.query(queryText, [fk_idresponsavel, id]);
    return { id, fk_idresponsavel, linhasAfetadas: result.affectedRows };
};

module.exports = { GetAll, GetById, Post, Put, Erase, atualizarResponsavel };