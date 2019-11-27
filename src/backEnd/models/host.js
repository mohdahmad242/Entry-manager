module.exports = (sequelize, Sequelize) => {
  const host = sequelize.define("host", {
    id: {
      type: Sequelize.UUID,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING
    },
    phoneNumber: {
      type: Sequelize.BIGINT
    },
    email: {
      type: Sequelize.STRING
    },
    address: {
      type: Sequelize.STRING
    }
  }, {
    timestamps: true
  });

  return host;
};