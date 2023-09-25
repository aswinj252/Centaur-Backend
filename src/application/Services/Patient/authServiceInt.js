 const authServiceInt = (repositories) =>{
    const BcryptPassword = (password) => repositories.bcryptPassword(password)
    const comparePassword = (password,hashPassword) => repositories.comparePassword(password,hashPassword)
    const createAccessToken = (id) => repositories.CreateAccessToken(id)
    const createRefreshToken = (id) => repositories.CreateRefreshToken(id)
    const verify = (token) => repositories.verify(token )

    return {BcryptPassword,comparePassword,createAccessToken,createRefreshToken,verify}

 }
 export default authServiceInt