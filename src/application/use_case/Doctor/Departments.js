const Departments = async(repository) =>{
    const department = await repository.AllDepartments()
    return ({department})
}
export default Departments