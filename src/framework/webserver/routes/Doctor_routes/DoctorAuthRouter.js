
import DoctorAuthController from "../../../../adapters/controllers/Doctor/DoctorController.js" 
import DoctorRepositoryImpl from "../../../database/mongoDb/repositories/Doctor/DoctorRepositoryImpl.js"
import DoctorRepositoryInt from "../../../../application/repositories/Doctor/DoctorRepositoryInt.js"
import authServiceImp from "../../../Services/authServiceImp.js"
import authServiceInt from "../../../../application/Services/authServiceInt.js"
import single from "../../middlewares/multer.js"
import auth from "../../middlewares/jwtVerify.js"


const DoctorAuthRouter = (express) =>{

 const router = express.Router()
 const Controller =  DoctorAuthController(DoctorRepositoryInt,DoctorRepositoryImpl,authServiceInt,authServiceImp)


router.route('/signup') .post(single,Controller.createDoctor)
router.route('/login' ) .post(Controller.Login)
router.route('/docDetails/:id').get(Controller.getDetails)
router.route('/addApponitment') . post(auth, Controller.AddAppointment)
router.route('/addNApponitment') .post(auth,Controller.Appointment)
router.route('/editDetails/:id').put(Controller.EditDetails)
router.route('/refreshToken') .get(Controller.RefreshToken)
router.route('/departments').get(Controller.getDepartments)

return router

}
export default DoctorAuthRouter