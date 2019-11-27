const Dao = require("../dao");

module.exports = {
  getAllVisitor: async options => {
    try {

      const visitorDetails = await Dao.visitorDao.getAll();
      const finalResponse = [];
      for (var i = 0; i < visitorDetails.length; i++) {
        const hostDetails = await Dao.hostDao.getHost({
          id: [visitorDetails][0][i].hostId
        });
        finalResponse.push({
          id: [visitorDetails][0][i].id,
          name: [visitorDetails][0][i].name,
          phoneNumber: [visitorDetails][0][i].phoneNumber,
          email: [visitorDetails][0][i].email,
          checkInTime: [visitorDetails][0][i].checkInTime,
          checkOutTime: [visitorDetails][0][i].checkOutTime,
          hostName: hostDetails,
        })
      }

      return finalResponse;

    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
};