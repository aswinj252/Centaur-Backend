const  AdminRepositoryInt = (repository) =>{
    const AdminExist= (email) => repository.AdminExist(email);
    
   
    return{
        AdminExist
    }
}

export default AdminRepositoryInt