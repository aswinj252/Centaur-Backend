const authServiceInt = (repositories)  =>{
    const BcryptPassword = (password) => repositories.bcryptPassword(password)
    const comparePassword = (password,hashPassword) => repositories.comparePassword(password,hashPassword)

    return {BcryptPassword,comparePassword}
}
export default authServiceInt