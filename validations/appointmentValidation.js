const appointmentValidationSchema = require("../schema/appointmentValidationSchema");

const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false }); // Collect all errors
    if (error) {
      return res.status(400).json({
        error: error.details.map((detail) => detail.message), // Map error messages
      });
    }
    next();
  };
};

// Export validate middleware with the appointment schema
module.exports = validate(appointmentValidationSchema);
