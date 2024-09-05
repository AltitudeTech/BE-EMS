const Joi = require("joi");
const {
  patientValidity,
  patientUpdate,
  deletePatientValidity,
  patientCreateSchema,
} = require("../validations/patientFormValidation");

// requiring multer library
const upload = require("../middleware/multerMiddleware");
const { Patient } = require("../models");

// Object for functionality

class PatientClass {
  //route too display all patient
  patientdisplay = async (req, res) => {
    try {
      const patientdisplay = await Patient.findAll({});
      return res.json(patientdisplay);
    } catch (error) {
      return console.log(error);
    }
  };

  //route to count number of patients

  patientCount = async (req, res) => {
    try {
      const patientCount = await Patient.findAndCountAll({});
      return res.json([patientCount.count]);
    } catch (error) {
      return console.log(error);
    }
  };

  // Method to create patient's details
  createPatient = async (req, res) => {
    try {
      // Destructure the request body
      const {
        firstName,
        lastName,
        email,
        phone,
        gender,
        dateOfBirth,
        address,
        educationQualification,
        organization,
      } = req.body;

      // Validate input using Joi schema
      const { error } = patientCreateSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }

      // Check if patient already exists by phone number
      const patientExist = await Patient.findOne({
        where: { phone },
      });

      if (patientExist) {
        return res.status(409).json({ message: "Patient already exists" });
      }

      // Create new patient if they don't exist
      const newPatient = await Patient.create({
        firstName,
        lastName,
        email,
        phone,
        gender,
        dateOfBirth,
        address,
        educationQualification,
        organization,
      });

      // Respond with the newly created patient data
      return res.status(201).json(newPatient);
    } catch (error) {
      // Handle server errors
      console.error("Error creating patient:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };

  //Method for edit patient details
  patientEdit = async (req, res) => {
    const {
      firstname,
      surname,
      email,
      mobile_no,
      gender,
      dob,
      address,
      education_qualification,
      organization,
    } = req.body;

    //validate inputs
    const check = patientUpdate.validate(req.body);
    if (check.error) {
      return res.status(404).json(check.error.details[0].message);
    }

    try {
      // check if patient exist
      const patientExist = await Patient.findOne({
        where: { mobile_no: req.body.mobile_no },
      });

      //update logic
      if (patientExist) {
        return res.status(200).send(
          Patient.update(
            {
              firstname,
              surname,
              email,
              mobile_no,
              gender,
              dob,
              address,
              education_qualification,
              organization,
            },
            {
              where: {
                mobile_no: req.body.mobile_no,
              },
            }
          )
        );
      } else {
        return res
          .status(404)
          .json({ msg: "Patient details not found for update" });
      }
    } catch (error) {
      throw error;
    }
  }; //patientEdit close

  //method to delete patient
  deletePatient = async (req, res) => {
    const mobile_no = req.body.mobile_no;

    const check = deletePatientValidity.validate(req.body);
    if (check.error) {
      return res.status(404).json(check.error.details[0].message);
    }

    // delete patient data
    try {
      // check if patient exist
      const patientExist = await Patient.findOne({
        where: { mobile_no: req.body.mobile_no },
      });

      if (patientExist) {
        await Patient.destroy({
          where: {
            mobile_no: req.body.mobile_no,
          },
        });
        return res
          .status(200)
          .json({ msg: "Patient data deleted successfully" });
      } else {
        return res.status(404).json({ msg: "Patient does not exist" });
      }
    } catch (error) {
      throw error;
    }
  };

  //functionality to upload image
  // profilePics = async (req, res) => {
  //   try {
  //     //
  //     const mobile_no = req.body.mobile_no

  //     //validate field
  //     const check = deletePatientValidity.validate(req.body);
  //     if (check.error) {
  //       return res.status(404).send(check.error.details[0].message);
  //   }

  //   //check if patiebt exist
  //     const patientExist = Patient.findOne({
  //       where: { mobile_no: req.body.mobile_no },
  //     })

  //     const filePath = req.file.path
  //     if(patientExist){
  //       await Patient.update({
  //         picture: filePath
  //       },
  //       {
  //         where: { mobile_no: req.body.mobile_no },
  //       }
  //     )
  //     console.log(req.file)
  //     return res.status(200).json({message: 'File upload successful'})
  //     }else{
  //       res.status(404).json({message: 'Patient does not exist'})
  //     }
  //   } catch (error) {
  //     throw error
  //   }

  // }

  // // Display profile image
  // displayPics = async (req, res) => {
  //   try {
  //     const mobile_no = req.body.mobile_no
  //     const check = deletePatientValidity.validate(req.body);
  //     if (check.error) {
  //       return res.status(404).send(check.error.details[0].message);
  //   }
  //   //find patient
  //   const patientExist = Patient.findOne({

  //     where: { mobile_no: req.body.mobile_no },
  //   })
  //   if(patientExist){

  //   res.send(resolve(patientExist.picture))
  //   console.log("file found")

  //   }

  //   } catch (error) {

  //   }

  // }
} //class close

// creat instance of the patient class
const patientClass = new PatientClass();

//export class
module.exports = {
  patientClass,
};

// Image.findByPk(req.params.id);
//     if (!image) {
//       return res.status(404).send('Image not found');
//     }
//     res.sendFile(path.join(__dirname, '../uploads/', image.filename)); // Adjust the path as necessary
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to retrieve image' });
//   }
