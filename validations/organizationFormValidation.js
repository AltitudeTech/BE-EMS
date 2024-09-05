const Joi = require("joi");

// Validation schema for creating/updating an organization
const organizationSchema = Joi.object({
  id: Joi.string().uuid().optional(),
  name: Joi.string().min(1).max(250).required(),
  username: Joi.string().max(100).optional(),
  mobile: Joi.string()
    .pattern(/^[0-9]{10,20}$/)
    .required(),
  address: Joi.string().max(250).required(),
  city: Joi.string().max(50).required(),
  state: Joi.string().max(50).required(),
  zipCode: Joi.string()
    .pattern(/^[0-9]{5,10}$/)
    .required(),
});

module.exports = {
  organizationSchema,
};
