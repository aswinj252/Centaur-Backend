import register from "../../../application/use_case/Patient/Register.js";
import Login from "../../../application/use_case/Patient/Login.js";
import Departments from "../../../application/use_case/Patient/Departments.js";
import Doctors from "../../../application/use_case/Patient/Doctors.js";
import DocDetails from "../../../application/use_case/Patient/DocDetails.js";
import AppointmentTime from "../../../application/use_case/Patient/AppointmentTime.js";
import GetPk from "../../../application/use_case/Patient/GetPrivateKey.js";
import createIntent from "../../../application/use_case/Patient/CreateIntent.js";


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
 const{id, convertedDate} =  req.query
 console.log(id, convertedDate,"jaiiii");
  const appointmetTime = await AppointmentTime(id, convertedDate,dbRepository)
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

  const BookAppointment = (req,res) =>{
    try {
      
      console.log(req.body,"body");
    } catch (error) {
      console.log(error);
    }
  }
  const getPK = async (req,res) =>{
    try {
       const PrivateKey = await GetPk()
       res.json({PrivateKey})
    } catch (error) {
      console.log(error);
      
    }
  }
  const CreateIntent = async(req,res) =>{
    try {
      const price = req.body
      console.log(price);
      const Intent = await createIntent(price)
      console.log(Intent);
      res.json({Intent})
     
    } catch (error) {
      console.log(error);
    }
  }
  return { createPatient, patientLogin,getDepartments,getDoctors,getDocDetails,getVideoAppointmentTime,BookAppointment,getPK,CreateIntent};
};

export default PatientAuthController;
