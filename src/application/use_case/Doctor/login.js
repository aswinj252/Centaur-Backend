import cookie from 'cookie';

 
//  const login  = async(email,password,repository,authService) =>{
//     const Doctor = await repository.DoctorExist(email)
    
//     if(Doctor!=null){
//         if(Doctor.status ==="true"){
//             const id = Doctor._id.toString();
//             console.log(id,"id for jwt token ");
//         const Password=await authService.comparePassword(password,Doctor.password)
//         console.log(Password,"dfdfdfdffdfd");
//         if (Password) {
//             console.log("true");
//             const accessToken = await authService.createAccessToken(id) 
//             const refreshtToken = await authService.createRefreshToken(id )


//             return({refreshtToken,accessToken,status:true,auth:true,user:true,message:"Doctor Authenticated"})
            
//         }
//         else{
//             console.log("false");
//             return({status:false,auth:true,user:true,message:"incorrect Password"}) 
//         }
//     }else{
//         return({status:false,auth:false,user:true,message:"your application is being processed"})
//     }
//     }
//     else{
//         return({status:false,auth:false,user:false,message:"Invalid User Please Reigister"})
//     }
//  }
//  export default login;


// const login = async (email, password, repository, authService, res) => {
//     const Doctor = await repository.DoctorExist(email);
  
//     if (Doctor != null) {
//       // ... rest of your code ...
  
//       if (Password) {
//         // ... rest of your code ...
  
//         const accessToken = await authService.createAccessToken(id);
//         const refreshToken = await authService.createRefreshToken(id);
  
//         // Set cookies in the response headers
//         res.setHeader('Set-Cookie', [
//           cookie.serialize('access_token', accessToken, {
//             httpOnly: true,
//             maxAge: 3600, // Access token expires in 1 hour (adjust as needed)
//             path: '/',
//           }),
//           cookie.serialize('refresh_token', refreshToken, {
//             httpOnly: true,
//             maxAge: 86400 * 30, // Refresh token expires in 30 days (adjust as needed)
//             path: '/',
//           }),
//         ]);
  
//         return {
//           refreshtToken: refreshToken,
//           accessToken: accessToken,
//           status: true,
//           auth: true,
//           user: true,
//           message: 'Doctor Authenticated',
//         };
//       } else {
//         // ... rest of your code ...
//       }
//     } else {
//       // ... rest of your code ...
//     }
//   };
const login = async (email, password, repository, authService,res) => {
    const Doctor = await repository.DoctorExist(email);
  
    if (Doctor != null) {
      if (Doctor.status === "true") {
        const id = Doctor._id.toString();
  
        const Password = await authService.comparePassword(password, Doctor.password);
  
        if (Password) {
          const accessToken = await authService.createAccessToken(id);
          const refreshToken = await authService.createRefreshToken(id);
          console.log(refreshToken,accessToken);
  
        //   // Set the tokens as HTTP-only cookies in the response
        //   res.cookie('accessToken', accessToken, {
        //     httpOnly: true,
        //     // Set any additional cookie options, such as expiration and secure flags if needed
        //     // Example:
        //     // maxAge: 3600000, // 1 hour in milliseconds
        //     // secure: true // Enable this on production if you're using HTTPS
        //   });
  
        //   res.cookie('refreshToken', refreshToken, {
        //     httpOnly: true,
        //     // Set any additional cookie options, such as expiration and secure flags if needed
        //     // Example:
        //     // maxAge: 7 * 24 * 3600000, // 7 days in milliseconds
        //     // secure: true // Enable this on production if you're using HTTPS
        //   });
        // res.cookie('access_token', accessToken, {httpOnly: true, sameSite: 'None' });
        res.cookie('refresh_token', refreshToken, { httpOnly: true, secure: true, sameSite: 'None' });
     
    
          return {
            status: true,
            auth: true,
            user: true,
            message: "Doctor Authenticated",
            accessToken
          };
        } else {
          return { status: false, auth: true, user: true, message: "Incorrect Password" };
        }
      } else {
        return { status: false, auth: false, user: true, message: "Your application is being processed" };
      }
    } else {
      return { status: false, auth: false, user: false, message: "Invalid User Please Register" };
    }
  };
  
  export default login;
  