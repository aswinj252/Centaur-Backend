const authServiceInt = (repositories) =>{
    const comparePassword = (password,hashPassword) => repositories.comparePassword(password,hashPassword)
    const BcryptPassword = (password) => repositories.bcryptPassword(password)
    const createAccessToken = (id) => repositories.CreateAccessToken(id)
    const createRefreshToken = (id) => repositories.CreateRefreshToken(id)
    const verifyToken = (token)=> repositories.verifyAccess(token)
    const verifyRefresh = (token ) => repositories.verifyRefresh(token)
    const CreateNewToken = (id) => repositories.CreateNewToken(id)
    const getDetails = (token) => repositories.getDetails(token)
      
  
    return {BcryptPassword,comparePassword,createRefreshToken,createAccessToken,verifyToken,verifyRefresh,CreateNewToken,getDetails}
  
   }
   export default authServiceInt