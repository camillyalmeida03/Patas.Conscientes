// Este arquivo implementa o CRUD da tabela usuarios, fornecendo funções assíncronas para listar, buscar por id, inserir, atualizar e excluir registros no banco de dados. 

const { banco } = require("./database"); // Chamando o banco

const GetAll = async () => {
    const querySelect = 'SELECT u.idusuario, u.nome, u.email, u.telefone, s.sexo, u.data_nasc, u.cpf, u.senha, u.data_criacao, u.data_att, u.foto,  u.fk_idendereco, r.rua, e.numero, b.bairro, c.cidade, es.sigla FROM usuarios u ';

    const queryInnerJoin = 'INNER JOIN sexo s ON s.idsexo = u.fk_idsexo INNER JOIN enderecos e ON e.idendereco = u.fk_idendereco INNER JOIN estados es ON es.idestado = e.fk_idestado INNER JOIN cidades c ON c.idcidade = e.fk_idcidade INNER JOIN bairros b ON b.idbairro = e.fk_idbairro INNER JOIN ruas r ON r.idrua = e.fk_idrua INNER JOIN tipos_usuario tu ON tu.idtipo = u.fk_idtipo '

    const queryOrderby = 'ORDER BY u.idusuario'

    const querytext = querySelect + queryInnerJoin + queryOrderby;

    const [rows] = await banco.query(querytext); //Manda a queryText pro banco
    return rows; // Retorna só os dados
};

const GetById = async (id) => {
    const querySelect = 'SELECT u.idusuario, u.nome, u.email, u.telefone, s.sexo, u.data_nasc, u.cpf, u.senha, u.data_criacao, u.data_att, u.foto,  u.fk_idendereco, r.rua, e.numero, b.bairro, c.cidade, es.sigla FROM usuarios u ';

    const queryInnerJoin = 'INNER JOIN sexo s ON s.idsexo = u.fk_idsexo INNER JOIN enderecos e ON e.idendereco = u.fk_idendereco INNER JOIN estados es ON es.idestado = e.fk_idestado INNER JOIN cidades c ON c.idcidade = e.fk_idcidade INNER JOIN bairros b ON b.idbairro = e.fk_idbairro INNER JOIN ruas r ON r.idrua = e.fk_idrua INNER JOIN tipos_usuario tu ON tu.idtipo = u.fk_idtipo '

    const queryWhere = 'WHERE u.idusuario = ?'

    const querytext = querySelect + queryInnerJoin + queryWhere;

    const [rows] = await banco.query(querytext, [id]); //Manda a queryText pro banco
    return rows; // Retorna só os dados
};

const Post = async (nome, email, telefone, fk_idsexo, data_nasc, cpf, senha, foto, fk_idendereco, fk_idtipo) => {
    const querySelect = 'INSERT INTO usuarios(nome, email, telefone, fk_idsexo, data_nasc, cpf, senha, foto, fk_idendereco, fk_idtipo) ';
    const queryValues = ' VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

    querytext = querySelect + queryValues;

    const [result] = await banco.query(querytext, [nome, email, telefone, fk_idsexo, data_nasc, cpf, senha, foto, fk_idendereco, fk_idtipo]); //Manda a queryText pro banco
    return { id: result.insertId, nome, email, telefone, fk_idsexo, data_nasc, cpf, senha, foto, fk_idendereco, fk_idtipo }; // Retorna o novo registro criado
};

const Put = async (id, nome, telefone, fk_idsexo, senha, foto, fk_idendereco, fk_idtipo) => {
    const querySelect = 'UPDATE usuarios SET nome = ?, telefone = ?, fk_idsexo = ?, senha = ?, foto = ?, fk_idendereco = ?, fk_idtipo = ?';
    const queryWhere = ' WHERE idusuario = ?';

    querytext = querySelect + queryWhere;

    const [result] = await banco.query(querytext, [nome, telefone, fk_idsexo, senha, foto, fk_idendereco, fk_idtipo, id]); //Manda a queryText pro banco
    return { id, nome, telefone, fk_idsexo, senha, foto, fk_idendereco, fk_idtipo, linhasAfetadas: result.affectedRows }; // Retorna o registro alterado
};

const Erase = async (id) => {
    const querySelect = 'DELETE FROM usuarios';
    const queryWhere = ' WHERE idusuario = ?';

    querytext = querySelect + queryWhere;

    const [rows] = await banco.query(querytext, [id]); //Manda a queryText pro banco
    return rows; // Retorna só os dados
};

module.exports = { GetAll, GetById, Post, Put, Erase };