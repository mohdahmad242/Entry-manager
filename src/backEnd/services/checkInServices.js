const Dao = require("../dao");
const mailService = require("./mailService");
const smsService = require("./smsService");

module.exports = {
  createCheckIn: async createCheckInObj => {
    try {
      const IsisVisitorDetail = await Dao.visitorDao.getVisitorAll({
        email: createCheckInObj.email
      });
      console.log("object", IsisVisitorDetail);
      for (var i = 0; i < IsisVisitorDetail.length; i++) {
        if (IsisVisitorDetail[i].dataValues.checkOutTime == null) {
          return {
            message: "You already checked In please check Out first.",
            response: false
          };
        }
      }

      let dateOb = new Date();
      const time = dateOb.toLocaleString([], {
        hour: '2-digit',
        minute: '2-digit'
      });
      const visitorData = {
        checkInTime: `${time}`,
        ...createCheckInObj
      }
      const visitorDetail = await Dao.visitorDao.create(visitorData);

      const hostInfo = {
        id: createCheckInObj.hostId,
        active : "true"
      }

      const hostDetails = await Dao.hostDao.update(hostInfo);
      console.log("HOSTDetails",hostDetails );
      const hostDetail = await Dao.hostDao.getHost({
        id: createCheckInObj.hostId
      });
      console.log("HOSTDetail",hostDetail );

      await smsService.sendMsg({
        toSMS: hostDetail.dataValues.phoneNumber,
        visitorPhone: createCheckInObj.phoneNumber,
        visitorEmail: createCheckInObj.email,
        visitorName: createCheckInObj.name,
        visitorVisitTimeDate: `${time}`
      })

      await mailService.sendMail({
        to: "host.hjs",
        toEmail: hostDetail.dataValues.email,
        subject: "You have a visitor",
        data: {
          hostName: hostDetail.dataValues.name,
          visitorName: createCheckInObj.name,
          visitorPhone: createCheckInObj.phoneNumber,
          visitorEmail: createCheckInObj.email,
          visitorVisitTimeDate: `${time}`
        }
      });
      const response = {
        host: hostDetail,
        visitor: visitorDetail.dataValues
      }
      if (hostDetail == undefined || visitorDetail.dataValues == undefined) {
        return false;
      }
      return {
        message: "You have been Successfully checked In",
        respose: response
      };

    } catch (error) {
      console.log(error);
      return {
        message: "Internal Error",
        respose: false
      };
    }
  }
};