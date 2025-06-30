const express = require('express');

const {banco} = require("./database")

const bcrypt = require("bcrypt");

const UAParser = require('ua-parser-js');

const { enviarEmailRecuperacao, enviaremailcriacao, enviaremailexclusao, enviarEmailLogin } = require('../utils/emailService');


const GetAll = async (request, response) => {
    try {
        const data = await banco.query("SELECT * FROM usuarios");
        response.status(200).send(data[0]);
    } catch (error) {
        console.log("Erro ao conectar ao banco de dados: ", error.message);
        response.status(401).send({"message": "Falha ao executar a ação!"})
    } 
};

const GetById = async (request, response) => {
    try {
        const id = request.params.id;
        const data = await banco.query("SELECT * FROM usuarios WHERE id=?", [id]);
        response.status(200).send(data[0]);
    } catch (error) {
        console.log("Erro ao conectar ao banco de dados: ", error.message);
        response.status(401).send({"message": "Falha ao executar a ação!"})
    }
};

const Erase = async (request, response) => {
    try {
        const id = request.params.id;
        const data = await banco.query("DELETE FROM usuarios WHERE id=?", [id]);
        response.status(200).send(data[0]);
    } catch (error) {
        console.log("Erro ao conectar ao banco de dados: ", error.message);
        response.status(401).send({"message": "Falha ao executar a ação!"})
    }
};

const Create = async (request, response) => {
    try {
        const {nome, email, telefone, celular, senha, tipo} = request.body;

        // gera o hash da senha
        const saltRounds = 10;
        const senhaHash = await bcrypt.hash(senha, saltRounds);
        const foto = request.file ? `/uploads/foto_perfil/${request.file.filename}` : null;


        const data = await banco.query(
            'INSERT INTO usuarios ( nome, email, telefone, celular, senha, tipo, foto) VALUES( ?, ?, ?, ?, ?, ?, ?)',
            [nome, email, telefone, celular, senhaHash, tipo, foto]
        );

        response.status(200).send({ message: 'Usuário cadastrado com sucesso' });
    } catch (error) {
        console.log("Erro ao conectar ao banco de dados: ", error.message);
        response.status(401).send({ message: "Falha ao executar a ação!" });
    }
}

const Createadotante = async (request, response) => {
  try {
        const { nome, email, telefone, celular, senha, tipo } = request.body;

        // gera o hash da senha
        const saltRounds = 10;
        const senhaHash = await bcrypt.hash(senha, saltRounds);
        const foto = request.file ? `/uploads/foto_perfil/${request.file.filename}` : null;

        // inserir na tabela principal
        const [result] = await banco.query(
            'INSERT INTO usuarios (nome, email, telefone, celular, senha, foto, tipo) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [nome, email, telefone, celular, senhaHash, foto, tipo]
        );

        const usuario_id = result.insertId;

        // Inserir nas tabelas específicas conforme o tipo
        if (tipo === 'adotante') {
            const { sexo, data_nascimento, cpf } = request.body;
            await banco.query(
                'INSERT INTO adotante (usuario_id, sexo, data_nascimento, cpf) VALUES (?, ?, ?, ?)',
                [usuario_id, sexo, data_nascimento, cpf]
            );
        }

        response.status(200).send({ message: 'Usuário cadastrado com sucesso' });

    } catch (error) {
        console.log("Erro ao conectar ao banco de dados: ", error.message);
        response.status(401).send({ message: "Falha ao executar a ação!" });
    }
}
const Createong = async (request, response) => {
  try {
        const { nome, email, telefone, celular, senha, tipo } = request.body;

        // gera o hash da senha
        const saltRounds = 10;
        const senhaHash = await bcrypt.hash(senha, saltRounds);
        const foto = request.file ? `/uploads/foto_perfil/${request.file.filename}` : null;

        // inserir na tabela principal
        const [result] = await banco.query(
            'INSERT INTO usuarios (nome, email, telefone, celular, senha, foto, tipo) VALUES (?, ?, ?, ?, ?, ?, "ong")',
            [nome, email, telefone, celular, senhaHash, foto, tipo]
        );

        const usuario_id = result.insertId;

        // Inserir nas tabelas específicas conforme o tipo
        if (tipo === 'ong') {
            const { cnpj, nome_ong } = request.body;
            await banco.query(
                'INSERT INTO ongs (usuario_id, cnpj, nome_ong) VALUES (?, ?, ?)',
                [usuario_id, cnpj, nome_ong]
            );
        }

        response.status(200).send({ message: 'Usuário cadastrado com sucesso' });

    } catch (error) {
        console.log("Erro ao conectar ao banco de dados: ", error.message);
        response.status(401).send({ message: "Falha ao executar a ação!" });
    }
}


const Update = async (request, response) => {
    try {
        const id = request.params.id;
        const { nome, email, telefone, celular, senha, tipo } = request.body;
        const foto = request.file ? `/uploads/foto_perfil/${request.file.filename}` : null;

        const data = await banco.query(
            'UPDATE usuarios SET nome=?, email=?, telefone=?, celular=?, senha=?, foto=?, tipo=? WHERE id=?',
            [nome, email, telefone, celular, senha, foto, tipo, id]
        );

        response.status(200).send({ message: "Usuário atualizado com sucesso!" });
    } catch (error) {
        console.log("Erro ao atualizar o usuário: ", error.message);
        response.status(401).send({ message: "Falha ao executar a ação!" });
    }
}

const AtualizarNome = async (request, response) => {
    try {
        const id = request.params.id;
        const { nome } = request.body;

        await banco.query('UPDATE usuarios SET nome = ? WHERE id = ?', [nome, id]);

        response.status(200).send({ message: "Nome atualizado com sucesso!" });
    } catch (error) {
        console.log("Erro ao atualizar nome:", error.message);
        response.status(500).send({ message: "Erro ao atualizar nome" });
    }
};

const AtualizarFoto = async (request, response) => {
    try {
        const id = request.params.id;
        const foto = request.file ? `/uploads/foto_perfil/${request.file.filename}` : null;

        if (!foto) {
            return response.status(400).send({ message: "Nenhuma foto foi enviada." });
        }

        await banco.query('UPDATE usuarios SET foto = ? WHERE id = ?', [foto, id]);

        response.status(200).send({ message: "Foto atualizada com sucesso!" });
    } catch (error) {
        console.log("Erro ao atualizar foto:", error.message);
        response.status(500).send({ message: "Erro ao atualizar foto" });
    }
};

const AtualizarEmail = async (request, response) => {
    try {
        const id = request.params.id;
        const { email } = request.body;

        await banco.query('UPDATE usuarios SET email = ? WHERE id = ?', [email, id]);

        response.status(200).send({ message: "Email atualizado com sucesso!" });
    } catch (error) {
        console.log("Erro ao atualizar email:", error.message);
        response.status(500).send({ message: "Erro ao atualizar email" });
    }
};

const AtualizarSenha = async (request, response) => {
    try {
        const id = request.params.id;
        const { senha } = request.body;

        const senhaHash = await bcrypt.hash(senha, 10);

        await banco.query('UPDATE usuarios SET senha = ? WHERE id = ?', [senhaHash, id]);

        response.status(200).send({ message: "Senha atualizada com sucesso!" });
    } catch (error) {
        console.log("Erro ao atualizar senha:", error.message);
        response.status(500).send({ message: "Erro ao atualizar senha" });
    }
};

const AtualizarTelefone = async (request, response) => {
    try {
        const id = request.params.id;
        const { telefone } = request.body;

        await banco.query('UPDATE usuarios SET telefone = ? WHERE id = ?', [telefone, id]);

        response.status(200).send({ message: "Telefone atualizado com sucesso!" });
    } catch (error) {
        console.log("Erro ao atualizar telefone:", error.message);
        response.status(500).send({ message: "Erro ao atualizar telefone" });
    }
};



const SolicitarCriacao = async (request, response) => {
    try {
        const { nome, email, senha } = request.body;

        const codigo = Math.floor(100000 + Math.random() * 900000);


        await enviaremailcriacao(email, nome, codigo);

        // Retorna o código (se estiver em dev/teste)
        response.status(200).send({
            message: "Código de verificação enviado para o email",
            codigo, // em produção, talvez você **não envie isso no response**
            dados: { nome, email, senha} // temporário, ou salva em cache
        });

    } catch (error) {
        console.error("Erro ao enviar código:", error.message);
        response.status(500).send({ message: "Erro ao solicitar criação de conta" });
    }
};

const Solicitarexclusao = async (request, response) => {
    try {
        const { nome, email, senha } = request.body;
        const foto = request.file ? `/uploads/${request.file.filename}` : null;

        const codigo = Math.floor(100000 + Math.random() * 900000);


        await enviaremailexclusao(email, nome, codigo);

        // Retorna o código (se estiver em dev/teste)
        response.status(200).send({
            message: "Código de verificação enviado para o email",
            codigo, // em produção, talvez você **não envie isso no response**
            dados: { nome, email, senha, foto } // temporário, ou salva em cache
        });

    } catch (error) {
        console.error("Erro ao enviar código:", error.message);
        response.status(500).send({ message: "Erro ao solicitar exclusão de conta" });
    }
};

const SolicitarRecuperacaoSenha = async (req, res) => {
    const { email } = req.body;
    try {
        const [result] = await banco.query("SELECT * FROM usuarios WHERE email = ?", [email]);
        if (result.length === 0) {
            return res.status(404).send({ message: "Email não encontrado" });
        }
        const codigo = Math.floor(100000 + Math.random() * 900000); // Ex: 654321
        // Aqui você pode salvar esse código temporariamente no banco ou só validar depois (simples)
        await enviarEmailRecuperacao(email, result[0].nome, codigo);
        // Envia o código também no response (só enquanto você não tiver banco ou cache pra ele)
        res.status(200).send({ message: "Código enviado para o email", codigo }); 
    } catch (err) {
        console.error("Erro ao recuperar senha:", err.message);
        res.status(500).send({ message: "Erro interno" });
    }
};

// const Login = async (request, response) => {
//     const { email, senha } = request.body;

//     try {
//         const [rows] = await banco.query("SELECT * FROM usuarios WHERE email = ?", [email]);

//         if (rows.length === 0) {
//             return response.status(401).send({ message: "Email ou senha inválidos" });
//         }

//         const usuario = rows[0];

//         // Aqui compara a senha digitada com a criptografada
//         const senhaValida = await bcrypt.compare(senha, usuario.senha);

//         if (!senhaValida) {
//             return response.status(401).send({ message: "Email ou senha inválidos" });
//         }

//         const nome = result[0].nome;
//     const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
//     const navegador = req.headers['user-agent'];

//     // Envia o email com IP e navegador
//     await enviarEmailLogin(email, nome, ip, navegador);

//         // Login OK, pode retornar os dados (sem a senha de preferência)
//         delete usuario.senha; // remove a senha da resposta
//         response.status(200).send({ usuario });

//     } catch (error) {
//         console.error("Erro ao verificar login:", error.message);
//         response.status(500).send({ message: "Erro interno no servidor" });
//     }
// };

// const Login = async (request, response) => {
//     const { email, senha } = request.body;

//     try {
//         const [rows] = await banco.query("SELECT * FROM usuarios WHERE email = ?", [email]);

//         if (rows.length === 0) {
//             return response.status(401).send({ message: "Email ou senha inválidos" });
//         }

//         const usuario = rows[0];

//         // Aqui compara a senha digitada com a criptografada
//         const senhaValida = await bcrypt.compare(senha, usuario.senha);

//         if (!senhaValida) {
//             return response.status(401).send({ message: "Email ou senha inválidos" });
//         }

//         const parser = new UAParser(req.headers['user-agent']);
//         const ua = parser.getResult();

//         const ip = (req.headers['x-forwarded-for'] || req.socket.remoteAddress || '').split(',')[0].trim();
//         const navegador = `${ua.browser.name} ${ua.browser.version}`;
//         const sistema = `${ua.os.name} ${ua.os.version}`;

//          await enviarEmailLogin(email, nome, ip, navegador, sistema);


//         // Envia o email com IP e navegador
//         await enviarEmailLogin(email, usuario.nome, ip, navegador);

//         // Login OK, pode retornar os dados (sem a senha de preferência)
//         delete usuario.senha;
//         response.status(200).send({ usuario });

//     } catch (error) {
//         console.error("Erro ao verificar login:", error.message);
//         response.status(500).send({ message: "Erro interno no servidor" });
//     }
// };

const Login = async (request, response) => {
  const { email, senha } = request.body;

  try {
    // 1) Busca usuário pelo email
    const [rows] = await banco.query(
      "SELECT * FROM usuarios WHERE email = ?",
      [email]
    );

    if (rows.length === 0) {
      return response.status(401).send({ message: "Email ou senha inválidos" });
    }

    const usuario = rows[0];

    // 2) Compara a senha digitada com a criptografada
    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      return response.status(401).send({ message: "Email ou senha inválidos" });
    }

    // 3) Extrair IP (limpando possíveis proxies) e User-Agent
    const ip = (request.headers['x-forwarded-for'] || request.socket.remoteAddress || '')
      .split(',')[0]
      .trim();

    const parser = new UAParser(request.headers['user-agent']);
    const ua = parser.getResult();
    const navegador = `${ua.browser.name} ${ua.browser.version}`;      
    const sistema = `${ua.os.name} ${ua.os.version}`;                 

    // 4) Envia o email de notificação de login – só chamamos UMA vez, passando todos os dados
    // await enviarEmailLogin(
    //   email,
    //   usuario.nome,
    //   ip,
    //   navegador,
    //   sistema
    // );

    // 5) Responde o login bem-sucedido (sem retornar a senha)
    delete usuario.senha;
    response.status(200).send({ usuario });

  } catch (error) {
    console.error("Erro ao verificar login:", error.message);
    response.status(500).send({ message: "Erro interno no servidor" });
  }
};


const Createcontaadotante = async (request, response) => {
    try {
        const { nome, telefone, celular, email, senha, sexo, data_nascimento, cpf } = request.body;

        // gera o hash da senha
        const saltRounds = 10;
        const senhaHash = await bcrypt.hash(senha, saltRounds);

        const data = await banco.query(
            'INSERT INTO usuarios (nome, email, telefone, celular, sexo, data_nascimento, cpf, senha) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [nome, email, telefone, celular, sexo, data_nascimento, cpf, senhaHash]
        );

        response.status(200).send({ message: 'Usuário cadastrado com sucesso' });
    } catch (error) {
        console.log("Erro ao conectar ao banco de dados: ", error.message);
        response.status(401).send({ message: "Falha ao executar a ação!" });
    }
};

const verificartipo = async (request, response) => {
    try {
        const id = request.params.id;
        const data = await banco.query("SELECT tipo FROM usuarios WHERE id = ?", [id]);      
        response.status(200).send(data[0]);
    } catch (err) {
        res.status(500).send({ message: "Erro ao definir tipo.", error: err.message });
    }
};

const getbyidconfigong = async (request, response) => {
    try {
        const id = request.params.id;
        const data = await banco.query("SELECT usuarios.nome, usuarios.email, usuarios.telefone, usuarios.celular, usuarios.foto, usuarios.criado_em, ongs.nome_ong, ongs.cnpj FROM usuarios JOIN ongs ON usuarios.id = ongs.usuario_id WHERE usuarios.id = ?;", [id]);      
        response.status(200).send(data[0]);
    } catch (err) {
        res.status(500).send({ message: "Erro ao definir tipo.", error: err.message });
    }
};
const getbyidconfigadotante = async (request, response) => {
    try {
        const id = request.params.id;
        const data = await banco.query("SELECT usuarios.nome, usuarios.email, usuarios.telefone, usuarios.celular, usuarios.foto, usuarios criado_em, adotante.data_nascimento, adotante.cpf FROM usuarios JOIN adotante ON usuarios.id = adotante.usuario_id WHERE usuarios.id = ?;", [id]);      
        response.status(200).send(data[0]);
    } catch (err) {
        res.status(500).send({ message: "Erro ao definir tipo.", error: err.message });
    }
};




module.exports = {GetAll, GetById, Erase, Create, Update, SolicitarCriacao, Solicitarexclusao, SolicitarRecuperacaoSenha, Login, Createcontaadotante, Createadotante, Createong, AtualizarNome, AtualizarFoto, AtualizarEmail, AtualizarSenha, AtualizarTelefone, verificartipo, getbyidconfigong, getbyidconfigadotante};