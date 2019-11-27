module.exports = (sequelize, Sequelize) => {
  const visitor = sequelize.define("visitor", {
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
    checkInTime: {
      type: Sequelize.STRING
    },
    checkOutTime: {
      type: Sequelize.STRING
    }
  }, {
    timestamps: true
  });

  visitor.associate = models => {
    // associations can be defined here
    models.visitor.belongsTo(models.host);

  };
  return visitor;
};