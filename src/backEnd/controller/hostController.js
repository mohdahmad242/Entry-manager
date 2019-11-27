const Services = require('../services');
const validationHost = require('../validations/hostValidation');

module.exports = {
  createHost: async (req, res) => {
    try {
      const errorMessages = await validationHost.postValidationHost(req.body);
      if (errorMessages.error != null) {
        return res.json({
          status: 400,
          message: errorMessages.error.details[0].message
        });
      }
      const hostObj = await Services.hostServices.createHost(req.body);
      return res.json(hostObj);
    } catch (error) {
      return res.json({
        status: 500,
        message: error.message
      });
    }
  },
  getHost: async (req, res) => {
    try {
      
      const hostObj = await Services.hostServices.getAllHost(req.body);

      return res.json(hostObj);
    } catch (error) {
      return res.json({
        status: 500,
        message: error.message
      });
    }
  },
}