const db = require('../models');
const generateId = require('../helper/generateId');

module.exports = {
  create: async (visitorObj) => {
    try {
      const visitorResponse = await db.visitor.create({
        id: generateId.generateId(),
        ...visitorObj,
      });
      return visitorResponse;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  update: async (visitorObj) => {
    try {
      const visitorResponse = await db.visitor.update({
        ...visitorObj
      }, {
        where: {
          email: visitorObj.email
        }
      }, );
      return visitorResponse;
    } catch (error) {
      console.log(error);
    }
  },
  getAll: async whereObj => {
    try {
      const visitorResponse = await db.visitor.findAll({
        order: [
          ['checkInTime', 'DESC']
        ],
      });
      return visitorResponse;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  getVisitor: async whereObj => {
    try {
      const visitorResponse = await db.visitor.findOne({
        where: whereObj
      });
      return visitorResponse;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  getVisitorAll: async whereObj => {
    try {
      const visitorResponse = await db.visitor.findAll({
        where: whereObj
      });
      return visitorResponse;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}