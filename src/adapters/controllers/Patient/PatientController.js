import register from "../../../application/use_case/Patient/Register.js";
import Login from "../../../application/use_case/Patient/Login.js";
import Departments from "../../../application/use_case/Patient/Departments.js";
import Doctors from "../../../application/use_case/Patient/Doctors.js";
import DocDetails from "../../../application/use_case/Patient/DocDetails.js";

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
  return { createPatient, patientLogin,getDepartments,getDoctors,getDocDetails};
};

export default PatientAuthController;
