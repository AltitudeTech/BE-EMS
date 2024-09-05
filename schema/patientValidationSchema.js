const Joi = require("joi");

// Define the validation schema based on the Patient model
const patientValidationSchema = Joi.object({
  firstName: Joi.string().min(1).max(100).required().messages({
    "string.base": "First name must be a string",
    "string.empty": "First name cannot be empty",
    "string.min": "First name must be at least 1 character",
    "string.max": "First name can be at most 100 characters",
    "any.required": "First name is required",
  }),

  lastName: Joi.string().min(1).max(100).required().messages({
    "string.base": "Last name must be a string",
    "string.empty": "Last name cannot be empty",
    "string.min": "Last name must be at least 1 character",
    "string.max": "Last name can be at most 100 characters",
    "any.required": "Last name is required",
  }),

  dateOfBirth: Joi.date().iso().required().messages({
    "date.base": "Date of birth must be a valid date",
    "date.iso": "Date of birth must be in ISO format",
    "any.required": "Date of birth is required",
  }),

  gender: Joi.string().valid("Male", "Female", "Other").required().messages({
    "string.base": "Gender must be a string",
    "string.valid": "Gender must be either Male, Female, or Other",
    "any.required": "Gender is required",
  }),

  email: Joi.string().email().optional().messages({
    "string.email": "Email must be a valid email address",
  }),

  phone: Joi.string()
    .pattern(/^[0-9]{10,15}$/)
    .optional()
    .messages({
      "string.pattern.base": "Phone number must be between 10 and 15 digits",
    }),

  address: Joi.string().optional().messages({
    "string.base": "Address must be a string",
  }),
});

module.exports = patientValidationSchema;
