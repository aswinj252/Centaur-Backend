const DoctorRepositoryInt =(repository) =>{
    const DoctorExist = (email) =>repository.DoctorExist(email);
    
    const Create = (doctor) => repository.create(doctor)
    const PendingApproval = () => repository.PendingApproval()
    const Approve = (id)=>repository.Approve(id)
    const Reject = (id) => repository.Reject(id)
    const Data = (id) => repository.Data(id)
    const Schedule = (details)=>repository.Schedule(details)
    const verifyUser = (id) => repository.verifyUser(id)
   
 
 
    return{
        DoctorExist,Create,PendingApproval,Approve,Reject,Data,Schedule,verifyUser
    }
}
export default DoctorRepositoryInt