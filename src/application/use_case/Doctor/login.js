 const login  = async(email,password,repository,authService) =>{
    const Doctor = await repository.DoctorExist(email)
    
    if(Doctor!=null){
        if(Doctor.status ==="true"){
        const Password=await authService.comparePassword(password,Doctor.password)
        console.log(Password,"dfdfdfdffdfd");
        if (Password) {
            console.log("true");
            return({status:true,auth:true,user:true,message:"Doctor Authenticated"})
            
        }
        else{
            console.log("false");
            return({status:false,auth:true,user:true,message:"incorrect Password"}) 
        }
    }else{
        return({status:false,auth:false,user:true,message:"your application is being processed"})
    }
    }
    else{
        return({status:false,auth:false,user:false,message:"Invalid User Please Reigister"})
    }
 }
 export default login;