
const Login = async(email,password,repositories,authService) =>{
   

  const User = await repositories.PatientExist(email)
  console.log(User,"user");
  const id = User._id.toString();

  if(User !=null){
    console.log(id,"id for jwt");
 
    const Password=await authService.comparePassword(password,User.password)
        if(Password){
          const accessToken = await authService.createAccessToken(id) 
          const refrestToken = await authService.createRefreshToken(id )
            console.log("true");

            return({status:true,user:true,refrestToken,accessToken,message:"user Exist"})
            
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