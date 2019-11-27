var checkOutController = require("../controller/checkOutController");

module.exports = router => {
  router
    .route("/checkOut")
    .post(checkOutController.checkOut);
};