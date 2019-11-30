const moment = require('moment');
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
      type: Sequelize.DATE,
      defaultValue: null,
      get() {
        return moment(this.getDataValue('checkInTime')).format('DD/MM/YYYY hh:mm A');
      }
    },
    checkOutTime: {
      type: Sequelize.DATE,
      defaultValue: null,
      get() {
        return moment(this.getDataValue('checkOutTime')).format('DD/MM/YYYY hh:mm A');
      }
    }
  });

  visitor.associate = models => {
    // associations can be defined here
    models.visitor.belongsTo(models.host);

  };
  return visitor;
};