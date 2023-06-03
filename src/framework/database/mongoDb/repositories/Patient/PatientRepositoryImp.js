import Patient from "../../models/Patient.js";
const PatientRepositoryImp = () => {
  const PatientExist = (email) => Patient.findOne({ email: email });

  const create = async (patient) => {
    const newpatient = new Patient({
      name: patient?.getName(),
      email: patient?.getEmail(),
      phone: patient?.getPhone(),
      password: patient?.getPassword(),
    });
    return newpatient.save();
  };

  return { PatientExist, create };
};

export default PatientRepositoryImp;
