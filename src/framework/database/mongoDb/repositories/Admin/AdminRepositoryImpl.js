import SuperAdmin from "../../models/Admin.js";
import Department from "../../models/Department.js";


const AdminRepositoryImpl = () => {
  const AdminExist = (email) => SuperAdmin.findOne({ email: email });
  const depExist = (department) => Department.findOne({department: department});
  const Create = async(depDetails) =>{
    const newDepartment = new Department({
      department:depDetails.getDepartment(),
      description:depDetails.getDescription()
    })
    return newDepartment.save();
  }
  

   
   

  return { AdminExist,depExist,Create};
};
export default AdminRepositoryImpl;
