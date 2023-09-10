

const PatientRepositoryInt = (repository) =>{
   
const PatientExist = (email) => repository.PatientExist(email);
const Create = (Patient) =>  repository.create(Patient)
const Departments = () => repository.getDepartments()
const getDoctors = ( ) => repository.getDoctors()
const Details = ( id) => repository.getDetails(id)
    
    
    

return {
    PatientExist,Create,Departments,getDoctors,Details
}

}
export default PatientRepositoryInt;
