import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../../../config/config.js";

const authServiceImp = () =>{

    const bcryptPassword = async (password) => {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        return hashPassword;
      };
    
    
      const comparePassword = (password, hashPassword) =>
      bcrypt.compare(password, hashPassword);


      const CreateAccessToken = (id) =>
    jwt.sign({id}, config.JWT_SecretKey,{ expiresIn: 120 });
     
    const CreateNewToken =(id) =>{
      console.log(id,"idddd");
      const newAccessTokenPayload = {
        id: id,
        iat: Math.floor(Date.now() / 1000), // Current timestamp
        exp: Math.floor(Date.now() / 1000) + (2 * 60) // Expiration in 2 minutes
      };
      const newTOken =  jwt.sign(newAccessTokenPayload, config.JWT_SecretKey);
      return newTOken

    }

  const CreateRefreshToken = (id) =>
    jwt.sign({id}, config.RefreshTokenKey,{ expiresIn: '2d'});
    
    
    const verifyAccess = (token) =>{
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
    const verifyRefresh = (token ) =>{
      try {
         const refresh = jwt.verify(token,config.RefreshTokenKey)
    console.log(refresh,"decoded refresh ");
    return refresh
  
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
        CreateRefreshToken,verifyAccess,verifyRefresh,CreateNewToken
      
      }
}
export default authServiceImp