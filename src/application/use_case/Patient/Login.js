import cookie from 'cookie';

const Login = async(email,password,repositories,authService,res) =>{
   

  const User = await repositories.PatientExist(email)
  console.log(User,"user");
  

  if(User !=null){
    const id = User._id.toString();
    console.log(id,"id for jwt");
 
    const Password=await authService.comparePassword(password,User.password)
        if(Password){
          const accessToken = await authService.createAccessToken(id) 
          const refreshToken = await authService.createRefreshToken(id )
          console.log(refreshToken);
            console.log("true");

            res.cookie('Patientrefresh_token', refreshToken, { httpOnly: true, secure: true, sameSite: 'None' });

            return({status:true,user:true,User,accessToken,message:"user Exist"})
            
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