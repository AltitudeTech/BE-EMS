## EMS API

# Overview

The EMS(Electroni Medical System) is a  project, developed to manage Patient, staff, Organization and appointment records within an organization.

# Authentication
This API does not currently require authentication at the moment. 

# APIs
This API allows you to create, update, search, and delete records where necessary, ensuring that all records are maintained with proper 
validation for email, mobile numbers, and other critical fields.


# Base URLs
Production: https://{production-url.com}/EMS/staff
Development: http://localhost:5000/EMS/staff


# Staff API
This API allow users to create, update, search, and delete staff members.

# ENDPOINTS
 https://{production-url.com}/EMS/staff/createStaff - Creates staff
 Request method = Post 

 https://{production-url.com}/EMS/staff/updateStaff?id={id} - Update Staff records 
 Request method = PUT

 https://{production-url.com}/EMS/staff/deleteStaff?id={id} - Delete Staff records 
 Request method = DELETE
 
 https://{production-url.com}/EMS/staff/searchStaff?name={name}&specialization={specialization}&practice={practice} - Search staff
 Request method = GET
 Description: Searches for staff members by name, specialization, and practice. 



# PATIENT API
This API allow users to create, update, search, and delete staff members.
localhost:5000/EMS/patients/create


 https://{production-url.com}/EMS/patients/list - query all patients from the database
 Request method = GET 

 https://{production-url.com}/EMS/patients/create - Creates patients
  Request method = Post 

 https://{production-url.com}/EMS/patients/count - count the patient database table and return the number of patients
  Request method = Post

 https://{production-url.com}/EMS/patients/edit - Update patients
  Request method = PUT

 https://{production-url.com}/EMS/patients/delete - Delete  patients records
  Request method = DELETE   


