//require joi dependencies
const Joi = require("joi")


//patient form validation
const patientValidity = Joi.object({
    id: Joi.string().required(),
    firstname: Joi.string().required(),
    surname: Joi.string().required(),
    email: Joi.string().email(),
    mobile_no: Joi.string().required(),
    gender: Joi.string().required(),
    dob: Joi.string(),
    address: Joi.string(),
    education_qualification: Joi.string(),
    organization: Joi.string(),
})


//patient update details

const patientUpdate = Joi.object({
    firstname: Joi.string(),
    surname: Joi.string(),
    email: Joi.string().email(),
    mobile_no: Joi.string(),
    gender: Joi.string(),
    dob: Joi.string(),
    address: Joi.string(),
    education_qualification: Joi.string(),
    organization: Joi.string(),


})


//delete  dedtails
const deletePatientValidity =  Joi.object({
    mobile_no: Joi.string().required()
})

//module export
module.exports = {
    patientValidity,
    patientUpdate,
    deletePatientValidity
}
