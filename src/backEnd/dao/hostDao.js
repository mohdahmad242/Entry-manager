const db = require('../models');
const generateId = require('../helper/generateId');

module.exports = {
  create: async (hostObj) => {
    try {
      const hostResponse = await db.host.create({
        id: generateId.generateId(),
        ...hostObj,
      });
      return hostResponse;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  getAll: async whereObj => {
    try {
      const hostResponse = await db.host.findAll({
        order: [
          ['name', 'ASc']
        ],
      });
      return hostResponse;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  getHost: async whereObj => {
    try {
      const hostResponse = await db.host.findOne({
        where: whereObj
      });
      return hostResponse;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  update: async (hostObj) => {
    try {
      const hostResponse = await db.host.update({
        ...hostObj
      }, {
        where: {
          id: hostObj.id
        }
      }, );
      return hostResponse;
    } catch (error) {
      console.log(error);
    }
  }
}