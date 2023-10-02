import AdminController from "../../../../adapters/controllers/Admin/AdminController.js"
import AdminRepositoryInt from "../../../../application/repositories/Admin/AdminRepositoryInt.js"
import AdminRepositoryImpl from "../../../database/mongoDb/repositories/Admin/AdminRepositoryImpl.js"
import single from "../../middlewares/multer.js"
import mailServiceInt from "../../../../application/Services/mailServiceInt.js"
import mailServiceImp from "../../../Services/mailServiceImp.js"
import authServiceImp from "../../../Services/authServiceImp.js"
import authServiceInt from '../../../../application/Services/authServiceInt.js'
const AdminAuthRouter = (express) =>{
const router = express.Router()
const controller = AdminController(AdminRepositoryInt,AdminRepositoryImpl,authServiceInt,authServiceImp,mailServiceInt,mailServiceImp)

router.route('/login').post(controller.AdminLogin)
router.route('/pending').get(controller.PendingApproval)
router.route('/approve/:id').put(controller.ApproveDoctor)
router.route('/reject/:id').delete(controller.RejectDoctor)
router.route('/addDepartment').post(single,controller.AddDepartment)
router.route('/allDep').get(controller.Alldepartment)
router.route('/allDoc').get(controller.AllApprovedDoc)


return router
}
export  default  AdminAuthRouter