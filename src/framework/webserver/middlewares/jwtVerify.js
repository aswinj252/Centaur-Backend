import authServiceImp from "../../Services/authServiceImp.js";
import authServiceInt from "../../../application/Services/authServiceInt.js";
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
