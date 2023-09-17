import cookie from 'cookie';

 
const login = async (email, password, repository, authService,res) => {
    const Doctor = await repository.DoctorExist(email);
  
    if (Doctor != null) {
      if (Doctor.approved === "true") {
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
            accessToken,id,Doctor
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
  