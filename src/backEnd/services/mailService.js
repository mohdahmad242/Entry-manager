const Mail = require("../config/sendgridConfig");
const Hogan = require('hogan.js');
const fs = require('fs');
const path = require('path').dirname(__dirname);

module.exports = {
  sendMail: async mailObj => {
    try {
      let mailConfig = {
        to: mailObj.toEmail,
        from: "xyz@abc.com",
        subject: mailObj.subject,
        html: await Hogan.compile(fs.readFileSync(path + `/helper/${mailObj.to}`, 'utf-8')).render(mailObj.data)
      };
      await Mail.send(mailConfig);
    } catch (e) {
      console.log(e);
      return false;
    }
  }
};