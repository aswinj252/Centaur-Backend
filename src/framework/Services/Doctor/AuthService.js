import bcrypt from "bcrypt";

const authServiceImp = () =>{

    const bcryptPassword = async (password) => {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        return hashPassword;
      };
    
    
      const comparePassword = (password, hashPassword) =>
      bcrypt.compare(password, hashPassword);


      return {
        bcryptPassword,
        comparePassword,
      }
}
export default authServiceImp