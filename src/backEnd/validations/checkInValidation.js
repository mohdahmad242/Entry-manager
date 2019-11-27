const Joi = require("joi");

module.exports = {
  postValidationCheckIn: async checkInObj => {
    const schema = Joi.object().keys({
      name: Joi.string().required(),
      phoneNumber: Joi.number().required(),
      email: Joi.string().email().required(),
      hostId: Joi.string().required(),
    });
    return Joi.validate(checkInObj, schema);
  }
};