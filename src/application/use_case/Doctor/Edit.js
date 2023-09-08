
const Edit = async( id,name,email,phone,specilization,department,repository) =>{
    console.log(id,name,email,phone,specilization,department);


const response = await repository.EditDetails(id,name,email,phone,specilization,department)
return ({edited:true})

}
export default Edit