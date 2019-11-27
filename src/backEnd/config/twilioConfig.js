var { ACCOUNT_SID,AUTH_TOKEN } = require("../config/config");

const client = require('twilio')(ACCOUNT_SID, AUTH_TOKEN);

module.exports = client.messages;