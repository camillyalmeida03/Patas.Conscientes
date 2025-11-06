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
    try {
        const querySelect = 'INSERT INTO usuarios(nome, email, telefone, fk_idsexo, data_nasc, cpf, senha, foto, fk_idendereco, fk_idtipo) ';
        const queryValues = ' VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        const querytext = querySelect + queryValues;

        const [result] = await banco.query(querytext, [
            nome, email, telefone, fk_idsexo, data_nasc, cpf, senha, foto, fk_idendereco, fk_idtipo
        ]);

        return {
            success: true,
            message: "Usuário cadastrado com sucesso!",
            data: { id: result.insertId, nome, email, telefone, fk_idsexo, data_nasc, cpf, senha, foto, fk_idendereco, fk_idtipo }
        };
    } catch (error) {
        if (error.code === "ER_DUP_ENTRY") {
            if (error.sqlMessage.includes("cpf")) {
                return { success: false, message: "CPF já cadastrado." };
            }
            if (error.sqlMessage.includes("email")) {
                return { success: false, message: "E-mail já cadastrado." };
            }
            return { success: false, message: "Usuário já cadastrado." };
        }

        console.error(error);
        return { success: false, message: "Erro interno ao cadastrar usuário." };
    }
};


const Put = async (id, nome, telefone, fk_idsexo, senha, foto, fk_idendereco, fk_idtipo) => {
    const queryUpdate = `
    UPDATE usuarios 
    SET nome = ?, telefone = ?, fk_idsexo = ?, senha = ?, foto = ?, fk_idendereco = ?, fk_idtipo = ?
    WHERE idusuario = ?
`;
    const [result] = await banco.query(queryUpdate, [nome, telefone, fk_idsexo, senha, foto, fk_idendereco, fk_idtipo, id]);
    //Manda a queryText pro banco
    return { id, nome, telefone, fk_idsexo, senha, foto, fk_idendereco, fk_idtipo, linhasAfetadas: result.affectedRows }; // Retorna o registro alterado
};

const Erase = async (id) => {
    const querySelect = 'DELETE FROM usuarios';
    const queryWhere = ' WHERE idusuario = ?';

    const querytext = querySelect + queryWhere;

    const [rows] = await banco.query(querytext, [id]); //Manda a queryText pro banco
    return rows; // Retorna só os dados
};

const PutEndereco = async (
    id,
    nome,
    fk_idsexo,
    estado,
    cidade,
    bairro,
    rua,
    numero,
    cep,
    complemento
) => {
    const conn = await banco.getConnection();

    try {
        await conn.beginTransaction();

        // Buscar ID do estado pela sigla
        const [[estadoRow]] = await conn.query(
            "SELECT idestado FROM estados WHERE sigla = ?",
            [estado]
        );

        if (!estadoRow) {
            throw new Error(`Estado '${estado}' não encontrado.`);
        }

        const idEstado = estadoRow.idestado;

        //  Verificar se o usuário já tem endereço
        const [usuario] = await conn.query(
            "SELECT fk_idendereco FROM usuarios WHERE idusuario = ?",
            [id]
        );

        const idEndereco = usuario[0]?.fk_idendereco;
        let idCidade, idBairro, idRua;

        if (!idEndereco) {
            // Criar cidade
            const [cRow] = await conn.query(
                "INSERT INTO cidades (cidade, fk_idestado) VALUES (?, ?)",
                [cidade, idEstado]
            );
            idCidade = cRow.insertId;

            // Criar bairro
            const [bRow] = await conn.query(
                "INSERT INTO bairros (bairro) VALUES (?)",
                [bairro]
            );
            idBairro = bRow.insertId;

            // Criar rua
            const [rRow] = await conn.query(
                "INSERT INTO ruas (rua) VALUES (?)",
                [rua]
            );
            idRua = rRow.insertId;

            // Criar endereço
            const [endRow] = await conn.query(
                `INSERT INTO enderecos 
          (numero, cep, complemento, fk_idrua, fk_idbairro, fk_idcidade)
         VALUES (?, ?, ?, ?, ?, ?)`,
                [numero, cep, complemento || "", idRua, idBairro, idCidade]
            );

            // Atualizar usuário com o endereço
            await conn.query(
                `UPDATE usuarios 
         SET nome = ?, fk_idsexo = ?, fk_idendereco = ?
         WHERE idusuario = ?`,
                [nome, fk_idsexo, endRow.insertId, id]
            );

            await conn.commit();
            return { success: true, message: "Endereço criado e dados atualizados!" };
        }

        const [info] = await conn.query(
            `SELECT 
        r.idrua,
        b.idbairro,
        c.idcidade
      FROM enderecos e
      INNER JOIN ruas r ON r.idrua = e.fk_idrua
      INNER JOIN bairros b ON b.idbairro = e.fk_idbairro
      INNER JOIN cidades c ON c.idcidade = e.fk_idcidade
      WHERE e.idendereco = ?`,
            [idEndereco]
        );

        idRua = info[0].idrua;
        idBairro = info[0].idbairro;
        idCidade = info[0].idcidade;

        // Atualizar cidade com o ID do estado correto
        await conn.query(
            "UPDATE cidades SET cidade = ?, fk_idestado = ? WHERE idcidade = ?",
            [cidade, idEstado, idCidade]
        );

        // Atualizar bairro
        await conn.query(
            "UPDATE bairros SET bairro = ? WHERE idbairro = ?",
            [bairro, idBairro]
        );

        // Atualizar rua
        await conn.query(
            "UPDATE ruas SET rua = ? WHERE idrua = ?",
            [rua, idRua]
        );

        // Atualizar endereço
        await conn.query(
            `UPDATE enderecos 
        SET numero = ?, cep = ?, complemento = ?
        WHERE idendereco = ?`,
            [numero, cep, complemento || "", idEndereco]
        );

        // Atualizar dados do usuário
        await conn.query(
            `UPDATE usuarios 
        SET nome = ?, fk_idsexo = ?
        WHERE idusuario = ?`,
            [nome, fk_idsexo, id]
        );

        await conn.commit();
        return { success: true, message: "Endereço e dados atualizados!" };

    } catch (error) {
        await conn.rollback();
        console.error("Erro PutEndereco:", error);
        return { success: false, message: "Erro ao atualizar dados." };
    } finally {
        conn.release();
    }
};

module.exports = {
    GetAll,
    GetById,
    Post,
    Put,
    Erase,
    PutEndereco 
};
