
const Login = async(email,password,repositories,authService) =>{
   

  const User = await repositories.PatientExist(email)
  console.log(User,"user");
  const id = User._id.toString();

  if(User !=null){
    console.log(id,"id for jwt");
 
    const Password=await authService.comparePassword(password,User.password,res)
        if(Password){
          const accessToken = await authService.createAccessToken(id) 
          const refreshToken = await authService.createRefreshToken(id )
            console.log("true");

            res.cookie('refresh_token', refreshToken, { httpOnly: true, secure: true, sameSite: 'None' });
            return({status:true,user:true,accessToken,message:"user Exist"})
            
        }else{
            console.log("false");
            return({status:false,user:true,message:"incorrect Password"})

        }
  }
  else{
       
    return ({message:'Invalid email ',user:false})
}
    
}


export default Login