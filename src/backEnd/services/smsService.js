const SMS = require("../config/twilioConfig");
const config = require("../config/config")

module.exports = {
  sendMsg: async smsObj => {
    try {
      let smsConfig = {
        to: `+91${smsObj.toSMS}`,
        from: config.twilioNumber,
        body: `You have visitor.\nName-${smsObj.visitorName}\nNumber-${smsObj.visitorPhone}\nEmail-${smsObj.visitorEmail}\nVisit Date-Time -${smsObj.visitorVisitTimeDate}`
      };
      await SMS.create(smsConfig);
    } catch (e) {
      console.log(e);
      return false;
    }
  }
};