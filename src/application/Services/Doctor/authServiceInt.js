const authServiceInt = (repositories)  =>{
    const BcryptPassword = (password) => repositories.bcryptPassword(password)
    const comparePassword = (password,hashPassword) => repositories.comparePassword(password,hashPassword)
    const createAccessToken = (id) => repositories.CreateAccessToken(id)
    const createRefreshToken = (id) => repositories.CreateRefreshToken(id)
    const verifyToken = (token)=> repositories.verifyAccess(token)
    const verifyRefresh = (token ) => repositories.verifyRefresh(token)
    return {BcryptPassword,comparePassword,createRefreshToken,createAccessToken,verifyToken,verifyRefresh}
}
export default authServiceInt