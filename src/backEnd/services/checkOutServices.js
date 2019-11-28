const Dao = require('../dao');
const mailService = require('../services/mailService');
module.exports = {
  checkOut: async checkOutObj => {
    try {
      console.log("DAO", Dao);
      const isVisitor = await Dao.visitorDao.getVisitorAll({
        email: checkOutObj.email
      });
      console.log("ALL VISITOR", isVisitor);
      if (isVisitor.length == 0) {
        return {
          message: "Invalid Email Address",
          response: false
        };
      }
      var checkOutFlag = false;
      for (var i = 0; i < isVisitor.length; i++) {
        if (isVisitor[i].checkOutTime == null) {
          checkOutFlag = true;
          break;
        }
      }
      if (!checkOutFlag) {
        return {
          message: "You have checked Out Erlier, Please check In again",
          response: false
        };
      }

      let dateOb = new Date();
      const time = dateOb.toLocaleString([], {
        hour: '2-digit',
        minute: '2-digit'
      });

      const visitorInfo = {
        email: checkOutObj.email,
        checkOutTime: `${time}`
      }

      const visitorDetail = await Dao.visitorDao.update(visitorInfo);

      const visitorDetails = await Dao.visitorDao.getVisitor({
        email: checkOutObj.email
      });

      const hostInfo = {
        id: visitorDetails.dataValues.hostId,
        active : "false"
      }

      const hostDetail = await Dao.hostDao.update(hostInfo);

      const hostDetails = await Dao.hostDao.getHost({
        id: visitorDetails.dataValues.hostId
      });

      await mailService.sendMail({
        to: "visitor.hjs",
        toEmail: visitorDetails.dataValues.email,
        subject: "Your Recent Visit",
        data: {
          visitorName: visitorDetails.dataValues.name,
          visitorPhone: visitorDetails.phoneNumber,
          visitorEmail: visitorDetails.email,
          hostName: hostDetails.dataValues.name,
          checkInTime: visitorDetails.dataValues.checkInTime,
          checkOutTime: visitorDetails.dataValues.checkOutTime,
          hostAddress: hostDetails.dataValues.address,
        }
      });

      const response = {
        visitor: visitorDetails.dataValues,
      }
      if (visitorDetails.dataValues == undefined) {
        return {
          message: "There is an error please try again.",
          response: false
        };
      }
      return {
        message: "Successfully checked Out, you will recive mail shortly",
        response: response
      };
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}