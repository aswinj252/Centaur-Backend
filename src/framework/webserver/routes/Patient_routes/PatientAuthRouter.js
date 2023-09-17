import PatientAuthController from "../../../../adapters/controllers/Patient/PatientController.js"
import PatientRepositoryInt from "../../../../application/repositories/Patient/PatientRepositoryInt.js"
import PatientRepositoryImp from "../../../database/mongoDb/repositories/Patient/PatientRepositoryImp.js"
import authServiceImp from "../../../Services/Patient/authService.js"
import authServiceInt from "../../../../application/Services/Patient/authServiceInt.js"
const PatientAuthRouter = (express) =>{

    const router = express.Router()
    const controller = PatientAuthController(PatientRepositoryInt,PatientRepositoryImp,authServiceInt,authServiceImp)


    router.route('/signup').post(controller.createPatient)
    router.route('/login').post(controller.patientLogin)
    router.route('/allDep').get(controller.getDepartments)
    router.route('/allDoc').get(controller.getDoctors)
    router.route('/docDetails/:id').get(controller.getDocDetails)
    router.route('/video_appointment').get(controller.getVideoAppointmentTime)
    router.route('/book_appointment'). post(controller.BookAppointment)
    router.route('/publicKey').get(controller.getPK)
    router.route('/create-checkout-session' ) .post(controller.CreateIntent)
    return router
}
export default PatientAuthRouter