import DoctorEntity from "../../../entities/Doctor.js";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import config from "../../../config/config.js";

const register = async ( name,
    email,
    specification,department,
    phone,
    password,
    document,repositories,authService) => {
  return repositories.DoctorExist(email).then(async (doctor) => {
    if (!doctor) {
      
      console.log(document.buffer,document.originalname,"re desighRS");
      
      const S3 = new S3Client({
        credentials: {
          accessKeyId: config.accessKey,
          secretAccessKey: config.secret,
        },
        region: config.region,
      });
      const params = {
        Bucket: config.Bucketname,
        Key: document.originalname,
        Body: document.buffer,
        contentType: document.mimetype,
      };
    
      const command = new PutObjectCommand(params);
      await S3.send(command);

        
      const HashPassword = await authService.BcryptPassword(password);
      const picture = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvkpRbsObBju8Hsn3FuRLm_UdfTy_HFuWM6Z15Y2DSu-7yxqn8rJy_zoKhMAAI6PhWbpo&usqp=CAU"
      const DoctorDetails = DoctorEntity(
        name,
        email,
        specification,
        department,
        phone,
        HashPassword,
        document.originalname,
        picture
      )
    
      const NewDoctor = await repositories.Create(DoctorDetails);
      console.log(true, NewDoctor);
      return { status: true, NewDoctor };
    }
    else {
        console.log(" already applied");
        return { message: " already applied", status: false };
      }

  });
};
export default register 