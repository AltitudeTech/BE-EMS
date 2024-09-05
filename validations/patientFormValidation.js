const Joi = require("joi");

// Validation schema for creating a patient
const patientCreateSchema = Joi.object({
  id: Joi.string().uuid().optional(),
  firstName: Joi.string().min(1).max(100).required(),
  lastName: Joi.string().min(1).max(100).required(),
  email: Joi.string().email().optional(),
  role: Joi.string(),
  phone: Joi.string()
    .pattern(/^[0-9]{10,15}$/)
    .required(),
  gender: Joi.string().valid("Male", "Female", "Other").required(),
  dateOfBirth: Joi.date().iso().optional(),
  address: Joi.string().max(250).optional(),
  educationQualification: Joi.string().max(250).optional(),
  org_id: Joi.string().optional(),
});

// Validation schema for updating patient details
const patientUpdateSchema = Joi.object({
  firstName: Joi.string().min(1).max(100).optional(),
  lastName: Joi.string().min(1).max(100).optional(),
  email: Joi.string().email().optional(),
  phone: Joi.string()
    .pattern(/^[0-9]{10,15}$/)
    .optional(),
  gender: Joi.string().valid("Male", "Female", "Other").optional(),
  dateOfBirth: Joi.date().iso().optional(),
  address: Joi.string().max(250).optional(),
  educationQualification: Joi.string().max(250).optional(),
  organization: Joi.string().optional(),
});

// Validation schema for deleting a patient
const patientDeleteSchema = Joi.object({
  phone: Joi.string()
    .pattern(/^[0-9]{10,15}$/)
    .required(),
});

module.exports = {
  patientCreateSchema,
  patientUpdateSchema,
  patientDeleteSchema,
};
