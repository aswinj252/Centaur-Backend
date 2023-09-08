const DoctorEntity = (
  name,
  email,
  speciality,
  department,
  phone,
  password,
  document,
  picture,
) => {
  return {
    getName: () => name,
    getSpeciality: () => speciality,
    getDepartment: () => department,
    getEmail: () => email,
    getPhone: () => phone,
    getPassword: () => password,
    getDocument: () => document,
    getPicture: () => picture,
    // getStatus: () => status,
  };
};
export default DoctorEntity;
