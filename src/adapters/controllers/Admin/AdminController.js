import Login from "../../../application/use_case/Admin/AdminLogin.js";
import Pending from "../../../application/use_case/Admin/Pending.js";
import Approve from "../../../application/use_case/Admin/Approve.js";
import Reject from "../../../application/use_case/Admin/Reject.js";
import addDepartment from "../../../application/use_case/Admin/Department.js";
import AllDepartments from "../../../application/use_case/Admin/Alldep.js";
import approvedDoc from "../../../application/use_case/Admin/ApprovedDoc.js";


const AdminController = (
  AdminRepositoryInt,
  AdminRepositoryImpl,
  authServiceInt,
  authServiceImp,
  mailServiceInt,
  mailServiceImp
 
) => {
  const dbRepository = AdminRepositoryInt(AdminRepositoryImpl());
  const authService = authServiceInt(authServiceImp());
  const mailService = mailServiceInt(mailServiceImp());
  
 

  const AdminLogin = async (req, res) => {
    try {
      const { email, password } = req.body;
      console.log(email, password);
      const response = await Login(email, password, dbRepository, authService);

      res.json({ response });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  const PendingApproval = async (req, res) => {
    try {
      const response = await Pending(dbRepository);

      res.json({ response });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  const ApproveDoctor = async (req, res) => {
    try {
      const id = req.params.id;
      const response = await Approve(id, dbRepository,mailService);
   
      res.json({ response });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  const RejectDoctor = async (req, res) => {
    try {
      const id = req.params.id;
      console.log(id);
      const response = await Reject(id, dbRepository,mailService);
     
      res.json({ response });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  const AddDepartment = async (req, res) => {
    try {
      console.log(req.body, req.file, "fiel");
      const picture = req.file
      const { department, discription } = req.body;
      console.log(department, discription, "hjhkjhkkajdkjl");

      const response = await addDepartment(
        department,
        discription,
        picture,
        dbRepository
      );
      res.json({ response });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  const Alldepartment  = async (req,res) =>{
     try {
      console.log("inside controlee");
      const department = await AllDepartments(dbRepository)
  
       
      res.json({department})
     } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal server error" });
     }
  }
  const AllApprovedDoc =async (req,res) =>{
    try {
      const ApprovedDoc = await approvedDoc(dbRepository)

       res.json({ApprovedDoc})
      
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal server error" });
      
    }
  }

  return {
    AdminLogin,
    PendingApproval,
    ApproveDoctor,
    RejectDoctor,
    AddDepartment,
    Alldepartment,
    AllApprovedDoc
  };
};

export default AdminController;
