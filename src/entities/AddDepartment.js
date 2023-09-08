const AddDepartment = (department,desctiption,picture) =>{
    return {
        getDepartment:() => department,
        getDescription:() => desctiption,
        getPicture:() => picture
    }

}
export default AddDepartment ;