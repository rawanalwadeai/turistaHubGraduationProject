import express from 'express'
import { deleteUser, getSingleUser, ubdateUser ,getAllUser  , getAllBookings} from '../controllers/userController.js'


const router = express.Router()

import { verifyUser ,verifyAdmin } from '../utils/verifyToen.js'

//ubdate user
router.put('/:id'  ,ubdateUser)

//delete user
router.delete('/:id' , deleteUser)

//get user
router.get('/:id'  , getSingleUser)

//get all  users 
router.get('/' , verifyAdmin ,getAllUser)

//get all bookings
router.get('/:id/fullbookings' , getAllBookings)





export default router;