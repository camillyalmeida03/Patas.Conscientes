const { banco } = require("./database");

// Buscar todas as raças com a espécie associada
const GetAll = async (req, res) => {
  try {
    const query = `
      SELECT rp.id_raca_pet, rp.raca, rp.id_especie_fk, ep.especie
      FROM racas_pets rp
      INNER JOIN especies_pets ep ON rp.id_especie_fk = ep.id_especie_pet
      ORDER BY rp.id_raca_pet
    `;

    const [data] = await banco.query(query);
    res.status(200).json(data);
  } catch (error) {
    console.error("Erro ao buscar raças:", error.message);
    res.status(500).json({ message: "Falha ao buscar raças." });
  }
};

// Buscar uma raça pelo ID
const GetById = async (req, res) => {
  try {
    const id = req.params.id;

    const query = `
      SELECT rp.id_raca_pet, rp.raca, rp.id_especie_fk, ep.especie
      FROM racas_pets rp
      INNER JOIN especies_pets ep ON rp.id_especie_fk = ep.id_especie_pet
      WHERE rp.id_raca_pet = ?
    `;

    const [data] = await banco.query(query, [id]);
    res.status(200).json(data[0] || null);
  } catch (error) {
    console.error("Erro ao buscar raça por ID:", error.message);
    res.status(500).json({ message: "Falha ao buscar raça por ID." });
  }
};

// Criar nova raça
const Create = async (req, res) => {
  try {
    const { raca, id_especie_fk } = req.body;

    if (!raca || !id_especie_fk) {
      return res.status(400).json({ message: "Campos obrigatórios não fornecidos." });
    }

    const query = `
      INSERT INTO racas_pets (raca, id_especie_fk)
      VALUES (?, ?)
    `;

    const [result] = await banco.query(query, [raca, id_especie_fk]);
    res.status(201).json({ message: "Raça criada com sucesso.", id: result.insertId });
  } catch (error) {
    console.error("Erro ao criar raça:", error.message);
    res.status(500).json({ message: "Falha ao cadastrar raça." });
  }
};

// Atualizar raça existente
const Update = async (req, res) => {
  try {
    const id = req.params.id;
    const { raca, id_especie_fk } = req.body;

    const query = `
      UPDATE racas_pets
      SET raca = ?, id_especie_fk = ?
      WHERE id_raca_pet = ?
    `;

    await banco.query(query, [raca, id_especie_fk, id]);
    res.status(200).json({ message: "Raça atualizada com sucesso." });
  } catch (error) {
    console.error("Erro ao atualizar raça:", error.message);
    res.status(500).json({ message: "Falha ao atualizar raça." });
  }
};

// Deletar raça
const Erase = async (req, res) => {
  try {
    const id = req.params.id;

    const query = `
      DELETE FROM racas_pets
      WHERE id_raca_pet = ?
    `;

    await banco.query(query, [id]);
    res.status(200).json({ message: "Raça excluída com sucesso." });
  } catch (error) {
    console.error("Erro ao excluir raça:", error.message);
    res.status(500).json({ message: "Falha ao excluir raça." });
  }
};

module.exports = {
  GetAll,
  GetById,
  Create,
  Update,
  Erase
};
