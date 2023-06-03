import SuperAdmin from "../../models/Admin.js";


const AdminRepositoryImpl = () => {
  const AdminExist = (email) => SuperAdmin.findOne({ email: email });
  

   
   

  return { AdminExist};
};
export default AdminRepositoryImpl;
