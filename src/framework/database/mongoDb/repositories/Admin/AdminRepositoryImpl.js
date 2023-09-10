import SuperAdmin from "../../models/Admin.js";
import Department from "../../models/Department.js";
import Doctor from "../../models/DOctor.js";


const AdminRepositoryImpl = () => {
  const AdminExist = (email) => SuperAdmin.findOne({ email: email });
  const depExist = (department) => Department.findOne({department: department});
  const Data = (id) => Doctor.findOne({ _id: id }, { name: 1, email: 1 });
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
  const Approve = (id) =>
  Doctor.updateOne({ _id: id }, { $set: { reviewed: true ,approved:true} });
  
  const PendingApproval = () => Doctor.find({ reviewed: false ,approved:false});
  const ApprovedDoc = ( ) => Doctor.find({reviewed:true,approved:true})
  const Reject = (id) => Doctor.updateOne({ _id: id },{$set:{reviewed:true,approved:false}});
  

   
   

  return { AdminExist,depExist,Create,getDepartments,Approve,ApprovedDoc,Data,Reject,PendingApproval};
};
export default AdminRepositoryImpl;
