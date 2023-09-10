const Departments = async ( repository) =>{
    const departments = await repository.Departments()
    console.log(departments,"jai");

    return ({departments})
}
export default Departments