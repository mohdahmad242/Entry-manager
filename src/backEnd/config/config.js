require("dotenv").config();

module.exports = {
  isDev: process.env.IS_DEV ,
  sendGridApiKey: process.env.SENDGRIDAPIKEY,
  database: process.env.DATABASE_NAME,
  username: process.env.DB_USER,
  password: process.env.PASSWORD,
  ACCOUNT_SID: process.env.ACCOUNT_SID,
  AUTH_TOKEN: process.env.AUTH_TOKEN,
  twilioNumber: process.env.twilioNumber,
  databaseConfigs: {
    host: process.env.HOSTNAME || "localhost",
    dialect: "postgres",
    port: process.env.DB_PORT || "5432",
    dialectOptions: {
      ssl: process.env.NODE_ENV == "production"
    }
  },
};
