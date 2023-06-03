

const PatientRepositoryInt = (repository) =>{
   
const PatientExist = (email) => repository.PatientExist(email);


const Create = (Patient) =>  repository.create(Patient)
    
    
    

return {
    PatientExist,Create
}

}
export default PatientRepositoryInt;
