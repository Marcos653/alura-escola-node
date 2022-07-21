const database = require("../models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

class TurmaController {
  static async pegaTodasAsTurmas(req, res) {
    const { data_inicial, data_final } = req.query;
    const where = {};

    data_inicial || data_final ? (where.data_inicio = {}) : null;
    data_inicial ? (where.data_inicio[Op.gte] = data_inicial) : null;
    data_final ? (where.data_inicio[Op.lte] = data_final) : null;

    try {
      const todasAsTurmas = await database.Turmas.findAll({
        where,
      });

      return res.status(200).json(todasAsTurmas);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async pegaUmaTurma(req, res) {
    const { id } = req.params;

    try {
      let umaTurma = await database.Turmas.findOne({
        where: { id: Number(id) },
      });

      // let doisTurma = await database.Turmas.findOne({
      //   where: { id: Number(3) },
      // });

      var obj = JSON.parse(umaTurma);
      obj["theTeam"].push({ teamId: "4", status: "pending" });

      umaTurma = JSON.stringify(obj);

      console.log(umaTurma);

      return res.status(200).json(umaTurma);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async criaTurma(req, res) {
    const novaTurma = req.body;

    try {
      const novaTurmaCriada = await database.Turmas.create(novaTurma);

      return res.status(201).json(novaTurmaCriada);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async atualizaTurma(req, res) {
    const novaInfos = req.body;
    const { id } = req.params;

    try {
      await database.Turmas.update(novaInfos, {
        where: { id: Number(id) },
      });

      const turmaAtualizada = await database.Turmas.findOne({
        where: { id: Number(id) },
      });

      return res.status(200).json(turmaAtualizada);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async apagaTurma(req, res) {
    const { id } = req.params;

    try {
      await database.Turmas.destroy({
        where: { id: Number(id) },
      });
      return res.status(200).json({ message: "foi" });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}

module.exports = TurmaController;
