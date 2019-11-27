const path = require("path");
const glob = require("glob");
const basename = path.basename(__filename);
const Sequelize = require("sequelize");
const config = require("../config/config.js");
const db = {};

let sequelize = new Sequelize(
  config.database,
  config.username,
  config.password, {
    ...config.databaseConfigs,
    logging: log => {
      console.log(log);
    }
  }
);

glob
  .sync(__dirname + "/**/*.js")
  .filter(file => {
    let fileName = file.split("/");
    return (
      fileName[fileName.length - 1].indexOf(".") !== 0 &&
      fileName[fileName.length - 1] !== basename &&
      fileName[fileName.length - 1].slice(-3) === ".js"
    );
  })
  .forEach(async file => {
    let fileName = file.split("/");
    db[fileName[fileName.length - 1].slice(0, -3)] = require(file)(
      sequelize,
      Sequelize
    );
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});


db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;