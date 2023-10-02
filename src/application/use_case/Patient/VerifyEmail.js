const VerifyToken = async (token,authRepository) =>{
    const verify = await authRepository.verifyToken(token)
    
    console.log(verify);
    return ({verify})
}
export default VerifyToken