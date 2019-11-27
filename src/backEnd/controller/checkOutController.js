const Services = require('../services');
const validationCheckOut = require('../validations/checkOutValidation');

module.exports = {
  checkOut: async (req, res) => {
    try {
      const errorMessages = await validationCheckOut.postValidationCheckOut(req.body);
      if (errorMessages.error != null) {
        return res.json({
          status: 400,
          message: errorMessages.error.details[0].message
        });
      }

      const checkOutObj = await Services.checkOutServices.checkOut(req.body);

      return res.json(checkOutObj);

    } catch (error) {

      return res.json({
        status: 500,
        message: error.message
      });
    }
  },
}