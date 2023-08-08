const  AdminRepositoryInt = (repository) =>{
    const AdminExist= (email) => repository.AdminExist(email);
    const depExist = (department) => repository.depExist(department) ;
    const Create = (depDetails) => repository.Create(depDetails)
    
   
    return{
        AdminExist,depExist,Create
    }
}

export default AdminRepositoryInt