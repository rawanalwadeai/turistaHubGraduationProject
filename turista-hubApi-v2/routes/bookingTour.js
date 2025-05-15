import express from "express"

import { verifyAdmin, verifyUser } from "../utils/verifyToen.js"
import { createBooking, getAllBooking, getBooking } from "../controllers/bookingTourController.js"
const router = express.Router()


router.post('/:tourId'  ,createBooking)
router.get('/:id'  ,getBooking)
router.get('/'  ,getAllBooking)


export default router