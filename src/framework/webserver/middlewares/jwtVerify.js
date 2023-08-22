import authServiceImp from "../../Services/Doctor/AuthService.js";
import authServiceInt from "../../../application/Services/Doctor/authServiceInt.js";
import DoctorRepositoryImpl from "../../database/mongoDb/repositories/Doctor/DoctorRepositoryImpl.js";
import DoctorRepositoryInt from "../../../application/repositories/Doctor/DoctorRepositoryInt.js";
const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    console.log(authHeader, "jeader");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];
    console.log(token, "token");

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const authService = authServiceInt(authServiceImp());

    try {
      const decoded = await authService.verifyToken(token);
      console.log(decoded, "decoded");
      if (decoded.id && decoded.expired != true) {
        const repository = DoctorRepositoryInt(DoctorRepositoryImpl());
        const authenticated = await repository.verifyUser(decoded.id);
        if (authenticated) {
          console.log("authenticated",authenticated);
          // res.json({authenticated, expired:false})
          next();
        } else {
          console.log("invalid user");
        }
      } else if (!decoded.id && decoded.expired === true) {
       

      //  const refreshToken = req.cookies.refresh_token
      //  console.log(refreshToken,"78878787878787877");
      //  if (refreshToken) {
      // const  decodedToken =  authService.verifyRefresh(refreshToken)
      // console.log(decodedToken,"refresh1111");

      // const newToken = authService.createAccessToken(decodedToken)
      // console.log(newToken,"454545454545454");
      //   return res.json({ message: "token expired and new token is " ,newToken });
      //  }else{
      //   res.json ({message:"unauthorized"})
      //  }
        
       res.json({message:"token expired",expired:true})
       


      } 
      
    } catch (error) {
      console.error("Error verifying token:", error);
      return res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    console.error("Error in auth middleware:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export default auth;
