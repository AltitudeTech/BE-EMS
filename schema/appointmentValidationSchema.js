// const joi =  require("joi")

// const appointmentValidation = joi.object({
//     appointmentDate: joi.date().required(),
//     appointmentTime: joi.string().required(),
//     reason: joi.string().optional(),
//     orgName: joi.string().required(),
// })

// module.exports = appointmentValidation

const Joi = require("joi");

// Assuming these are the attributes in the Appointment model
const appointmentValidationSchema = Joi.object({
  appointmentDate: Joi.date().iso().required().messages({
    "date.base": "Appointment date must be a valid date",
    "date.iso": "Appointment date must be in ISO format",
    "any.required": "Appointment date is required",
  }),

  appointmentTime: Joi.string()
    .pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)
    .required()
    .messages({
      "string.pattern.base": "Appointment time must be in HH:MM format",
      "any.required": "Appointment time is required",
    }),

  reason: Joi.string().optional().messages({
    "string.base": "Reason must be a string",
  }),

  organizationId: Joi.string().uuid().required().messages({
    "string.uuid": "Organization ID must be a valid UUID",
    "any.required": "Organization ID is required",
  }),
});

module.exports = appointmentValidationSchema;
