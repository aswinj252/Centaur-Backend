import register from "../../../application/use_case/Doctor/Register.js";
import login from "../../../application/use_case/Doctor/login.js";
import ScheduleAppointment from "../../../application/use_case/Doctor/ScheduleTime.js";
import DocDetails from "../../../application/use_case/Doctor/DocDetails.js";
import splitTime from "../../../application/use_case/Doctor/splitTime.js";
import ScheduleNAppointment from "../../../application/use_case/Doctor/ScheduleNAppointment.js";
import Departments from "../../../application/use_case/Doctor/Departments.js";
import Edit from "../../../application/use_case/Doctor/Edit.js";

const DoctorAuthController = (
  DoctorRepositoryInt,
  DoctorRepositoryImpl,
  authServiceInt,
  authServiceImp
) => {
  const dbRepository = DoctorRepositoryInt(DoctorRepositoryImpl());
  const authService = authServiceInt(authServiceImp());

  const createDoctor = async (req, res) => {
    try {
      console.log(req.body);
      const {  name,
        email,
        specification,department,
        phone,
        password, } = req.body;
   
      const documents = req.file
      console.log(documents,"files");

      const response = await register(
        name,
        email,
        specification,
        department,
        phone,
        password,
        documents,
        dbRepository,
        authService
      );

      res.json({ response });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  const Login = async(req,res) =>{
    try {
        
        console.log(req.body);
        const {email,password} = req.body;
        const response = await login(email,password,dbRepository,authService,res)
        res.json((response))
    } catch (error) {
        console.log(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
  const AddAppointment =async(req,res) =>{
    try {
    
      console.log(req.body,"in controlelr");
      const {selectedStartingTime,selectedEndingTime,slots,selectedDate,docid} = req.body
      console.log(selectedStartingTime,selectedEndingTime,slots,selectedDate,docid,'in controller');
      const responsee = await ScheduleAppointment(selectedStartingTime,selectedEndingTime,slots,selectedDate,docid,dbRepository)
      console.log(responsee,"fafadfaf");
      if (responsee){
        const {startingTime,endingTime,slots,date,docId,id} = responsee.newAppontment
        console.log(startingTime,endingTime,slots,date,docId,id);
        const Time = await splitTime(startingTime,endingTime,slots,date,docId,id,dbRepository)
    console.log(Time)
        
      }
      res.json({responsee ,message:"New Video Appointment added",expired:false})
    } catch (error) {
      console.log(error);
      
    }
  }

  const Appointment = async (req,res) =>{
    try {
      console.log(req.body,"ha i da ")
      const {selectedStartingTime,selectedEndingTime,slots,selectedDate,docId} = req.body
      console.log(selectedStartingTime,selectedEndingTime,slots,selectedDate,docId,'in controller');
      const response = await ScheduleNAppointment(selectedStartingTime,selectedEndingTime,slots,selectedDate,docId,dbRepository)
      return res.json({response,success:true,message:"new Time added"})
    } catch (error) {
      console.log(error);
      
    }
  }
  const RefreshToken = async(req,res)=>{
    const refreshToken = req.cookies.refresh_token
      console.log(refreshToken,"78878787878787877");
      if (refreshToken) {
     const  decodedToken =  authService.verifyRefresh(refreshToken)
     console.log(decodedToken,"refresh1111");
 if (decodedToken && decodedToken.status !== true){
 const newToken = authService.CreateNewToken(decodedToken.id)
     console.log(newToken,"454545454545454");
       return res.json({ message: "token expired and new token is " ,newToken });
 }
 else{
  return res.json({message:"token expired", refreshTokenExpired: true})
 }
    
      }else{
      res.json ({message:"unauthorized access", noToken:true})
      }
  }
  const getDetails = async(req,res) =>{
    try {
      const id = req.params.id 
    console.log(id,"idididididii");  
    const docDetails = await DocDetails(id, dbRepository)
    console.log(docDetails,"jhjhjhjhjhjhjhjhjhjhjjh");
    return res.json({docDetails})
    } catch (error) {
      console.log(error);
    }
    
  }
  const  getDepartments = async(req,res) =>{
try {
  const departments = await Departments(dbRepository)
  return res.json({departments})
} catch (error) {
  console.log(error);
}
  }
  const EditDetails = async(req,res) =>{

    try {
      const id = req.params.id
      console.log(req.body);
      const {name,email,phone,specilization,department} = req.body
      console.log(name,email,phone,specilization,department,"omgad");
      const editDetails = await Edit( id,name,email,phone,specilization,department,dbRepository)
      console.log(editDetails);
      res.json({editDetails})
    } catch (error) {
      console.log(error);
    }
  }

  return { createDoctor ,Login,AddAppointment,RefreshToken,getDetails,Appointment,getDepartments,EditDetails};
};
export default DoctorAuthController;
