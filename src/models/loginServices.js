// Este arquivo implementa o login, fornecendo funções assíncronas para fazer o login e alterar dados. 

const { banco } = require("./database"); // Chamando o banco

const Login = async (email) => {
    const querySelect = `SELECT 
                            u.idusuario, u.nome, u.email, u.telefone, u.data_nasc, u.cpf, u.senha, 
                            u.data_criacao, u.data_att, u.foto,
                            s.idsexo, s.sexo,
                            tu.descricao AS tipo,
                            r.rua, e.numero, e.cep,
                            b.bairro, c.cidade,
                            es.idestado,
                            es.sigla AS estado_sigla
                        FROM usuarios u `;

    const queryInnerJoin = `INNER JOIN sexo s ON s.idsexo = u.fk_idsexo
                            INNER JOIN enderecos e ON e.idendereco = u.fk_idendereco
                            INNER JOIN ruas r ON r.idrua = e.fk_idrua
                            INNER JOIN bairros b ON b.idbairro = e.fk_idbairro
                            INNER JOIN cidades c ON c.idcidade = e.fk_idcidade
                            LEFT JOIN estados es ON es.idestado = c.fk_idestado
                            INNER JOIN tipos_usuario tu ON tu.idtipo = u.fk_idtipo `;

    const queryWhere = 'WHERE u.email = ?'

    const querytext = querySelect + queryInnerJoin + queryWhere;

    const [rows] = await banco.query(querytext, [email]); //Manda a queryText pro banco
    return rows; // Retorna só os dados
};

module.exports = { Login }