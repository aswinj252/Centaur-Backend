const authServiceInt = (repositories)  =>{
    const BcryptPassword = (password) => repositories.bcryptPassword(password)
    const comparePassword = (password,hashPassword) => repositories.comparePassword(password,hashPassword)
    const createAccessToken = (id) => repositories.CreateAccessToken(id)
    const createRefreshToken = (id) => repositories.CreateRefreshToken(id)
    const verifyToken = (token)=> repositories.verifyAccess(token)
    const verifyRefresh = (token ) => repositories.verifyRefresh(token)
    const CreateNewToken = (id) => repositories.CreateNewToken(id)
    return {BcryptPassword,comparePassword,createRefreshToken,createAccessToken,verifyToken,verifyRefresh,CreateNewToken}
}
export default authServiceInt