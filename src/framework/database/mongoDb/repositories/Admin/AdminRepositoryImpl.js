import SuperAdmin from "../../models/Admin.js";
import Department from "../../models/Department.js";
import Doctor from "../../models/DOctor.js";


const AdminRepositoryImpl = () => {
  const AdminExist = (email) => SuperAdmin.findOne({ email: email });
  const depExist = (department) => Department.findOne({department: department});
  const Create = async(depDetails) =>{
    const newDepartment = new Department({
      department:depDetails.getDepartment(),
      description:depDetails.getDescription(),
      picture:depDetails.getPicture(),
      url:"null"
    })
    return newDepartment.save();
  }
  const getDepartments = ( ) => Department.find()
  const ApprovedDoc = ( ) => Doctor.find({approved:true,approved:true})
  

   
   

  return { AdminExist,depExist,Create,getDepartments,ApprovedDoc};
};
export default AdminRepositoryImpl;
