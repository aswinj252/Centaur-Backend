

const PatientRepositoryInt = (repository) =>{
   
const PatientExist = (email) => repository.PatientExist(email);
const Create = (Patient) =>  repository.create(Patient)
const Departments = () => repository.getDepartments()
const getDoctors = ( ) => repository.getDoctors()
const Details = ( id) => repository.getDetails(id)
const GetTime = (id,date) => repository.GetTime(id,date)
const Book= (timeId,docId) => repository.Book(timeId,docId)
const Booked = (BookingDetails) => repository.Booked(BookingDetails)
    
    
    

return {
    PatientExist,Create,Departments,getDoctors,Details,GetTime,Book,Booked
}

}
export default PatientRepositoryInt;
