var hostController = require("../controller/hostController");

module.exports = router => {
  router
    .route("/host")
    .post(hostController.createHost)
    .get(hostController.getHost);
};