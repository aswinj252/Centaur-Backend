import Login from "../../../application/use_case/Admin/AdminLogin.js";
import Pending from "../../../application/use_case/Admin/Pending.js";
import Approve from "../../../application/use_case/Admin/Approve.js";
import Reject from "../../../application/use_case/Admin/Reject.js";
import config from "../../../config/config.js";
import addDepartment from "../../../application/use_case/Admin/Department.js";
import nodemailer from 'nodemailer';



const AdminController = (AdminRepositoryInt,AdminRepositoryImpl,authServiceInt,authServiceImp,DoctorRepositoryInt,DoctorRepositoryImpl) =>{
  const dbRepository = AdminRepositoryInt(AdminRepositoryImpl());
  const authService = authServiceInt(authServiceImp());
  const docrep =DoctorRepositoryInt(DoctorRepositoryImpl())


  const AdminLogin = async(req,res) =>{
    try {
        const { email, password } = req.body;
        console.log(email, password);
        const response = await Login(email,password,dbRepository,authService)
         
        res.json({response});

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });

    }
  }
  const PendingApproval = async(req,res) =>{
    try {
        const response = await Pending(docrep)
    
        res.json({response})
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });

    }
  }
  const ApproveDoctor = async(req,res)=>{
    try {
        const id = req.params.id
        const response = await Approve(id,docrep)
        const email = response.data.email
        const name = response.data.name
        
     const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: config.Email,
        pass: config.EmailPassword
      }

    });
    
    const mailOptions = {
      from: config.Email,
      to: email,
      subject: 'Approval ',
      text: 'Your application has been Approved.',
      html:`<h1>Hello Dr ${name} </h1><p>This is a <strong>Approval Email </strong> of your application .</p> <br><p>  From now onwards you can login with your credentials and can schedule appointments<p/>`
    };
    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        console.log('Error occurred:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });
    
    
   
        res.json({response})
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });

        
    }
  }
  const RejectDoctor = async(req,res) =>{
    try {
      const id = req.params.id
      console.log(id);
      const response = await Reject(id,docrep)
     const email = response.data.email
     const name = response.data.name

     const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: config.Email,
        pass: config.EmailPassword
      }

    });
 
    const mailOptions = {
      from: config.Email,
      to:"aswinj252@gmail.com",
      subject: 'Rejection Mail ',
      text: 'Your application has been Rejected.',
      html:`<h1>Hello Dr ${name} </h1><p>This is an email to inform you that your applicaiton has been rejected  .</p> <br><p>Reason:We are looking for more experience Doctor <p/>`
    };
    
    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        console.log('Error occurred:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });
    

      res.json({response})
      
    } catch (error) {
      console.log(error);
        res.status(500).json({ error: "Internal server error" });
      
      
    }
  }
   const AddDepartment = async(req,res) =>{
     try {
      console.log(req.body,req.file,"fiel");
      const {department,discription } = req.body
      console.log(department,discription,"hjhkjhkkajdkjl");


  const response = await addDepartment(department,discription,dbRepository)
  res.json({response})
      
     } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal server error" });

     }
   }

  return{ AdminLogin,PendingApproval,ApproveDoctor,RejectDoctor,AddDepartment}
}

export default AdminController