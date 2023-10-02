import AddDepartment from "../../../entities/AddDepartment.js"
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import config from "../../../config/config.js";

const addDepartment = async (department,description,picture,dbRepository ) =>{
    return dbRepository.depExist(department).then(async (Department) =>{
        if(!Department){

            // const S3 = new S3Client({
            //     credentials: {
            //       accessKeyId: config.accessKey,
            //       secretAccessKey: config.secret,
            //     },
            //     region: config.region,  
            //   });

            //   const params = {
            //     Bucket: config.Bucketname,
            //     Key: picture.originalname,
            //     Body: picture.buffer,
            //     contentType: picture.mimetype,
            //   };

            //   const command = new PutObjectCommand(params);
            //   await S3.send(command);


            
            const depDetails = AddDepartment(department,description,picture.originalname);
            dbRepository.Create(depDetails);
        console.log("true");
        return { status: true};      
    
    }
    else {
        console.log("dep already exist");
        return { message: "dep already exist", status: false };
      }
    })


}
export default addDepartment