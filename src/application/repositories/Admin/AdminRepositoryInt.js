const  AdminRepositoryInt = (repository) =>{
    const AdminExist= (email) => repository.AdminExist(email);
    const depExist = (department) => repository.depExist(department) ;
    const Create = (depDetails) => repository.Create(depDetails)
    const getDepartments = () =>repository.getDepartments()
    const ApprovedDoc = () => repository.ApprovedDoc()
    
   
    return{
        AdminExist,depExist,Create,getDepartments,ApprovedDoc
    }
}

export default AdminRepositoryInt