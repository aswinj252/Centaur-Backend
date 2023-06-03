
const Login = async(email,password,repository,authService) =>{
    const Admin = await repository.AdminExist(email)
    console.log(Admin);
     if (Admin != null) {
         const Password = await authService.comparePassword(password,Admin.password)
         if(Password) {
            return ({status:true ,user:true,message:"Admin authenticated"})
         }
         else{
            return({status:false,user:true,message:"incorrect Password"})
         }
     }
     else{
         return({status:false,user:false, message:"invalid credentials"})
     }
}
export default Login