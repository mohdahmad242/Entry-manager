const Dao = require("../dao");

module.exports = {
  createHost: async hostObj => {
    try {
      const IsExisthostDetail = await Dao.hostDao.getHost({
        phoneNumber: hostObj.hostPhone
      });
      if (IsExisthostDetail != null) {
        return {
          message: "Host already exist with this mobile number.",
          response: false
        };
      }
      const hostInfo = {
        name: hostObj.hostName,
        phoneNumber: hostObj.hostPhone,
        email: hostObj.hostEmail,
        address: hostObj.hostAddress
      }

      const hostDetail = await Dao.hostDao.create(hostInfo);

      const response = {
        host: hostDetail.dataValues
      }
      if (hostDetail.dataValues == undefined) {
        return {
          message: "There is some error please fill the form again",
          response: false
        };
      }
      return {
        message: "Host have been Successfully registered",
        response: response
      };
    } catch (error) {
      console.log(error);
      return {
        message: "Internal Error",
        response: false
      };;
    }
  },
  getAllHost: async options => {
    try {
      const hostDetails = await Dao.hostDao.getAll();

      return hostDetails;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
};