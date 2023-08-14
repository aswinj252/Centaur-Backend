import register from "../../../application/use_case/Doctor/Register.js";
import login from "../../../application/use_case/Doctor/login.js";
import ScheduleAppointment from "../../../application/use_case/Doctor/ScheduleTime.js";

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
      const response = await ScheduleAppointment(selectedStartingTime,selectedEndingTime,slots,selectedDate,docId,dbRepository)
      console.log(response);
    } catch (error) {
      console.log(error);
      
    }
  }
  return { createDoctor ,Login,AddAppointment};
};
export default DoctorAuthController;
