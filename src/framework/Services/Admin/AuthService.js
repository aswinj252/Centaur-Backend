import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../../../config/config.js";

const authServiceImp = () => {
 

  const comparePassword = (password, hashPassword) =>
    bcrypt.compare(password, hashPassword);

//   const CreateAccessToken = (id) =>
//     jwt.sign({id}, config.JWT_SecretKey,{ expiresIn: 900 });

//   const CreateRefreshToken = (id) =>
//     jwt.sign({id}, config.RefreshTokenKey,{ expiresIn: '2d'});
  return {
 
    comparePassword
  };
};
export default authServiceImp;
