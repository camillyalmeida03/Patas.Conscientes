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

  const queryWhere = "WHERE u.email = ?";

  const querytext = querySelect + queryInnerJoin + queryWhere;

  const [rows] = await banco.query(querytext, [email]); //Manda a queryText pro banco
  return rows; // Retorna só os dados
};

const LoginOng = async (email) => {
  const querySelect = `SELECT 
                            o.idong, o.nome, o.cnpj, o.telefone, o.descricao, 
                            o.foto, o.banner, o.email, o.senha, 
                            o.comp_estatuto, o.comp_cnpj,
                            o.data_criacao, o.data_att,

                            e.idendereco, e.numero, e.cep, e.complemento,

                            r.rua,
                            b.bairro,
                            c.cidade,

                            es.idestado,
                            es.sigla AS estado_sigla,
                            tu.tipo AS tipo_usuario
                        FROM ongs o `;

  const queryInnerJoin = `INNER JOIN enderecos e ON e.idendereco = o.fk_idendereco
                            INNER JOIN ruas r ON r.idrua = e.fk_idrua
                            INNER JOIN bairros b ON b.idbairro = e.fk_idbairro
                            INNER JOIN cidades c ON c.idcidade = e.fk_idcidade
                            INNER JOIN estados es ON es.idestado = e.fk_idestado
                            INNER JOIN tipos_usuario tu ON tu.idtipo = o.fk_idtipo `;

  const queryWhere = `WHERE o.email = ?`;

  const querytext = querySelect + queryInnerJoin + queryWhere;

  const [rows] = await banco.query(querytext, [email]);
  return rows;
};

const BuscarOngDoUsuario = async (idusuario) => {
  const query = `
    SELECT 
      o.idong, o.nome, o.cnpj, o.telefone, o.descricao, 
      o.foto, o.banner, o.email, o.senha, 
      o.comp_estatuto, o.comp_cnpj,
      o.data_criacao, o.data_att,

      e.idendereco, e.numero, e.cep, e.complemento,

      r.rua,
      b.bairro,
      c.cidade,

      es.idestado,
      es.sigla AS estado_sigla,
      tu.tipo AS tipo_usuario

    FROM responsaveis resp
    JOIN ongs o ON o.idong = resp.fk_idong
    INNER JOIN enderecos e ON e.idendereco = o.fk_idendereco
    INNER JOIN ruas r ON r.idrua = e.fk_idrua
    INNER JOIN bairros b ON b.idbairro = e.fk_idbairro
    INNER JOIN cidades c ON c.idcidade = e.fk_idcidade
    INNER JOIN estados es ON es.idestado = e.fk_idestado
    INNER JOIN tipos_usuario tu ON tu.idtipo = o.fk_idtipo

    WHERE resp.fk_idusuario = ?
  `;

  const [rows] = await banco.query(query, [idusuario]);
  return rows.length > 0 ? rows[0] : null;
};


const LoginUnificado = async (email) => {
  const usuarioRows = await Login(email);

  // Se for usuário
  if (usuarioRows.length > 0) {
    const usuario = usuarioRows[0];

    // Buscar ONG vinculada ao usuário
    const ongVinculada = await BuscarOngDoUsuario(usuario.idusuario);

    return {
      usuario,
      ong: ongVinculada,
    };
  }

  // Se não for usuário, pode ser ONG
  const ongRows = await LoginOng(email);

  return {
    usuario: null,
    ong: ongRows.length > 0 ? ongRows[0] : null,
  };
};


module.exports = { Login, LoginOng, LoginUnificado };
