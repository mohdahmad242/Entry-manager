var checkInController = require("../controller/checkInController");

module.exports = router => {
  router
    .route("/checkIn")
    .post(checkInController.createCheckIn)
};