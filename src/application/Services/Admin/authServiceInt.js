const authServiceInt = (repositories) =>{
    const comparePassword = (password,hashPassword) => repositories.comparePassword(password,hashPassword)
      // const createAccessToken = (id) => repositories.CreateAccessToken(id)
      // const createRefreshToken = (id) => repositories.CreateRefreshToken(id)
      
  
      return {comparePassword}
  
   }
   export default authServiceInt