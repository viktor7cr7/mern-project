import { Router } from "express";
const router = Router()
import { validateJobInput } from "../middleware/validationMiddleware.js";
import { validateIdParam } from "../middleware/validationMiddleware.js";
import { checkForTestUser } from "../middleware/authMIddleware.js";
import {
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob,
    showStats
} from '../controllers/jobController.js'

router.route('/').get(getAllJobs).post(checkForTestUser, validateJobInput, createJob)

router.route('/stats').get(showStats)

router.route('/:id').get(validateIdParam, getJob).patch(checkForTestUser,
    validateIdParam, validateJobInput, updateJob).delete(checkForTestUser, deleteJob)

export default router;