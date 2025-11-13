const { banco } = require("./database");

const Post = async (fk_idusuario, fk_idong) => {
    const query = 'INSERT INTO responsaveis (fk_idusuario, fk_idong) VALUES (?, ?)';
    const [result] = await banco.query(query, [fk_idusuario, fk_idong]);
    return { idresponsavel: result.insertId, fk_idusuario, fk_idong };
};

module.exports = { Post };
