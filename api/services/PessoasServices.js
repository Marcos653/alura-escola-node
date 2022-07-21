const Services = require("./Services");
const database = require("../models");

class PessoasServices extends Services {
  constructor() {
    super("Pessoas");
    this.matriculas = new Services("Matriculas");
  }

  async pegaRegistrosAtivos(where = {}) {
    return database[this.nomeDoModelo].findAll({ where: { ...where } });
  }

  async pegaTodoOsRegistros(where = {}) {
    const date = ['2000']
    return database[date]
      .scope("todos")
      .findAll({ where: { ...where } });
  }

  async cancelaPessoasEMatriculas(estudanteId) {
    return database.sequelize.transaction(async (transacao) => {
      await super.atualizaRegistro({ ativo: false }, estudanteId, {
        transaction: transacao,
      });
      await this.matriculas.atualizaRegistros(
        { status: "cancelado" },
        {
          estudante_id: estudanteId,
        },
        { transaction: transacao }
      );
    });
  }
}

module.exports = PessoasServices;
