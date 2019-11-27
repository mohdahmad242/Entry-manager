const Services = require('../services');

module.exports = {
  getVisitor: async (req, res) => {
    try {

      const visitorObj = await Services.visitorServices.getAllVisitor(req.body);

      return res.json(visitorObj);

    } catch (error) {
      return res.json({
        status: 500,
        message: error.message
      });
    }
  },
}