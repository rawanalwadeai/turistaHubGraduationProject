import express from 'express'
import { deleteUser, getSingleUser, ubdateUser ,getAllUser  , getAllBookings} from '../controllers/userController.js'


const router = express.Router()

import { verifyUser ,verifyAdmin } from '../utils/verifyToen.js'

router.put('/:id'  ,ubdateUser)
router.delete('/:id' , deleteUser)
router.get('/:id'  , getSingleUser)
router.get('/' , verifyAdmin ,getAllUser)
router.get('/:id/fullbookings' , getAllBookings)





export default router;