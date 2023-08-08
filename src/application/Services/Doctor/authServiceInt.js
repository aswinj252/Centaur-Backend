const authServiceInt = (repositories)  =>{
    const BcryptPassword = (password) => repositories.bcryptPassword(password)
    const comparePassword = (password,hashPassword) => repositories.comparePassword(password,hashPassword)
    const createAccessToken = (id) => repositories.CreateAccessToken(id)
    const createRefreshToken = (id) => repositories.CreateRefreshToken(id)
    return {BcryptPassword,comparePassword,createRefreshToken,createAccessToken}
}
export default authServiceInt