import express from 'express'
import { deleteUser, getSingleUser, ubdateUser ,getAllUser } from '../controllers/userController.js'


const router = express.Router()

import { verifyUser ,verifyAdmin } from '../utils/verifyToen.js'

//ubdate user
router.put('/:id' , verifyUser ,ubdateUser)

//delete user
router.delete('/:id' ,verifyUser, deleteUser)

//get user
router.get('/:id' , verifyUser , getSingleUser)

//get all  users 
router.get('/' , verifyAdmin ,getAllUser)







export default router;