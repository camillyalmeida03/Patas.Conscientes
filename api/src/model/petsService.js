const { banco } = require("./database");

// Buscar todos os pets
const GetAll = async (req, res) => {
  try {
    const query = `
      SELECT 
        p.id_pet, ep.especie, rp.raca, p.nome_pet, sp.sexo_pet, pp.porte_pet,
        p.peso, p.idade, p.sobre_pet, p.foto, p.id_responsavel_fk, o.nome_ong
      FROM pets p
      INNER JOIN especies_pets ep ON ep.id_especie_pet = p.id_especie_fk
      INNER JOIN racas_pets rp ON rp.id_raca_pet = p.id_raca_fk
      INNER JOIN portes_pets pp ON pp.id_porte_pet = p.id_porte_fk
      INNER JOIN sexos_pets sp ON sp.id_sexo_pet = p.id_sexo_fk
      INNER JOIN responsaveis re ON re.id_responsavel = p.id_responsavel_fk
      INNER JOIN ongs o ON o.usuario_id = p.id_ong_fk
    `;
    const [data] = await banco.query(query);
    res.status(200).send(data);
  } catch (error) {
    console.error("Erro ao buscar todos os PETS:", error.message);
    res.status(500).send({ message: "Erro ao buscar pets." });
  }
};

// Buscar pet por ID
const GetById = async (req, res) => {
  try {
    const id = req.params.id;
    const query = `
      SELECT 
        p.id_pet, ep.especie, rp.raca, p.nome_pet, sp.sexo_pet, pp.porte_pet,
        p.peso, p.idade, p.sobre_pet, p.foto, p.id_responsavel_fk, o.nome_ong
      FROM pets p
      INNER JOIN especies_pets ep ON ep.id_especie_pet = p.id_especie_fk
      INNER JOIN racas_pets rp ON rp.id_raca_pet = p.id_raca_fk
      INNER JOIN portes_pets pp ON pp.id_porte_pet = p.id_porte_fk
      INNER JOIN sexos_pets sp ON sp.id_sexo_pet = p.id_sexo_fk
      INNER JOIN responsaveis re ON re.id_responsavel = p.id_responsavel_fk
      INNER JOIN ongs o ON o.usuario_id = p.id_ong_fk
      WHERE p.id_pet = ?
    `;
    const [data] = await banco.query(query, [id]);
    res.status(200).send(data);
  } catch (error) {
    console.error("Erro ao buscar PET por ID:", error.message);
    res.status(500).send({ message: "Erro ao buscar pet." });
  }
};

// Criar novo pet
const CreatePet = async (req, res) => {
  const dados = req.body;

  try {
    const [responsavelRows] = await banco.query(
      "SELECT id_responsavel FROM responsaveis WHERE id_ong_fk = ?",
      [dados.id_ong_fk]
    );

    if (responsavelRows.length === 0) {
      return res.status(400).json({ message: "Responsável não encontrado para essa ONG." });
    }

    const id_responsavel_fk = responsavelRows[0].id_responsavel;

    let id_raca_fk;
    const [racaRows] = await banco.query(
      "SELECT id_raca_pet FROM racas_pets WHERE raca = ? AND id_especie_fk = ?",
      [dados.raca, dados.id_especie_fk]
    );

    if (racaRows.length > 0) {
      id_raca_fk = racaRows[0].id_raca_pet;
    } else {
      const [insertRaca] = await banco.query(
        "INSERT INTO racas_pets (raca, id_especie_fk) VALUES (?, ?)",
        [dados.raca, dados.id_especie_fk]
      );
      id_raca_fk = insertRaca.insertId;
    }

    const query = `
      INSERT INTO pets (
        id_especie_fk, id_raca_fk, nome_pet, id_sexo_fk, id_porte_fk,
        peso, idade, sobre_pet, foto, id_responsavel_fk, id_ong_fk
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const valores = [
      dados.id_especie_fk,
      id_raca_fk,
      dados.nome_pet,
      dados.id_sexo_fk,
      dados.id_porte_fk,
      dados.peso,
      dados.idade,
      dados.sobre_pet || null,
      dados.foto || null,
      id_responsavel_fk,
      dados.id_ong_fk,
    ];

    const [result] = await banco.query(query, valores);

    res.status(201).json({
      message: "Pet cadastrado com sucesso!",
      id_pet: result.insertId,
    });
  } catch (error) {
    console.error("Erro ao cadastrar pet:", error.message);
    res.status(500).json({ message: "Erro ao cadastrar pet." });
  }
};

// Atualizar pet
const UpdatePet = async (req, res) => {
  const id = req.params.id;
  const dados = req.body;

  try {
    const [especie] = await banco.query(
      "SELECT * FROM especies_pets WHERE id_especie_pet = ?",
      [dados.id_especie_fk]
    );
    if (especie.length === 0) {
      return res.status(400).json({ message: "Espécie não encontrada!" });
    }

    const [responsavelRows] = await banco.query(
      "SELECT id_responsavel FROM responsaveis WHERE id_ong_fk = ?",
      [dados.id_ong_fk]
    );
    if (responsavelRows.length === 0) {
      return res.status(400).json({ message: "Responsável não encontrado para essa ONG." });
    }

    const id_responsavel_fk = responsavelRows[0].id_responsavel;

    const query = `
      UPDATE pets SET
        id_especie_fk = ?, id_raca_fk = ?, nome_pet = ?, id_sexo_fk = ?, id_porte_fk = ?,
        peso = ?, idade = ?, sobre_pet = ?, foto = ?, id_responsavel_fk = ?, id_ong_fk = ?
      WHERE id_pet = ?
    `;

    const valores = [
      dados.id_especie_fk,
      dados.id_raca_fk,
      dados.nome_pet,
      dados.id_sexo_fk,
      dados.id_porte_fk,
      dados.peso,
      dados.idade,
      dados.sobre_pet || null,
      dados.foto || null,
      id_responsavel_fk,
      dados.id_ong_fk,
      id,
    ];

    await banco.query(query, valores);
    res.status(200).json({ message: "Pet atualizado com sucesso!" });
  } catch (error) {
    console.error("Erro ao atualizar pet:", error.message);
    res.status(500).json({ message: "Erro ao atualizar pet." });
  }
};

// Deletar pet
const DeletePet = async (req, res) => {
  const id = req.params.id;
  try {
    await banco.query("DELETE FROM pets WHERE id_pet = ?", [id]);
    res.status(200).json({ message: "Pet deletado com sucesso!" });
  } catch (error) {
    console.error("Erro ao deletar pet:", error.message);
    res.status(500).json({ message: "Erro ao deletar pet." });
  }
};

module.exports = {
  GetAll,
  GetById,
  CreatePet,
  UpdatePet,
  DeletePet,
};