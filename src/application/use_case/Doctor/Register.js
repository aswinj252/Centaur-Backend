import DoctorEntity from "../../../entities/Doctor.js";

const register = async ( name,
    email,
    specification,
    phone,
    password,
    document,repositories,authService) => {
  return repositories.DoctorExist(email).then(async (doctor) => {
    if (!doctor) {
        
      const HashPassword = await authService.BcryptPassword(password);
     
      const DoctorDetails = DoctorEntity(
        name,
        email,
        specification,
        phone,
        HashPassword,
        document,
      )
    
      const NewDoctor = await repositories.Create(DoctorDetails);
      console.log(true, NewDoctor);
      return { status: true, NewDoctor };
    }
    else {
        console.log(" already applied");
        return { message: " already applied", status: false };
      }

  });
};
export default register 