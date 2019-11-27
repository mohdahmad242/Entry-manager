const sgMail = require("@sendgrid/mail");
var { sendGridApiKey } = require("../config/config");

sgMail.setApiKey(sendGridApiKey);

module.exports = sgMail;
