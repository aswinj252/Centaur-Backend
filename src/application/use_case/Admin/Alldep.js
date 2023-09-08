
import config from "../../../config/config.js";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const AllDepartments = async( repository) =>{
    console.log("inmside usecae");
    const S3 = new S3Client({
        credentials: {
          accessKeyId: config.accessKey,
          secretAccessKey: config.secret,
        },
        region: config.region,
      });
     
const departments = await repository.getDepartments()

for (const department of departments) {
    const getObjectParams = {
      Bucket: config.Bucketname,
      Key: department.picture,
    };
    const command = new GetObjectCommand(getObjectParams);
    const url = await getSignedUrl(S3, command, { expiresIn: 3600 });
    console.log(department.url);
    // Assign the 'url' property to the 'department' object
    department.url = url;
    console.log(department);
  }
  
return ({departments})
} 
export default AllDepartments