var visitorController = require("../controller/visitorController");

module.exports = router => {
  router
    .route("/visitor")
    .get(visitorController.getVisitor);
};