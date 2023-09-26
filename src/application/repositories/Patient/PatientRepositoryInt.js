

const PatientRepositoryInt = (repository) =>{
   
const PatientExist = (email) => repository.PatientExist(email);
const Create = (Patient) =>  repository.create(Patient)
const Departments = () => repository.getDepartments()
const getDoctors = ( ) => repository.getDoctors()
const Details = ( id) => repository.getDetails(id)
const GetTime = (id,date) => repository.GetTime(id,date)
const Book= (timeId,docId) => repository.Book(timeId,docId)
const Booked = (BookingDetails) => repository.Booked(BookingDetails)
const update = (id,token ) => repository.update(id,token)
const DeleteData = (token ) => repository.DeleteData(token)
const Data = (token ) => repository.Data(token )
const Verify = (token) => repository.Verify(token)
    
    
    

return {
    PatientExist,Create,Departments,getDoctors,Details,GetTime,Book,Booked,update,DeleteData,Data,Verify
}

}
export default PatientRepositoryInt;
