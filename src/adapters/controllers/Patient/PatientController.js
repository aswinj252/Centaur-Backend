import register from "../../../application/use_case/Patient/Register.js";
import Login from "../../../application/use_case/Patient/Login.js";

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

  return { createPatient, patientLogin };
};

export default PatientAuthController;
