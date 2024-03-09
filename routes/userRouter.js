import {Router} from 'express'
import { getApplicationStats, getCurrentUser, updateuser } from '../controllers/userController.js'
import { authorizePermissions, checkForTestUser } from '../middleware/authMIddleware.js'
import upload from '../middleware/multerMiddleware.js'
const router = Router()

router.get('/current-user', getCurrentUser)
router.get('/admin/app-stats', [authorizePermissions('admin'), getApplicationStats] )
router.patch('/update-user', checkForTestUser, upload.single('avatar'), updateuser)

export default router