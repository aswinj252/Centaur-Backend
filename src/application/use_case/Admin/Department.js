import AddDepartment from "../../../entities/AddDepartment.js"

const addDepartment = async (department,description,dbRepository ) =>{
    return dbRepository.depExist(department).then(async (Department) =>{
        if(!Department){
            const depDetails = AddDepartment(department,description);
            dbRepository.Create(depDetails);
        console.log("true");
        return { status: true};      
    
    }
    else {
        console.log("dep already exist");
        return { message: "dep already exist", status: false };
      }
    })


}
export default addDepartment