import PatientEntity from "../../../entities/Patient.js";

const register = async (
  name,
  email,
  phone,
  password,
  repositories,
  authService
) => {
  return repositories.PatientExist(email).then(async (patient) => {
    if (!patient) {
      const HashPassword = await authService.BcryptPassword(password);

      const PatientDetails = PatientEntity(name, email, phone, HashPassword);
      const newPatient = await repositories.Create(PatientDetails);
      // const {id} = newPatient
      const accessToken = await authService.createAccessToken(newPatient._id) 
      const refrestToken = await authService.createRefreshToken(newPatient._id )
      console.log(refrestToken,accessToken );

      console.log("true");
      return { status: true,accessToken,refrestToken };
    } else {
      console.log("user already exist");
      return { message: "user already exist", status: false };
    }
  });
};

export default register;
