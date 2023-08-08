
import DoctorAuthController from "../../../../adapters/controllers/Doctor/DoctorController.js" 
import DoctorRepositoryImpl from "../../../database/mongoDb/repositories/Doctor/DoctorRepositoryImpl.js"
import DoctorRepositoryInt from "../../../../application/repositories/Doctor/DoctorRepositoryInt.js"
import authServiceInt from "../../../../application/Services/Doctor/authServiceInt.js"
import authServiceImp from "../../../Services/Doctor/AuthService.js"
import single from "../../middlewares/multer.js"

import auth from "../../middlewares/jwtVerify.js"


const DoctorAuthRouter = (express) =>{

 const router = express.Router()
 const Controller =  DoctorAuthController(DoctorRepositoryInt,DoctorRepositoryImpl,authServiceInt,authServiceImp)


router.route('/signup') .post(single,Controller.createDoctor)
router.route('/login' ) .post(Controller.Login)
router.route('/addApponitment') . post(auth, Controller.AddAppointment)


return router

}
export default DoctorAuthRouter