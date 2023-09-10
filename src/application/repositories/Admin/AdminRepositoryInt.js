const  AdminRepositoryInt = (repository) =>{
    const AdminExist= (email) => repository.AdminExist(email);
    const depExist = (department) => repository.depExist(department) ;
    const Create = (depDetails) => repository.Create(depDetails)
    const getDepartments = () =>repository.getDepartments()
    const Approve = (id)=>repository.Approve(id)
    const ApprovedDoc = () => repository.ApprovedDoc()
    const Data = (id) => repository.Data(id)
    const Reject = (id) => repository.Reject(id)
    const PendingApproval = () => repository.PendingApproval()
    
   
    return{
        AdminExist,depExist,Create,getDepartments,Approve,ApprovedDoc,Data,Reject,PendingApproval
    }
}

export default AdminRepositoryInt