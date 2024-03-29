import PatientAuthController from "../../../../adapters/controllers/Patient/PatientController.js"
import PatientRepositoryInt from "../../../../application/repositories/Patient/PatientRepositoryInt.js"
import PatientRepositoryImp from "../../../database/mongoDb/repositories/Patient/PatientRepositoryImp.js"
import authServiceImp from "../../../Services/authServiceImp.js"
import authServiceInt from "../../../../application/Services/authServiceInt.js"
import mailServiceInt from "../../../../application/Services/mailServiceInt.js"
import mailServiceImp from "../../../Services/mailServiceImp.js"
const PatientAuthRouter = (express) =>{

    const router = express.Router()
    const controller = PatientAuthController(PatientRepositoryInt,PatientRepositoryImp,authServiceInt,authServiceImp,mailServiceInt,mailServiceImp)


    router.route('/signup').post(controller.createPatient)
    router.route('/login').post(controller.patientLogin)
    router.route('/verify/:token').get(controller.VerifyEmail)
    router.route('/allDep').get(controller.getDepartments)
    router.route('/allDoc').get(controller.getDoctors)
    router.route('/docDetails/:id').get(controller.getDocDetails)
    router.route('/video_appointment').get(controller.getVideoAppointmentTime)
    router.route('/book_appointment'). post(controller.BookAppointment)
    // router.route('/publicKey').get(controller.getPK)
    router.route('/create-checkout-session' ) .post(controller.CreateIntent)
    router.route('/sentOtp').post(controller.sentOtp)
    router.route('/verifyOtp').post(controller.verifyOtp)
    return router
}
export default PatientAuthRouter