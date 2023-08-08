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
    jwt.sign({id}, config.JWT_SecretKey,{ expiresIn: 900 });

  const CreateRefreshToken = (id) =>
    jwt.sign({id}, config.RefreshTokenKey,{ expiresIn: '2d'});

      return {
        bcryptPassword,
        comparePassword,
        CreateAccessToken,
        CreateRefreshToken
      
      }
}
export default authServiceImp