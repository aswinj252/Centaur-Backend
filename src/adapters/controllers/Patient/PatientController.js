import register from "../../../application/use_case/Patient/Register.js";
import Login from "../../../application/use_case/Patient/Login.js";
import Departments from "../../../application/use_case/Patient/Departments.js";
import Doctors from "../../../application/use_case/Patient/Doctors.js";
import DocDetails from "../../../application/use_case/Patient/DocDetails.js";
import AppointmentTime from "../../../application/use_case/Patient/AppointmentTime.js";
import GetPk from "../../../application/use_case/Patient/GetPrivateKey.js";
import createIntent from "../../../application/use_case/Patient/CreateIntent.js";
import bookappointment from "../../../application/use_case/Patient/bookAppointment.js";
import VerifyToken from "../../../application/use_case/Patient/VerifyEmail.js";
import deleteDetails from "../../../application/use_case/Patient/DeleteDetails.js";
import verified from "../../../application/use_case/Patient/Verify.js";

// backend.js
import moment from 'moment-timezone';
import GetData from "../../../application/use_case/Patient/Details.js";

moment.tz.setDefault('Asia/Kolkata');
 // Set the default time zone for your backend

// Export other functions or modules as needed


const PatientAuthController = (
  PatientRepositoryInt,
  PatientRepositoryImp,
  authServiceInt,
  authServiceImp
) => {
  const dbRepository = PatientRepositoryInt(PatientRepositoryImp());
  const authService = authServiceInt(authServiceImp());

  const createPatient = async (req, res) => {
    try {
      console.log("in controller");
      console.log(req.body);
      const { name, email, phone, password } = req.body;

      const response = await register(
        name,
        email,
        phone,
        password,
        dbRepository,
        authService
      );
      
      res.json({ response });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

  const patientLogin = async (req, res) => {
    try {
      const { email, password } = req.body;

      const response = await Login(
        email,
        password,
        dbRepository,
        authService
        ,res
      );
      
      res.json({ response });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

  const VerifyEmail = async (req,res) =>{

    try {
      
      console.log(req.params);
      const token = req.params.token 
      const verify = await VerifyToken(token,authService)
      console.log(verify,"verifyjhkjhjhkjkh");
    
      
  if (verify.verify.id) {
     
   const verifying =   await verified(token,dbRepository)
     console.log("verififed","jkjjkjk");
     res.send(`<!DOCTYPE html>
     <html lang="en">
     <head>
         <meta charset="UTF-8">
         <meta name="viewport" content="width=device-width, initial-scale=1.0">
         <title>Email Template</title>
         <style>
             /* Reset styles to ensure consistency across email clients */
             body, table, td, a {
                 -webkit-text-size-adjust: 100%;
                 -ms-text-size-adjust: 100%;
                 margin: 0;
                 padding: 0;
             }
     
             /* Set the background color of the email */
             body {
                 background-color: #f4f4f4;
                 font-family: Arial, sans-serif;
             }
     
             /* Ensure proper rendering in email clients */
             table {
                 border-collapse: collapse;
                 mso-table-lspace: 0pt;
                 mso-table-rspace: 0pt;
             }
     
             /* Add some spacing and styling to the email container */
             .email-container {
                 max-width: 600px;
                 margin: 0 auto;
                 padding: 20px;
             }
     
             /* Style the header with your logo or text */
             .header {
                 text-align: center;
                 padding: 20px 0;
             }
     
             /* Style the main content area */
             .content {
                 background-color: #ffffff;
                 padding: 20px;
                 border-radius: 5px;
             }
     
             /* Style headings */
             h1, h2 {
                 color: #333;
             }
     
             /* Style buttons */
             .button {
                 display: inline-block;
                 background-color: #007bff;
                 color: #ffffff;
                 text-decoration: none;
                 padding: 10px 20px;
                 border-radius: 3px;
             }
     
             /* Make sure the button is readable on different backgrounds */
             .button:hover {
                 background-color: #0056b3;
             }
     
             /* Responsive styles */
             @media screen and (max-width: 600px) {
                 /* Center align the content when viewed on smaller screens */
                 .email-container {
                     width: 100%;
                 }
             }
         </style>
     </head>
     <body>
         <div class="email-container">
             <div class="header">
                 <!-- Add your logo or text here -->
                 <h1>Your Company</h1>
             </div>
             <div class="content">
                 <h2>Email Verified!</h2>
                 <p>Thank you for verifying your email address. You are now part of our community.</p>
                 <p>Click the button below to get started:</p>
                 <a href="http://localhost:5173/login" class="button">Get Started</a>
             </div>
         </div>
     </body>
     </html>
     `)

  }
  else if(verify.verify.expired) { 
    const data = await GetData(token, dbRepository)
    console.log(data.data,"date");
    if (data.data === null) {
      res.send(`<!DOCTYPE html>
     <html lang="en">
     <head>
         <meta charset="UTF-8">
         <meta name="viewport" content="width=device-width, initial-scale=1.0">
         <title>Email Template</title>
         <style>
             /* Reset styles to ensure consistency across email clients */
             body, table, td, a {
                 -webkit-text-size-adjust: 100%;
                 -ms-text-size-adjust: 100%;
                 margin: 0;
                 padding: 0;
             }
     
             /* Set the background color of the email */
             body {
                 background-color: #f4f4f4;
                 font-family: Arial, sans-serif;
             }
     
             /* Ensure proper rendering in email clients */
             table {
                 border-collapse: collapse;
                 mso-table-lspace: 0pt;
                 mso-table-rspace: 0pt;
             }
     
             /* Add some spacing and styling to the email container */
             .email-container {
                 max-width: 600px;
                 margin: 0 auto;
                 padding: 20px;
             }
     
             /* Style the header with your logo or text */
             .header {
                 text-align: center;
                 padding: 20px 0;
             }
     
             /* Style the main content area */
             .content {
                 background-color: #ffffff;
                 padding: 20px;
                 border-radius: 5px;
             }
     
             /* Style headings */
             h1, h2 {
                 color: #333;
             }
     
             /* Style buttons */
             .button {
                 display: inline-block;
                 background-color: #007bff;
                 color: #ffffff;
                 text-decoration: none;
                 padding: 10px 20px;
                 border-radius: 3px;
             }
     
             /* Make sure the button is readable on different backgrounds */
             .button:hover {
                 background-color: #0056b3;
             }
     
             /* Responsive styles */
             @media screen and (max-width: 600px) {
                 /* Center align the content when viewed on smaller screens */
                 .email-container {
                     width: 100%;
                 }
             }
         </style>
     </head>
     <body>
         <div class="email-container">
             <div class="header">
                 <!-- Add your logo or text here -->
                 <h1>Your Company</h1>
             </div>
             <div class="content">
                 <h2>Email Verification Failed</h2>
                 <p>We're sorry, but your email verification token has expired or is invalid.</p>
                 <p>Please signup again.</p>
                 <a href="http://localhost:5173/signup" class="button">signup</a>
             </div>
         </div>
     </body>
     </html>
     `)

      
    }
    else{
      await deleteDetails(token,dbRepository)
       console.log("details deleted");
       res.send(`<!DOCTYPE html>
     <html lang="en">
     <head>
         <meta charset="UTF-8">
         <meta name="viewport" content="width=device-width, initial-scale=1.0">
         <title>Email Template</title>
         <style>
             /* Reset styles to ensure consistency across email clients */
             body, table, td, a {
                 -webkit-text-size-adjust: 100%;
                 -ms-text-size-adjust: 100%;
                 margin: 0;
                 padding: 0;
             }
     
             /* Set the background color of the email */
             body {
                 background-color: #f4f4f4;
                 font-family: Arial, sans-serif;
             }
     
             /* Ensure proper rendering in email clients */
             table {
                 border-collapse: collapse;
                 mso-table-lspace: 0pt;
                 mso-table-rspace: 0pt;
             }
     
             /* Add some spacing and styling to the email container */
             .email-container {
                 max-width: 600px;
                 margin: 0 auto;
                 padding: 20px;
             }
     
             /* Style the header with your logo or text */
             .header {
                 text-align: center;
                 padding: 20px 0;
             }
     
             /* Style the main content area */
             .content {
                 background-color: #ffffff;
                 padding: 20px;
                 border-radius: 5px;
             }
     
             /* Style headings */
             h1, h2 {
                 color: #333;
             }
     
             /* Style buttons */
             .button {
                 display: inline-block;
                 background-color: #007bff;
                 color: #ffffff;
                 text-decoration: none;
                 padding: 10px 20px;
                 border-radius: 3px;
             }
     
             /* Make sure the button is readable on different backgrounds */
             .button:hover {
                 background-color: #0056b3;
             }
     
             /* Responsive styles */
             @media screen and (max-width: 600px) {
                 /* Center align the content when viewed on smaller screens */
                 .email-container {
                     width: 100%;
                 }
             }
         </style>
     </head>
     <body>
         <div class="email-container">
             <div class="header">
                 <!-- Add your logo or text here -->
                 <h1>Your Company</h1>
             </div>
             <div class="content">
                 <h2>Email Verification Failed</h2>
                 <p>We're sorry, but your email verification token has expired or is invalid.</p>
                 <p>Please signup again.</p>
                 <a href="http://localhost:5173/signup" class="button">signup</a>
             </div>
         </div>
     </body>
     </html>
     `)

    }
  
    
   
  
  }
     else{
      console.log("signup please");
     }


    } catch (error) {
      console.log(error);
      
    }
    
  }
 
  const getDepartments = async(req,res) =>{
    try {
      const departments= await Departments(dbRepository)
      console.log(departments);
      res.json({departments})
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
      
    }
  }
  const getDoctors = async (req,res) =>{
    try {
      const doctors = await  Doctors(dbRepository)
      res.json({doctors})
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
      
    }
  }
  const getDocDetails = async (req,res) =>{
    try {
      const id = req.params.id
      console.log(id);
      const Details = await DocDetails(id,dbRepository)
      res.json({Details})
      
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
      
    }
  }
  const getVideoAppointmentTime = async ( req,res) =>{
 try {
  console.log(req.query);
 const{id, date} =  req.query
 
 const inputDate = new Date(date);

// Calculate the next day by adding 1 to the date
inputDate.setDate(inputDate.getDate() + 1);
console.log(inputDate,"new date");
// const nextDayString = `"${inputDate.toISOString()}"`;

const newDate = new Date(inputDate).toISOString()

console.log(id,inputDate,newDate,"ddsafsdfadsf");

  const appointmetTime = await AppointmentTime(id,newDate ,dbRepository)
  
  console.log(appointmetTime,"haiiii");

  if (appointmetTime.Time.length === 0) {
    console.log("no appontment on this date");
    res.json({message:"No appontment on the selected date .Please choose another date ",noAppointment:true})
  }
  else {
    console.log("these are the appointment"); 
    res.json({appointmetTime,noAppointment:false})
  }
  
 } catch (error) {console.log(error);
  
 }
  }

  const BookAppointment =async(req,res) =>{
    try {
      console.log(req.body,"body");
      const {patientId,dateId,docId} = req.body
      const BookedAppointment = await bookappointment(patientId,dateId,docId,dbRepository)
      console.log(BookedAppointment,"appointment booked ");
      res.json({appointmentBooked:true})
    } catch (error) {
      console.log(error);
    }
  }
  // const getPK = async (req,res) =>{
  //   try {
  //      const PrivateKey = await GetPk()
  //      res.json({PrivateKey})
  //   } catch (error) {
  //     console.log(error);
      
  //   }
  // }
  const CreateIntent = async(req,res) =>{
    try {
    console.log(req.body);
    const {time,PatietnId,id,name} = req.body
    console.log(time,PatietnId,id,"contro");

      const Intent = await createIntent(id,name)
   
          console.log(Intent);
         res.json({Intent}) 
     
      
      
      
      
  
     
    } catch (error) {
      console.log(error);
    }
  }
  return { createPatient, patientLogin,getDepartments,getDoctors,getDocDetails,getVideoAppointmentTime,BookAppointment,CreateIntent,VerifyEmail};
};

export default PatientAuthController;
