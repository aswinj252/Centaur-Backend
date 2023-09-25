import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../../../config/config.js";

const authServiceImp = () => {
  const bcryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    return hashPassword;
  };

  const comparePassword = (password, hashPassword) =>
    bcrypt.compare(password, hashPassword);

  const CreateAccessToken = (id) =>
    jwt.sign({id}, config.JWT_SecretKey,{ expiresIn: 300 });

  const CreateRefreshToken = (id) =>
    jwt.sign({id}, config.RefreshTokenKey,{ expiresIn: '2d'});

    const verify = (token) =>{
      try {
        console.log(token);
          const decodedtoken =  jwt.verify(token,config.JWT_SecretKey)
           console.log(decodedtoken,"decoded token");
          return decodedtoken
      } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
          console.error("Token has expired.");
         return {expired:true}
      } else if (error instanceof jwt.JsonWebTokenError) {
          console.error("Token verification failed.");
      } else {
          console.error("An error occurred while verifying the token:", error.message);
      }
      return null;
        
      }
   
    } 
  return {
    bcryptPassword,
    comparePassword,
    CreateAccessToken,
    CreateRefreshToken,
    verify
  };
};
export default authServiceImp;
