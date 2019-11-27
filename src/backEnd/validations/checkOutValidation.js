const Joi = require("joi");

module.exports = {
  postValidationCheckOut: async CheckOutObj => {
    const schema = Joi.object().keys({
      email: Joi.string().required()
    });
    return Joi.validate(CheckOutObj, schema);
  }
};