const express = require("express");
const server = express();
const router = express.Router();

const morgan = require("morgan");
const cors = require("cors");

const db = require("./src/backEnd/models");
const config = require("./src/backEnd/config/config");

const PORT = process.env.PORT || "4000";

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
require("./src/backEnd/routes")(router);

server.use("/", router);

server.use((err, res) => {
  console.error(err.stack);
  res.json({
    status: 500,
    message: err.message || "Something failed!",
    data: {}
  });
});
server.listen(PORT, () => {
  db.sequelize 
    .authenticate()
    .then(() => {
      console.log("Connection has been established successfully.");
      db.sequelize.sync({ force: (config.isDev == 'true'? true: false) }).then(() => {
        console.log("Database Synced Successfully");
        console.log(`Server started on port: ${PORT}`);
      });
    })
    .catch(err => {
      console.error("Unable to connect to the database:", err);
    });
});
