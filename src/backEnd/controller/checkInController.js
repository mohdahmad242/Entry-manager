const Services = require('../services');
const validationCheckIn = require('../validations/checkInValidation');

module.exports = {
  createCheckIn: async (req, res) => {
    try {
      const errorMessages = await validationCheckIn.postValidationCheckIn(req.body);
      if (errorMessages.error != null) {
        return res.json({
          status: 400,
          message: errorMessages.error.details[0].message
        });
      }
      const checkInObj = await Services.checkInServices.createCheckIn(req.body);

      return res.json(checkInObj);

    } catch (error) {
      console.log(error);
      return res.json({
        status: 500,
        message: error.message
      });
    }
  }
}