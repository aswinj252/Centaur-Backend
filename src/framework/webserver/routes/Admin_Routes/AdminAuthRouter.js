import AdminController from "../../../../adapters/controllers/Admin/AdminController.js"
import AdminRepositoryInt from "../../../../application/repositories/Admin/AdminRepositoryInt.js"
import AdminRepositoryImpl from "../../../database/mongoDb/repositories/Admin/AdminRepositoryImpl.js"
import authServiceImp from "../../../Services/Admin/AuthService.js"
import authServiceInt from "../../../../application/Services/Admin/authServiceInt.js"
import DoctorRepositoryInt from "../../../../application/repositories/Doctor/DoctorRepositoryInt.js"
import DoctorRepositoryImpl from "../../../database/mongoDb/repositories/Doctor/DoctorRepositoryImpl.js"
const AdminAuthRouter = (express) =>{
const router = express.Router()
const controller = AdminController(AdminRepositoryInt,AdminRepositoryImpl,authServiceInt,authServiceImp,DoctorRepositoryInt,DoctorRepositoryImpl)

router.route('/login').post(controller.AdminLogin)
router.route('/pending').get(controller.PendingApproval)
router.route('/approve/:id').put(controller.ApproveDoctor)
router.route('/reject/:id').delete(controller.RejectDoctor)


return router
}
export  default  AdminAuthRouter