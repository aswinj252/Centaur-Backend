import register from "../../../application/use_case/Patient/Register.js";
import Login from "../../../application/use_case/Patient/Login.js";
import Departments from "../../../application/use_case/Patient/Departments.js";
import Doctors from "../../../application/use_case/Patient/Doctors.js";
import DocDetails from "../../../application/use_case/Patient/DocDetails.js";
import AppointmentTime from "../../../application/use_case/Patient/AppointmentTime.js";
import GetPk from "../../../application/use_case/Patient/GetPrivateKey.js";
import createIntent from "../../../application/use_case/Patient/CreateIntent.js";
import bookappointment from "../../../application/use_case/Patient/bookAppointment.js";

// backend.js
import moment from 'moment-timezone';

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
  return { createPatient, patientLogin,getDepartments,getDoctors,getDocDetails,getVideoAppointmentTime,BookAppointment,CreateIntent};
};

export default PatientAuthController;
