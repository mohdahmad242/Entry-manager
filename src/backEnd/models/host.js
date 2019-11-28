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
    },
    active: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    }
  }, {
    timestamps: true
  });

  return host;
};