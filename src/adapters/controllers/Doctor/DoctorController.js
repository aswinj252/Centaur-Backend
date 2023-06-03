import register from "../../../application/use_case/Doctor/Register.js";
import login from "../../../application/use_case/Doctor/login.js";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import config from "../../../config/config.js";

const DoctorAuthController = (
  DoctorRepositoryInt,
  DoctorRepositoryImpl,
  authServiceInt,
  authServiceImp
) => {
  const dbRepository = DoctorRepositoryInt(DoctorRepositoryImpl());
  const authService = authServiceInt(authServiceImp());

  const createDoctor = async (req, res) => {
    try {
        console.log(req.body);
      const {  name,
        email,
        specification,
        phone,
        password, } = req.body;
      console.log(req.file,"files");

      const S3 = new S3Client({
        credentials: {
          accessKeyId: config.accessKey,
          secretAccessKey: config.secret,
        },
        region: config.region,
      });
      const params = {
        Bucket: config.Bucketname,
        Key: req.file.originalname,
        Body: req.file.buffer,
        contentType: req.file.mimetype,
      };
     const document = req.file.originalname
     console.log(document,"fdfdf");
      const command = new PutObjectCommand(params);
      await S3.send(command);
      const response = await register(
        name,
        email,
        specification,
        phone,
        password,
        document,
        dbRepository,
        authService
      );

      res.json({ response });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  const Login = async(req,res) =>{
    try {
        
        console.log(req.body);
        const {email,password} = req.body;
        const response = await login(email,password,dbRepository,authService)
        res.json((response))
    } catch (error) {
        console.log(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
  return { createDoctor ,Login};
};
export default DoctorAuthController;
