const Joi = require("joi");

module.exports = {
  postValidationHost: async hostObj => {
    const schema = Joi.object().keys({
      hostName: Joi.string().required(),
      hostPhone: Joi.number().required(),
      hostEmail: Joi.string().email().required(),
      hostAddress: Joi.string().required(),
    });
    return Joi.validate(hostObj, schema);
  }
};