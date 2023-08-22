import register from "../../../application/use_case/Doctor/Register.js";
import login from "../../../application/use_case/Doctor/login.js";
import ScheduleAppointment from "../../../application/use_case/Doctor/ScheduleTime.js";
import DocDetails from "../../../application/use_case/Doctor/DocDetails.js";
import splitTime from "../../../application/use_case/Doctor/splitTime.js";

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
      const {  name,
        email,
        specification,
        phone,
        password, } = req.body;
   
      const documents = req.file
      console.log(documents,"files");

      const response = await register(
        name,
        email,
        specification,
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
      console.log(req.cookies,"cookies");
      const accessToken = req.cookies.refresh_token
      console.log(accessToken,"refresh token ");
  
      console.log(req.body,"in controlelr");
      const {selectedStartingTime,selectedEndingTime,slots,selectedDate,docId} = req.body
      console.log(selectedStartingTime,selectedEndingTime,slots,selectedDate,docId,'in controller');
      const responsee = await ScheduleAppointment(selectedStartingTime,selectedEndingTime,slots,selectedDate,docId,dbRepository)
      console.log(responsee,"fafadfaf");
      if (responsee){
        const {startingTime,endingTime,slots,date,docId,id} = responsee.newAppontment
        console.log(startingTime,endingTime,slots,date,docId,id);
        const Time = await splitTime(startingTime,endingTime,slots,date,docId,id,dbRepository)
    console.log(Time)
        
      }
      res.json({responsee ,message:"authenticated",expired:false})
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

     const newToken = authService.CreateNewToken(decodedToken.id)
     console.log(newToken,"454545454545454");
       return res.json({ message: "token expired and new token is " ,newToken });
      }else{
      res.json ({message:"unauthorized token"})
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
  return { createDoctor ,Login,AddAppointment,RefreshToken,getDetails};
};
export default DoctorAuthController;
