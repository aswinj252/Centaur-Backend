const DoctorEntity = (
  name,
  email,
  speciality,
  phone,
  password,
  document,
  department,
  videoData,
  status
) => {
  return {
    getName: () => name,
    getSpeciality: () => speciality,
    getEmail: () => email,
    getPhone: () => phone,
    getPassword: () => password,
    getDocument: () => document,
    getDepartment: () => department,
    getVideoData: () => videoData,
    getStatus: () => status,
  };
};
export default DoctorEntity;
